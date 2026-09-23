import { useCallback, useMemo } from "react";

import { ModeSwitch, type Mode } from "./components/ModeSwitch";
import { useInstall } from "./hooks/useInstall";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useSrs } from "./hooks/useSrs";
import { CARD_INDEX } from "./lib/cards";
import type { Entry } from "./lib/types";
import { Learn } from "./screens/Learn";
import { Translator } from "./screens/Translator";

const MAX_SAVED = 300;

export function App() {
  const install = useInstall();
  const srs = useSrs();

  const [mode, setMode] = useLocalStorage<Mode>("mct.mode.v1", "translate");
  // Saqlangan gaplar ikkala rejimga ham kerak — shuning uchun shu yerda turadi
  const [saved, setSaved] = useLocalStorage<Entry[]>("mct.saved.v3", []);

  const savedKeys = useMemo(() => new Set(saved.map((e) => e.ru)), [saved]);
  const isSaved = useCallback((ru: string) => savedKeys.has(ru), [savedKeys]);

  const toggleSave = useCallback(
    (ru: string, uz: string) => {
      setSaved((prev) =>
        prev.some((e) => e.ru === ru)
          ? prev.filter((e) => e.ru !== ru)
          : [{ ru, uz }, ...prev].slice(0, MAX_SAVED),
      );
    },
    [setSaved],
  );

  const dueCount = useMemo(() => {
    const ids = [...CARD_INDEX.keys()].filter((id) => srs.srs[id]);
    return srs.due(ids).length;
  }, [srs]);

  return (
    <div className="mx-auto flex max-w-[580px] flex-col gap-4.5 px-4 pt-4 pb-15">
      <ModeSwitch value={mode} onChange={setMode} due={dueCount} />

      {mode === "translate" ? (
        <Translator saved={saved} setSaved={setSaved} isSaved={isSaved} toggleSave={toggleSave} />
      ) : (
        <Learn srs={srs} isSaved={isSaved} onToggleSave={toggleSave} />
      )}

      <footer className="text-faint flex flex-col items-center gap-2.5 pt-1 text-center text-[0.76rem]">
        {install.canInstall && (
          <button
            type="button"
            onClick={install.install}
            className="border-accent-line text-accent inline-flex min-h-10 items-center rounded-xl border px-4 text-[0.85rem] font-semibold"
          >
            Telefonga o‘rnatish
          </button>
        )}
        <span>{footerNote(install.installed, install.isIOS, install.standalone)}</span>
      </footer>
    </div>
  );
}

function footerNote(installed: boolean, isIOS: boolean, standalone: boolean): string {
  if (installed || standalone) return "O‘rnatildi. Endi internetsiz ham ochiladi.";
  if (isIOS) return "iPhone'da: «Ulashish» → «Add to Home Screen» — internetsiz ishlashi uchun.";
  return "Lug‘at, so‘zlar va mashqlar telefonda turadi — internetsiz ham ochiladi.";
}
