import { CAN_SPEAK, speakRussian } from "../../lib/device";
import type { Card } from "../../lib/learnTypes";

interface SessionSummaryProps {
  right: number;
  wrong: number;
  missed: Card[];
  onRetry: () => void;
  onDone: () => void;
}

export function SessionSummary({ right, wrong, missed, onRetry, onDone }: SessionSummaryProps) {
  const total = right + wrong;
  const share = total > 0 ? Math.round((right / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-surface border-line flex flex-col items-center gap-1 rounded-xl border px-4 py-5">
        <span className="text-accent text-[2rem] leading-none font-bold tabular-nums">
          {share}%
        </span>
        <span className="text-muted text-[0.86rem]">
          {right} ta to‘g‘ri · {wrong} ta xato
        </span>
      </div>

      {missed.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-faint text-[0.7rem] font-bold tracking-[0.12em] uppercase">
            Qayta ko‘rish kerak
          </span>
          <div className="flex flex-col gap-1.5">
            {missed.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => CAN_SPEAK && speakRussian(card.ru)}
                className="bg-surface border-line-soft flex flex-col items-start gap-0.5 rounded-xl border px-3.5 py-2.5 text-left"
              >
                <span className="font-ru text-ink text-[0.98rem] leading-snug">{card.ru}</span>
                <span className="text-faint text-[0.8rem]">{card.note ?? card.uz}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {missed.length > 0 && (
          <button
            type="button"
            onClick={onRetry}
            className="border-line text-muted min-h-11 flex-1 rounded-xl border text-[0.88rem] font-semibold"
          >
            Xatolarni takrorlash
          </button>
        )}
        <button
          type="button"
          onClick={onDone}
          className="bg-accent border-accent text-on-accent min-h-11 flex-1 rounded-xl border text-[0.92rem] font-semibold"
        >
          Tugatdim
        </button>
      </div>
    </div>
  );
}
