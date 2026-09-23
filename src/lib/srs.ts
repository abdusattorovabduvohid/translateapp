import type { CardState, LearnProgress, Outcome, SrsState } from "./learnTypes";

/**
 * Leitner qutilari — 5 kunlik sprintga siqilgan.
 * Oddiy SRS'da oraliqlar haftalab bo'ladi; bizda butun kurs 5 kun,
 * shuning uchun eng uzun oraliq 2 kun.
 */
export const BOX_MINUTES: readonly number[] = [0, 10, 45, 180, 1440, 2880];

/** Shu qutidan boshlab "o'rganilgan" deb hisoblanadi */
export const LEARNED_BOX = 3;
export const MAX_BOX = 5;

const MINUTE = 60_000;

export function newState(now: number): CardState {
  return { box: 1, due: now, streak: 0, seen: 0, right: 0, last: now, lapses: 0 };
}

export function grade(state: CardState | undefined, outcome: Outcome, now: number): CardState {
  const prev = state ?? newState(now);
  const seen = prev.seen + 1;

  if (outcome === "wrong") {
    return {
      box: 1,
      due: now + 3 * MINUTE,
      streak: 0,
      seen,
      right: prev.right,
      last: now,
      lapses: prev.lapses + 1,
    };
  }

  if (outcome === "close") {
    // Quti o'zgarmaydi, lekin tezroq qaytadi
    const box = Math.max(1, prev.box);
    return {
      box,
      due: now + (BOX_MINUTES[box] ?? 10) * MINUTE * 0.5,
      streak: prev.streak + 1,
      seen,
      right: prev.right + 1,
      last: now,
      lapses: prev.lapses,
    };
  }

  const box = Math.min(MAX_BOX, prev.box + 1);
  return {
    box,
    due: now + (BOX_MINUTES[box] ?? 2880) * MINUTE,
    streak: prev.streak + 1,
    seen,
    right: prev.right + 1,
    last: now,
    lapses: prev.lapses,
  };
}

/** Ko'rilmagan karta ham "muddati kelgan" hisoblanadi */
export function isDue(state: CardState | undefined, now: number): boolean {
  return !state || state.due <= now;
}

export function dueIds(srs: SrsState, ids: readonly string[], now: number): string[] {
  return ids.filter((id) => isDue(srs[id], now));
}

export function learnedCount(srs: SrsState): number {
  let count = 0;
  for (const state of Object.values(srs)) if (state.box >= LEARNED_BOX) count += 1;
  return count;
}

/** Eng ko'p unutilgan kartalar — 5-kunda shular takrorlanadi */
export function weakIds(srs: SrsState, limit: number): string[] {
  return Object.entries(srs)
    .filter(([, state]) => state.lapses > 0 || state.box < LEARNED_BOX)
    .sort((a, b) => b[1].lapses - a[1].lapses || a[1].box - b[1].box)
    .slice(0, limit)
    .map(([id]) => id);
}

/** Lug'at o'zgarsa, eski id'lar qoladi — ularni tozalaymiz */
export function pruneSrs(srs: SrsState, known: ReadonlySet<string>): SrsState {
  const out: SrsState = {};
  let changed = false;
  for (const [id, state] of Object.entries(srs)) {
    if (known.has(id)) out[id] = state;
    else changed = true;
  }
  return changed ? out : srs;
}

/** Mahalliy vaqt bo'yicha "2026-09-23" */
export function dayKey(ts: number): string {
  const d = new Date(ts);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

/** Ketma-ket kunlar hisobi */
export function bumpStreak(prev: LearnProgress, now: number): LearnProgress {
  const today = dayKey(now);
  if (prev.lastDate === today) return prev;

  const yesterday = dayKey(now - 24 * 60 * MINUTE);
  const streak = prev.lastDate === yesterday ? prev.streak + 1 : 1;
  return { ...prev, streak, lastDate: today };
}
