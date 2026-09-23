import { CARD_INDEX } from "./cards";
import type { Card, DrillKind, Outcome } from "./learnTypes";
import { normalizeRu } from "./russian";
import { shuffle, type Rng } from "./rng";

export type QuestionKind = Extract<
  DrillKind,
  "choice" | "typing" | "listening" | "speaking" | "pattern"
>;

export interface Drill {
  /** React key — bir karta ikki marta chiqsa ham takrorlanmasin */
  key: string;
  kind: QuestionKind;
  card: Card;
  /** choice va listening uchun variantlar */
  options?: string[];
  answer?: number;
}

const MAX_RETRIES = 2;

/** Chalg'ituvchi variantlar: avval shu guruhdan, keyin boshqalardan */
function distractors(card: Card, pool: readonly Card[], rng: Rng, count: number): Card[] {
  const target = normalizeRu(card.ru);
  const targetLength = card.ru.length;

  const usable = (other: Card) =>
    other.id !== card.id && normalizeRu(other.ru) !== target;

  const sameGroup = pool.filter((other) => usable(other) && other.group === card.group);
  const otherPool = pool.filter((other) => usable(other) && other.group !== card.group);
  const everything = [...CARD_INDEX.values()].filter(usable);

  // Uzunligi yaqin bo'lganlari afzal — eng uzun variant javobni oshkor qilmasin
  const near = (list: Card[]) =>
    list.filter((other) => Math.abs(other.ru.length - targetLength) <= targetLength * 0.6);

  const picked: Card[] = [];
  const seen = new Set<string>([target]);

  for (const source of [near(sameGroup), sameGroup, near(otherPool), otherPool, everything]) {
    for (const other of shuffle(source, rng)) {
      if (picked.length >= count) break;
      const key = normalizeRu(other.ru);
      if (seen.has(key)) continue;
      seen.add(key);
      picked.push(other);
    }
    if (picked.length >= count) break;
  }

  return picked;
}

export function buildDrill(
  card: Card,
  kind: QuestionKind,
  pool: readonly Card[],
  rng: Rng,
  attempt = 0,
): Drill {
  const key = `${card.id}:${kind}:${attempt}`;

  if (kind === "choice" || kind === "listening") {
    const wrong = distractors(card, pool, rng, 3);
    // Listening'da o'zbekcha ma'no tanlanadi, qolganida ruscha gap
    const value = (item: Card) => (kind === "listening" ? item.note ?? item.uz : item.ru);
    const options = shuffle([card, ...wrong], rng).map(value);
    const answer = options.indexOf(value(card));
    return { key, kind, card, options, answer };
  }

  return { key, kind, card };
}

/** Kartalar ro'yxatidan savollar navbati yasaydi */
export function buildQueue(
  cards: readonly Card[],
  kinds: readonly QuestionKind[],
  rng: Rng,
): Drill[] {
  if (cards.length === 0 || kinds.length === 0) return [];
  const ordered = shuffle(cards, rng);
  return ordered.map((card, i) =>
    buildDrill(card, kinds[i % kinds.length]!, cards, rng),
  );
}

/**
 * Xato qilingan kartani navbatga qaytaradi — shu sessiyada yana chiqadi.
 * Bitta karta ko'pi bilan ikki marta qaytariladi.
 */
export function requeue(
  queue: Drill[],
  at: number,
  drill: Drill,
  outcome: Outcome,
  pool: readonly Card[],
  rng: Rng,
): Drill[] {
  if (outcome === "right") return queue;

  const attempt = Number(drill.key.split(":").pop() ?? 0) + 1;
  if (attempt > MAX_RETRIES) return queue;

  const next = buildDrill(drill.card, drill.kind, pool, rng, attempt);
  const out = [...queue];
  const offset = outcome === "wrong" ? 3 + Math.floor(rng() * 2) : out.length - at;
  out.splice(Math.min(at + offset, out.length), 0, next);
  return out;
}
