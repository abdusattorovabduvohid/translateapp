import { useEffect, useState } from "react";
import { checkRussian } from "../../lib/check";
import { speakRussian } from "../../lib/device";
import type { Drill } from "../../lib/drills";
import type { CheckResult, Outcome } from "../../lib/learnTypes";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import { MicIcon } from "../icons";
import { AnswerFeedback } from "./AnswerFeedback";

interface SpeakDrillProps {
  drill: Drill;
  online: boolean;
  saved: boolean;
  onToggleSave: () => void;
  onAnswer: (outcome: Outcome) => void;
  onNext: () => void;
}

const RANK: Record<Outcome, number> = { right: 2, close: 1, wrong: 0 };

export function SpeakDrill({
  drill, online, saved, onToggleSave, onAnswer, onNext,
}: SpeakDrillProps) {
  const speech = useSpeechRecognition(online);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Mikrofon javobi kelganda tekshiramiz
  useEffect(() => {
    if (speech.status !== "done" || result) return;
    if (speech.alternatives.length === 0) return;

    let best = checkRussian(speech.alternatives[0]!, drill.card);
    for (const option of speech.alternatives.slice(1)) {
      const candidate = checkRussian(option, drill.card);
      if (RANK[candidate.verdict] > RANK[best.verdict]) best = candidate;
    }

    setResult(best);
    speakRussian(drill.card.ru);
    onAnswer(best.verdict);
  }, [speech.status, speech.alternatives, drill.card, result, onAnswer]);

  const selfGrade = (ok: boolean) => {
    if (result) return;
    const checked = checkRussian(ok ? drill.card.ru : "", drill.card);
    setResult({
      ...checked,
      note: ok
        ? "Yaxshi. Endi ovozni eshitib, o‘zingizni solishtiring."
        : "Ovozni eshiting va ikki marta takrorlang.",
    });
    speakRussian(drill.card.ru);
    onAnswer(ok ? "right" : "wrong");
  };

  if (result) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-ink m-0 text-[1.14rem] leading-snug">{drill.card.uz}</p>
        {speech.transcript && (
          <p className="text-muted m-0 text-[0.86rem]">
            Siz aytdingiz: <span className="font-ru">«{speech.transcript}»</span>
          </p>
        )}
        <AnswerFeedback
          result={result}
          expected={drill.card.ru}
          {...(drill.card.note ? { meaning: drill.card.note } : {})}
          saved={saved}
          onToggleSave={onToggleSave}
          onNext={onNext}
        />
      </div>
    );
  }

  const listening = speech.status === "listening";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-faint text-[0.7rem] font-bold tracking-[0.12em] uppercase">
          Ruschasini ovoz chiqarib ayting
        </span>
        <p className="text-ink m-0 text-[1.14rem] leading-snug">{drill.card.uz}</p>
      </div>

      {speech.supported && (
        <button
          type="button"
          onClick={listening ? speech.stop : speech.start}
          className={`flex min-h-14 items-center justify-center gap-2.5 rounded-2xl border text-[0.95rem] font-semibold transition-colors ${
            listening
              ? "bg-tint border-accent text-accent"
              : "bg-accent border-accent text-on-accent"
          }`}
        >
          <MicIcon className="h-5 w-5" />
          {listening ? "Eshityapman… gapiring" : "Mikrofonga ayting"}
        </button>
      )}

      {speech.error && <p className="text-muted m-0 text-[0.84rem]">{speech.error}</p>}

      {!speech.supported && !speech.error && (
        <p className="text-faint m-0 text-[0.84rem]">
          {speech.status === "offline"
            ? "Internet yo‘q — mikrofon ishlamaydi. Baland ovozda ayting va o‘zingizni tekshiring."
            : "Bu brauzerda mikrofon yo‘q. Baland ovozda ayting va o‘zingizni tekshiring."}
        </p>
      )}

      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="border-line text-muted min-h-11 rounded-xl border text-[0.88rem] font-semibold"
        >
          Aytdim — javobni ko‘rsat
        </button>
      ) : (
        <div className="bg-tint border-accent-line flex flex-col gap-3 rounded-xl border px-3.5 py-3">
          <p className="font-ru text-ink m-0 text-[1.15rem] leading-snug">{drill.card.ru}</p>
          {drill.card.note && <p className="text-faint m-0 text-[0.84rem]">{drill.card.note}</p>}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => speakRussian(drill.card.ru)}
              className="border-line text-muted min-h-10 rounded-xl border px-3.5 text-[0.85rem] font-semibold"
            >
              Eshitish
            </button>
            <button
              type="button"
              onClick={() => selfGrade(false)}
              className="border-line text-muted min-h-10 rounded-xl border px-3.5 text-[0.85rem] font-semibold"
            >
              Qiyin bo‘ldi
            </button>
            <button
              type="button"
              onClick={() => selfGrade(true)}
              className="bg-accent border-accent text-on-accent min-h-10 flex-1 rounded-xl border px-3.5 text-[0.88rem] font-semibold"
            >
              To‘g‘ri aytdim
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
