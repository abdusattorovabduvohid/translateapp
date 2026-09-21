import { useCallback, useMemo, useRef, useState } from "react";

import { BookPanel } from "./components/BookPanel";
import { Composer } from "./components/Composer";
import { HistoryPanel } from "./components/HistoryPanel";
import { Masthead } from "./components/Masthead";
import { ResultPlate } from "./components/ResultPlate";
import { SavedPanel } from "./components/SavedPanel";
import { ShowOverlay } from "./components/ShowOverlay";
import { StatusStrip } from "./components/StatusStrip";
import { Tabs, type TabId } from "./components/Tabs";

import { useInstall } from "./hooks/useInstall";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useOnline } from "./hooks/useOnline";

import { dropSample } from "./lib/claude";
import { CAN_SPEAK, copyText, speakRussian } from "./lib/device";
import { errorCode, translateOnline } from "./lib/translate";
import type { Entry, Translation } from "./lib/types";
import {
  capitalize, findPhrase, lookupWord, normalize, PHRASE_COUNT, wordByWord,
} from "./lib/uzbek";

const MAX_HISTORY = 25;
const MAX_SAVED = 300;

const FIRST: Translation = { ru: "Здравствуйте", uz: "assalomu alaykum", source: "book" };

/** Xizmat butunlay yopilganini bildiruvchi xatolar */
const FATAL = new Set(["not_granted", "sampling_disabled", "not_declared", "capability_disabled"]);

const MESSAGES: Record<string, string> = {
  rate_limited: "Juda ko‘p so‘rov bo‘ldi. Bir-ikki daqiqadan keyin urinib ko‘ring.",
  session_expired: "Qaytadan kiring — sessiya tugadi.",
  prompt_too_large: "Matn juda uzun — qisqaroq yozing.",
  invalid_json: "Tarjima to‘liq chiqmadi. Yana bir marta bosing.",
  empty_completion: "Javob chiqmadi — boshqacharoq yozib ko‘ring.",
  refused: "Bu matn tarjima qilinmadi. Boshqacha yozib ko‘ring.",
};

export function App() {
  const online = useOnline();
  const install = useInstall();

  const [input, setInput] = useState("");
  const [result, setResult] = useState<Translation>(FIRST);
  const [pending, setPending] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [showing, setShowing] = useState(false);

  const [saved, setSaved] = useLocalStorage<Entry[]>("mct.saved.v3", []);
  const [history, setHistory] = useLocalStorage<Entry[]>("mct.history.v3", []);
  const [tab, setTab] = useState<TabId>(() => (saved.length > 0 ? "saved" : "book"));

  const abort = useRef<AbortController | null>(null);

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

  const remember = useCallback(
    (entry: Entry) => {
      setHistory((prev) => [entry, ...prev.filter((e) => e.ru !== entry.ru)].slice(0, MAX_HISTORY));
    },
    [setHistory],
  );

  const land = useCallback(
    (next: Translation, message = "") => {
      setResult(next);
      setPending(null);
      setNote(message);
      remember({ ru: next.ru, uz: next.uz });
    },
    [remember],
  );

  /** Internetsiz oxirgi chora — so'zma-so'z */
  const fallback = useCallback(
    (text: string, prefix = "") => {
      const rough = wordByWord(text);
      if (!rough) {
        setPending(null);
        setNote(
          `${prefix} Bu gap lug‘atda yo‘q. Pastdagi tayyor gaplardan tanlang yoki qisqaroq yozing.`.trim(),
        );
        return;
      }
      const tail = rough.complete
        ? "So‘zma-so‘z tarjima — ma’nosi yetib boradi, lekin gap tuzilishi to‘liq to‘g‘ri bo‘lmasligi mumkin."
        : "So‘zma-so‘z tarjima — ba’zi so‘zlar lug‘atda yo‘q, o‘zgarmay qoldi.";
      land({ ru: rough.ru, uz: rough.uz, source: "word" }, `${prefix} ${tail}`.trim());
    },
    [land],
  );

  const translate = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text) return;
      setNote("");

      // 1 — tayyor gap
      const phrase = findPhrase(text);
      if (phrase) {
        land({ ru: phrase.ru, uz: phrase.back, source: "book" });
        return;
      }

      // 2 — saqlangan gaplaringiz
      const mine = saved.find((e) => normalize(e.uz) === normalize(text));
      if (mine) {
        setResult({ ...mine, source: "mem" });
        setPending(null);
        return;
      }

      // 3 — bitta so'z bo'lsa, so'zlar lug'atidan (bir zumda, internetsiz)
      if (!text.includes(" ")) {
        const word = lookupWord(text);
        if (word) {
          land({ ru: capitalize(word), uz: text.toLowerCase(), source: "words" });
          return;
        }
      }

      // 4 — internet yo'q bo'lsa, kutmay so'zma-so'zga o'tamiz
      if (!online) {
        fallback(text);
        return;
      }

      abort.current?.abort();
      const controller = new AbortController();
      abort.current = controller;

      setBusy(true);
      setPending("O‘ylanmoqda…");

      try {
        const net = await translateOnline(text, controller.signal);
        land(
          { ...net, uz: net.uz || text.toLowerCase() },
          net.source === "web"
            ? "Oddiy tarjima — ma’nosi to‘g‘ri, lekin uslubi quruqroq bo‘lishi mumkin."
            : "",
        );
      } catch (err) {
        const code = errorCode(err);
        if (code === "cancelled") return;
        if (FATAL.has(code)) dropSample();

        if (MESSAGES[code]) {
          setPending(null);
          setNote(MESSAGES[code]);
          return;
        }

        fallback(
          text,
          code === "slow"
            ? "Internet sekin yoki yopiq — telefonning o‘z lug‘ati bilan tarjima qildim."
            : "Internetga chiqib bo‘lmadi — telefonning o‘z lug‘ati bilan tarjima qildim.",
        );
      } finally {
        if (abort.current === controller) abort.current = null;
        setBusy(false);
      }
    },
    [fallback, land, online, saved],
  );

  const pick = useCallback((entry: Entry, source: Translation["source"], fill?: string) => {
    if (fill) setInput(fill);
    setResult({ ru: entry.ru, uz: entry.uz, source });
    setPending(null);
    setNote("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const importSaved = useCallback(
    (entries: Entry[]): number => {
      let added = 0;
      setSaved((prev) => {
        const seen = new Set(prev.map((e) => e.ru));
        const merged = [...prev];
        for (const entry of entries) {
          if (!seen.has(entry.ru)) {
            merged.push(entry);
            seen.add(entry.ru);
            added += 1;
          }
        }
        return merged.slice(0, MAX_SAVED);
      });
      return added;
    },
    [setSaved],
  );

  return (
    <>
      <div className="mx-auto flex max-w-[580px] flex-col gap-4.5 px-4 pt-5.5 pb-15">
        <Masthead />

        <StatusStrip online={online} />

        <Composer
          value={input}
          onChange={setInput}
          onSubmit={() => void translate(input)}
          busy={busy}
        />

        {note && (
          <p className="bg-surface-2 border-brass-line text-ink m-0 rounded-xl border px-3.5 py-2.5 text-[0.86rem]">
            {note}
          </p>
        )}

        <ResultPlate
          result={result}
          pending={pending}
          saved={isSaved(result.ru)}
          canSpeak={CAN_SPEAK}
          onShow={() => setShowing(true)}
          onSpeak={() => speakRussian(result.ru)}
          onSave={() => toggleSave(result.ru, result.uz)}
          onCopy={() => void copyText(result.ru)}
        />

        <Tabs
          active={tab}
          onChange={setTab}
          counts={{ saved: saved.length, book: PHRASE_COUNT, history: history.length }}
        />

        {tab === "saved" && (
          <SavedPanel
            entries={saved}
            onPick={(e) => pick(e, "mem")}
            onToggleSave={toggleSave}
            onClear={() => setSaved([])}
            onImport={importSaved}
            onCopy={(text) => void copyText(text)}
          />
        )}

        {tab === "book" && (
          <BookPanel
            isSaved={isSaved}
            onPick={(p) => pick({ ru: p.ru, uz: p.back }, "book", p.uz)}
            onToggleSave={toggleSave}
          />
        )}

        {tab === "history" && (
          <HistoryPanel
            entries={history}
            isSaved={isSaved}
            onPick={(e) => pick(e, "mem")}
            onToggleSave={toggleSave}
            onClear={() => setHistory([])}
          />
        )}

        <footer className="text-faint flex flex-col items-center gap-2.5 pt-1 text-center text-[0.76rem]">
          {install.canInstall && (
            <button
              type="button"
              onClick={install.install}
              className="border-brass-line text-brass inline-flex min-h-10 items-center rounded-xl border px-4 text-[0.85rem] font-semibold"
            >
              Telefonga o‘rnatish
            </button>
          )}
          <span>{footerNote(install.installed, install.isIOS, install.standalone)}</span>
        </footer>
      </div>

      {showing && <ShowOverlay result={result} onClose={() => setShowing(false)} />}
    </>
  );
}

function footerNote(installed: boolean, isIOS: boolean, standalone: boolean): string {
  if (installed || standalone) return "O‘rnatildi. Endi internetsiz ham ochiladi.";
  if (isIOS) return "iPhone'da: «Ulashish» → «Add to Home Screen» — internetsiz ishlashi uchun.";
  return "Lug‘at, so‘zlar va saqlangan gaplar telefonda turadi — internetsiz ham ochiladi.";
}
