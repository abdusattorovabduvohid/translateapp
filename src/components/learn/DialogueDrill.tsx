import { useEffect, useRef, useState } from "react";
import type { Dialogue } from "../../data/dialogues";
import { checkRussian } from "../../lib/check";
import { speakRussian } from "../../lib/device";
import type { CheckResult } from "../../lib/learnTypes";

interface DialogueDrillProps {
  dialogue: Dialogue;
  onFinish: (right: number, wrong: number) => void;
  onExit: () => void;
}

export function DialogueDrill({ dialogue, onFinish, onExit }: DialogueDrillProps) {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [showMeaning, setShowMeaning] = useState(true);
  const [tally, setTally] = useState({ right: 0, wrong: 0 });
  const spoken = useRef(-1);

  const line = dialogue.lines[index];
  const finished = index >= dialogue.lines.length;

  // Qarshi tomonning gapini ovozda o'qiymiz
  useEffect(() => {
    if (!line || line.who !== "them" || spoken.current === index) return;
    spoken.current = index;
    speakRussian(line.ru);
  }, [index, line]);

  useEffect(() => {
    if (finished) onFinish(tally.right, tally.wrong);
  }, [finished, onFinish, tally]);

  if (finished) return null;
  if (!line) return null;

  const advance = () => {
    setValue("");
    setResult(null);
    setIndex((i) => i + 1);
  };

  const submit = () => {
    if (result) return;
    const checked = checkRussian(value, { ru: line.ru, ...(line.alt ? { alt: line.alt } : {}) });
    setResult(checked);
    speakRussian(line.ru);
    setTally((prev) =>
      checked.verdict === "wrong"
        ? { ...prev, wrong: prev.wrong + 1 }
        : { ...prev, right: prev.right + 1 },
    );
  };

  const help = () => {
    if (result) return;
    setResult(checkRussian("", { ru: line.ru }));
    speakRussian(line.ru);
    setTally((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
  };

  const history = dialogue.lines.slice(0, index);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-2">
        <div className="flex flex-1 flex-col gap-0.5">
          <h2 className="text-ink m-0 text-[1.05rem] font-bold">{dialogue.title}</h2>
          <p className="text-faint m-0 text-[0.82rem]">{dialogue.scene}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowMeaning((v) => !v)}
          className="text-faint shrink-0 text-[0.76rem] font-semibold underline underline-offset-[3px]"
        >
          {showMeaning ? "Ma’nosini yashirish" : "Ma’nosini ko‘rsatish"}
        </button>
      </div>

      {history.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {history.map((past, i) => (
            <div
              key={`${past.ru}-${i}`}
              className={`flex flex-col gap-0.5 rounded-xl px-3.5 py-2 ${
                past.who === "them" ? "bg-surface-2" : "bg-tint border-accent-line border"
              }`}
            >
              <span className="font-ru text-ink text-[0.95rem] leading-snug">{past.ru}</span>
              {showMeaning && <span className="text-faint text-[0.78rem]">{past.uz}</span>}
            </div>
          ))}
        </div>
      )}

      {line.who === "them" ? (
        <div className="bg-surface-2 flex flex-col gap-2 rounded-xl px-3.5 py-3">
          <span className="font-ru text-ink text-[1.05rem] leading-snug">{line.ru}</span>
          {showMeaning && <span className="text-faint text-[0.82rem]">{line.uz}</span>}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => speakRussian(line.ru)}
              className="border-line text-muted min-h-10 rounded-xl border px-3.5 text-[0.85rem] font-semibold"
            >
              Yana eshitish
            </button>
            <button
              type="button"
              onClick={advance}
              className="bg-accent border-accent text-on-accent ml-auto min-h-10 rounded-xl border px-5 text-[0.9rem] font-semibold"
            >
              Keyingi
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="border-accent-line flex flex-col gap-1 rounded-xl border border-dashed px-3.5 py-3">
            <span className="text-faint text-[0.7rem] font-bold tracking-[0.12em] uppercase">
              Sizning navbatingiz
            </span>
            <span className="text-ink text-[1rem] leading-snug">{line.uz}</span>
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
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                autoComplete="off"
                placeholder="Ruschasini yozing…"
                className="bg-surface border-line text-ink focus:border-accent font-ru placeholder:font-sans placeholder:text-faint min-h-12 w-full rounded-xl border px-3.5 text-[1.05rem] outline-none"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={help}
                  className="border-line text-muted min-h-11 rounded-xl border px-3.5 text-[0.85rem] font-semibold"
                >
                  Yordam
                </button>
                <button
                  type="button"
                  onClick={submit}
                  className="bg-accent border-accent text-on-accent min-h-11 flex-1 rounded-xl border text-[0.95rem] font-semibold"
                >
                  Aytdim
                </button>
              </div>
            </>
          ) : (
            <div className="bg-tint border-accent-line flex flex-col gap-2 rounded-xl border px-3.5 py-3">
              <span className="font-ru text-ink text-[1.05rem] leading-snug">{line.ru}</span>
              <span className="text-muted text-[0.84rem]">{result.note}</span>
              <button
                type="button"
                onClick={advance}
                className="bg-accent border-accent text-on-accent min-h-10 self-end rounded-xl border px-5 text-[0.9rem] font-semibold"
              >
                Davom etish
              </button>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={onExit}
        className="text-faint self-center text-[0.78rem] font-semibold underline underline-offset-[3px]"
      >
        Dialogdan chiqish
      </button>
    </div>
  );
}
