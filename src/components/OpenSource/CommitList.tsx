import type { GitHubCommit } from "./types";

type CommitListProps = {
  commits: GitHubCommit[];
};

function truncateMessage(msg: string, maxLen = 72): string {
  const firstLine = msg.split("\n")[0].trim();
  if (firstLine.length <= maxLen) return firstLine;
  return firstLine.slice(0, maxLen) + "...";
}

export function CommitList({ commits }: CommitListProps) {
  if (commits.length === 0) {
    return (
      <p className="py-8 text-center text-[14px] text-[color:var(--color-faint)]">
        No recent activity.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {commits.map((c) => (
        <a
          key={c.sha}
          href={c.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-[color:var(--surface)]"
        >
          <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-iris)]" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-medium text-[color:var(--color-ink)]">
              {truncateMessage(c.message)}
            </p>
            <p className="mt-1 font-mono text-[11px] text-[color:var(--color-faint)]">
              {c.author} · {new Date(c.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
