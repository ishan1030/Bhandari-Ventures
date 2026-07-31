import { cn } from "@/lib/utils";

/**
 * Brand mark: an emerald tile with an ascending trend line — a literal
 * "grow your business" glyph rather than a generic sparkle.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-[11px] bg-brand-gradient shadow-glow",
        className
      )}
      aria-hidden="true"
    >
      {/* subtle top sheen */}
      <span className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent opacity-60" />
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="relative h-[62%] w-[62%] text-primary-foreground"
      >
        <path
          d="M6 22.5 12.5 16 17.5 19 26 9.5"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="26" cy="9.5" r="2.9" fill="currentColor" />
      </svg>
    </span>
  );
}

/** Full lockup: mark + wordmark. Neutral wordmark, color lives in the mark. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9" />
      <span className="font-display text-[17px] font-semibold leading-none tracking-tight text-foreground">
        Bhandari
        <span className="font-medium text-foreground/55">&nbsp;Ventures</span>
      </span>
    </span>
  );
}

export default Logo;
