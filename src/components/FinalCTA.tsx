import { motion } from "framer-motion";
import { Link } from "react-router";
import { Reveal } from "./Reveal";

const stats = [
  { n: "100%", l: "Transparent" },
  { n: "0", l: "Data Collected" },
  { n: "∞", l: "Your Journal" },
  { n: "Free", l: "Always" },
];

export function FinalCTA() {
  return (
    <section id="download" className="relative">
      <div className="mx-auto max-w-[1160px] px-6 py-24 md:py-32 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] glass p-8 md:p-16">
          {/* inner aurora */}
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(139,123,255,0.5), transparent 70%)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(75,214,232,0.4), transparent 70%)" }}
            aria-hidden
          />

          <div className="relative">
            <Reveal>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-iris)]">
                005 — Join us
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(2.2rem,6vw,4.4rem)] font-light leading-[1.02] tracking-[-0.03em] text-[color:var(--color-ink)]">
                Start your journey.{" "}
                <span className="italic spectrum-text">Join early access.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-[52ch] text-[16px] leading-[1.65] text-[color:var(--color-mist)] md:text-[18px]">
                Velness is free to use, forever. No account required, no data
                collected, no strings attached. Just space to think.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/datascyther/velness-ai"
                  className="sheen inline-flex items-center gap-2 rounded-full bg-[color:var(--color-ink)] px-5 py-3 text-[14px] font-medium text-[color:var(--color-void)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                    <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.08-2.7-1.08-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.6 7.6 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  View source
                </a>
                <Link
                  to="/waitlist"
                  className="inline-flex items-center gap-2 rounded-full glass-soft px-5 py-3 text-[14px] font-medium text-[color:var(--color-ink)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Join Early Access
                </Link>
                <a
                  href="#docs"
                  className="inline-flex items-center gap-2 px-2 py-3 text-[14px] text-[color:var(--color-mist)] transition-colors hover:text-[color:var(--color-ink)]"
                >
                  Read the docs →
                </a>
              </div>
            </Reveal>

            <div className="mt-14 grid grid-cols-2 gap-4 border-t border-[color:var(--color-line)] pt-10 md:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <div className="font-display text-[22px] font-light tabular-nums text-[color:var(--color-ink)]">
                    {s.n}
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--color-faint)]">
                    {s.l}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
