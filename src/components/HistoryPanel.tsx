import type { Entry } from "../lib/types";
import { EmptyState } from "./EmptyState";
import { PhraseRow } from "./PhraseRow";

interface HistoryPanelProps {
  entries: Entry[];
  isSaved: (ru: string) => boolean;
  onPick: (entry: Entry) => void;
  onToggleSave: (ru: string, uz: string) => void;
  onClear: () => void;
}

export function HistoryPanel({
  entries, isSaved, onPick, onToggleSave, onClear,
}: HistoryPanelProps) {
  return (
    <div id="panel-history" role="tabpanel" className="flex flex-col gap-2.5">
      <div className="flex min-h-[22px] items-center gap-2.5">
        <h2 className="font-display text-faint m-0 text-[0.7rem] font-medium tracking-[0.16em] uppercase">
          Oxirgi tarjimalar
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="text-faint ml-auto min-h-6 text-[0.78rem] font-semibold underline underline-offset-[3px]"
        >
          Tozalash
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        {entries.length === 0 ? (
          <EmptyState
            title="Tarix bo‘sh"
            hint="Tarjima qilgan gaplaringiz shu yerda to‘planadi."
          />
        ) : (
          entries.map((e) => (
            <PhraseRow
              key={e.ru}
              ru={e.ru}
              uz={e.uz}
              saved={isSaved(e.ru)}
              onPick={() => onPick(e)}
              onToggleSave={() => onToggleSave(e.ru, e.uz)}
            />
          ))
        )}
      </div>
    </div>
  );
}
