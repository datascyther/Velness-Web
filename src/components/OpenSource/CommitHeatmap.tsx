import { motion } from "framer-motion";

type CommitHeatmapProps = {
  weeks: { days: number[]; total: number }[];
};

function getIntensity(count: number, max: number): number {
  if (count === 0 || max === 0) return 0;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

const levels = [
  "bg-[color:var(--surface)]",
  "bg-[color:var(--color-iris)]/30",
  "bg-[color:var(--color-iris)]/50",
  "bg-[color:var(--color-iris)]/70",
  "bg-[color:var(--color-iris)]/90",
];

export function CommitHeatmap({ weeks }: CommitHeatmapProps) {
  const maxPerDay = Math.max(
    ...weeks.flatMap((w) => w.days.map((d) => d)),
    1,
  );

  const cells: { level: number; key: number }[] = [];
  weeks.forEach((week) => {
    // Rotate: GitHub [Sun,Mon,Tue,Wed,Thu,Fri,Sat] → [Mon,Tue,Wed,Thu,Fri,Sat,Sun]
    const shifted = [...week.days.slice(1), week.days[0]];
    shifted.forEach((count, dayIdx) => {
      const key = dayIdx * weeks.length + cells.length;
      cells.push({ level: getIntensity(count, maxPerDay), key });
    });
  });

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div
        className="grid gap-[3px]"
        style={{
          gridTemplateColumns: `repeat(${weeks.length}, minmax(10px, 1fr))`,
          gridAutoFlow: "column",
          gridTemplateRows: "repeat(7, 10px)",
        }}
        aria-hidden
      >
        {cells.map((cell, i) => (
          <motion.span
            key={cell.key}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: (i % weeks.length) * 0.004 }}
            className={`h-[10px] w-full rounded-[3px] ${levels[cell.level]}`}
          />
        ))}
      </div>
    </div>
  );
}
