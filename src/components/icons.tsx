interface IconProps {
  className?: string;
}

const base = "h-4 w-4 shrink-0";

export function ExpandIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </svg>
  );
}

export function SpeakerIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4 9.5v5h3.4L12 18.6V5.4L7.4 9.5z" fill="currentColor" />
      <path d="M15.4 8.6a4.8 4.8 0 010 6.8" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function StarIcon({ filled = false, className = base }: IconProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
      fill={filled ? "currentColor" : "none"} className={className} aria-hidden="true">
      <path d="M12 3.6l2.55 5.5 6 .7-4.45 4.15 1.2 5.95L12 16.95 6.7 19.9l1.2-5.95L3.45 9.8l6-.7z" />
    </svg>
  );
}

export function CopyIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="8.6" y="3.6" width="11.8" height="13.8" rx="2.6" />
      <path d="M15.4 20.4h-10a2 2 0 01-2-2v-11" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronIcon({ className = "h-4 w-4 shrink-0" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function MicIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0013 0M12 18v3" />
    </svg>
  );
}
