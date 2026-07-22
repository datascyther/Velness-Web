import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ThemeToggle } from "../components/ThemeToggle";
import { Logo } from "../components/Logo";

const EASE = [0.22, 1, 0.36, 1] as const;

export function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative min-h-screen grain flex items-center justify-center">
      <div className="aurora">
        <div className="aurora-blob" />
      </div>

      <div className="fixed right-6 top-6 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-[480px] px-6">
        <Logo to="/" className="mb-10" />

        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] font-light leading-[1.05] tracking-[-0.025em] text-[color:var(--color-ink)]">
              Become a Founding Member
            </h1>
            <p className="mt-4 text-[15px] leading-[1.65] text-[color:var(--color-mist)]">
              Velness is currently in private development.
            </p>
            <p className="mt-3 text-[15px] leading-[1.65] text-[color:var(--color-mist)]">
              We're building an AI companion focused on reflection, emotional
              wellbeing, and long-term personal growth.
            </p>
            <p className="mt-5 text-[15px] leading-[1.65] text-[color:var(--color-mist)]">
              Join our founding members and get:
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                "Early access before launch",
                "Behind-the-scenes updates",
                "Ability to shape the product",
                "Exclusive beta invitations",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[15px] text-[color:var(--color-ink)]"
                >
                  <span className="mt-0.5 text-[color:var(--color-iris)]">
                    ✔
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-8 space-y-3"
            >
              <input
                type="text"
                name="name"
                required
                placeholder="Name"
                className="w-full rounded-xl border border-[color:var(--color-line)] bg-[color:var(--surface)] px-4 py-3 text-[15px] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-faint)] outline-none transition-colors focus:border-[color:var(--color-iris)]"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="w-full rounded-xl border border-[color:var(--color-line)] bg-[color:var(--surface)] px-4 py-3 text-[15px] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-faint)] outline-none transition-colors focus:border-[color:var(--color-iris)]"
              />
              <button
                type="submit"
                className="sheen w-full rounded-full bg-[color:var(--color-ink)] px-5 py-3 text-[14px] font-medium text-[color:var(--color-void)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Become a Founding Member
              </button>
            </form>

            <Link
              to="/"
              className="mt-6 inline-block text-[14px] text-[color:var(--color-mist)] hover:text-[color:var(--color-ink)]"
            >
              ← Back to home
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center"
          >
            <div className="text-[48px]">🎉</div>
            <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.2rem)] font-light leading-[1.05] tracking-[-0.025em] text-[color:var(--color-ink)]">
              You're officially on the waitlist.
            </h1>
            <p className="mt-6 text-[16px] leading-[1.65] text-[color:var(--color-mist)]">
              Welcome to the first generation of Velness users. We'll only
              email you when there's something genuinely worth sharing.
            </p>
            <p className="mt-3 text-[16px] leading-[1.65] text-[color:var(--color-mist)]">
              See you soon.
            </p>
            <Link
              to="/"
              className="sheen mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-ink)] px-6 py-3 text-[14px] font-medium text-[color:var(--color-void)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Return Home
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
