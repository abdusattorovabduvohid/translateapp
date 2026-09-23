export type Mode = "translate" | "learn";

interface ModeSwitchProps {
  value: Mode;
  onChange: (mode: Mode) => void;
  /** Takrorlash kutayotgan kartalar soni */
  due: number;
}

export function ModeSwitch({ value, onChange, due }: ModeSwitchProps) {
  const items: Array<{ id: Mode; label: string; badge?: number }> = [
    { id: "translate", label: "Tarjima" },
    { id: "learn", label: "O‘rganish", ...(due > 0 ? { badge: due } : {}) },
  ];

  return (
    <div
      role="tablist"
      aria-label="Rejim"
      className="bg-surface-2 border-line grid grid-cols-2 gap-1 rounded-xl border p-1"
    >
      {items.map((item) => {
        const on = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(item.id)}
            className={`font-display inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-lg text-[0.74rem] font-medium tracking-[0.1em] uppercase transition-colors ${
              on ? "bg-surface text-ink shadow-sm" : "text-faint"
            }`}
          >
            {item.label}
            {item.badge !== undefined && (
              <b className="text-accent font-sans text-[0.72rem] font-bold tabular-nums">
                {item.badge}
              </b>
            )}
          </button>
        );
      })}
    </div>
  );
}
