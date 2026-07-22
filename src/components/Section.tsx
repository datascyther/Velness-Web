import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`relative ${className}`}>
      <div className="mx-auto max-w-[1160px] px-6 py-24 md:py-36 lg:px-8">
        {(eyebrow || title || intro) && (
          <div className="mb-16 grid grid-cols-1 gap-8 md:mb-24 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-3">
              {eyebrow && (
                <Reveal>
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-iris)]">
                    {eyebrow}
                  </div>
                </Reveal>
              )}
            </div>
            <div className="md:col-span-9">
              {title && (
                <Reveal>
                  <h2 className="max-w-[22ch] font-display text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.02] tracking-[-0.025em] text-[color:var(--color-ink)]">
                    {title}
                  </h2>
                </Reveal>
              )}
              {intro && (
                <Reveal delay={0.08}>
                  <div className="mt-7 max-w-[58ch] text-[16px] leading-[1.65] text-[color:var(--color-mist)] md:text-[18px]">
                    {intro}
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function SectionDivider() {
  return (
    <div className="mx-auto max-w-[1160px] px-6 lg:px-8">
      <div className="divider" />
    </div>
  );
}
