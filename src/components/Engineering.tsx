import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const stack = [
  {
    name: "Reflection",
    detail: "Where everything begins",
    why: "A quiet space to write without judgment. Prompts guide you gently when you need direction, step aside when you don't.",
  },
  {
    name: "Private journal",
    detail: "Yours and only yours",
    why: "Everything you write stays on your device. No one at Velness can read it, access it, or use it. Full stop.",
  },
  {
    name: "AI memory",
    detail: "Context that carries forward",
    why: "Velness remembers what you've shared over time, so conversations feel continuous — not like starting over every session.",
  },
  {
    name: "Emotional patterns",
    detail: "Insight without analysis",
    why: "Over weeks and months, recurring themes and emotional rhythms become visible. Not as metrics — as gentle observations.",
  },
  {
    name: "Timeline",
    detail: "Your story, in order",
    why: "Every entry becomes a moment in a longer arc. Scroll back through months and see how your thinking has shifted.",
  },
  {
    name: "Growth insights",
    detail: "Clarity that accumulates",
    why: "Optional weekly and monthly reflections help you surface what matters, without scores, graphs, or pressure to improve.",
  },
];

export function Engineering() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1160px] px-6 py-24 md:py-36 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <Reveal>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-iris)]">
                004 — Architecture & Community
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="max-w-[24ch] font-display text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.02] tracking-[-0.025em] text-[color:var(--color-ink)]">
                Built with care.{" "}
                <span className="italic iris-text">Shaped by people.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 max-w-[62ch] text-[16px] leading-[1.65] text-[color:var(--color-mist)] md:text-[18px]">
                Six systems work together quietly beneath Velness — each one
                serving a single purpose, each one designed around your
                privacy. Below is how they fit together, and how you can
                help shape what comes next.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Tech principles */}
        <div className="mt-16 grid grid-cols-1 gap-3 md:mt-24 md:grid-cols-2">
          {stack.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.06 }}
              whileHover={{ y: -4 }}
              className="sheen group rounded-2xl glass-soft p-6 transition-colors hover:border-[color:var(--color-line-strong)]"
            >
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-[15.5px] font-medium tracking-tight text-[color:var(--color-ink)]">
                  {s.name}
                </div>
              </div>
              <div className="mt-1 font-mono text-[11px] text-[color:var(--color-iris)]">
                {s.detail}
              </div>
              <p className="mt-4 text-[14px] leading-[1.65] text-[color:var(--color-mist)]">
                {s.why}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Privacy guarantee card */}
        <Reveal delay={0.05}>
          <div className="mt-16 overflow-hidden rounded-3xl glass md:mt-20">
            <div className="border-b border-[color:var(--color-line)] p-8 md:p-10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-400"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <div className="text-[18px] font-medium text-[color:var(--color-ink)]">
                    Join the community
                  </div>
                  <div className="text-[14px] text-[color:var(--color-mist)]">
                    Velness grows through the people who use it. You don't need
                    to write code to help shape where it goes next.
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-3 md:p-10">
              {[
                {
                  t: "Share your experience",
                  d: "Tell us what works, what doesn't, and what you wish existed. Every piece of honest feedback shapes a future update.",
                },
                {
                  t: "Vote on what's next",
                  d: "The roadmap is public and open to input. If something matters to you, say so. Your priorities influence ours.",
                },
                {
                  t: "Become an early tester",
                  d: "Early access members try new features before anyone else and help us decide whether they're ready. No technical experience needed.",
                },
              ].map((item) => (
                <div key={item.t}>
                  <div className="text-[15px] font-medium text-[color:var(--color-ink)]">
                    {item.t}
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--color-mist)]">
                    {item.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
