import { motion } from "framer-motion";
import { Link } from "react-router";

const EASE = [0.22, 1, 0.36, 1] as const;

const devSnapshot = [
  { label: "Current Focus", value: "Reflection Engine", accent: false },
  { label: "Transparency", value: "Built in Public", accent: true },
  { label: "Latest Milestone", value: "Journal Experience", accent: false },
  { label: "Current Phase", value: "Private Alpha", accent: false },
];

const ticker = [
  "Privacy First",
  "Built in Public",
  "Reflection",
  "Journal",
  "Encrypted",
  "AI Memory",
  "No Ads",
  "Export Anytime",
  "Human-Centered",
];

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-[1160px] px-6 pt-36 pb-24 md:pt-44 md:pb-32 lg:px-8">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-2.5 rounded-full glass-soft px-3.5 py-1.5"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11.5px] tracking-tight text-[color:var(--color-mist)]">
            Now in private alpha
          </span>
        </motion.div>

        {/* headline */}
        <h1 className="mt-9 max-w-[18ch] font-display text-[clamp(3.2rem,10vw,7.4rem)] font-light leading-[0.92] tracking-[-0.03em] text-[color:var(--color-ink)]">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.06 }}
          >
            A better relationship
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.18 }}
          >
            with{" "}
            <span className="spectrum-text font-normal italic">
              yourself.
            </span>
          </motion.span>
        </h1>

        {/* subhead */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.32 }}
          className="mt-8 max-w-[52ch] text-[17px] leading-[1.6] text-[color:var(--color-mist)] md:text-[19px]"
        >
          Velness is an AI companion for reflection and personal growth. Built
          with privacy at its core and developed in public, it transforms
          everyday conversations into lasting self-understanding instead of
          fleeting chats.
        </motion.p>

        {/* actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.44 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            to="/waitlist"
            className="sheen group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-ink)] px-5 py-3 text-[14px] font-medium text-[color:var(--color-void)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
              <path d="M2 7.5h10.5M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Join Early Access
          </Link>
          <a
            href="#roadmap"
            className="group inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-[14px] font-medium text-[color:var(--color-ink)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Explore the Roadmap
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
              <path d="M1.5 6h9m0 0L7.5 3m3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <span className="ml-1 font-mono text-[13px] text-[color:var(--color-faint)]">
            Free forever&nbsp;&nbsp;·&nbsp;&nbsp;No account required
          </span>
        </motion.div>

        {/* stats — floating glass panel */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.58 }}
          className="mt-16 overflow-hidden rounded-3xl glass md:mt-24"
        >
          {/* Card header */}
          <div className="border-b border-[color:var(--color-line)] px-6 py-3 md:px-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-faint)]">
              Development Snapshot
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4">
            {devSnapshot.map((s, i) => (
              <motion.div
                key={s.label}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                className={`group px-6 py-6 md:px-8 md:py-7 ${
                  i > 0 ? "border-l border-[color:var(--color-line)]" : ""
                } ${i >= 2 ? "border-t border-[color:var(--color-line)] md:border-t-0" : ""}`}
              >
                <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--color-faint)]">
                  {s.label}
                </div>
                <div className={`mt-2 text-[15px] font-medium md:text-[16px] ${
                  s.accent ? "text-[color:var(--color-iris)]" : "text-[color:var(--color-ink)]"
                }`}>
                  {s.value}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative select-none border-y border-[color:var(--color-line)] py-4"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--color-void)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--color-void)] to-transparent" />
        <div className="marquee-track">
          {[...ticker, ...ticker].map((t, i) => (
            <span
              key={i}
              className="mx-6 inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-faint)]"
            >
              {t}
              <span className="text-[color:var(--color-iris)]">✦</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}