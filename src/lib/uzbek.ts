import { PHRASES, type Phrase } from "../data/phrasebook";
import { WORDS } from "../data/words";

/** O'zbek kirillchasi → lotin (solishtirish uchun) */
const CYRILLIC: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", ғ: "g", д: "d", е: "e", ё: "yo", ж: "j", з: "z",
  и: "i", й: "y", к: "k", қ: "q", л: "l", м: "m", н: "n", о: "o", ў: "o", п: "p",
  р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ҳ: "h", ц: "ts", ч: "ch", ш: "sh",
  щ: "sh", ъ: "", ь: "", э: "e", ю: "yu", я: "ya", ы: "i",
};

/**
 * Matnni solishtirishga tayyorlaydi: kirillni lotinga o'giradi,
 * tutuq belgilarini olib tashlaydi, x/h ni birlashtiradi.
 * «Бу қанча туради?» va «bu qancha turadi» bir xil natija beradi.
 */
export function normalize(input: string): string {
  const lower = String(input ?? "").toLowerCase().trim();
  let out = "";
  for (const ch of lower) out += CYRILLIC[ch] ?? ch;
  return out
    .replace(/[‘’ʻʼ'`´]/g, "")
    .replace(/x/g, "h")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Tayyor gaplar indeksi: normallashgan matn → gap */
const PHRASE_INDEX = new Map<string, Phrase>();
for (const phrase of PHRASES) {
  for (const key of [phrase.uz, ...(phrase.alt ?? [])]) {
    const n = normalize(key);
    if (n && !PHRASE_INDEX.has(n)) PHRASE_INDEX.set(n, phrase);
  }
}

export function findPhrase(text: string): Phrase | undefined {
  return PHRASE_INDEX.get(normalize(text));
}

/** So'zlar indeksi */
const WORD_INDEX = new Map<string, string>();
for (const [uz, ru] of Object.entries(WORDS)) {
  const n = normalize(uz);
  if (n && !WORD_INDEX.has(n)) WORD_INDEX.set(n, ru);
}

export const WORD_COUNT = WORD_INDEX.size;
export const PHRASE_COUNT = PHRASES.length;

/** O'zbekcha qo'shimchalar — uzunidan kaltasiga */
const SUFFIXES = [
  "moqchiman", "moqchimiz", "moqchisiz", "moqchi",
  "yapman", "yapsan", "yapsiz", "yaptilar", "yapti",
  "adilar", "ingiz", "imiz", "aman", "asan", "amiz", "asiz",
  "lari", "ning", "gan", "kan", "adi", "dim", "ding", "diz", "dik",
  "ish", "moq", "lar", "dan", "cha", "dek", "siz",
  "ga", "da", "ni", "im", "si", "li", "ib", "di", "i",
];

/** Bitta so'zni lug'atdan topadi, kerak bo'lsa qo'shimchasini kesib ko'radi. */
export function lookupWord(word: string): string | null {
  const n = normalize(word);
  if (!n) return null;

  const direct = WORD_INDEX.get(n);
  if (direct) return direct;

  for (const suffix of SUFFIXES) {
    if (n.length - suffix.length >= 3 && n.endsWith(suffix)) {
      const stem = WORD_INDEX.get(n.slice(0, -suffix.length));
      if (stem) return stem;
    }
  }
  return null;
}

export interface WordByWord {
  ru: string;
  uz: string;
  /** Hamma so'z topildimi */
  complete: boolean;
}

/** Internetsiz oxirgi chora: gapni so'zma-so'z tarjima qiladi. */
export function wordByWord(text: string): WordByWord | null {
  const parts = String(text).split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;

  let hits = 0;
  const out = parts.map((part) => {
    const ru = lookupWord(part);
    if (ru) {
      hits += 1;
      return ru;
    }
    return part;
  });

  if (hits === 0) return null;

  const joined = out.join(" ");
  return {
    ru: joined.charAt(0).toUpperCase() + joined.slice(1),
    uz: text.toLowerCase(),
    complete: hits === parts.length,
  };
}

/** Bosh harf bilan boshlash */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Fe'l o'zagini ko'rsatsa bo'ladigan shaklga keltiradi: "bor-" → "bormoq".
 * WORDS lug'atida fe'llar o'zak ko'rinishida turadi.
 */
export function verbForm(uz: string): string {
  return uz.endsWith("-") ? `${uz.slice(0, -1)}moq` : uz;
}
