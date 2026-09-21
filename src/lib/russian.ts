import { PHRASES, type Phrase } from "../data/phrasebook";
import { WORDS } from "../data/words";

/** Ruscha matnni solishtirishga tayyorlaydi (ё → е, tinish belgilarisiz) */
export function normalizeRu(input: string): string {
  return String(input ?? "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^а-я0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** "bor-" → "bormoq" (fe'l o'zagini ko'rsatib bo'ladigan shaklga keltiradi) */
function readable(uz: string): string {
  return uz.endsWith("-") ? `${uz.slice(0, -1)}moq` : uz;
}

/* ------------------------------------------------------------------ */
/* Tayyor gaplar — ruschadan qidiriladi                                */
/* ------------------------------------------------------------------ */

const RU_PHRASES = new Map<string, Phrase>();
for (const phrase of PHRASES) {
  const key = normalizeRu(phrase.ru);
  if (key && !RU_PHRASES.has(key)) RU_PHRASES.set(key, phrase);
}

export function findRussianPhrase(text: string): Phrase | undefined {
  return RU_PHRASES.get(normalizeRu(text));
}

/* ------------------------------------------------------------------ */
/* So'zlar — ruschadan o'zbekchaga                                     */
/* ------------------------------------------------------------------ */

const RU_WORDS = new Map<string, string>();

/** Qisqartmalar: «хлеба» → «хлеб» kabi holatlar uchun o'zak boshlari */
const RU_STEMS = new Map<string, string>();
const ambiguous = new Set<string>();

for (const [uz, ru] of Object.entries(WORDS)) {
  const key = normalizeRu(ru);
  if (!key) continue;
  const value = readable(uz);
  if (!RU_WORDS.has(key)) RU_WORDS.set(key, value);

  // O'zak boshlari faqat bitta so'zli tarjimalar uchun
  if (key.includes(" ")) continue;
  for (const length of [5, 4]) {
    if (key.length <= length) continue;
    const stem = key.slice(0, length);
    const seen = RU_STEMS.get(stem);
    if (seen === undefined) RU_STEMS.set(stem, value);
    else if (seen !== value) ambiguous.add(stem);
  }
}

// Ikki xil so'zga to'g'ri keladigan o'zaklarni tashlab yuboramiz —
// noto'g'ri tarjimadan ko'ra tarjima qilmagan yaxshi.
for (const stem of ambiguous) RU_STEMS.delete(stem);

export const RU_WORD_COUNT = RU_WORDS.size;

/** Bitta ruscha so'zni topadi; topolmasa o'zagi bo'yicha qidiradi. */
export function lookupRussianWord(word: string): string | null {
  const n = normalizeRu(word);
  if (!n) return null;

  const direct = RU_WORDS.get(n);
  if (direct) return direct;

  for (const length of [5, 4]) {
    if (n.length <= length) continue;
    const stem = RU_STEMS.get(n.slice(0, length));
    if (stem) return stem;
  }
  return null;
}

export interface RoughTranslation {
  out: string;
  complete: boolean;
}

/** Internetsiz oxirgi chora: ruscha gapni so'zma-so'z o'zbekchaga o'giradi. */
export function russianWordByWord(text: string): RoughTranslation | null {
  const parts = String(text).split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;

  let hits = 0;
  const out = parts.map((part) => {
    const uz = lookupRussianWord(part);
    if (uz) {
      hits += 1;
      return uz;
    }
    return part;
  });

  if (hits === 0) return null;
  return { out: out.join(" "), complete: hits === parts.length };
}

/* ------------------------------------------------------------------ */
/* Yo'nalishni o'zi aniqlash                                            */
/* ------------------------------------------------------------------ */

/** O'zbek kirillchasida bor, rus alifbosida yo'q harflar */
const UZBEK_ONLY = /[ўқғҳ]/i;
/** Rus alifbosida bor, o'zbek kirillchasida ishlatilmaydigan harflar */
const RUSSIAN_ONLY = /[ыъэщ]/i;

/** Faqat rus tilida uchraydigan keng tarqalgan so'zlar */
const MARKERS = new Set([
  "не", "мне", "меня", "мой", "вам", "вас", "ваш", "он", "она", "мы", "они",
  "как", "что", "это", "эта", "этот", "где", "куда", "когда", "почему", "кто",
  "сколько", "есть", "нет", "да", "можно", "нужно", "надо", "хочу",
  "пожалуйста", "спасибо", "извините", "здравствуйте", "привет", "пока",
  "дела", "хорошо", "плохо", "очень", "тут", "там", "сейчас", "потом",
  "дай", "дайте", "скажите", "покажите", "помогите", "подождите",
  "работа", "деньги", "завтра", "сегодня", "вчера",
]);

/**
 * Matn ruschaga o'xshaydimi? Faqat ishonchli holatlarda true qaytaradi —
 * shubha bo'lsa foydalanuvchi tanlagan yo'nalish saqlanadi.
 */
export function looksRussian(text: string): boolean {
  if (!/[а-яё]/i.test(text)) return false;
  if (UZBEK_ONLY.test(text)) return false;
  if (RUSSIAN_ONLY.test(text)) return true;

  if (findRussianPhrase(text)) return true;

  const words = normalizeRu(text).split(" ").filter(Boolean);
  if (words.length === 0) return false;
  if (words.some((w) => MARKERS.has(w))) return true;
  if (words.length === 1) return lookupRussianWord(words[0]!) !== null;

  // Yarmidan ko'pi ruscha lug'atda bo'lsa — ruscha deb hisoblaymiz
  const hits = words.filter((w) => lookupRussianWord(w) !== null).length;
  return hits * 2 > words.length;
}
