import type { ReactNode } from "react";

interface ActionButtonProps {
  onClick: () => void;
  children: ReactNode;
  title?: string;
  /** Yoqilgan holat (masalan: saqlangan) */
  active?: boolean;
  /** Bajarildi (masalan: nusxa olindi) */
  done?: boolean;
  pressed?: boolean;
  className?: string;
}

export function ActionButton({
  onClick,
  children,
  title,
  active = false,
  done = false,
  pressed,
  className = "",
}: ActionButtonProps) {
  const tone = done
    ? "text-ok border-ok"
    : active
      ? "text-accent border-accent-line"
      : "text-muted border-line";

  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-pressed={pressed}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border bg-transparent px-3 text-[0.85rem] font-semibold transition-colors active:scale-[0.97] ${tone} ${className}`}
    >
      {children}
    </button>
  );
}
