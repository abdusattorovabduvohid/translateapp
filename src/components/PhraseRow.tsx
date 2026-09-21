import { ChevronIcon, StarIcon } from "./icons";

interface PhraseRowProps {
  ru: string;
  uz: string;
  saved: boolean;
  onPick: () => void;
  onToggleSave: () => void;
}

export function PhraseRow({ ru, uz, saved, onPick, onToggleSave }: PhraseRowProps) {
  return (
    <div className="bg-surface border-line-soft hover:border-line flex min-h-[58px] items-stretch overflow-hidden rounded-xl border transition-colors">
      <button
        type="button"
        onClick={onPick}
        className="flex min-w-0 flex-1 flex-col items-start justify-center gap-px py-2.5 pr-1 pl-3.5 text-left"
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
            saved ? "text-accent" : "text-faint"
          }`}
        >
          <StarIcon filled={saved} className="h-[18px] w-[18px]" />
        </button>
        <ChevronIcon className="text-faint mr-2.5 h-4 w-4 shrink-0" />
      </div>
    </div>
  );
}
