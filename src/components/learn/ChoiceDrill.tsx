import { useState } from "react";
import type { Drill } from "../../lib/drills";
import type { Outcome } from "../../lib/learnTypes";
import { CAN_SPEAK, speakRussian } from "../../lib/device";

interface ChoiceDrillProps {
  drill: Drill;
  /** Eshitish mashqi bo'lsa — savol o'rniga ovoz beriladi */
  listening?: boolean;
  onAnswer: (outcome: Outcome) => void;
  onNext: () => void;
}

export function ChoiceDrill({ drill, listening = false, onAnswer, onNext }: ChoiceDrillProps) {
  const [chosen, setChosen] = useState<number | null>(null);
  const options = drill.options ?? [];
  const answer = drill.answer ?? 0;
  const done = chosen !== null;

  const choose = (index: number) => {
    if (done) return;
    setChosen(index);
    const outcome: Outcome = index === answer ? "right" : "wrong";
    if (outcome === "right" && !listening) speakRussian(drill.card.ru);
    onAnswer(outcome);
  };

  return (
    <div className="flex flex-col gap-4">
      {listening ? (
        <div className="flex flex-col items-center gap-2 py-2">
          <button
            type="button"
            onClick={() => speakRussian(drill.card.ru)}
            className="bg-accent text-on-accent flex h-16 w-16 items-center justify-center rounded-2xl transition-transform active:scale-[0.97]"
            aria-label="Yana eshitish"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
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
          <span className="text-faint text-[0.8rem]">Eshitilgan gapning ma’nosini tanlang</span>
        </div>
      ) : (
        <p className="text-ink m-0 text-[1.14rem] leading-snug">{drill.card.uz}</p>
      )}

      <div className="flex flex-col gap-2">
        {options.map((option, index) => {
          const isAnswer = index === answer;
          const picked = index === chosen;
          const tone = !done
            ? "bg-surface border-line text-ink"
            : isAnswer
              ? "bg-tint border-accent text-ink"
              : picked
                ? "bg-surface border-line text-faint line-through"
                : "bg-surface border-line-soft text-faint";

          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(index)}
              disabled={done}
              className={`min-h-[52px] rounded-xl border px-3.5 py-2 text-left transition-colors ${tone} ${
                listening ? "" : "font-ru"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {done && (
        <div className="flex items-center gap-2">
          {!listening && drill.card.note && (
            <span className="text-faint text-[0.84rem]">{drill.card.note}</span>
          )}
          {listening && CAN_SPEAK && (
            <span className="font-ru text-faint text-[0.9rem]">{drill.card.ru}</span>
          )}
          <button
            type="button"
            onClick={onNext}
            className="bg-accent border-accent text-on-accent ml-auto min-h-10 rounded-xl border px-5 text-[0.9rem] font-semibold transition-transform active:scale-[0.97]"
          >
            Keyingi
          </button>
        </div>
      )}
    </div>
  );
}
