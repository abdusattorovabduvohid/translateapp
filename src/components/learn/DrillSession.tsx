import { useCallback, useMemo, useRef, useState } from "react";
import type { LearnStep } from "../../data/curriculum";
import { dialogueById } from "../../data/dialogues";
import { grammarById } from "../../data/grammar";
import type { SrsApi } from "../../hooks/useSrs";
import { buildQueue, requeue, type Drill } from "../../lib/drills";
import type { Card, Outcome } from "../../lib/learnTypes";
import { makeRng, seedFrom, shuffle } from "../../lib/rng";
import { dayKey } from "../../lib/srs";
import { cardsOf, kindsFor, reviewCards } from "../../lib/steps";
import { CheatCard } from "./CheatCard";
import { ChoiceDrill } from "./ChoiceDrill";
import { DialogueDrill } from "./DialogueDrill";
import { PatternDrill } from "./PatternDrill";
import { SessionSummary } from "./SessionSummary";
import { SpeakDrill } from "./SpeakDrill";
import { TypingDrill } from "./TypingDrill";

interface DrillSessionProps {
  step: LearnStep;
  online: boolean;
  srs: SrsApi;
  isSaved: (ru: string) => boolean;
  onToggleSave: (ru: string, uz: string) => void;
  onFinish: (right: number, wrong: number) => void;
  onExit: () => void;
}

export function DrillSession({
  step, online, srs, isSaved, onToggleSave, onFinish, onExit,
}: DrillSessionProps) {
  const rng = useRef(makeRng(seedFrom(step.id + dayKey(Date.now()))));

  const pool = useMemo<Card[]>(() => {
    if (step.kind === "review") {
      const weak = srs.weak(step.size || 40);
      return reviewCards(weak, step.size);
    }
    const all = cardsOf(step);
    if (step.size <= 0 || all.length <= step.size) return all;
    return shuffle(all, rng.current).slice(0, step.size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const [queue, setQueue] = useState<Drill[]>(() =>
    buildQueue(pool, kindsFor(step.kind), rng.current),
  );
  const [index, setIndex] = useState(0);
  const [tally, setTally] = useState({ right: 0, wrong: 0 });
  const [missed, setMissed] = useState<Card[]>([]);
  const [solvedInPattern, setSolvedInPattern] = useState(0);

  const drill = queue[index];
  const done = !drill;

  const answer = useCallback(
    (outcome: Outcome) => {
      const current = queue[index];
      if (!current) return;

      srs.grade(current.card.id, outcome);
      setTally((prev) =>
        outcome === "wrong"
          ? { ...prev, wrong: prev.wrong + 1 }
          : { ...prev, right: prev.right + 1 },
      );
      if (outcome === "wrong") {
        setMissed((prev) =>
          prev.some((c) => c.id === current.card.id) ? prev : [...prev, current.card],
        );
      } else if (current.kind === "pattern") {
        setSolvedInPattern((n) => n + 1);
      }
      setQueue((prev) => requeue(prev, index, current, outcome, pool, rng.current));
    },
    [index, pool, queue, srs],
  );

  const next = useCallback(() => setIndex((i) => i + 1), []);

  // --- Grammatika kartasi: navbat yo'q ---
  if (step.kind === "cheat") {
    const card = step.grammar ? grammarById(step.grammar) : undefined;
    if (!card) return <Missing onExit={onExit} />;
    return (
      <Frame title={step.title} onExit={onExit}>
        <CheatCard card={card} onDone={() => onFinish(1, 0)} />
      </Frame>
    );
  }

  // --- Dialog: o'z holati bor ---
  if (step.kind === "dialogue") {
    const dialogue = step.dialogue ? dialogueById(step.dialogue) : undefined;
    if (!dialogue) return <Missing onExit={onExit} />;
    return (
      <Frame title={step.title} onExit={onExit}>
        <DialogueDrill dialogue={dialogue} onFinish={onFinish} onExit={onExit} />
      </Frame>
    );
  }

  if (queue.length === 0) {
    return (
      <Frame title={step.title} onExit={onExit}>
        <div className="border-line text-faint flex flex-col gap-2 rounded-xl border border-dashed px-4 py-6 text-center text-[0.88rem]">
          <b className="text-muted text-[0.92rem]">Hozircha takrorlash yo‘q</b>
          <span>Avvalgi kunlarning mashqlarini bajaring — qiyin kartalar shu yerga tushadi.</span>
        </div>
        <button
          type="button"
          onClick={() => onFinish(0, 0)}
          className="bg-accent border-accent text-on-accent min-h-11 rounded-xl border text-[0.92rem] font-semibold"
        >
          Yopish
        </button>
      </Frame>
    );
  }

  if (done) {
    return (
      <Frame title={step.title} onExit={onExit}>
        <SessionSummary
          right={tally.right}
          wrong={tally.wrong}
          missed={missed}
          onRetry={() => {
            setQueue(buildQueue(missed, kindsFor(step.kind), rng.current));
            setIndex(0);
            setMissed([]);
          }}
          onDone={() => onFinish(tally.right, tally.wrong)}
        />
      </Frame>
    );
  }

  const saved = isSaved(drill.card.ru);
  const toggle = () => onToggleSave(drill.card.ru, drill.card.note ?? drill.card.uz);

  return (
    <Frame
      title={step.title}
      onExit={onExit}
      progress={(index + 1) / queue.length}
      counter={`${index + 1} / ${queue.length}`}
    >
      {drill.kind === "choice" && (
        <ChoiceDrill key={drill.key} drill={drill} onAnswer={answer} onNext={next} />
      )}
      {drill.kind === "listening" && (
        <ChoiceDrill key={drill.key} drill={drill} listening onAnswer={answer} onNext={next} />
      )}
      {drill.kind === "typing" && (
        <TypingDrill
          key={drill.key}
          drill={drill}
          saved={saved}
          onToggleSave={toggle}
          onAnswer={answer}
          onNext={next}
        />
      )}
      {drill.kind === "speaking" && (
        <SpeakDrill
          key={drill.key}
          drill={drill}
          online={online}
          saved={saved}
          onToggleSave={toggle}
          onAnswer={answer}
          onNext={next}
        />
      )}
      {drill.kind === "pattern" && (
        <PatternDrill
          key={drill.key}
          drill={drill}
          solved={solvedInPattern}
          saved={saved}
          onToggleSave={toggle}
          onAnswer={answer}
          onNext={next}
        />
      )}
    </Frame>
  );
}

/* ------------------------------------------------------------------ */

interface FrameProps {
  title: string;
  onExit: () => void;
  progress?: number;
  counter?: string;
  children: React.ReactNode;
}

function Frame({ title, onExit, progress, counter, children }: FrameProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onExit}
          aria-label="Chiqish"
          className="text-faint border-line bg-surface flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
        >
          ✕
        </button>
        <span className="text-muted flex-1 truncate text-[0.86rem] font-semibold">{title}</span>
        {counter && <span className="text-faint text-[0.78rem] tabular-nums">{counter}</span>}
      </div>

      {progress !== undefined && (
        <div className="bg-line-soft h-1 overflow-hidden rounded-full">
          <div
            className="bg-accent h-full rounded-full transition-[width] duration-300"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      )}

      {children}
    </div>
  );
}

function Missing({ onExit }: { onExit: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted m-0 text-[0.9rem]">Bu qadam topilmadi.</p>
      <button
        type="button"
        onClick={onExit}
        className="border-line text-muted min-h-11 rounded-xl border text-[0.9rem] font-semibold"
      >
        Orqaga
      </button>
    </div>
  );
}
