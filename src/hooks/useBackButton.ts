import { useEffect, useRef } from "react";

/**
 * Telefondagi «orqaga» tugmasi ilovani yopib yubormasin.
 * active bo'lganda tarixga bitta yozuv qo'yiladi; orqaga bosilsa onBack ishlaydi.
 */
export function useBackButton(active: boolean, onBack: () => void): void {
  const handler = useRef(onBack);
  handler.current = onBack;

  useEffect(() => {
    if (!active) return;

    const state = { learnGuard: Date.now() };
    window.history.pushState(state, "");

    const onPop = () => handler.current();
    window.addEventListener("popstate", onPop);

    return () => {
      window.removeEventListener("popstate", onPop);
      // O'zimiz qo'ygan yozuvni olib tashlaymiz (foydalanuvchi orqaga bosmagan bo'lsa)
      if ((window.history.state as { learnGuard?: number } | null)?.learnGuard === state.learnGuard) {
        window.history.back();
      }
    };
  }, [active]);
}
