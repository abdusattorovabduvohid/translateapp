interface EmptyStateProps {
  title: string;
  hint: string;
}

export function EmptyState({ title, hint }: EmptyStateProps) {
  return (
    <div className="border-line text-faint flex flex-col gap-1 rounded-xl border border-dashed px-4 py-5 text-center text-[0.88rem]">
      <b className="text-muted text-[0.92rem] font-bold">{title}</b>
      <span>{hint}</span>
    </div>
  );
}
