export type TabId = "saved" | "book" | "history";

interface TabsProps {
  active: TabId;
  onChange: (tab: TabId) => void;
  counts: Record<TabId, number>;
}

const LABELS: Record<TabId, string> = {
  saved: "Saqlangan",
  book: "Lug‘at",
  history: "Tarix",
};

const ORDER: TabId[] = ["saved", "book", "history"];

export function Tabs({ active, onChange, counts }: TabsProps) {
  return (
    <div role="tablist" className="bg-surface-2 border-line grid grid-cols-3 gap-1 rounded-xl border p-1">
      {ORDER.map((id) => {
        const selected = id === active;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`panel-${id}`}
            onClick={() => onChange(id)}
            className={`font-display inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-lg px-1.5 text-[0.74rem] font-medium tracking-[0.1em] uppercase transition-colors ${
              selected ? "bg-surface text-ink shadow-sm" : "text-faint"
            }`}
          >
            {LABELS[id]}
            <b className="text-accent font-sans text-[0.72rem] font-bold tabular-nums">
              {counts[id]}
            </b>
          </button>
        );
      })}
    </div>
  );
}
