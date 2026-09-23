import type { Card, CheckResult, DiffPart, Outcome } from "./learnTypes";
import { normalizeRu } from "./russian";

/* ------------------------------------------------------------------ */
/* Sozlamalar — bir joyda tursin, keyin moslash oson bo'lsin           */
/* ------------------------------------------------------------------ */

/** Tushib qolsa ham kechiriladigan so'zlar (ma'no o'zgarmaydi) */
const OPTIONAL = new Set(["пожалуйста", "ну", "вот", "же"]);

/** Shuncha harf xatosi hali "deyarli to'g'ri" */
const TYPO_DISTANCE = 1;
/** Uzun so'zlarda ikkita harf xatosiga ham yo'l qo'yiladi */
const LONG_WORD = 8;
const LONG_WORD_DISTANCE = 2;

/* ------------------------------------------------------------------ */
/* Lotincha → kirilcha                                                 */
/* ------------------------------------------------------------------ */

/** Uzun birikmalar avval tekshiriladi */
const PAIRS: Array<[string, string]> = [
  ["shch", "щ"], ["sch", "щ"],
  ["yo", "ё"], ["jo", "ё"],
  ["zh", "ж"],
  ["ch", "ч"],
  ["sh", "ш"],
  ["yu", "ю"], ["ju", "ю"],
  ["ya", "я"], ["ja", "я"],
  ["ye", "е"], ["je", "е"],
  ["ts", "ц"],
  ["kh", "х"],
];

const SINGLE: Record<string, string> = {
  a: "а", b: "б", v: "в", g: "г", d: "д", e: "е", z: "з", i: "и", y: "й",
  k: "к", l: "л", m: "м", n: "н", o: "о", p: "п", r: "р", s: "с", t: "т",
  u: "у", f: "ф", h: "х", c: "ц", j: "ж", q: "к", w: "в", x: "х",
  "'": "ь", "`": "ь",
};

/**
 * Lotinda yozilgan ruschani kirillga o'giradi: "spasibo" → "спасибо".
 * Telefonda hali rus klaviaturasi bo'lmasa ham mashq qilish uchun.
 */
export function latinToCyrillic(text: string): string {
  const lower = text.toLowerCase();
  let out = "";
  let i = 0;

  outer: while (i < lower.length) {
    for (const [latin, cyr] of PAIRS) {
      if (lower.startsWith(latin, i)) {
        out += cyr;
        i += latin.length;
        continue outer;
      }
    }
    const ch = lower[i]!;
    out += SINGLE[ch] ?? ch;
    i += 1;
  }
  return out;
}

const HAS_CYRILLIC = /[а-яё]/i;
const HAS_LATIN = /[a-z]/i;

/* ------------------------------------------------------------------ */
/* Solishtirish                                                        */
/* ------------------------------------------------------------------ */

/** Ixtiyoriy so'zlarni olib tashlaydi */
export function foldRu(text: string): string {
  return normalizeRu(text)
    .split(" ")
    .filter((word) => word && !OPTIONAL.has(word))
    .join(" ");
}

/** Levenshtein masofasi; cap dan oshsa hisoblashni to'xtatadi */
export function levenshtein(a: string, b: string, cap = Infinity): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > cap) return cap + 1;

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const value = Math.min(curr[j - 1]! + 1, prev[j]! + 1, prev[j - 1]! + cost);
      curr[j] = value;
      if (value < best) best = value;
    }
    if (best > cap) return cap + 1;
    prev = curr;
  }
  return prev[b.length]!;
}

function isTypo(typed: string, expected: string): boolean {
  const limit = expected.length >= LONG_WORD ? LONG_WORD_DISTANCE : TYPO_DISTANCE;
  return expected.length >= 4 && levenshtein(typed, expected, limit) <= limit;
}

/**
 * So'z darajasida moslashtirish (LCS). Natija — to'g'ri javob bo'laklarga
 * bo'lingan holda, qayeri xato ekani bilan.
 */
export function diffWords(typed: string, expected: string): DiffPart[] {
  const got = normalizeRu(typed).split(" ").filter(Boolean);
  const want = normalizeRu(expected).split(" ").filter(Boolean);
  const wantRaw = expected.split(/\s+/).filter(Boolean);

  // LCS jadvali
  const table: number[][] = Array.from({ length: got.length + 1 }, () =>
    new Array<number>(want.length + 1).fill(0),
  );
  for (let i = got.length - 1; i >= 0; i--) {
    for (let j = want.length - 1; j >= 0; j--) {
      table[i]![j] = got[i] === want[j]
        ? table[i + 1]![j + 1]! + 1
        : Math.max(table[i + 1]![j]!, table[i]![j + 1]!);
    }
  }

  const parts: DiffPart[] = [];
  let i = 0;
  let j = 0;

  const pushWant = (index: number, state: DiffPart["state"]) => {
    parts.push({ text: wantRaw[index] ?? want[index] ?? "", state });
  };

  while (i < got.length && j < want.length) {
    if (got[i] === want[j]) {
      pushWant(j, "same");
      i += 1;
      j += 1;
    } else if (isTypo(got[i]!, want[j]!)) {
      pushWant(j, "typo");
      i += 1;
      j += 1;
    } else if (table[i + 1]![j]! >= table[i]![j + 1]!) {
      parts.push({ text: got[i]!, state: "extra" });
      i += 1;
    } else {
      pushWant(j, "missing");
      j += 1;
    }
  }
  while (i < got.length) {
    parts.push({ text: got[i]!, state: "extra" });
    i += 1;
  }
  while (j < want.length) {
    pushWant(j, "missing");
    j += 1;
  }

  return parts;
}

/* ------------------------------------------------------------------ */
/* Asosiy funksiya                                                     */
/* ------------------------------------------------------------------ */

function verdictFor(parts: DiffPart[]): Outcome {
  const missing = parts.filter((p) => p.state === "missing");
  const extra = parts.filter((p) => p.state === "extra");
  const typo = parts.filter((p) => p.state === "typo");

  if (missing.length === 0 && extra.length === 0 && typo.length === 0) return "right";

  const onlyOptional =
    missing.every((p) => OPTIONAL.has(normalizeRu(p.text))) &&
    extra.every((p) => OPTIONAL.has(normalizeRu(p.text)));

  if (onlyOptional && typo.length <= 1) return "close";
  if (missing.length === 0 && extra.length === 0 && typo.length <= 1) return "close";
  return "wrong";
}

/** Ko'rsatish uchun tinish belgilarini olib tashlaydi */
function clean(word: string): string {
  return word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "") || word;
}

/** Fe'lning boshlang'ich shakli (идти, купить) */
const INFINITIVE = /(ться|ть|ти|чь)$/;

function noteFor(parts: DiffPart[], verdict: Outcome, transliterated: boolean): string {
  const lead = transliterated
    ? "Lotinda yozdingiz — kirillga o‘girib tekshirdim. "
    : "";

  if (verdict === "right") {
    return `${lead}To‘g‘ri.`.trim();
  }

  const typo = parts.find((p) => p.state === "typo");
  const missing = parts.filter((p) => p.state === "missing");
  const extra = parts.filter((p) => p.state === "extra");

  if (verdict === "close") {
    if (typo) return `${lead}Deyarli — «${clean(typo.text)}» da harf xatosi bor.`;
    if (missing.length) {
      return `${lead}To‘g‘ri. «${clean(missing[0]!.text)}» qo‘shsangiz muloyimroq bo‘ladi.`;
    }
    return `${lead}Deyarli to‘g‘ri.`;
  }

  // Eng ko'p uchraydigan xato: нужно/можно/хочу dan keyin fe'l o'zgartirib qo'yiladi
  const wantedInfinitive = missing.find((p) => INFINITIVE.test(clean(p.text)));
  if (wantedInfinitive && extra.length) {
    return `${lead}«${clean(extra[0]!.text)}» emas — «${clean(wantedInfinitive.text)}». Fe’l boshlang‘ich shaklda qoladi.`;
  }

  if (missing.length && !extra.length) {
    const words = missing.map((p) => `«${clean(p.text)}»`).join(", ");
    return `${lead}${words} tushib qolgan.`;
  }
  if (extra.length && !missing.length) {
    const words = extra.map((p) => `«${clean(p.text)}»`).join(", ");
    return `${lead}${words} ortiqcha.`;
  }
  if (missing.length && extra.length) {
    return `${lead}«${clean(extra[0]!.text)}» emas — «${clean(missing[0]!.text)}».`;
  }
  return `${lead}To‘g‘ri javobni o‘qib chiqing va yana urinib ko‘ring.`;
}

/** Bitta variantga qarshi tekshirish */
function checkOne(typed: string, expected: string): { verdict: Outcome; parts: DiffPart[]; score: number } {
  const normTyped = normalizeRu(typed);
  const normExpected = normalizeRu(expected);

  if (normTyped && normTyped === normExpected) {
    return {
      verdict: "right",
      parts: expected.split(/\s+/).filter(Boolean).map((text) => ({ text, state: "same" as const })),
      score: 1,
    };
  }

  const parts = diffWords(typed, expected);
  let verdict = verdictFor(parts);

  if (verdict !== "right" && foldRu(typed) === foldRu(expected) && foldRu(expected)) {
    verdict = "close";
  }

  const distance = levenshtein(normTyped, normExpected);
  const longest = Math.max(normTyped.length, normExpected.length, 1);
  return { verdict, parts, score: Math.max(0, 1 - distance / longest) };
}

const RANK: Record<Outcome, number> = { right: 2, close: 1, wrong: 0 };

/**
 * Ruscha javobni tekshiradi. Lotinda yozilsa kirillga o'giradi,
 * imlo xatosini kechiradi, farqni so'z darajasida qaytaradi.
 */
export function checkRussian(typed: string, card: Pick<Card, "ru" | "alt">): CheckResult {
  const raw = typed.trim();

  let candidate = raw;
  let transliterated = false;
  if (raw && HAS_LATIN.test(raw) && !HAS_CYRILLIC.test(raw)) {
    candidate = latinToCyrillic(raw);
    transliterated = true;
  }

  const options = [card.ru, ...(card.alt ?? [])];
  let best = checkOne(candidate, card.ru);
  let bestExpected = card.ru;

  for (const option of options.slice(1)) {
    const result = checkOne(candidate, option);
    if (RANK[result.verdict] > RANK[best.verdict] || result.score > best.score) {
      best = result;
      bestExpected = option;
    }
  }

  // Eng yaxshi variant asosiy javob bo'lmasa ham, ekranda asosiysi ko'rsatiladi
  const parts = bestExpected === card.ru ? best.parts : diffWords(candidate, card.ru);

  return {
    verdict: best.verdict,
    score: best.score,
    diff: parts,
    typed: raw,
    note: noteFor(parts, best.verdict, transliterated),
    transliterated,
  };
}
