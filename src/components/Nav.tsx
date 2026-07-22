import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Experience", href: "#experience" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Transparency", href: "#open-source" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:px-6 md:pt-4"
    >
      <nav
        className={`mx-auto flex h-14 max-w-[1160px] items-center justify-between rounded-2xl px-4 md:px-5 transition-all duration-500 ${
          scrolled ? "glass shadow-2xl" : "border border-transparent"
        }`}
      >
        <div className="flex items-center gap-6 md:gap-8">
          <Logo size={28} />
          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative rounded-lg px-3 py-2 text-[13.5px] text-[color:var(--color-mist)] transition-colors hover:text-[color:var(--color-ink)]"
                >
                  <span className="relative z-10">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <div className="mx-1 h-4 w-px bg-[color:var(--color-line)]" />
          <a
            href="https://github.com/datascyther/velness-ai"
            className="rounded-full px-3 py-1.5 text-[13.5px] text-[color:var(--color-mist)] transition-colors hover:text-[color:var(--color-ink)]"
          >
            GitHub
          </a>
            <Link
              to="/waitlist"
              className="sheen group relative overflow-hidden rounded-full px-4 py-2 text-[13.5px] font-medium text-white"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-iris)] to-[#6c5cff]" />
              <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-[#a394ff] to-[var(--color-iris)]" />
              <span className="relative z-10">Join Early Access</span>
            </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--color-ink)] hover:bg-white/5"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M2 6h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M2 12h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden mx-auto mt-2 max-w-[1160px] rounded-2xl glass p-3"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-[15px] text-[color:var(--color-ink)] hover:bg-white/5"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-1 flex gap-2 px-1">
                <a
                  href="https://github.com/datascyther/velness-ai"
                  className="flex-1 rounded-full glass-soft py-2.5 text-center text-[14px] text-[color:var(--color-ink)]"
                >
                  GitHub
                </a>
                  <Link
                    to="/waitlist"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-full py-2.5 text-center text-[14px] font-medium text-white bg-gradient-to-r from-[var(--color-iris)] to-[#6c5cff]"
                  >
                    Join Early Access
                  </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
