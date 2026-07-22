import { useState, useEffect } from "react";
import type { GitHubIssuesResponse } from "../components/OpenSource/types";
import { getGitHubIssues } from "../services/githubApi";

const CACHE_KEY = "github-issues-cache";
const TTL = 10 * 60 * 1000;

function getCached(): GitHubIssuesResponse | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > TTL) return null;
    return data;
  } catch {
    return null;
  }
}

function setCached(data: GitHubIssuesResponse): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // sessionStorage unavailable or full
  }
}

export function useGitHubIssues(labels = "good-first-issue") {
  const [data, setData] = useState<GitHubIssuesResponse | null>(getCached);
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState<string | null>(null);

  const fetchIssues = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getGitHubIssues(labels);
      setData(result);
      setCached(result);
    } catch (e) {
      if (!data) setError(e instanceof Error ? e.message : "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return { data, loading, error, retry: fetchIssues };
}
