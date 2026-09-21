import { useEffect, useState } from "react";
import type { Entry } from "../lib/types";
import { ActionButton } from "./ActionButton";
import { EmptyState } from "./EmptyState";
import { PhraseRow } from "./PhraseRow";

interface SavedPanelProps {
  entries: Entry[];
  onPick: (entry: Entry) => void;
  onToggleSave: (ru: string, uz: string) => void;
  onClear: () => void;
  onImport: (entries: Entry[]) => number;
  onCopy: (text: string) => void;
}

const LINE = " | ";

export function SavedPanel({
  entries, onPick, onToggleSave, onClear, onImport, onCopy,
}: SavedPanelProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (open) setText(entries.map((e) => e.ru + LINE + e.uz).join("\n"));
  }, [open, entries]);

  const handleImport = () => {
    const parsed: Entry[] = [];
    for (const line of text.split("\n")) {
      const [ru, uz] = line.split("|");
      if (ru?.trim()) parsed.push({ ru: ru.trim(), uz: (uz ?? "").trim() });
    }
    const added = onImport(parsed);
    setMsg(added ? `${added} ta gap tiklandi.` : "Yangi gap topilmadi — hammasi saqlangan.");
  };

  return (
    <div id="panel-saved" role="tabpanel" className="flex flex-col gap-2.5">
      <div className="flex min-h-[22px] items-center gap-2.5">
        <h2 className="font-display text-faint m-0 text-[0.7rem] font-medium tracking-[0.16em] uppercase">
          Doimiy ishlatadiganlarim
        </h2>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-faint ml-auto min-h-6 text-[0.78rem] font-semibold underline underline-offset-[3px]"
        >
          Zaxira
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            placeholder="Saqlangan gaplar shu yerda matn bo‘lib chiqadi."
            className="bg-surface border-line text-ink focus:border-accent-soft min-h-[110px] w-full resize-y rounded-xl border px-3.5 py-2.5 text-[0.95rem] leading-relaxed outline-none"
          />
          <div className="flex flex-wrap gap-2">
            <ActionButton onClick={() => onCopy(text)} className="min-w-[120px] flex-1">
              Nusxa olish
            </ActionButton>
            <ActionButton onClick={handleImport} className="min-w-[120px] flex-1">
              Matndan tiklash
            </ActionButton>
            <ActionButton
              onClick={() => {
                onClear();
                setText("");
                setMsg("");
              }}
              className="min-w-[120px] flex-1"
            >
              Hammasini o‘chirish
            </ActionButton>
          </div>
          {msg && <p className="text-ok m-0 text-[0.8rem]">{msg}</p>}
          <p className="text-faint m-0 text-[0.78rem]">
            Nusxani Telegramdagi «Saqlangan xabarlar»ga tashlab qo‘ying — telefon almashsa yoki
            brauzer tozalansa shu yerdan tiklaysiz.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        {entries.length === 0 ? (
          <EmptyState
            title="Hozircha bo‘sh"
            hint="Kerakli gapning yonidagi ★ ni bosing — shu yerda turadi, qidirib o‘tirmaysiz."
          />
        ) : (
          entries.map((e) => (
            <PhraseRow
              key={e.ru}
              ru={e.ru}
              uz={e.uz}
              saved
              onPick={() => onPick(e)}
              onToggleSave={() => onToggleSave(e.ru, e.uz)}
            />
          ))
        )}
      </div>
    </div>
  );
}
