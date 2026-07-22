export interface GitHubCommit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

export interface GitHubPR {
  number: number;
  title: string;
  state: "open" | "closed" | "merged";
  author: string;
  date: string;
  url: string;
}

export interface GitHubRelease {
  tag: string;
  name: string;
  prerelease: boolean;
  date: string;
  url: string;
}

export interface GitHubActivityResponse {
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

export interface GitHubIssuesResponse {
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

export interface Env {
  GITHUB_TOKEN: string;
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
}
