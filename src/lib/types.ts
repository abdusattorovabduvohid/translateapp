/** Tarjima yo'nalishi */
export type Direction = "uz-ru" | "ru-uz";

/** Tarjima qayerdan kelgani */
export type Source = "book" | "words" | "word" | "ai" | "api" | "web" | "mem";

export interface Translation {
  /** Ruscha tomoni (kirill) */
  ru: string;
  /** O'zbekcha tomoni */
  uz: string;
  direction: Direction;
  source: Source;
}

/** Saqlangan yoki tarixdagi yozuv */
export interface Entry {
  ru: string;
  uz: string;
}

export const SOURCE_LABEL: Record<Source, string> = {
  book: "cho‘ntak lug‘at",
  words: "so‘zlar lug‘ati",
  word: "so‘zma-so‘z",
  ai: "Claude tarjimasi",
  api: "Claude tarjimasi",
  web: "oddiy tarjima",
  mem: "saqlangan",
};

export const DIRECTION_LABEL: Record<Direction, string> = {
  "uz-ru": "O‘zbekcha → Ruscha",
  "ru-uz": "Ruscha → O‘zbekcha",
};

/** Katta satr — tarjima natijasi */
export function outputOf(t: Translation): string {
  return t.direction === "uz-ru" ? t.ru : t.uz;
}

/** Kichik satr — ma'nosi yoki asli */
export function hintOf(t: Translation): string {
  return t.direction === "uz-ru" ? t.uz : t.ru;
}
