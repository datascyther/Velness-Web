import type { GitHubPR } from "./types";

type PRListProps = {
  prs: GitHubPR[];
};

const stateStyles: Record<string, { label: string; className: string }> = {
  open: {
    label: "Open",
    className: "text-emerald-300 border-emerald-400/25 bg-emerald-400/5",
  },
  closed: {
    label: "Closed",
    className: "text-[color:var(--color-faint)] border-[color:var(--color-line-strong)]",
  },
  merged: {
    label: "Merged",
    className: "text-[color:var(--color-iris)] border-[color:var(--color-iris)]/25 bg-[color:var(--color-iris)]/5",
  },
};

export function PRList({ prs }: PRListProps) {
  if (prs.length === 0) {
    return (
      <p className="py-8 text-center text-[14px] text-[color:var(--color-faint)]">
        No recent activity.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {prs.map((pr) => {
        const style = stateStyles[pr.state] ?? stateStyles.open;
        return (
          <a
            key={pr.number}
            href={pr.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-[color:var(--surface)]"
          >
            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-iris)]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-medium text-[color:var(--color-ink)]">
                {pr.title}
              </p>
              <p className="mt-1 font-mono text-[11px] text-[color:var(--color-faint)]">
                #{pr.number} · {pr.author}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] ${style.className}`}
            >
              {style.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
