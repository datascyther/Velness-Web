import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

type Status = "done" | "current" | "next";

const items: {
  version: string;
  date: string;
  status: Status;
  title: string;
  notes: string[];
}[] = [
  {
    version: "v0.5",
    date: "Oct 2025",
    status: "done",
    title: "Foundations",
    notes: [
      "Local-first architecture",
      "Core reflection engine",
      "Private storage",
    ],
  },
  {
    version: "v0.7",
    date: "Jan 2026",
    status: "done",
    title: "Refinement",
    notes: [
      "Guided journaling",
      "Pattern discovery",
      "Feedback integration",
    ],
  },
  {
    version: "v0.9",
    date: "Now",
    status: "current",
    title: "Early access",
    notes: [
      "Public development",
      "Weekly reflection cycles",
      "Contextual memory",
    ],
  },
  {
    version: "v1.0",
    date: "Q3 2026",
    status: "next",
    title: "Longevity",
    notes: [
      "Long-term insights",
      "Cross-device continuity",
      "Portable history",
    ],
  },
  {
    version: "v1.x",
    date: "Later",
    status: "next",
    title: "Community",
    notes: [
      "Shared product decisions",
      "Community priorities",
      "New reflection paths",
    ],
  },
];

const statusLabel: Record<Status, string> = {
  done: "Shipped",
  current: "In progress",
  next: "Planned",
};

const statusStyles: Record<Status, { dot: string; ring: string; badge: string }> = {
  done: {
    dot: "bg-[color:var(--color-ink)]",
    ring: "ring-white/20",
    badge: "text-[color:var(--color-faint)] border-[color:var(--color-line-strong)]",
  },
  current: {
    dot: "bg-emerald-400 shadow-[0_0_18px_-2px_#34d399]",
    ring: "ring-emerald-400/40",
    badge: "text-emerald-300 border-emerald-400/30 bg-emerald-400/5",
  },
  next: {
    dot: "bg-white/25",
    ring: "ring-white/10",
    badge: "text-[color:var(--color-faint)] border-[color:var(--color-line)]",
  },
};

export function Roadmap() {
  return (
    <section id="roadmap" className="relative">
      <div className="mx-auto max-w-[1160px] px-6 py-24 md:py-36 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-8 md:mb-20 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <Reveal>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-iris)]">
                005 — Roadmap
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="max-w-[22ch] font-display text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.02] tracking-[-0.025em] text-[color:var(--color-ink)]">
                Where we're going,{" "}
                <span className="italic spectrum-text">together.</span>
              </h2>
            </Reveal>
          </div>
        </div>

        <ol className="relative">
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[color:var(--color-line-strong)] via-[color:var(--color-iris)]/30 to-transparent md:left-[calc(25%+7px)]"
            aria-hidden
          />
          {items.map((it, i) => {
            const st = statusStyles[it.status];
            return (
              <motion.li
                key={it.version}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                className="relative border-b border-[color:var(--color-line)] py-6 pl-8 last:border-0 md:grid md:grid-cols-12 md:gap-10 md:py-8 md:pl-0"
              >
                <div className="flex items-center gap-3 md:col-span-3 md:justify-start">
                  <span
                    className={`absolute left-0 top-8 h-[15px] w-[15px] rounded-full ring-4 ring-[color:var(--color-void)] md:left-[25%] md:top-1/2 md:-translate-y-1/2 ${st.dot}`}
                    aria-hidden
                  />
                  <div className="md:pl-8">
                    <div className="font-mono text-[13px] text-[color:var(--color-ink)]">{it.version}</div>
                    <div className="font-mono text-[12px] text-[color:var(--color-faint)]">{it.date}</div>
                  </div>
                </div>
                <div className="mt-3 flex flex-col gap-3 md:col-span-9 md:mt-0 md:flex-row md:items-baseline md:gap-8">
                  <div className="md:flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-[20px] font-normal tracking-[-0.015em] text-[color:var(--color-ink)] md:text-[23px]">
                        {it.title}
                      </h3>
                      <span
                        className={`rounded-full border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] ${st.badge}`}
                      >
                        {statusLabel[it.status]}
                      </span>
                    </div>
                    <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5 text-[13px]">
                      {it.notes.map((n) => (
                        <li
                          key={n}
                          className="rounded-full bg-[color:var(--surface)] px-2.5 py-0.5 text-[color:var(--color-mist)]"
                        >
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
