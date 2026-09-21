interface StatusStripProps {
  online: boolean;
}

export function StatusStrip({ online }: StatusStripProps) {
  if (online) return null;

  return (
    <div
      role="status"
      className="border-accent-line bg-tint text-ink flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-[0.85rem]"
    >
      <span className="bg-accent block h-2 w-2 shrink-0 rounded-full" />
      <span>
        <b className="font-bold">Internetsiz rejim.</b> Lug‘at, saqlangan gaplar va so‘zma-so‘z
        tarjima ishlayapti.
      </span>
    </div>
  );
}
