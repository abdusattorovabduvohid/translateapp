import { useCallback, useEffect, useMemo } from "react";
import { CARD_INDEX } from "../lib/cards";
import type { Outcome, SrsState } from "../lib/learnTypes";
import { dueIds, grade as gradeState, isDue, learnedCount, pruneSrs, weakIds } from "../lib/srs";
import { useLocalStorage } from "./useLocalStorage";

export interface SrsApi {
  srs: SrsState;
  grade: (cardId: string, outcome: Outcome) => void;
  isDue: (cardId: string) => boolean;
  due: (ids: readonly string[]) => string[];
  weak: (limit: number) => string[];
  learned: number;
  reset: () => void;
}

export function useSrs(): SrsApi {
  const [srs, setSrs] = useLocalStorage<SrsState>("mct.srs.v1", {});

  // Lug'at o'zgargan bo'lsa, eski id'larni bir marta tozalaymiz
  useEffect(() => {
    const known = new Set(CARD_INDEX.keys());
    setSrs((prev) => pruneSrs(prev, known));
  }, [setSrs]);

  const grade = useCallback(
    (cardId: string, outcome: Outcome) => {
      const now = Date.now();
      setSrs((prev) => ({ ...prev, [cardId]: gradeState(prev[cardId], outcome, now) }));
    },
    [setSrs],
  );

  const learned = useMemo(() => learnedCount(srs), [srs]);

  return {
    srs,
    grade,
    isDue: useCallback((cardId: string) => isDue(srs[cardId], Date.now()), [srs]),
    due: useCallback((ids: readonly string[]) => dueIds(srs, ids, Date.now()), [srs]),
    weak: useCallback((limit: number) => weakIds(srs, limit), [srs]),
    learned,
    reset: useCallback(() => setSrs({}), [setSrs]),
  };
}
