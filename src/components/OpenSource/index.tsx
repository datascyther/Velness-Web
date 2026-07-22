import { useState } from "react";
import { Reveal } from "../Reveal";
import { Section } from "../Section";
import { useGitHubActivity } from "../../hooks/useGitHubActivity";
import { formatRelativeDate } from "../../utils/format";
import { MetricCard } from "./MetricCard";
import { GlassCard } from "./GlassCard";
import { CommitHeatmap } from "./CommitHeatmap";
import { TabBar } from "./TabBar";
import type { Tab } from "./TabBar";
import { CommitList } from "./CommitList";
import { PRList } from "./PRList";
import { ReleaseList } from "./ReleaseList";
import { ContributorCTA } from "./ContributorCTA";

const metrics = [
  { key: "stars", label: "Stars" },
  { key: "forks", label: "Forks" },
  { key: "openIssues", label: "Open Issues" },
  { key: "pullRequests", label: "Pull Requests" },
  { key: "contributors", label: "Contributors" },
] as const;

function SkeletonMetricRow() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {metrics.map((m) => (
        <div key={m.key} className="flex flex-col gap-1.5 rounded-2xl glass-soft px-5 py-4">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-7 w-12" />
        </div>
      ))}
    </div>
  );
}

function SkeletonHeatmap() {
  return (
    <div className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(26, minmax(10px, 1fr))", gridAutoFlow: "column", gridTemplateRows: "repeat(7, 10px)" }}>
      {Array.from({ length: 26 * 7 }).map((_, i) => (
        <div key={i} className="skeleton h-[10px] w-full rounded-[3px]" />
      ))}
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3">
          <div className="skeleton h-1.5 w-1.5 shrink-0 rounded-full" />
          <div className="flex-1">
            <div className="skeleton mb-1 h-4 w-3/4" />
            <div className="skeleton h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ErrorMessage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="py-8 text-center">
      <p className="text-[14px] text-[color:var(--color-faint)]">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 font-mono text-[12px] text-[color:var(--color-iris)] underline hover:text-[color:var(--color-ink)] transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export function OpenSource() {
  const { data, loading, error, retry } = useGitHubActivity();
  const [tab, setTab] = useState<Tab>("commits");

  return (
    <Section
      id="open-source"
      eyebrow="003 — Built in Public"
      title={<>Building Velness in <span className="italic spectrum-text">Public</span></>}
      intro="Every commit, deployment, discussion and contribution helps shape the future of Velness."
    >
      {/* Live Repository Activity heading */}
      <Reveal delay={0.04}>
        <h3 className="mb-6 font-display text-[22px] font-normal tracking-[-0.01em] text-[color:var(--color-ink)]">
          Live Repository Activity
        </h3>
      </Reveal>

      {/* Metrics row */}
      <Reveal delay={0.06}>
        {loading && !data ? (
          <SkeletonMetricRow />
        ) : data ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {metrics.map((m) => (
              <MetricCard key={m.key} label={m.label} value={data.repository[m.key]} />
            ))}
          </div>
        ) : null}
        {data && (
          <div className="mt-3 font-mono text-[11px] text-[color:var(--color-faint)]">
            Last activity: {formatRelativeDate(data.repository.lastPush)}
          </div>
        )}
      </Reveal>

      {/* Contribution Activity — heatmap */}
      <Reveal delay={0.08}>
        <div className="mt-16">
          <GlassCard
            title="Contribution Activity"
            description="Last 52 weeks of commits to the main branch."
          >
            {loading && !data ? (
              <SkeletonHeatmap />
            ) : data?.commitActivity ? (
              <CommitHeatmap weeks={data.commitActivity.weeks} />
            ) : data && !data.commitActivity && !error ? (
              <ErrorMessage
                message="Activity is being prepared — this usually resolves within a few minutes."
                onRetry={retry}
              />
            ) : (
              <ErrorMessage
                message={error || "Contribution data unavailable"}
                onRetry={retry}
              />
            )}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[color:var(--color-faint)]">
              <span>52 weeks of commits</span>
              <span>Updated via GitHub</span>
            </div>
          </GlassCard>
        </div>
      </Reveal>

      {/* Recent Development — tabs */}
      <Reveal delay={0.1}>
        <div className="mt-12">
          <GlassCard title="Recent Development">
            <TabBar active={tab} onChange={setTab} />
            {loading && !data ? (
              <SkeletonList />
            ) : (
              <>
                {tab === "commits" && <CommitList commits={data?.recentCommits ?? []} />}
                {tab === "prs" && <PRList prs={data?.recentPRs ?? []} />}
                {tab === "releases" && <ReleaseList releases={data?.recentReleases ?? []} />}
              </>
            )}
            {error && !loading && <ErrorMessage message={error} onRetry={retry} />}
          </GlassCard>
        </div>
      </Reveal>

      {/* Build Velness Together */}
      <Reveal delay={0.12}>
        <div className="mt-12 text-center">
          <h3 className="mb-4 font-display text-[22px] font-normal tracking-[-0.01em] text-[color:var(--color-ink)]">
            Build Velness Together
          </h3>
          <p className="mx-auto mb-8 max-w-[48ch] text-[15px] text-[color:var(--color-mist)]">
            Velness is open source. Every contribution helps shape a more thoughtful,
            privacy-respecting approach to AI and personal growth.
          </p>
          <ContributorCTA />
        </div>
      </Reveal>
    </Section>
  );
}
