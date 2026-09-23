import { PHRASES } from "../data/phrasebook";
import { PATTERNS } from "../data/patterns";
import { WORDS } from "../data/words";
import type { Card } from "./learnTypes";
import { normalizeRu } from "./russian";
import { normalize, verbForm } from "./uzbek";

/**
 * Kartalar mavjud lug'atlardan yasaladi — mazmun hech qayerda takrorlanmaydi.
 * Id'lar mazmundan kelib chiqadi, shuning uchun fayl ichida tartib o'zgarsa ham
 * saqlangan SRS holati buzilmaydi.
 */

const index = new Map<string, Card>();
/** phrasebook'dagi o'zbekcha kalit (alt bilan birga) → karta */
const byPhraseKey = new Map<string, Card>();
/** WORDS kaliti → karta */
const byWordKey = new Map<string, Card>();
/** qolip id → kartalar */
const byPattern = new Map<string, Card[]>();

for (const phrase of PHRASES) {
  const card: Card = {
    id: `p:${normalizeRu(phrase.ru)}`,
    kind: "phrase",
    uz: phrase.uz,
    ru: phrase.ru,
    note: phrase.back,
    group: phrase.category.id,
  };
  if (!index.has(card.id)) index.set(card.id, card);

  for (const key of [phrase.uz, ...(phrase.alt ?? [])]) {
    const n = normalize(key);
    if (n && !byPhraseKey.has(n)) byPhraseKey.set(n, card);
  }
}

for (const [uz, ru] of Object.entries(WORDS)) {
  const card: Card = {
    id: `w:${normalize(uz)}`,
    kind: "word",
    uz: verbForm(uz),
    ru,
    group: "word",
  };
  if (!index.has(card.id)) index.set(card.id, card);
  byWordKey.set(normalize(uz), card);
  // "bormoq" deb yozilsa ham topilsin
  byWordKey.set(normalize(verbForm(uz)), card);
}

for (const pattern of PATTERNS) {
  const cards: Card[] = pattern.slots.map((slot, i) => ({
    id: `s:${pattern.id}:${i}`,
    kind: "pattern",
    uz: slot.uz,
    ru: slot.ru,
    note: pattern.uz,
    ...(slot.alt ? { alt: slot.alt } : {}),
    group: pattern.id,
  }));
  for (const card of cards) index.set(card.id, card);
  byPattern.set(pattern.id, cards);
}

export const CARD_INDEX: ReadonlyMap<string, Card> = index;
export const CARD_COUNT = index.size;

export function cardById(id: string): Card | undefined {
  return index.get(id);
}

/** phrasebook'dagi o'zbekcha kalit bo'yicha (alt yozilishlari ham ishlaydi) */
export function phraseCard(uzKey: string): Card | undefined {
  return byPhraseKey.get(normalize(uzKey));
}

/** WORDS kaliti bo'yicha ("bor-" ham, "bormoq" ham ishlaydi) */
export function wordCard(uzKey: string): Card | undefined {
  return byWordKey.get(normalize(uzKey));
}

export function patternCards(patternId: string): Card[] {
  return byPattern.get(patternId) ?? [];
}

/** Kategoriya bo'yicha barcha gap kartalari */
export function cardsByGroup(group: string): Card[] {
  return [...index.values()].filter((card) => card.group === group);
}

/** Lug'atdan ham, gaplardan ham qidiradi */
export function anyCard(key: string): Card | undefined {
  return phraseCard(key) ?? wordCard(key);
}
