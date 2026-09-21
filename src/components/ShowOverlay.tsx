import { useEffect } from "react";
import type { Translation } from "../lib/types";

interface ShowOverlayProps {
  result: Translation;
  onClose: () => void;
}

/** Butun ekranga katta ruscha matn — telefonni ko'rsatib tushuntirish uchun. */
export function ShowOverlay({ result, onClose }: ShowOverlayProps) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="bg-ground fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 px-6 py-7 text-center"
    >
      <span
        aria-hidden="true"
        className="border-brass-line pointer-events-none absolute inset-3.5 rounded-2xl border opacity-50"
      />
      <p className="font-ru text-ink m-0 max-w-[16ch] text-[clamp(2rem,10.5vw,4rem)] leading-tight tracking-tight text-balance">
        {result.ru}
      </p>
      <p className="text-faint m-0 text-[0.95rem]">{result.uz}</p>
      <span className="font-display text-brass absolute bottom-8 text-[0.68rem] tracking-[0.18em] uppercase">
        Yopish uchun bosing
      </span>
    </div>
  );
}
