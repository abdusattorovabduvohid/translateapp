import { patternById } from "../../data/patterns";
import type { Drill } from "../../lib/drills";
import type { Outcome } from "../../lib/learnTypes";
import { TypingDrill } from "./TypingDrill";

interface PatternDrillProps {
  drill: Drill;
  /** Necha marta to'g'ri javob berilgan — 3 tadan keyin to'liq gap so'raladi */
  solved: number;
  saved: boolean;
  onToggleSave: () => void;
  onAnswer: (outcome: Outcome) => void;
  onNext: () => void;
}

export function PatternDrill({
  drill, solved, saved, onToggleSave, onAnswer, onNext,
}: PatternDrillProps) {
  const pattern = patternById(drill.card.group);
  const full = solved >= 3 || !pattern;

  return (
    <div className="flex flex-col gap-4">
      {pattern && (
        <div className="bg-surface-2 border-line flex flex-col gap-1.5 rounded-xl border px-3.5 py-3">
          <p className="font-ru text-ink m-0 text-[1.05rem] font-semibold">
            {pattern.frame.split("___").map((chunk, i, all) => (
              <span key={i}>
                {chunk}
                {i < all.length - 1 && (
                  <span className="bg-tint border-accent-line text-accent mx-1 rounded-md border px-2 py-0.5 text-[0.9rem]">
                    ___
                  </span>
                )}
              </span>
            ))}
          </p>
          <p className="text-muted m-0 text-[0.86rem]">{pattern.uz}</p>
          <p className="text-faint m-0 text-[0.8rem]">{pattern.rule}</p>
        </div>
      )}

      <TypingDrill
        drill={full ? drill : { ...drill, card: fillCard(drill, pattern?.frame ?? "") }}
        {...(full ? {} : { hint: "Faqat bo‘shliqqa tushadigan qismni yozing" })}
        saved={saved}
        onToggleSave={onToggleSave}
        onAnswer={onAnswer}
        onNext={onNext}
      />
    </div>
  );
}

/** Qolipning faqat bo'shliq qismini so'raydigan karta */
function fillCard(drill: Drill, frame: string): Drill["card"] {
  const pattern = patternById(drill.card.group);
  const index = Number(drill.card.id.split(":").pop() ?? 0);
  const slot = pattern?.slots[index];
  if (!slot) return drill.card;

  return {
    ...drill.card,
    ru: slot.fill,
    ...(slot.alt ? { alt: slot.alt } : {}),
    note: frame.replace("___", slot.fill),
  };
}
