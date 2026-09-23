import { useCallback, useEffect, useRef, useState } from "react";
import {
  CAN_LISTEN,
  createRecognition,
  RECOGNITION_ERROR,
  type RecognitionLike,
} from "../lib/speech";

export type RecognitionStatus =
  | "unsupported"
  | "offline"
  | "idle"
  | "listening"
  | "done"
  | "denied"
  | "error";

export interface SpeechApi {
  supported: boolean;
  status: RecognitionStatus;
  /** Tanilgan matn (eng yaxshi variant) */
  transcript: string;
  /** Barcha variantlar — hammasi tekshiriladi */
  alternatives: string[];
  error: string;
  /** FAQAT tugma bosilganda chaqiriladi (iOS shuni talab qiladi) */
  start: () => void;
  stop: () => void;
  reset: () => void;
}

/** Android Chrome ba'zan onend bermaydi — o'zimiz to'xtatamiz */
const SAFETY_MS = 7000;

export function useSpeechRecognition(online: boolean, lang = "ru-RU"): SpeechApi {
  const supported = CAN_LISTEN && online;

  const [status, setStatus] = useState<RecognitionStatus>(() =>
    !CAN_LISTEN ? "unsupported" : online ? "idle" : "offline",
  );
  const [alternatives, setAlternatives] = useState<string[]>([]);
  const [error, setError] = useState("");

  const recognition = useRef<RecognitionLike | null>(null);
  const timer = useRef<number | null>(null);
  const denied = useRef(false);

  // Internet o'chsa/yonsa holat yangilanadi (ruxsat rad etilgan bo'lsa tegilmaydi)
  useEffect(() => {
    if (denied.current) return;
    setStatus(!CAN_LISTEN ? "unsupported" : online ? "idle" : "offline");
  }, [online]);

  const cleanup = useCallback(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    const current = recognition.current;
    recognition.current = null;
    if (current) {
      current.onresult = null;
      current.onerror = null;
      current.onend = null;
      try {
        current.abort();
      } catch {
        /* allaqachon to'xtagan */
      }
    }
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const start = useCallback(() => {
    if (!supported || denied.current) return;
    cleanup();

    const instance = createRecognition(lang);
    if (!instance) {
      setStatus("unsupported");
      return;
    }

    setAlternatives([]);
    setError("");
    setStatus("listening");

    instance.onresult = (event) => {
      const first = event.results[0];
      const heard: string[] = [];
      if (first) {
        for (let i = 0; i < first.length; i++) {
          const text = first[i]?.transcript?.trim();
          if (text) heard.push(text);
        }
      }
      setAlternatives(heard);
      setStatus("done");
    };

    instance.onerror = (event) => {
      const code = event.error;
      if (code === "not-allowed" || code === "service-not-allowed") {
        denied.current = true;
        setStatus("denied");
      } else {
        setStatus("error");
      }
      setError(RECOGNITION_ERROR[code] ?? "Mikrofon ishlamadi. «O‘zim tekshiraman» bilan davom eting.");
    };

    instance.onend = () => {
      setStatus((prev) => (prev === "listening" ? "idle" : prev));
    };

    recognition.current = instance;
    try {
      instance.start();
      timer.current = window.setTimeout(() => {
        try {
          instance.stop();
        } catch {
          /* e'tiborsiz */
        }
      }, SAFETY_MS);
    } catch {
      setStatus("error");
      setError("Mikrofonni ishga tushirib bo‘lmadi.");
    }
  }, [cleanup, lang, supported]);

  const stop = useCallback(() => {
    try {
      recognition.current?.stop();
    } catch {
      /* e'tiborsiz */
    }
  }, []);

  const reset = useCallback(() => {
    cleanup();
    setAlternatives([]);
    setError("");
    if (!denied.current) setStatus(!CAN_LISTEN ? "unsupported" : online ? "idle" : "offline");
  }, [cleanup, online]);

  return {
    supported,
    status,
    transcript: alternatives[0] ?? "",
    alternatives,
    error,
    start,
    stop,
    reset,
  };
}
