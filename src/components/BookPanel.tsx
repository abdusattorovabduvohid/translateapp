import { useMemo, useState } from "react";
import { CATEGORIES, PHRASES, type CategoryId, type Phrase } from "../data/phrasebook";
import { normalize, WORD_COUNT } from "../lib/uzbek";
import { EmptyState } from "./EmptyState";
import { PhraseRow } from "./PhraseRow";

type Filter = CategoryId | "all";

interface BookPanelProps {
  isSaved: (ru: string) => boolean;
  onPick: (phrase: Phrase) => void;
  onToggleSave: (ru: string, uz: string) => void;
}

export function BookPanel({ isSaved, onPick, onToggleSave }: BookPanelProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const rows = useMemo(() => {
    const raw = query.trim();
    const n = normalize(raw);
    const ru = raw.toLowerCase();

    return PHRASES.filter((p) => {
      if (filter !== "all" && p.category.id !== filter) return false;
      if (!n && !ru) return true;
      return (
        normalize(p.uz).includes(n) ||
        normalize(p.back).includes(n) ||
        p.ru.toLowerCase().includes(ru)
      );
    });
  }, [query, filter]);

  const chips: Array<{ id: Filter; name: string; color: string }> = [
    { id: "all", name: "Hammasi", color: "var(--faint)" },
    ...CATEGORIES,
  ];

  return (
    <div id="panel-book" role="tabpanel" className="flex flex-col gap-2.5">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Qidirish: taksi, hisob, shifokor…"
        autoComplete="off"
        className="bg-surface border-line text-ink focus:border-brass-2 min-h-11 w-full rounded-xl border px-3.5 text-[0.95rem] outline-none"
      />

      <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
        {chips.map((c) => {
          const on = c.id === filter;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(c.id)}
              className={`inline-flex min-h-9 shrink-0 items-center gap-[7px] rounded-full border px-3 text-[0.84rem] font-semibold transition-colors ${
                on ? "bg-ink text-ground border-ink" : "bg-surface border-line text-muted"
              }`}
            >
              <i style={{ background: c.color }} className="block h-2 w-2 rounded-full" />
              {c.name}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-1.5">
        {rows.length === 0 ? (
          <EmptyState
            title="Topilmadi"
            hint={`Yuqoridagi katakka yozib «Tarjima» ni bosing — ${WORD_COUNT} ta so‘z internetsiz ham tarjima qilinadi.`}
          />
        ) : (
          rows.map((p) => (
            <PhraseRow
              key={`${p.category.id}:${p.uz}`}
              ru={p.ru}
              uz={p.back}
              color={p.category.color}
              saved={isSaved(p.ru)}
              onPick={() => onPick(p)}
              onToggleSave={() => onToggleSave(p.ru, p.back)}
            />
          ))
        )}
      </div>
    </div>
  );
}
