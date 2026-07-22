import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const features = [
  {
    n: "01",
    title: "Understand Yourself",
    body: "Write freely, return often, discover patterns you may not see alone. Velness remembers every reflection, helping you recognize emotional rhythms, recurring themes, and the quiet moments that quietly shape who you are becoming.",
  },
  {
    n: "02",
    title: "Grow Intentionally",
    body: "Small, gentle practices that grow with you — not against you. No streaks to maintain, no guilt for missing a day. Just a calm rhythm that respects your life as it is.",
  },
  {
    n: "03",
    title: "Reflect with Depth",
    body: "Thoughtful conversation, not quick answers. Velness asks the kind of questions a careful listener asks — helping you sit with complexity instead of rushing past it.",
  },
  {
    n: "04",
    title: "Grow Over Time",
    body: "Every entry becomes part of a longer story. Weeks become months become years — and slowly, you begin to see the shape of your own growth with a clarity that only comes with time.",
  },
];

export function Features() {
  return (
    <section id="experience" className="relative">
      <div className="mx-auto max-w-[1160px] px-6 py-24 md:py-36 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-8 md:mb-24 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <Reveal>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-iris)]">
                002 — What it does
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="max-w-[22ch] font-display text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.02] tracking-[-0.025em] text-[color:var(--color-ink)]">
                Four ways to grow{" "}
                <span className="italic iris-text">with intention.</span>
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {features.map((f, i) => (
            <motion.article
              key={f.n}
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
              whileHover={{ y: -6 }}
              className="sheen group relative overflow-hidden rounded-3xl glass p-8 md:p-10"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, rgba(139,123,255,0.45), transparent 70%)",
                }}
              />
              <div className="relative flex items-baseline justify-between">
                <span className="font-mono text-[12px] tabular-nums text-[color:var(--color-faint)]">
                  {f.n}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--color-line)] text-[color:var(--color-faint)] transition-all duration-500 group-hover:border-[color:var(--color-iris)] group-hover:text-[color:var(--color-iris)] group-hover:shadow-[0_0_22px_-4px_var(--color-iris)]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-500 group-hover:-rotate-45" aria-hidden>
                    <path d="M2 10L10 2M10 2H4.5M10 2v5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <h3 className="relative mt-8 font-display text-[26px] font-normal leading-[1.1] tracking-[-0.02em] text-[color:var(--color-ink)] md:text-[30px]">
                {f.title}
              </h3>
              <p className="relative mt-4 max-w-[46ch] text-[15px] leading-[1.65] text-[color:var(--color-mist)]">
                {f.body}
              </p>
            </motion.article>
          ))}
        </div>
        <div className="mt-16 text-center md:mt-20">
          <p className="max-w-[48ch] mx-auto text-[14px] leading-[1.6] text-[color:var(--color-faint)] tracking-tight">
            Every experience builds on the one before it —
            together, they become a personal journey of reflection and growth.
          </p>
        </div>
      </div>
    </section>
  );
}
