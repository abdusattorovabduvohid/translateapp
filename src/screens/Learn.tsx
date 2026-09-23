import { useCallback, useMemo, useState } from "react";

import { CURRICULUM, dayByNumber, FIRST_DAY_LIST, type LearnStep } from "../data/curriculum";
import { useBackButton } from "../hooks/useBackButton";
import { useLearnProgress } from "../hooks/useLearnProgress";
import { useOnline } from "../hooks/useOnline";
import type { SrsApi } from "../hooks/useSrs";
import { CARD_INDEX } from "../lib/cards";
import { CAN_SPEAK, speakRussian } from "../lib/device";
import { cardsFromKeys } from "../lib/steps";
import { DrillSession } from "../components/learn/DrillSession";

interface LearnProps {
  srs: SrsApi;
  isSaved: (ru: string) => boolean;
  onToggleSave: (ru: string, uz: string) => void;
}

type View =
  | { at: "home" }
  | { at: "day"; day: number }
  | { at: "session"; day: number; stepId: string };

const KIND_LABEL: Record<string, string> = {
  cheat: "Qoida",
  choice: "Tanlash",
  typing: "Yozish",
  listening: "Eshitish",
  speaking: "Gapirish",
  pattern: "Qolip",
  dialogue: "Dialog",
  review: "Takror",
};

export function Learn({ srs, isSaved, onToggleSave }: LearnProps) {
  const online = useOnline();
  const learn = useLearnProgress();
  const [view, setView] = useState<View>({ at: "home" });

  const goHome = useCallback(() => setView({ at: "home" }), []);
  const goDay = useCallback((day: number) => setView({ at: "day", day }), []);

  useBackButton(view.at !== "home", () => {
    setView((prev) => (prev.at === "session" ? { at: "day", day: prev.day } : { at: "home" }));
  });

  const dueCount = useMemo(() => {
    const touched = [...CARD_INDEX.keys()].filter((id) => srs.srs[id]);
    return srs.due(touched).length;
  }, [srs]);

  /* ---------------- sessiya ---------------- */
  if (view.at === "session") {
    const day = dayByNumber(view.day);
    const step = day?.steps.find((item) => item.id === view.stepId);
    if (!day || !step) {
      return <button type="button" onClick={goHome}>Orqaga</button>;
    }

    return (
      <DrillSession
        step={step}
        online={online}
        srs={srs}
        isSaved={isSaved}
        onToggleSave={onToggleSave}
        onFinish={(right, wrong) => {
          learn.completeStep(step.id, right, wrong);
          setView({ at: "day", day: view.day });
        }}
        onExit={() => setView({ at: "day", day: view.day })}
      />
    );
  }

  /* ---------------- bitta kun ---------------- */
  if (view.at === "day") {
    const day = dayByNumber(view.day);
    if (!day) return <button type="button" onClick={goHome}>Orqaga</button>;

    const nextStep = day.steps.find((step) => !learn.isDone(step.id));

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goHome}
            aria-label="Orqaga"
            className="text-faint border-line bg-surface flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
          >
            ‹
          </button>
          <span className="text-muted flex-1 text-[0.86rem] font-semibold">{day.title}</span>
          <span className="text-faint text-[0.78rem] tabular-nums">~{day.minutes} daq</span>
        </div>

        <div className="bg-surface border-line flex flex-col gap-2 rounded-xl border px-3.5 py-3">
          <p className="text-ink m-0 text-[0.95rem] leading-relaxed">{day.goal}</p>
          <ul className="text-muted m-0 flex list-none flex-col gap-1 p-0 text-[0.84rem]">
            {day.targets.map((target) => (
              <li key={target} className="flex gap-2">
                <span className="text-accent">—</span>
                <span>{target}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-1.5">
          {day.steps.map((step) => (
            <StepRow
              key={step.id}
              step={step}
              done={learn.isDone(step.id)}
              onOpen={() => setView({ at: "session", day: day.day, stepId: step.id })}
            />
          ))}
        </div>

        {nextStep && (
          <button
            type="button"
            onClick={() => setView({ at: "session", day: day.day, stepId: nextStep.id })}
            className="bg-accent border-accent text-on-accent min-h-12 rounded-xl border text-[0.95rem] font-semibold transition-transform active:scale-[0.97]"
          >
            {day.steps.some((s) => learn.isDone(s.id)) ? "Davom etish" : "Boshlash"}
          </button>
        )}

        {day.day === 5 && <FirstDayList />}
      </div>
    );
  }

  /* ---------------- bosh ekran ---------------- */
  const accuracy =
    learn.progress.right + learn.progress.wrong > 0
      ? Math.round(
          (learn.progress.right / (learn.progress.right + learn.progress.wrong)) * 100,
        )
      : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2">
        <Stat label="O‘rganilgan" value={srs.learned} />
        <Stat label="Takror kutmoqda" value={dueCount} />
        <Stat label="Ketma-ket kun" value={learn.progress.streak} />
        <Stat label="To‘g‘ri javob" value={`${accuracy}%`} />
      </div>

      <div className="flex flex-col gap-1.5">
        {CURRICULUM.map((day) => {
          const ids = day.steps.map((step) => step.id);
          const share = learn.dayShare(ids);
          return (
            <button
              key={day.day}
              type="button"
              onClick={() => goDay(day.day)}
              className="bg-surface border-line-soft hover:border-line flex flex-col gap-1.5 rounded-xl border px-3.5 py-3 text-left transition-colors"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-ink flex-1 text-[0.98rem] font-semibold">{day.title}</span>
                <span className="text-faint text-[0.76rem] tabular-nums">
                  {Math.round(share * 100)}%
                </span>
              </div>
              <span className="text-faint text-[0.82rem] leading-snug">{day.goal}</span>
              <div className="bg-line-soft mt-1 h-[3px] overflow-hidden rounded-full">
                <div
                  className="bg-accent h-full rounded-full"
                  style={{ width: `${Math.round(share * 100)}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => {
          if (confirm("Hamma progress o‘chiriladi. Davom etasizmi?")) {
            learn.reset();
            srs.reset();
          }
        }}
        className="text-faint self-center text-[0.76rem] font-semibold underline underline-offset-[3px]"
      >
        Progressni tozalash
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-surface border-line-soft flex flex-col gap-0.5 rounded-xl border px-3.5 py-2.5">
      <span className="text-accent text-[1.3rem] leading-none font-bold tabular-nums">{value}</span>
      <span className="text-faint text-[0.74rem]">{label}</span>
    </div>
  );
}

function StepRow({
  step, done, onOpen,
}: {
  step: LearnStep;
  done: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="bg-surface border-line-soft hover:border-line flex min-h-[52px] items-center gap-3 rounded-xl border px-3.5 py-2 text-left transition-colors"
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.7rem] font-bold ${
          done ? "bg-accent border-accent text-on-accent" : "border-line text-faint"
        }`}
        aria-hidden="true"
      >
        {done ? "✓" : ""}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-ink truncate-1 text-[0.94rem] font-semibold">{step.title}</span>
        <span className="text-faint text-[0.76rem]">{KIND_LABEL[step.kind] ?? step.kind}</span>
      </span>
      <span className="text-faint shrink-0">›</span>
    </button>
  );
}

function FirstDayList() {
  const cards = useMemo(() => cardsFromKeys(FIRST_DAY_LIST), []);

  return (
    <div className="border-accent-line flex flex-col gap-2 rounded-xl border border-dashed px-3.5 py-3">
      <span className="text-faint text-[0.7rem] font-bold tracking-[0.12em] uppercase">
        Moskvadagi birinchi kun ro‘yxati
      </span>
      <p className="text-muted m-0 text-[0.84rem]">
        Samolyotdan tushgan kuni shu {cards.length} ta gap yetadi. Yulduzcha bosib saqlab qo‘ying.
      </p>
      <div className="flex flex-col gap-1">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => CAN_SPEAK && speakRussian(card.ru)}
            className="flex flex-col items-start gap-0.5 py-1 text-left"
          >
            <span className="font-ru text-ink text-[0.95rem] leading-snug">{card.ru}</span>
            <span className="text-faint text-[0.78rem]">{card.note ?? card.uz}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
