export type Tab = "commits" | "prs" | "releases";

type TabBarProps = {
  active: Tab;
  onChange: (tab: Tab) => void;
};

const tabs: { id: Tab; label: string }[] = [
  { id: "commits", label: "Commits" },
  { id: "prs", label: "Pull Requests" },
  { id: "releases", label: "Releases" },
];

export function TabBar({ active, onChange }: TabBarProps) {
  return (
    <div className="mb-6 flex gap-6 border-b border-[color:var(--color-line)]">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`relative pb-3 font-mono text-[12px] uppercase tracking-[0.1em] transition-colors ${
            active === t.id
              ? "text-[color:var(--color-iris)]"
              : "text-[color:var(--color-faint)] hover:text-[color:var(--color-mist)]"
          }`}
        >
          {t.label}
          {active === t.id && (
            <span className="absolute bottom-0 left-0 right-0 h-px bg-[color:var(--color-iris)]" />
          )}
        </button>
      ))}
    </div>
  );
}
