import { Link } from "react-router";
import { Logo } from "./Logo";

const product = [
  { label: "Experience", href: "#experience" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
];

const community = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/velness.ai/" },
  { label: "GitHub", href: "https://github.com/datascyther/velness-ai" },
  { label: "X", href: "https://x.com/velnessai" },
  { label: "Instagram", href: "https://www.instagram.com/velness.ai" },
  { label: "Contact", href: "mailto:hello.velness@proton.me" },
];

const legal = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
];

export function Footer() {
  return (
    <footer className="relative">
      <div className="mx-auto max-w-[1160px] px-6 lg:px-8">
        <div className="divider" />
      </div>

      <div className="mx-auto max-w-[1160px] px-6 py-16 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex flex-col items-start gap-4">
              <Logo size={28} />
              <div className="inline-flex items-center gap-2 font-mono text-[12px] text-[color:var(--color-mist)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Private Alpha
              </div>
            </div>
            <p className="mt-6 max-w-[40ch] text-[14.5px] leading-[1.65] text-[color:var(--color-mist)]">
              Built for people who want to understand themselves through honest
              reflection, lasting continuity, and intentional growth.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-faint)]">
              Product
            </div>
            <ul className="mt-5 space-y-3">
              {product.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[14px] text-[color:var(--color-ink)] transition-colors hover:text-[color:var(--color-iris)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-faint)]">
              Community
            </div>
            <ul className="mt-5 space-y-3">
              {community.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[14px] text-[color:var(--color-ink)] transition-colors hover:text-[color:var(--color-iris)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-faint)]">
              Legal
            </div>
            <ul className="mt-5 space-y-3">
              {legal.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-[14px] text-[color:var(--color-ink)] transition-colors hover:text-[color:var(--color-iris)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <div className="divider" />
        </div>

        <p className="py-12 text-center font-display text-[clamp(1.6rem,3vw,2.2rem)] font-light tracking-[-0.025em] text-[color:var(--color-ink)]">
          Your story deserves to be remembered.
        </p>

        <div className="divider" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[color:var(--color-line)] pt-6 font-mono text-[12px] text-[color:var(--color-faint)]">
          <div>© 2026 Velness. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>Built in public</span>
            <span>·</span>
            <span>Private Alpha</span>
            <span>·</span>
            <span>v0.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
