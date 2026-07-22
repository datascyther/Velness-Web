import { motion } from "framer-motion";
import { ThemeToggle } from "../components/ThemeToggle";
import { Logo } from "../components/Logo";
import { useGitHubIssues } from "../hooks/useGitHubIssues";

const EASE = [0.22, 1, 0.36, 1] as const;

const waysToContribute = [
  {
    title: "Engineering",
    body: "Help build the core reflection engine, AI memory systems, or local-first storage layer. TypeScript, Rust, and TensorFlow Lite expertise welcome.",
  },
  {
    title: "Design",
    body: "Shape the visual language, interaction patterns, and emotional tone of Velness. Experience with calm, privacy-respecting design preferred.",
  },
  {
    title: "Documentation",
    body: "Guide new users and contributors through clear, compassionate documentation. No technical writing experience required — just clarity and patience.",
  },
  {
    title: "Testing & Accessibility",
    body: "Ensure Velness works for everyone. Help with QA, regression testing, screen reader audits, and real-world device testing.",
  },
  {
    title: "Ideas & Research",
    body: "Suggest features, review privacy models, or explore how AI can support reflection without creating dependency. Your thinking shapes the product.",
  },
];

const steps = [
  "Read CONTRIBUTING.md",
  "Review CODE_OF_CONDUCT.md",
  "Find a Good First Issue",
  "Set up your development environment",
  "Make your changes",
  "Submit a pull request",
];

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 rounded-xl px-4 py-3">
      <div className="skeleton h-4 w-5/6" />
    </div>
  );
}

export function ContributePage() {
  const { data: issuesData, loading: issuesLoading, error: issuesError, retry } = useGitHubIssues();

  return (
    <div className="relative min-h-screen grain flex items-center justify-center">
      <div className="aurora">
        <div className="aurora-blob" />
      </div>

      <div className="fixed right-6 top-6 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-[720px] px-6 py-20">
        <Logo to="/" className="mb-10" />

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-iris)]">
            Open Source
          </div>
          <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3.2rem)] font-light leading-[1.02] tracking-[-0.025em] text-[color:var(--color-ink)]">
            Contribute to Velness
          </h1>
          <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.65] text-[color:var(--color-mist)]">
            Velness is built in public — and you don't need to write code to help.
            Every contribution, whether it's a bug report, a design suggestion, or
            a documentation fix, shapes the future of this project.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/datascyther/velness-ai/issues?q=is:issue+is:open+label:good-first-issue"
              target="_blank"
              rel="noopener noreferrer"
              className="sheen inline-flex items-center gap-2 rounded-full bg-[color:var(--color-ink)] px-5 py-3 text-[14px] font-medium text-[color:var(--color-void)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore Good First Issues
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M1.5 6h9m0 0L7.5 3m3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="https://github.com/datascyther/velness-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass-soft px-5 py-3 text-[14px] font-medium text-[color:var(--color-ink)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              View Repository
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M1.5 6h9m0 0L7.5 3m3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Ways to Contribute */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-20"
        >
          <h2 className="mb-8 font-display text-[24px] font-normal tracking-[-0.01em] text-[color:var(--color-ink)]">
            Ways to Contribute
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {waysToContribute.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 2) * 0.06 }}
                className="rounded-2xl glass-soft p-6"
              >
                <div className="text-[15.5px] font-medium tracking-tight text-[color:var(--color-ink)]">
                  {w.title}
                </div>
                <p className="mt-3 text-[14px] leading-[1.65] text-[color:var(--color-mist)]">
                  {w.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Getting Started */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-20"
        >
          <h2 className="mb-8 font-display text-[24px] font-normal tracking-[-0.01em] text-[color:var(--color-ink)]">
            Getting Started
          </h2>
          <ol className="flex flex-col gap-3">
            {steps.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-4 rounded-2xl glass-soft px-6 py-4"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-iris)]/10 font-mono text-[12px] font-medium text-[color:var(--color-iris)]">
                  {i + 1}
                </span>
                <span className="text-[15px] text-[color:var(--color-ink)]">
                  {step === "Read CONTRIBUTING.md" ? (
                    <>
                      Read{" "}
                      <a
                        href="https://github.com/datascyther/velness-ai/blob/main/CONTRIBUTING.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[color:var(--color-iris)] underline"
                      >
                        CONTRIBUTING.md
                      </a>
                    </>
                  ) : step === "Review CODE_OF_CONDUCT.md" ? (
                    <>
                      Review{" "}
                      <a
                        href="https://github.com/datascyther/velness-ai/blob/main/CODE_OF_CONDUCT.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[color:var(--color-iris)] underline"
                      >
                        CODE_OF_CONDUCT.md
                      </a>
                    </>
                  ) : step === "Find a Good First Issue" ? (
                    <>
                      <a
                        href="https://github.com/datascyther/velness-ai/issues?q=is:issue+is:open+label:good-first-issue"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[color:var(--color-iris)] underline"
                      >
                        Find a Good First Issue
                      </a>
                    </>
                  ) : (
                    step
                  )}
                </span>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* Live Good First Issues */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-20"
        >
          <h2 className="mb-8 font-display text-[24px] font-normal tracking-[-0.01em] text-[color:var(--color-ink)]">
            Live Good First Issues
          </h2>
          <div className="overflow-hidden rounded-2xl glass-soft">
            {issuesLoading && !issuesData ? (
              <div className="flex flex-col gap-3 p-6">
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </div>
            ) : issuesError ? (
              <div className="p-6 text-center">
                <p className="text-[14px] text-[color:var(--color-faint)]">
                  Could not load issues.
                </p>
                <button
                  onClick={retry}
                  className="mt-2 font-mono text-[12px] text-[color:var(--color-iris)] underline hover:text-[color:var(--color-ink)] transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : issuesData && issuesData.issues.length > 0 ? (
              <div className="flex flex-col">
                {issuesData.issues.slice(0, 5).map((issue) => (
                  <a
                    key={issue.number}
                    href={issue.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-6 py-4 transition-colors hover:bg-[color:var(--surface)] not-last:border-b border-[color:var(--color-line)]"
                  >
                    <span className="font-mono text-[13px] text-[color:var(--color-faint)]">
                      #{issue.number}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[14px] text-[color:var(--color-ink)]">
                      {issue.title}
                    </span>
                    <div className="flex shrink-0 gap-1.5">
                      {issue.labels.slice(0, 2).map((label) => (
                        <span
                          key={label}
                          className="rounded-full border border-[color:var(--color-line)] px-2 py-0.5 font-mono text-[10px] text-[color:var(--color-faint)]"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-[14px] text-[color:var(--color-faint)]">
                  No open good-first issues right now — check back soon!
                </p>
                <a
                  href="https://github.com/datascyther/velness-ai/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-mono text-[12px] text-[color:var(--color-iris)] underline"
                >
                  View all open issues
                </a>
              </div>
            )}
          </div>
        </motion.div>

        {/* Contribution Principles */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-20"
        >
          <h2 className="mb-6 font-display text-[24px] font-normal tracking-[-0.01em] text-[color:var(--color-ink)]">
            Contribution Principles
          </h2>
          <ul className="flex flex-col gap-3">
            {[
              "We review with care, not speed.",
              "Every contribution is valued equally — whether it's a typo fix or a new feature.",
              "No contribution is too small.",
            ].map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-2xl glass-soft px-6 py-4"
              >
                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-iris)]" />
                <span className="text-[15px] text-[color:var(--color-mist)]">{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-16"
        >
          <div className="rounded-2xl glass-soft px-6 py-5 text-center">
            <p className="text-[15px] text-[color:var(--color-mist)]">
              Every contributor will be recognized in our{" "}
              <a
                href="https://github.com/datascyther/velness-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--color-iris)] underline"
              >
                README
              </a>{" "}
              and release notes.
            </p>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-[17px] font-medium text-[color:var(--color-ink)]">
            Ready to make your first contribution?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/datascyther/velness-ai/issues?q=is:issue+is:open+label:good-first-issue"
              target="_blank"
              rel="noopener noreferrer"
              className="sheen inline-flex items-center gap-2 rounded-full bg-[color:var(--color-ink)] px-5 py-3 text-[14px] font-medium text-[color:var(--color-void)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Find a Good First Issue
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M1.5 6h9m0 0L7.5 3m3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="https://github.com/datascyther/velness-ai/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass-soft px-5 py-3 text-[14px] font-medium text-[color:var(--color-ink)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Join the Discussion
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M1.5 6h9m0 0L7.5 3m3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
