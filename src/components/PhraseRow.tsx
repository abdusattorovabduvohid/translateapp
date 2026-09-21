import { ChevronIcon, StarIcon } from "./icons";

interface PhraseRowProps {
  ru: string;
  uz: string;
  /** Chap chetdagi rangli chiziq (metro liniyasi) */
  color: string;
  saved: boolean;
  onPick: () => void;
  onToggleSave: () => void;
}

export function PhraseRow({ ru, uz, color, saved, onPick, onToggleSave }: PhraseRowProps) {
  return (
    <div className="bg-surface border-line-soft hover:border-line grid min-h-[58px] grid-cols-[3px_1fr_auto] items-stretch overflow-hidden rounded-xl border transition-colors">
      <span style={{ background: color }} aria-hidden="true" />

      <button
        type="button"
        onClick={onPick}
        className="flex min-w-0 flex-col items-start justify-center gap-px py-2.5 pr-1 pl-3 text-left"
      >
        <span className="font-ru text-ink truncate-1 max-w-full text-base leading-snug font-semibold">
          {ru}
        </span>
        <span className="text-faint truncate-1 max-w-full text-[0.81rem] leading-snug">{uz}</span>
      </button>

      <div className="flex items-center">
        <button
          type="button"
          onClick={onToggleSave}
          aria-pressed={saved}
          aria-label={saved ? "Saqlanganlardan olib tashlash" : "Saqlab qo‘yish"}
          className={`flex h-full w-[46px] items-center justify-center transition-colors ${
            saved ? "text-brass" : "text-faint"
          }`}
        >
          <StarIcon filled={saved} className="h-[18px] w-[18px]" />
        </button>
        <ChevronIcon className="text-faint mr-2.5 h-4 w-4 shrink-0" />
      </div>
    </div>
  );
}
