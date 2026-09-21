import { useEffect, useRef } from "react";

interface ComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  busy: boolean;
}

export function Composer({ value, onChange, onSubmit, busy }: ComposerProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  // Matn uzayganda katak o'zi cho'ziladi
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 220)}px`;
  }, [value]);

  return (
    <div className="bg-surface border-line shadow-plate focus-within:border-brass-2 flex flex-col gap-2.5 rounded-[18px] border p-3.5 pb-3">
      <label
        htmlFor="src"
        className="font-display text-faint text-[0.68rem] font-medium tracking-[0.17em] uppercase"
      >
        O‘zbekcha so‘z yoki gap
      </label>

      <textarea
        id="src"
        ref={ref}
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
          }
        }}
        autoComplete="off"
        autoCapitalize="sentences"
        spellCheck={false}
        placeholder="bu qancha turadi?"
        className="text-ink placeholder:text-faint m-0 min-h-[62px] w-full resize-none border-0 bg-transparent p-0 text-[1.14rem] leading-relaxed outline-none"
      />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            onChange("");
            ref.current?.focus();
          }}
          aria-label="Tozalash"
          title="Tozalash"
          className="bg-surface-2 border-line text-muted min-h-[46px] w-[46px] shrink-0 rounded-xl border transition-colors active:scale-[0.97]"
        >
          ✕
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={busy}
          className="font-display from-brass-2 to-brass border-brass text-on-brass min-h-[46px] flex-1 rounded-xl border bg-linear-to-b text-base font-medium tracking-[0.12em] uppercase transition-transform active:scale-[0.97] disabled:cursor-default disabled:opacity-55"
        >
          {busy ? "Tarjima qilinmoqda" : "Tarjima"}
        </button>
      </div>
    </div>
  );
}
