/** Telefonning o'z imkoniyatlari — internet talab qilmaydi. */

export const CAN_SPEAK =
  typeof window !== "undefined" &&
  "speechSynthesis" in window &&
  typeof window.SpeechSynthesisUtterance === "function";

/** Ruscha matnni ovoz bilan o'qiydi */
export function speakRussian(text: string): void {
  if (!CAN_SPEAK || !text) return;
  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ru-RU";
    utterance.rate = 0.85;

    const voice = window.speechSynthesis
      .getVoices()
      .find((v) => v.lang?.toLowerCase().startsWith("ru"));
    if (voice) utterance.voice = voice;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } catch {
    /* ovoz motori yo'q — muammo emas */
  }
}

/** Matnni nusxalaydi; eski brauzerlarda ham ishlaydi */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* pastdagi zaxira usulga o'tamiz */
  }

  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}
