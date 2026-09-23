import type { CategoryId } from "./phrasebook";
import type { DrillKind } from "../lib/learnTypes";

/**
 * 5 kunlik kurs. Har kun ~1–2 soat.
 *
 * Bu fayl YANGI ruscha matn qo'shmaydi — faqat mavjud lug'at, qolip,
 * grammatika va dialoglarga ishora qiladi.
 */

export interface LearnStep {
  /** Progress kaliti — hech qachon o'zgartirilmasin */
  id: string;
  kind: DrillKind;
  title: string;
  /** Nechta savol chiqadi (0 = hammasi) */
  size: number;
  /** phrasebook'dagi o'zbekcha kalitlar */
  phrases?: string[];
  /** butun kategoriya */
  categories?: CategoryId[];
  /** WORDS kalitlari */
  words?: string[];
  patterns?: string[];
  grammar?: string;
  dialogue?: string;
}

export interface LearnDay {
  day: number;
  title: string;
  goal: string;
  targets: string[];
  minutes: number;
  steps: LearnStep[];
}

export const CURRICULUM: LearnDay[] = [
  {
    day: 1,
    title: "1-kun — Og‘iz ochish",
    goal: "Salomlashish, o‘zingizni tanishtirish va «tushunmadim» deb ayta olish.",
    targets: [
      "Notanish odam bilan salomlashasiz",
      "Ismingizni va qayerdanligingizni aytasiz",
      "Tushunmaganingizda to‘g‘ri gapni aytasiz",
    ],
    minutes: 75,
    steps: [
      { id: "d1-klaviatura", kind: "cheat", title: "Ruscha klaviatura", size: 0, grammar: "klaviatura" },
      { id: "d1-olmosh", kind: "cheat", title: "Olmoshlar va fe’l oxirlari", size: 0, grammar: "olmosh" },
      { id: "d1-salom", kind: "choice", title: "Salomlashish — tanlash", size: 16, categories: ["salom"] },
      { id: "d1-tanishuv", kind: "pattern", title: "Qolip: Меня зовут…", size: 0, patterns: ["menya-zovut"] },
      { id: "d1-tushunmadim", kind: "pattern", title: "Qolip: Я не понимаю…", size: 0, patterns: ["ne-ponimayu"] },
      { id: "d1-yozish", kind: "typing", title: "Yozib mashq qilish", size: 12, categories: ["salom"] },
      { id: "d1-eshitish", kind: "listening", title: "Eshitib tushunish", size: 10, categories: ["salom"] },
      { id: "d1-dialog", kind: "dialogue", title: "Dialog: birinchi dars", size: 0, dialogue: "dars-tanishuv" },
    ],
  },
  {
    day: 2,
    title: "2-kun — So‘rash",
    goal: "нужно · можно · хочу bilan har qanday narsani so‘rab olish.",
    targets: [
      "Ruxsat so‘raysiz: «Можно…?»",
      "Ehtiyojingizni aytasiz: «Мне нужно…»",
      "Ko‘chada yo‘l so‘raysiz",
    ],
    minutes: 90,
    steps: [
      { id: "d2-nuzhno", kind: "cheat", title: "нужно · можно · хочу", size: 0, grammar: "nuzhno-mozhno" },
      { id: "d2-q-nuzhno", kind: "pattern", title: "Qolip: Мне нужно…", size: 0, patterns: ["mne-nuzhno"] },
      { id: "d2-q-mozhno", kind: "pattern", title: "Qolip: Можно…?", size: 0, patterns: ["mozhno"] },
      { id: "d2-q-gde", kind: "pattern", title: "Qolip: Где можно…?", size: 0, patterns: ["gde-mozhno"] },
      { id: "d2-yol", kind: "choice", title: "Yo‘l va metro — tanlash", size: 14, categories: ["yol"] },
      { id: "d2-dokon", kind: "typing", title: "Do‘kon — yozish", size: 12, categories: ["dokon"] },
      {
        id: "d2-sozlar",
        kind: "choice",
        title: "Kundalik so‘zlar",
        size: 20,
        words: [
          "non", "suv", "choy", "pul", "kun", "uy", "ish", "yo‘l", "vaqt", "narx",
          "do‘kon", "bozor", "metro", "avtobus", "taksi", "chipta", "bekat", "ko‘cha",
          "chek", "karta",
        ],
      },
      { id: "d2-gapirish", kind: "speaking", title: "Ovoz chiqarib aytish", size: 10, categories: ["yol"] },
      { id: "d2-dialog", kind: "dialogue", title: "Dialog: taksi va metro", size: 0, dialogue: "taksi-metro" },
    ],
  },
  {
    day: 3,
    title: "3-kun — 1C darsida",
    goal: "Darsda savol berish, atamani so‘rash, sekinroq deb aytish.",
    targets: [
      "Darsda to‘xtatib savol berasiz",
      "Notanish atamaning ma’nosini so‘raysiz",
      "1C atamalarini tanib olasiz",
    ],
    minutes: 90,
    steps: [
      { id: "d3-kelishik", kind: "cheat", title: "Uchta kelishik", size: 0, grammar: "kelishik" },
      { id: "d3-savol", kind: "cheat", title: "So‘roq so‘zlar", size: 0, grammar: "savol" },
      { id: "d3-q-skazhite", kind: "pattern", title: "Qolip: Скажите, пожалуйста…", size: 0, patterns: ["skazhite"] },
      { id: "d3-q-znachit", kind: "pattern", title: "Qolip: Что значит…?", size: 0, patterns: ["chto-znachit"] },
      { id: "d3-q-pokazhite", kind: "pattern", title: "Qolip: Покажите…", size: 0, patterns: ["pokazhite"] },
      { id: "d3-dars", kind: "choice", title: "1C darsi — tanlash", size: 18, categories: ["odc"] },
      { id: "d3-atama", kind: "listening", title: "Atamalarni eshitib tanish", size: 14, categories: ["atama"] },
      { id: "d3-yozish", kind: "typing", title: "Darsdagi gaplarni yozish", size: 12, categories: ["odc"] },
      { id: "d3-dialog", kind: "dialogue", title: "Dialog: darsda savol", size: 0, dialogue: "dars-savol" },
    ],
  },
  {
    day: 4,
    title: "4-kun — Muammo va vaqt",
    goal: "Xato haqida aytish, narx va vaqtni tushunish, zamonlarni ishlatish.",
    targets: [
      "«Bu ishlamayapti» deb ayta olasiz",
      "Narxni so‘raysiz va sonni tushunasiz",
      "O‘tgan va kelasi zamonda gapirasiz",
    ],
    minutes: 90,
    steps: [
      { id: "d4-zamon", kind: "cheat", title: "Uch zamon", size: 0, grammar: "zamon" },
      { id: "d4-son", kind: "cheat", title: "Sonlar va narx", size: 0, grammar: "son" },
      { id: "d4-inkor", kind: "cheat", title: "не va нет", size: 0, grammar: "inkor" },
      { id: "d4-q-stoit", kind: "pattern", title: "Qolip: Сколько стоит…?", size: 0, patterns: ["skolko-stoit"] },
      { id: "d4-q-est", kind: "pattern", title: "Qolip: У вас есть…?", size: 0, patterns: ["u-vas-est"] },
      { id: "d4-ish", kind: "typing", title: "Ish va hujjat — yozish", size: 14, categories: ["ish"] },
      {
        id: "d4-vaqt",
        kind: "choice",
        title: "Vaqt va raqam",
        size: 18,
        categories: ["vaqt"],
        words: [
          "bir", "ikki", "uch", "to‘rt", "besh", "olti", "yetti", "sakkiz", "to‘qqiz", "o‘n",
          "yigirma", "yuz", "ming", "soat", "daqiqa", "hafta", "oy", "yil",
          "bugun", "ertaga", "kecha", "ertalab", "kechqurun", "hozir",
        ],
      },
      { id: "d4-gapirish", kind: "speaking", title: "Ovoz chiqarib aytish", size: 12, categories: ["ish", "shifokor"] },
      { id: "d4-dialog", kind: "dialogue", title: "Dialog: ekranda xato", size: 0, dialogue: "dars-xato" },
    ],
  },
  {
    day: 5,
    title: "5-kun — Hammasi birga",
    goal: "Takrorlash va ko‘proq gapirish. Moskvaga tayyor bo‘lish.",
    targets: [
      "Qiyin kartalarni yopasiz",
      "To‘liq dialogni oxirigacha olib chiqasiz",
      "Birinchi kun ro‘yxatini yodda saqlaysiz",
    ],
    minutes: 90,
    steps: [
      { id: "d5-jins", kind: "cheat", title: "нужен · нужна · нужно", size: 0, grammar: "jins" },
      { id: "d5-q-nuzhen", kind: "pattern", title: "Qolip: Мне нужен…", size: 0, patterns: ["nuzhen-nuzhna"] },
      { id: "d5-q-hochu", kind: "pattern", title: "Qolip: Я хочу…", size: 0, patterns: ["ya-hochu"] },
      { id: "d5-takror", kind: "review", title: "Qiyin kartalarni takrorlash", size: 40 },
      { id: "d5-gapirish", kind: "speaking", title: "Ko‘p gapirish", size: 18, categories: ["salom", "odc", "dokon"] },
      { id: "d5-dialog-1", kind: "dialogue", title: "Dialog: ofisga kirish", size: 0, dialogue: "ofis-kirish" },
      { id: "d5-dialog-2", kind: "dialogue", title: "Dialog: tanaffus", size: 0, dialogue: "tanaffus" },
      { id: "d5-test", kind: "typing", title: "Yakuniy yozma test", size: 20, categories: ["salom", "yol", "odc"] },
    ],
  },
];

export const DAY_COUNT = CURRICULUM.length;

export function dayByNumber(day: number): LearnDay | undefined {
  return CURRICULUM.find((item) => item.day === day);
}

export function stepById(stepId: string): { day: LearnDay; step: LearnStep } | undefined {
  for (const day of CURRICULUM) {
    const step = day.steps.find((item) => item.id === stepId);
    if (step) return { day, step };
  }
  return undefined;
}

/**
 * Moskvaga tushgan kuni kerak bo'ladigan gaplar — 5-kun oxirida ko'rsatiladi.
 * phrasebook'dagi o'zbekcha kalitlar.
 */
export const FIRST_DAY_LIST: string[] = [
  "salom",
  "rahmat",
  "kechirasiz",
  "men rus tilini bilmayman",
  "sekinroq gapiring",
  "tushunmadim",
  "yordam bering",
  "metro qayerda",
  "taksi chaqiring",
  "mana manzil",
  "bu qancha turadi",
  "karta bilan to‘lasa bo‘ladimi",
  "suv bering",
  "hisob bering",
  "hojatxona",
  "mana mening pasportim",
  "men ish qidiryapman",
  "shifokor chaqiring",
  "soat necha",
  "xayr",
];
