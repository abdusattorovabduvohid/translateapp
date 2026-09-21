/** Tarjima qayerdan kelgani */
export type Source = "book" | "words" | "word" | "ai" | "api" | "web" | "mem";

export interface Translation {
  /** Ruscha (kirill) */
  ru: string;
  /** Ruscha gapning o'zbekcha ma'nosi */
  uz: string;
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
