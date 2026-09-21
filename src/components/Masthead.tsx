export function Masthead() {
  return (
    <header className="flex flex-col gap-2.5">
      <div className="metro-rail h-[3px] rounded-sm opacity-85" />
      <div className="flex items-end gap-3">
        <h1 className="font-display m-0 text-[1.32rem] leading-tight font-semibold tracking-[0.05em] uppercase">
          Cho‘ntak tarjimon
        </h1>
        <span className="font-display text-brass ml-auto pb-0.5 text-[0.68rem] font-medium tracking-[0.16em] whitespace-nowrap uppercase">
          Uz → Ru
        </span>
      </div>
      <p className="text-muted m-0 text-[0.86rem]">
        Kirill yoki lotin — farqi yo‘q. Yozing, ruschasi chiqadi.
      </p>
    </header>
  );
}
