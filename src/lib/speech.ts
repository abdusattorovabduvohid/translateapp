/**
 * Nutqni tanish (mikrofon). Diqqat: brauzerdagi tanish BULUTDA ishlaydi,
 * ya'ni internet kerak. Shuning uchun bu fayl device.ts dan alohida —
 * device.ts dagi hamma narsa internetsiz ishlaydi.
 */

export interface RecognitionAlternative {
  transcript: string;
  confidence: number;
}

export interface RecognitionEventLike {
  results: ArrayLike<ArrayLike<RecognitionAlternative>>;
}

export interface RecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: RecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}

type RecognitionCtor = new () => RecognitionLike;

function ctor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export const CAN_LISTEN = ctor() !== null;

export function createRecognition(lang: string): RecognitionLike | null {
  const Ctor = ctor();
  if (!Ctor) return null;
  try {
    const recognition = new Ctor();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;
    // Tanish ko'pincha bir nechta variant beradi — hammasini tekshiramiz
    recognition.maxAlternatives = 3;
    return recognition;
  } catch {
    return null;
  }
}

/** Xato kodlari → o'zbekcha izoh */
export const RECOGNITION_ERROR: Record<string, string> = {
  "not-allowed": "Mikrofonga ruxsat berilmadi. Brauzer sozlamalaridan ruxsat bering yoki «O‘zim tekshiraman» ni bosing.",
  "service-not-allowed": "Mikrofon xizmati yopiq. «O‘zim tekshiraman» bilan davom eting.",
  "no-speech": "Ovoz eshitilmadi. Telefonni yaqinroq tuting va yana urinib ko‘ring.",
  "audio-capture": "Mikrofon topilmadi.",
  network: "Internet yo‘q — mikrofon ishlamaydi. «O‘zim tekshiraman» ni bosing.",
  aborted: "To‘xtatildi.",
};
