import { Link } from "react-router";
import { motion } from "framer-motion";
import { ThemeToggle } from "../components/ThemeToggle";
import { Logo } from "../components/Logo";

const EASE = [0.22, 1, 0.36, 1] as const;

export function TermsPage() {
  return (
    <div className="relative min-h-screen grain flex items-center justify-center">
      <div className="aurora">
        <div className="aurora-blob" />
      </div>

      <div className="fixed right-6 top-6 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-[480px] px-6 py-20">
        <Logo to="/" className="mb-10" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] font-light leading-[1.05] tracking-[-0.025em] text-[color:var(--color-ink)]">
            Terms of Service
          </h1>
          <p className="mt-3 text-[14px] leading-[1.6] text-[color:var(--color-faint)]">
            Effective date: July 2026
          </p>

          <div className="mt-8 space-y-6 text-[15px] leading-[1.7] text-[color:var(--color-mist)]">
            <p>
              By using Velness, you agree to these terms. Velness is provided
              as-is during its private alpha phase, and we make no guarantees
              about uptime, data integrity, or feature availability.
            </p>
            <p>
              You retain full ownership of everything you write. Velness does
              not claim any rights over your journal entries or reflections.
            </p>
            <p>
              We reserve the right to modify or discontinue the service at any
              time. In the event of discontinuation, we will provide reasonable
              notice and export options for your data.
            </p>
            <p>
              These terms may be updated as the product evolves. Continued use
              after changes constitutes acceptance of the revised terms.
            </p>
          </div>

          <p className="mt-8 text-[14px] leading-[1.6] text-[color:var(--color-mist)]">
            Questions? Reach out at{" "}
            <a
              href="mailto:hello.velness@proton.me"
              className="underline underline-offset-2 text-[color:var(--color-iris)] hover:text-[color:var(--color-ink)]"
            >
              hello.velness@proton.me
            </a>
          </p>

          <Link
            to="/"
            className="mt-8 inline-block text-[14px] text-[color:var(--color-mist)] hover:text-[color:var(--color-ink)]"
          >
            ← Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
