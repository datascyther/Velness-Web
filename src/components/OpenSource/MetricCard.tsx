import { formatNumber } from "../../utils/format";

type MetricCardProps = {
  label: string;
  value: number;
};

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="flex flex-col gap-1.5 rounded-2xl glass-soft px-5 py-4">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--color-faint)]">
        {label}
      </span>
      <span className="font-display text-[22px] font-normal tracking-tight text-[color:var(--color-ink)]">
        {formatNumber(value)}
      </span>
    </div>
  );
}
