import { useEffect, useState } from "react";
import { ActionButton } from "./ActionButton";
import { CopyIcon, ExpandIcon, SpeakerIcon, StarIcon } from "./icons";
import { hintOf, outputOf, SOURCE_LABEL, type Translation } from "../lib/types";

interface ResultPlateProps {
  result: Translation;
  /** Kutish matni — bo'lsa, plastinka «o'ylanmoqda» holatida */
  pending: string | null;
  saved: boolean;
  canSpeak: boolean;
  onShow: () => void;
  onSpeak: () => void;
  onSave: () => void;
  onCopy: () => void;
}

export function ResultPlate({
  result, pending, saved, canSpeak, onShow, onSpeak, onSave, onCopy,
}: ResultPlateProps) {
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);

  const output = outputOf(result);

  // Yangi natija kelganda plastinka yumshoq joyiga tushadi
  useEffect(() => {
    if (!pending) setKey((k) => k + 1);
  }, [output, pending]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <section className="border-line shadow-plate bg-plate overflow-hidden rounded-[18px] border">
      <div key={key} className="animate-settle flex flex-col gap-3 px-5 pt-6 pb-4.5">
        <p
          className={`font-ru m-0 text-[clamp(1.55rem,7.2vw,2.15rem)] leading-tight tracking-tight text-balance wrap-break-word ${
            pending ? "text-faint font-medium" : "text-ink font-semibold"
          }`}
        >
          {pending ?? output}
        </p>
        <div className="bg-line-soft h-px" />
        <p className="text-muted m-0 text-base font-medium wrap-break-word">
          {pending ? "" : hintOf(result)}
        </p>
      </div>

      <div className="border-line-soft bg-surface-2 flex flex-wrap items-center gap-1.5 border-t px-3.5 py-2.5">
        <span className="font-display text-faint mr-auto inline-flex items-center gap-1.5 text-[0.62rem] font-medium tracking-[0.14em] whitespace-nowrap uppercase">
          <i className="bg-accent block h-1.5 w-1.5 rounded-full" />
          {SOURCE_LABEL[result.source]}
        </span>

        <ActionButton onClick={onShow} title="Katta qilib ko‘rsatish">
          <ExpandIcon />
          Ko‘rsatish
        </ActionButton>

        {canSpeak && (
          <ActionButton onClick={onSpeak} title="Eshitish">
            <SpeakerIcon />
            Eshitish
          </ActionButton>
        )}

        <ActionButton onClick={onSave} title="Saqlab qo‘yish" active={saved} pressed={saved}>
          <StarIcon filled={saved} />
          {saved ? "Saqlandi" : "Saqlash"}
        </ActionButton>

        <ActionButton
          onClick={() => {
            onCopy();
            setCopied(true);
          }}
          title="Nusxa olish"
          done={copied}
        >
          <CopyIcon />
          {copied ? "Olindi" : "Nusxa"}
        </ActionButton>
      </div>
    </section>
  );
}
