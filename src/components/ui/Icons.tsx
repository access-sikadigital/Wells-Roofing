import { cn } from "@/lib/utils";

/**
 * Line icons, drawn inline rather than pulled from a library.
 *
 * `lucide-react` is already a dependency, but its icons are generic UI symbols
 * — the closest it has to "material warranty" is a padlock. These are drawn to
 * mean the specific thing each guarantee says, and being inline they inherit
 * `currentColor` and cost no extra request.
 *
 * All share the same construction so they read as a set: 24×24 viewBox,
 * 1.5 stroke, round caps and joins, no fills. Keep any new one to that grid or
 * it will look borrowed.
 */

type IconProps = { className?: string };

const base = "size-5 shrink-0";
const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Stacked layers — the material itself, courses of slate. */
export function IconLayers({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden>
      <path d="M12 2.5 3 7l9 4.5L21 7l-9-4.5Z" {...stroke} />
      <path d="M3 12l9 4.5L21 12" {...stroke} />
      <path d="M3 16.5 12 21l9-4.5" {...stroke} />
    </svg>
  );
}

/** Shield with a tick — work that is stood behind. */
export function IconShieldCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden>
      <path
        d="M12 2.75 19.25 5.5v5.75c0 4.35-3 7.9-7.25 9.25-4.25-1.35-7.25-4.9-7.25-9.25V5.5L12 2.75Z"
        {...stroke}
      />
      <path d="m9 11.75 2.25 2.25L15.25 10" {...stroke} />
    </svg>
  );
}

/** Seal and ribbon — a licence, a certificate, something issued. */
export function IconSeal({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden>
      <circle cx="12" cy="9" r="5.5" {...stroke} />
      <path d="M8.6 13.4 7.6 21.2 12 18.9l4.4 2.3-1-7.8" {...stroke} />
    </svg>
  );
}

/** Camera — the photographed handover, literally. */
export function IconCamera({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden>
      <rect x="3" y="7" width="18" height="13" rx="2.5" {...stroke} />
      <path d="M8 7l1.6-2.4A1 1 0 0 1 10.44 4h3.12a1 1 0 0 1 .84.6L16 7" {...stroke} />
      <circle cx="12" cy="13.5" r="3.5" {...stroke} />
    </svg>
  );
}

/** Named lookup so config can reference an icon without importing JSX. */
export const icons = {
  layers: IconLayers,
  shieldCheck: IconShieldCheck,
  seal: IconSeal,
  camera: IconCamera,
} as const;

export type IconName = keyof typeof icons;
