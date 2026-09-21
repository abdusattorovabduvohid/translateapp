import type { Direction } from "../lib/types";

interface DirectionSwitchProps {
  value: Direction;
  onChange: (direction: Direction) => void;
}

const OPTIONS: Array<{ id: Direction; label: string }> = [
  { id: "uz-ru", label: "O‘zb → Rus" },
  { id: "ru-uz", label: "Rus → O‘zb" },
];

export function DirectionSwitch({ value, onChange }: DirectionSwitchProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Tarjima yo‘nalishi"
      className="bg-surface-2 border-line grid grid-cols-2 gap-1 rounded-xl border p-1"
    >
      {OPTIONS.map((option) => {
        const on = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(option.id)}
            className={`font-display inline-flex min-h-9 items-center justify-center rounded-lg text-[0.76rem] font-medium tracking-[0.1em] uppercase transition-colors ${
              on ? "bg-surface text-ink shadow-sm" : "text-faint"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
