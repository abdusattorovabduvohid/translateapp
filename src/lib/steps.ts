import type { LearnStep } from "../data/curriculum";
import { anyCard, cardById, cardsByGroup, patternCards, phraseCard, wordCard } from "./cards";
import type { Card, DrillKind } from "./learnTypes";
import type { QuestionKind } from "./drills";

/** Qadamda ko'rsatilgan barcha manbalarni kartalarga aylantiradi */
export function cardsOf(step: LearnStep): Card[] {
  const out: Card[] = [];
  const seen = new Set<string>();

  const add = (card: Card | undefined) => {
    if (!card || seen.has(card.id)) return;
    seen.add(card.id);
    out.push(card);
  };

  for (const key of step.phrases ?? []) add(phraseCard(key));
  for (const key of step.words ?? []) add(wordCard(key));
  for (const id of step.patterns ?? []) for (const card of patternCards(id)) add(card);
  for (const id of step.categories ?? []) for (const card of cardsByGroup(id)) add(card);

  return out;
}

/** Qadam turiga mos savol turlari */
export function kindsFor(kind: DrillKind): QuestionKind[] {
  switch (kind) {
    case "choice":
      return ["choice"];
    case "typing":
      return ["typing"];
    case "listening":
      return ["listening"];
    case "speaking":
      return ["speaking"];
    case "pattern":
      return ["pattern"];
    case "review":
      return ["choice", "typing", "listening"];
    default:
      return ["choice"];
  }
}

/** Takrorlash qadami uchun kartalar — SRS dan keladi */
export function reviewCards(ids: readonly string[], limit: number): Card[] {
  const out: Card[] = [];
  for (const id of ids) {
    const card = cardById(id);
    if (card) out.push(card);
    if (limit > 0 && out.length >= limit) break;
  }
  return out;
}

/** Ro'yxatdagi kalitlarni kartalarga aylantiradi (gap ham, so'z ham) */
export function cardsFromKeys(keys: readonly string[]): Card[] {
  const out: Card[] = [];
  for (const key of keys) {
    const card = anyCard(key);
    if (card) out.push(card);
  }
  return out;
}
