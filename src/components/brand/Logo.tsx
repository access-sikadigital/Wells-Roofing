import { cn } from "@/lib/utils";

/**
 * Wells Roofing chevron mark — the "W" rendered as a roof gable.
 * Rebuilt as inline SVG (from the supplied logo) so it stays crisp,
 * themeable and zero-request. Raster masters live in /public/brand.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={cn("size-8", className)}
      aria-hidden
    >
      <path
        d="M50 4 4 44v18l17-14.7V96h20V64l9-8 9 8v32h20V47.3L96 62V44L50 4Zm0 25.5 25 21.6V76l-9-7.8V56L50 42 34 56v12.2L25 76V51.1l25-21.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** Show the "Prestige Slate & Tile Roofing Specialists" strapline */
  withStrapline?: boolean;
};

/**
 * Full horizontal lockup: chevron mark + wordmark (+ optional strapline).
 * Inherits colour from `text-*`; the mark is always brand red.
 */
export function Logo({ className, withStrapline = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-7 shrink-0 text-accent" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.0625rem] font-extrabold uppercase tracking-[0.02em]">
          Wells Roofing
        </span>
        {/* Strapline is tighter below `sm`: at 320px the header leaves roughly
            198px beside the mark and the burger, and it needs all of that to
            stay on one line. */}
        {withStrapline && (
          <span className="mt-1 font-display text-[0.4375rem] font-bold uppercase tracking-[0.11em] text-accent sm:text-[0.5rem] sm:tracking-[0.16em]">
            {"Slate & Tile Roofing Specialists"}
          </span>
        )}
      </span>
    </span>
  );
}
