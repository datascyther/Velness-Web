import type { Env, GitHubIssuesResponse } from "./types";
import { cacheGet, cacheSet } from "./cache";
import { ghFetchSafe } from "./client";
import { success, error } from "../utils/response";

export async function handleIssues(
  request: Request,
  env: Env,
): Promise<Response> {
  const GITHUB_OWNER = env.GITHUB_OWNER;
  const GITHUB_REPO = env.GITHUB_REPO;

  const url = new URL(request.url);
  const labels = url.searchParams.get("labels") || "good-first-issue";
  const sanitized = labels.replace(/[^a-zA-Z0-9,\-_/]/g, "");
  const cacheKey = `github-issues-${sanitized}`;

  const cached = cacheGet<GitHubIssuesResponse>(cacheKey);
  if (cached) {
    return success(cached, "HIT");
  }

  try {
    const q = `repo:${GITHUB_OWNER}/${GITHUB_REPO}+type:issue+state:open+label:${sanitized}`;
    const result = await ghFetchSafe(
      `/search/issues?q=${q}&sort=updated&order=desc&per_page=10`,
      env,
    );

    if (!result.ok) {
      return success({
        fetchedAt: new Date().toISOString(),
        issues: [],
        total: 0,
      });
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
    return success(data, "MISS");
  } catch (err) {
    console.error("githubIssues failed", err);
    return error("GITHUB_ISSUES_ERROR", "Unable to retrieve issues.");
  }
}
