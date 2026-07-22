import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "Is Velness really free?",
    a: "Yes. Velness is free to use, forever. No premium tier, no subscription, no 'pro' version. We believe everyone deserves access to a private space for reflection.",
  },
  {
    q: "Can I use Velness without creating an account?",
    a: "Absolutely. Download the app, install it, and start writing. No email, no phone number, no Google account required. Your journal is stored locally on your device.",
  },
  {
    q: "Is my journal data private?",
    a: "Yes. Your journal entries are encrypted on your device using industry-standard encryption. We cannot read them, period. If you enable sync, it's end-to-end encrypted — only you can decrypt your data.",
  },
  {
    q: "Will Velness share my data with third parties?",
    a: "Never. We don't sell data, share data, or use your journal entries for anything — including training AI models. Your reflections are yours.",
  },
  {
    q: "Is Velness a replacement for therapy?",
    a: "No. Velness is a reflective tool, not a clinician. It can help you process thoughts and notice patterns, but it's not designed to replace professional mental health support.",
  },
  {
    q: "What happens if Velness shuts down?",
    a: "Your data stays yours. You can export your entire journal anytime as plain text, JSON, or markdown. If we ever have to shut down, we'll give everyone plenty of notice and help you export your data first.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative">
      <div className="mx-auto max-w-[1160px] px-6 py-24 md:py-36 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <Reveal>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-iris)]">
                006 — Questions
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="max-w-[22ch] font-display text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.02] tracking-[-0.025em] text-[color:var(--color-ink)]">
                Questions we get{" "}
                <span className="italic iris-text">often.</span>
              </h2>
            </Reveal>

            <div className="mt-12 space-y-3">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <motion.div
                    key={f.q}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                    className={`overflow-hidden rounded-2xl transition-colors ${
                      isOpen ? "glass" : "glass-soft"
                    }`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-start justify-between gap-8 px-6 py-5 text-left md:px-7 md:py-6"
                      aria-expanded={isOpen}
                    >
                      <span className="pr-4 text-[16px] font-medium tracking-[-0.01em] text-[color:var(--color-ink)] md:text-[18px]">
                        {f.q}
                      </span>
                      <span
                        className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[color:var(--color-line)] text-[color:var(--color-mist)] transition-all duration-300 ${
                          isOpen ? "rotate-45 border-[color:var(--color-iris)] text-[color:var(--color-iris)]" : ""
                        }`}
                        aria-hidden
                      >
                        <svg width="12" height="12" viewBox="0 0 16 16">
                          <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[62ch] px-6 pb-6 text-[15px] leading-[1.7] text-[color:var(--color-mist)] md:px-7">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
