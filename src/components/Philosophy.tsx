import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const principles = [
  {
    t: "Privacy First",
    d: "Privacy is a design principle, not a feature added later. Every part of Velness is built with the assumption that your reflections are not data to collect.",
  },
  {
    t: "Built in Public",
    d: "We share progress, decisions, and product evolution openly. Trust is earned through transparency — not through marketing claims.",
  },
  {
    t: "Calm by Design",
    d: "No streaks. No pressure. No endless reminders. A quiet space where you can think, reflect, and return only when you want to.",
  },
  {
    t: "Built for the Long Term",
    d: "Your reflections are preserved across months and years, creating a continuous record that lets you see yourself more clearly over time.",
  },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="relative">
      <div className="mx-auto max-w-[1160px] px-6 py-28 md:py-40 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <Reveal>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-iris)]">
                001 — Philosophy
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="max-w-[24ch] font-display text-[clamp(1.9rem,4.6vw,3.2rem)] font-light leading-[1.1] tracking-[-0.02em] text-[color:var(--color-ink)]">
                Most apps compete for your{" "}
                <span className="italic spectrum-text">attention.</span>
                <br />
                Velness helps you{" "}
                <span className="italic spectrum-text">understand it.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-8 max-w-[58ch] text-[15px] leading-[1.7] text-[color:var(--color-mist)] md:text-[16px]">
                Modern software is engineered for attention: endless notifications,
                engagement loops, and streaks that turn growth into performance.
                Velness takes the opposite approach. It combines a private journal,
                long-term memory, and calm reflection to help you observe patterns,
                sit with complexity, and grow on your own timeline.
              </p>
            </Reveal>

            <div className="mt-16 grid max-w-[64ch] grid-cols-1 gap-3 sm:grid-cols-2 md:mt-20">
              {principles.map((p, i) => (
                <motion.div
                  key={p.t}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="sheen group rounded-2xl glass-soft p-6 transition-colors hover:border-[color:var(--color-line-strong)]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[var(--color-iris)] to-[var(--color-cyan)]" />
                    <div className="text-[14px] font-medium text-[color:var(--color-ink)]">
                      {p.t}
                    </div>
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.65] text-[color:var(--color-mist)]">
                    {p.d}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
