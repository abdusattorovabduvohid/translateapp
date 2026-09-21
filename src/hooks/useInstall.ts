import { useEffect, useState } from "react";

interface InstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export interface InstallState {
  /** «Telefonga o'rnatish» tugmasini ko'rsatsa bo'ladimi */
  canInstall: boolean;
  install: () => void;
  installed: boolean;
  /** iPhone'da tugma yo'q — qo'lda qo'shiladi */
  isIOS: boolean;
  standalone: boolean;
}

export function useInstall(): InstallState {
  const [event, setEvent] = useState<InstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvent(e as InstallPromptEvent);
    };
    const onInstalled = () => {
      setEvent(null);
      setInstalled(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = () => {
    if (!event) return;
    void event.prompt();
    void event.userChoice.then(() => setEvent(null));
  };

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const standalone = window.matchMedia?.("(display-mode: standalone)").matches ?? false;

  return { canInstall: event !== null, install, installed, isIOS, standalone };
}
