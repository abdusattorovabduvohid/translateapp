import { useCallback } from "react";
import type { LearnProgress } from "../lib/learnTypes";
import { bumpStreak } from "../lib/srs";
import { useLocalStorage } from "./useLocalStorage";

const EMPTY: LearnProgress = {
  done: {},
  day: 1,
  streak: 0,
  lastDate: "",
  right: 0,
  wrong: 0,
};

export interface LearnApi {
  progress: LearnProgress;
  isDone: (stepId: string) => boolean;
  /** 0..1 — kunning nechа foizi bajarilgan */
  dayShare: (stepIds: readonly string[]) => number;
  completeStep: (stepId: string, right: number, wrong: number) => void;
  openDay: (day: number) => void;
  reset: () => void;
}

export function useLearnProgress(): LearnApi {
  const [progress, setProgress] = useLocalStorage<LearnProgress>("mct.learn.v1", EMPTY);

  const completeStep = useCallback(
    (stepId: string, right: number, wrong: number) => {
      const now = Date.now();
      setProgress((prev) => {
        const next: LearnProgress = {
          ...prev,
          done: { ...prev.done, [stepId]: now },
          right: prev.right + right,
          wrong: prev.wrong + wrong,
        };
        return bumpStreak(next, now);
      });
    },
    [setProgress],
  );

  return {
    progress,
    isDone: useCallback((stepId: string) => Boolean(progress.done[stepId]), [progress.done]),
    dayShare: useCallback(
      (stepIds: readonly string[]) => {
        if (stepIds.length === 0) return 0;
        const done = stepIds.filter((id) => progress.done[id]).length;
        return done / stepIds.length;
      },
      [progress.done],
    ),
    completeStep,
    openDay: useCallback(
      (day: number) => setProgress((prev) => (day > prev.day ? { ...prev, day } : prev)),
      [setProgress],
    ),
    reset: useCallback(() => setProgress(EMPTY), [setProgress]),
  };
}
