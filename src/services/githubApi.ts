import type { GitHubActivityResponse, GitHubIssuesResponse } from "../components/OpenSource/types";

const BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    let message = `GitHub API error: ${res.status}`;
    try {
      const body = await res.json();
      if (body?.error?.message) message = body.error.message;
    } catch { /* non-JSON error body */ }
    throw new Error(message);
  }
  return res.json();
}

export function getGitHubActivity(): Promise<GitHubActivityResponse> {
  return fetchJSON("/github-activity");
}

export function getGitHubIssues(labels = "good-first-issue"): Promise<GitHubIssuesResponse> {
  return fetchJSON(`/github-issues?labels=${encodeURIComponent(labels)}`);
}
