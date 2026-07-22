import type { GitHubRelease } from "./types";

type ReleaseListProps = {
  releases: GitHubRelease[];
};

export function ReleaseList({ releases }: ReleaseListProps) {
  if (releases.length === 0) {
    return (
      <p className="py-8 text-center text-[14px] text-[color:var(--color-faint)]">
        No recent activity.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {releases.map((r) => (
        <a
          key={r.tag}
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-[color:var(--surface)]"
        >
          <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-amber)]" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-medium text-[color:var(--color-ink)]">
              {r.name || r.tag}
            </p>
            <p className="mt-1 font-mono text-[11px] text-[color:var(--color-faint)]">
              {r.tag} · {new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </p>
          </div>
          {r.prerelease && (
            <span className="shrink-0 rounded-full border border-[color:var(--color-amber)]/25 bg-[color:var(--color-amber)]/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[color:var(--color-amber)]">
              Pre-release
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
