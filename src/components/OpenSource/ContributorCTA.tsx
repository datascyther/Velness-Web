import { Link } from "react-router";

export function ContributorCTA() {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
      <Link
        to="/contribute"
        className="sheen inline-flex items-center gap-2 rounded-full bg-[color:var(--color-ink)] px-5 py-3 text-[14px] font-medium text-[color:var(--color-void)] transition-transform duration-300 hover:-translate-y-0.5"
      >
        Become a Contributor
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2 10L10 2M10 2H4.5M10 2v5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <a
        href="https://github.com/datascyther/velness-ai/issues?q=is:issue+is:open+label:good-first-issue"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full glass-soft px-5 py-3 text-[14px] font-medium text-[color:var(--color-ink)] transition-transform duration-300 hover:-translate-y-0.5"
      >
        Good First Issues
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
  );
}
