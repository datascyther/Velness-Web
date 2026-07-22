import type { ReactNode } from "react";

type GlassCardProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export function GlassCard({ title, description, children }: GlassCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl glass p-8 md:p-12">
      {(title || description) && (
        <div className="mb-8">
          {title && (
            <h3 className="font-display text-[28px] font-normal tracking-[-0.01em] text-[color:var(--color-ink)]">
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-3 max-w-xl text-[15px] text-[color:var(--color-mist)]">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
