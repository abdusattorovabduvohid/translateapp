import { ActionButton } from "../ActionButton";
import { SpeakerIcon, StarIcon } from "../icons";
import { speakRussian, CAN_SPEAK } from "../../lib/device";
import type { CheckResult, Outcome } from "../../lib/learnTypes";

interface AnswerFeedbackProps {
  result: CheckResult;
  /** To'g'ri javob — har doim to'liq ko'rsatiladi */
  expected: string;
  /** Ruscha gapning o'zbekcha ma'nosi */
  meaning?: string;
  saved: boolean;
  onToggleSave: () => void;
  onNext: () => void;
}

const VERDICT: Record<Outcome, { label: string; tone: string }> = {
  right: { label: "To‘g‘ri", tone: "text-ok" },
  close: { label: "Deyarli", tone: "text-accent" },
  wrong: { label: "Hali emas", tone: "text-muted" },
};

export function AnswerFeedback({
  result, expected, meaning, saved, onToggleSave, onNext,
}: AnswerFeedbackProps) {
  const verdict = VERDICT[result.verdict];
  const extras = result.diff.filter((part) => part.state === "extra");

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-tint border-accent-line flex flex-col gap-2 rounded-xl border px-3.5 py-3">
        <span className={`text-[0.7rem] font-bold tracking-[0.12em] uppercase ${verdict.tone}`}>
          {verdict.label}
        </span>

        <p className="font-ru m-0 text-[1.15rem] leading-snug wrap-break-word">
          {result.diff
            .filter((part) => part.state !== "extra")
            .map((part, i) => (
              <span
                key={`${part.text}-${i}`}
                className={
                  part.state === "same"
                    ? "text-ink"
                    : "text-accent decoration-accent-line underline decoration-2 underline-offset-4"
                }
              >
                {part.text}{" "}
              </span>
            ))}
        </p>

        {meaning && <p className="text-faint m-0 text-[0.84rem]">{meaning}</p>}

        {result.typed && result.verdict !== "right" && (
          <p className="text-muted m-0 text-[0.84rem]">
            Siz: <span className="font-ru">{result.typed}</span>
            {extras.length > 0 && (
              <span className="text-faint">
                {" "}
                — ortiqcha:{" "}
                {extras.map((part, i) => (
                  <s key={`extra-${i}`} className="font-ru">
                    {part.text}{" "}
                  </s>
                ))}
              </span>
            )}
          </p>
        )}

        <p className="text-muted m-0 text-[0.84rem]">{result.note}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {CAN_SPEAK && (
          <ActionButton onClick={() => speakRussian(expected)} title="Eshitish">
            <SpeakerIcon />
            Eshitish
          </ActionButton>
        )}
        <ActionButton onClick={onToggleSave} active={saved} pressed={saved} title="Saqlab qo‘yish">
          <StarIcon filled={saved} />
          {saved ? "Saqlandi" : "Saqlash"}
        </ActionButton>
        <button
          type="button"
          onClick={onNext}
          className="bg-accent border-accent text-on-accent ml-auto min-h-10 rounded-xl border px-5 text-[0.9rem] font-semibold transition-transform active:scale-[0.97]"
        >
          Keyingi
        </button>
      </div>
    </div>
  );
}
