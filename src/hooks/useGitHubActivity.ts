import { useState, useEffect } from "react";
import type { GitHubActivityResponse } from "../components/OpenSource/types";
import { getGitHubActivity } from "../services/githubApi";

const CACHE_KEY = "github-activity-cache";
const TTL = 10 * 60 * 1000;

function getCached(): GitHubActivityResponse | null {
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

function setCached(data: GitHubActivityResponse): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // sessionStorage unavailable or full
  }
}

export function useGitHubActivity() {
  const [data, setData] = useState<GitHubActivityResponse | null>(getCached);
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getGitHubActivity();
      setData(result);
      setCached(result);
    } catch (e) {
      if (!data) setError(e instanceof Error ? e.message : "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { data, loading, error, retry: fetch };
}
