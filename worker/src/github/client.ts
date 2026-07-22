import type { Env } from "./types";

const GH_API = "https://api.github.com";

export function ghHeaders(env: Env): Record<string, string> {
  return {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "velness-web",
  };
}

export async function ghFetch(path: string, env: Env): Promise<Response> {
  return fetch(`${GH_API}${path}`, { headers: ghHeaders(env) });
}

export async function ghFetchSafe(
  path: string,
  env: Env,
): Promise<{ ok: boolean; data: unknown }> {
  try {
    const res = await ghFetch(path, env);
    if (!res.ok) {
      console.error(`GitHub API ${res.status} for ${path}`);
      return { ok: false, data: null };
    }
    return { ok: true, data: await res.json() };
  } catch (err) {
    console.error(`GitHub API network error for ${path}`, err);
    return { ok: false, data: null };
  }
}

export async function fetchWithRetry(
  path: string,
  env: Env,
  retries = 3,
  delayMs = 1000,
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const res = await ghFetch(path, env);
    if (res.status !== 202) return res;
    if (i < retries - 1) {
      await new Promise((r) => setTimeout(r, delayMs * Math.pow(2, i)));
    }
  }
  return await ghFetch(path, env);
}

export function parseContributorCount(linkHeader: string | null): number {
  if (!linkHeader) return 1;
  const match = linkHeader.match(/[?&]page=(\d+)>;\s*rel="last"/);
  return match ? parseInt(match[1], 10) : 1;
}
