import type { Env, GitHubActivityResponse } from "./types";
import { cacheGet, cacheSet } from "./cache";
import { ghFetchSafe, ghFetch, fetchWithRetry, parseContributorCount } from "./client";
import { success, error } from "../utils/response";

export async function handleActivity(env: Env): Promise<Response> {
  const GITHUB_OWNER = env.GITHUB_OWNER;
  const GITHUB_REPO = env.GITHUB_REPO;

  const cached = cacheGet<GitHubActivityResponse>("github-activity");
  if (cached) {
    return success(cached, "HIT");
  }

  try {
    const [repoResult, prSearchResult] = await Promise.all([
      ghFetchSafe(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}`, env),
      ghFetchSafe(
        `/search/issues?q=repo:${GITHUB_OWNER}/${GITHUB_REPO}+type:pr+state:open`,
        env,
      ),
    ]);

    let commitActivity: GitHubActivityResponse["commitActivity"] = null;
    try {
      const commitRes = await fetchWithRetry(
        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/stats/commit_activity`,
        env,
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
      console.error("commit_activity failed", err);
    }

    const [commitsResult, pullsResult, releasesResult] = await Promise.all([
      ghFetchSafe(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?per_page=5`, env),
      ghFetchSafe(
        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/pulls?state=all&per_page=5&sort=updated&direction=desc`,
        env,
      ),
      ghFetchSafe(
        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases?per_page=5`,
        env,
      ),
    ]);

    const repo = repoResult.ok ? (repoResult.data as Record<string, unknown>) : null;
    const prSearch = prSearchResult.ok
      ? (prSearchResult.data as { total_count?: number })
      : null;
    const repoOwner = repo as Record<string, unknown> | null;
    const openIssuesCount = (repoOwner?.open_issues_count as number) ?? 0;
    const openPrCount = prSearch?.total_count ?? 0;

    let contributorCount = 1;
    try {
      const cres = await ghFetch(
        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contributors?per_page=1&anon=true`,
        env,
      );
      contributorCount = parseContributorCount(cres.headers.get("link"));
    } catch {
      // keep default
    }

    const recentCommits: GitHubActivityResponse["recentCommits"] = [];
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

    const recentPRs: GitHubActivityResponse["recentPRs"] = [];
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

    const recentReleases: GitHubActivityResponse["recentReleases"] = [];
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

    if (commitActivity === null) {
      cacheSet("github-activity", data, 60 * 1000);
    } else {
      cacheSet("github-activity", data);
    }
    return success(data, "MISS");
  } catch (err) {
    console.error("githubActivity failed", err);
    return error("GITHUB_API_ERROR", "Unable to retrieve repository activity.");
  }
}
