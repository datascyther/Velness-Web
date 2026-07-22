import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";

const GITHUB_OWNER = "datascyther";
const GITHUB_REPO = "velness-ai";
const GH_API = "https://api.github.com";

// ── Types ──────────────────────────────────────────────────────────────

interface GitHubCommit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

interface GitHubPR {
  number: number;
  title: string;
  state: "open" | "closed" | "merged";
  author: string;
  date: string;
  url: string;
}

interface GitHubRelease {
  tag: string;
  name: string;
  prerelease: boolean;
  date: string;
  url: string;
}

interface GitHubActivityResponse {
  fetchedAt: string;
  repository: {
    stars: number;
    forks: number;
    openIssues: number;
    pullRequests: number;
    contributors: number;
    lastPush: string;
  };
  commitActivity: { weeks: { days: number[]; total: number }[] } | null;
  recentCommits: GitHubCommit[];
  recentPRs: GitHubPR[];
  recentReleases: GitHubRelease[];
}

interface GitHubIssuesResponse {
  fetchedAt: string;
  issues: {
    number: number;
    title: string;
    state: "open" | "closed";
    labels: string[];
    createdAt: string;
    updatedAt: string;
    htmlUrl: string;
  }[];
  total: number;
}

// ── In-Memory Cache ────────────────────────────────────────────────────

interface CacheEntry {
  data: unknown;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 10 * 60 * 1000;

function cacheGet<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function cacheSet(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// ── GitHub API Helpers ─────────────────────────────────────────────────

function ghHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "velness-web",
  };
}

async function ghFetch(path: string): Promise<Response> {
  return fetch(`${GH_API}${path}`, { headers: ghHeaders() });
}

async function ghFetchSafe(path: string): Promise<{ ok: boolean; data: unknown }> {
  try {
    const res = await ghFetch(path);
    if (!res.ok) {
      logger.error(`GitHub API ${res.status} for ${path}`);
      return { ok: false, data: null };
    }
    return { ok: true, data: await res.json() };
  } catch (err) {
    logger.error(`GitHub API network error for ${path}`, err);
    return { ok: false, data: null };
  }
}

async function fetchWithRetry(
  path: string,
  retries = 3,
  delayMs = 2000,
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const res = await ghFetch(path);
    if (res.status !== 202) return res;
    if (i < retries - 1) {
      await new Promise((r) => setTimeout(r, delayMs * Math.pow(2, i)));
    }
  }
  return await ghFetch(path);
}

function parseContributorCount(linkHeader: string | null): number {
  if (!linkHeader) return 1;
  const match = linkHeader.match(/[?&]page=(\d+)>;\s*rel="last"/);
  return match ? parseInt(match[1], 10) : 1;
}

// ── /api/github-activity ───────────────────────────────────────────────

export const githubActivity = onRequest(async (_req, res) => {
  res.set("Cache-Control", "public, max-age=60");

  const cached = cacheGet<GitHubActivityResponse>("github-activity");
  if (cached) {
    res.set("X-Cache", "HIT");
    res.json(cached);
    return;
  }

  try {
    // Parallel: independent endpoints
    const [repoResult, prSearchResult] = await Promise.all([
      ghFetchSafe(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}`),
      ghFetchSafe(
        `/search/issues?q=repo:${GITHUB_OWNER}/${GITHUB_REPO}+type:pr+state:open`,
      ),
    ]);

    // Sequential: commit activity (may need retry for 202)
    let commitActivity: GitHubActivityResponse["commitActivity"] = null;
    try {
      const commitRes = await fetchWithRetry(
        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/stats/commit_activity`,
      );
      if (commitRes.ok) {
        const raw = await commitRes.json();
        if (Array.isArray(raw)) {
          commitActivity = {
            weeks: raw.map((w: { days: number[]; total: number }) => ({
              days: w.days,
              total: w.total,
            })),
          };
        }
      }
    } catch (err) {
      logger.error("commit_activity failed", err);
    }

    // Parallel: remaining endpoints
    const [commitsResult, pullsResult, releasesResult] = await Promise.all([
      ghFetchSafe(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?per_page=5`),
      ghFetchSafe(
        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/pulls?state=all&per_page=5&sort=updated&direction=desc`,
      ),
      ghFetchSafe(
        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases?per_page=5`,
      ),
    ]);

    // ── Parse repository metrics ─────────────────────────────────────
    const repo = repoResult.ok ? (repoResult.data as Record<string, unknown>) : null;
    const prSearch = prSearchResult.ok
      ? (prSearchResult.data as { total_count?: number })
      : null;
    const repoOwner = repo as Record<string, unknown> | null;
    const openIssuesCount = (repoOwner?.open_issues_count as number) ?? 0;
    const openPrCount = prSearch?.total_count ?? 0;

    // Parse contributors from Link header
    let contributorCount = 1;
    try {
      const cres = await ghFetch(
        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contributors?per_page=1&anon=true`,
      );
      contributorCount = parseContributorCount(cres.headers.get("link"));
    } catch {
      // keep default
    }

    // ── Parse recent commits ─────────────────────────────────────────
    const recentCommits: GitHubCommit[] = [];
    if (commitsResult.ok && Array.isArray(commitsResult.data)) {
      for (const c of commitsResult.data as Record<string, unknown>[]) {
        const commit = c.commit as Record<string, unknown>;
        const author = commit.author as Record<string, unknown> | undefined;
        recentCommits.push({
          sha: (c.sha as string).slice(0, 7),
          message: (commit.message as string) ?? "",
          author: (author?.name as string) ?? "Unknown",
          date: (author?.date as string) ?? "",
          url: (c.html_url as string) ?? "",
        });
      }
    }

    // ── Parse recent PRs ─────────────────────────────────────────────
    const recentPRs: GitHubPR[] = [];
    if (pullsResult.ok && Array.isArray(pullsResult.data)) {
      for (const pr of pullsResult.data as Record<string, unknown>[]) {
        const user = pr.user as Record<string, unknown> | undefined;
        const mergedAt = pr.merged_at as string | null;
        const state = pr.state as string;
        recentPRs.push({
          number: pr.number as number,
          title: (pr.title as string) ?? "",
          state: mergedAt ? "merged" : (state as "open" | "closed"),
          author: (user?.login as string) ?? "Unknown",
          date: (pr.updated_at as string) ?? "",
          url: (pr.html_url as string) ?? "",
        });
      }
    }

    // ── Parse recent releases ────────────────────────────────────────
    const recentReleases: GitHubRelease[] = [];
    if (releasesResult.ok && Array.isArray(releasesResult.data)) {
      for (const r of releasesResult.data as Record<string, unknown>[]) {
        recentReleases.push({
          tag: (r.tag_name as string) ?? "",
          name: (r.name as string) ?? "",
          prerelease: (r.prerelease as boolean) ?? false,
          date: (r.published_at as string) ?? "",
          url: (r.html_url as string) ?? "",
        });
      }
    }

    // ── Assemble response ────────────────────────────────────────────
    const data: GitHubActivityResponse = {
      fetchedAt: new Date().toISOString(),
      repository: {
        stars: (repoOwner?.stargazers_count as number) ?? 0,
        forks: (repoOwner?.forks_count as number) ?? 0,
        openIssues: Math.max(0, openIssuesCount - openPrCount),
        pullRequests: openPrCount,
        contributors: contributorCount,
        lastPush: (repoOwner?.pushed_at as string) ?? new Date().toISOString(),
      },
      commitActivity,
      recentCommits,
      recentPRs,
      recentReleases,
    };

    cacheSet("github-activity", data);
    res.set("X-Cache", "MISS");
    res.json(data);
  } catch (err) {
    logger.error("githubActivity failed", err);
    res.status(500).json({ error: "Failed to fetch repository activity" });
  }
});

// ── /api/github-issues ────────────────────────────────────────────────

export const githubIssues = onRequest(async (req, res) => {
  res.set("Cache-Control", "public, max-age=60");

  const labels = (req.query.labels as string) || "good-first-issue";
  const cacheKey = `github-issues-${labels}`;

  const cached = cacheGet<GitHubIssuesResponse>(cacheKey);
  if (cached) {
    res.set("X-Cache", "HIT");
    res.json(cached);
    return;
  }

  try {
    const q = `repo:${GITHUB_OWNER}/${GITHUB_REPO}+type:issue+state:open+label:${labels}`;
    const result = await ghFetchSafe(
      `/search/issues?q=${q}&sort=updated&order=desc&per_page=10`,
    );

    if (!result.ok) {
      res.status(200).json({
        fetchedAt: new Date().toISOString(),
        issues: [],
        total: 0,
      });
      return;
    }

    const search = result.data as {
      total_count?: number;
      items?: Record<string, unknown>[];
    };

    const issues: GitHubIssuesResponse["issues"] = [];
    for (const item of search.items ?? []) {
      const labelsList = (item.labels as { name?: string }[]) ?? [];
      issues.push({
        number: item.number as number,
        title: (item.title as string) ?? "",
        state: item.state === "closed" ? "closed" : "open",
        labels: labelsList.map((l) => l.name ?? "").filter(Boolean),
        createdAt: (item.created_at as string) ?? "",
        updatedAt: (item.updated_at as string) ?? "",
        htmlUrl: (item.html_url as string) ?? "",
      });
    }

    const data: GitHubIssuesResponse = {
      fetchedAt: new Date().toISOString(),
      issues,
      total: search.total_count ?? 0,
    };

    cacheSet(cacheKey, data);
    res.set("X-Cache", "MISS");
    res.json(data);
  } catch (err) {
    logger.error("githubIssues failed", err);
    res.status(500).json({ error: "Failed to fetch issues" });
  }
});
