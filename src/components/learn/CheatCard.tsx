import type { GrammarCard } from "../../data/grammar";
import { CAN_SPEAK, speakRussian } from "../../lib/device";

interface CheatCardProps {
  card: GrammarCard;
  onDone: () => void;
}

const CYRILLIC = /[а-яё]/i;

export function CheatCard({ card, onDone }: CheatCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-ink m-0 text-[1.2rem] font-bold">{card.title}</h2>
        <p className="text-muted m-0 text-[0.92rem] leading-relaxed">{card.lead}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        {card.rows.map((row, i) => {
          const speakable = CAN_SPEAK && CYRILLIC.test(row.ru);
          return (
            <div
              key={`${row.ru}-${i}`}
              className="bg-surface border-line-soft flex flex-col gap-0.5 rounded-xl border px-3.5 py-2.5"
            >
              <div className="flex items-start gap-2">
                <span className="font-ru text-ink flex-1 text-[1rem] leading-snug font-semibold">
                  {row.ru}
                </span>
                {speakable && (
                  <button
                    type="button"
                    onClick={() => speakRussian(row.ru)}
                    aria-label="Eshitish"
                    className="text-faint shrink-0"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                      <path d="M4 9.5v5h3.4L12 18.6V5.4L7.4 9.5z" fill="currentColor" />
                      <path
                        d="M15.4 8.6a4.8 4.8 0 010 6.8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <span className="text-muted text-[0.86rem]">{row.uz}</span>
              {row.hint && <span className="text-faint text-[0.78rem]">{row.hint}</span>}
            </div>
          );
        })}
      </div>

      {card.warn && (
        <p className="bg-tint border-accent-line text-ink m-0 rounded-xl border px-3.5 py-2.5 text-[0.86rem]">
          {card.warn}
        </p>
      )}

      <button
        type="button"
        onClick={onDone}
        className="bg-accent border-accent text-on-accent min-h-12 rounded-xl border text-[0.95rem] font-semibold transition-transform active:scale-[0.97]"
      >
        Tushundim
      </button>
    </div>
  );
}
