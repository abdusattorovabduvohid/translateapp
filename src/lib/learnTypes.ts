/** O'rganish rejimining umumiy tiplari — faqat tip, ishlaydigan kod yo'q. */

export type CardKind = "phrase" | "word" | "pattern";

export interface Card {
  /** Barqaror id: "p:<ruscha>" | "w:<uzbekcha>" | "s:<qolip>:<n>" */
  id: string;
  kind: CardKind;
  /** Savol tomoni — o'zbekcha (ishlab chiqarish yo'nalishi) */
  uz: string;
  /** Javob — ruscha */
  ru: string;
  /** Izoh: ruscha gapning ma'nosi yoki atama tushuntirishi */
  note?: string;
  /** Qabul qilinadigan boshqa javoblar */
  alt?: string[];
  /** Chalg'ituvchi variantlarni tanlash uchun guruh nomi */
  group: string;
}

export type DrillKind =
  | "cheat"
  | "choice"
  | "typing"
  | "listening"
  | "speaking"
  | "pattern"
  | "dialogue"
  | "review";

export type Outcome = "right" | "close" | "wrong";

export interface CardState {
  /** 1..5 — Leitner qutisi */
  box: number;
  /** Qachon takrorlash kerak (epoch ms) */
  due: number;
  streak: number;
  seen: number;
  right: number;
  last: number;
  /** Necha marta unutilgan */
  lapses: number;
}

export type SrsState = Record<string, CardState>;

export interface DiffPart {
  text: string;
  state: "same" | "typo" | "extra" | "missing";
}

export interface CheckResult {
  verdict: Outcome;
  /** 0..1 */
  score: number;
  /** To'g'ri javob bo'laklarga bo'lingan holda */
  diff: DiffPart[];
  /** Foydalanuvchi yozgani */
  typed: string;
  /** O'zbekcha izoh: nima xato bo'ldi */
  note: string;
  /** Lotinchadan kirillga o'girib tekshirildimi */
  transliterated: boolean;
}

export interface LearnProgress {
  /** qadam id → tugagan vaqt */
  done: Record<string, number>;
  /** ochilgan eng katta kun */
  day: number;
  streak: number;
  /** "2026-09-23" */
  lastDate: string;
  right: number;
  wrong: number;
}
