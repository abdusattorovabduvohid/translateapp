import { useState } from "react";
import { checkRussian } from "../../lib/check";
import { speakRussian } from "../../lib/device";
import type { Drill } from "../../lib/drills";
import type { CheckResult, Outcome } from "../../lib/learnTypes";
import { AnswerFeedback } from "./AnswerFeedback";

interface TypingDrillProps {
  drill: Drill;
  /** Qolip mashqida faqat bo'shliq yoziladi */
  prompt?: string;
  hint?: string;
  saved: boolean;
  onToggleSave: () => void;
  onAnswer: (outcome: Outcome) => void;
  onNext: () => void;
}

export function TypingDrill({
  drill, prompt, hint, saved, onToggleSave, onAnswer, onNext,
}: TypingDrillProps) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);

  const submit = () => {
    if (result) return;
    const checked = checkRussian(value, drill.card);
    setResult(checked);
    speakRussian(drill.card.ru);
    onAnswer(checked.verdict);
  };

  const reveal = () => {
    if (result) return;
    const checked = checkRussian("", drill.card);
    setResult({ ...checked, note: "Javobni o‘qing va ovoz chiqarib takrorlang." });
    speakRussian(drill.card.ru);
    onAnswer("wrong");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-ink m-0 text-[1.14rem] leading-snug">{prompt ?? drill.card.uz}</p>
        {hint && <p className="text-faint m-0 text-[0.82rem]">{hint}</p>}
      </div>

      {!result ? (
        <>
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                submit();
              }
            }}
            lang="ru"
            inputMode="text"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            autoComplete="off"
            placeholder="Ruschasini yozing…"
            className="bg-surface border-line text-ink focus:border-accent font-ru placeholder:font-sans placeholder:text-faint min-h-12 w-full rounded-xl border px-3.5 text-[1.05rem] outline-none"
          />

          <p className="text-faint m-0 text-[0.78rem]">
            Rus klaviaturasi bo‘lmasa — lotinda yozing, o‘zim kirillga o‘giraman.
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={reveal}
              className="border-line text-muted min-h-11 rounded-xl border px-3.5 text-[0.85rem] font-semibold"
            >
              Ko‘rsatib bering
            </button>
            <button
              type="button"
              onClick={submit}
              className="bg-accent border-accent text-on-accent min-h-11 flex-1 rounded-xl border text-[0.95rem] font-semibold transition-transform active:scale-[0.97]"
            >
              Tekshirish
            </button>
          </div>
        </>
      ) : (
        <AnswerFeedback
          result={result}
          expected={drill.card.ru}
          {...(drill.card.note ? { meaning: drill.card.note } : {})}
          saved={saved}
          onToggleSave={onToggleSave}
          onNext={onNext}
        />
      )}
    </div>
  );
}
