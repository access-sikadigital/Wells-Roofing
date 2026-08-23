import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * BRAND LOGO
 * ==========
 * The official supplied lockup, used as artwork rather than rebuilt in code —
 * the wordmark's letterforms, the strapline tracking and the rule under
 * "SINCE 1982" are all part of the mark and shouldn't be approximated.
 *
 * Assets in /public/brand:
 *
 *  · `logo.png`                  Supplied master. Framed lockup, NAVY ink.
 *  · `logo-reversed.png`         Framed lockup, WHITE ink. Dark backgrounds.
 *  · `logo-lockup.png`           Screen lockup, NAVY ink.  ← used on the site
 *  · `logo-lockup-reversed.png`  Screen lockup, WHITE ink. ← used on the site
 *  · `badge.png`                 Square, white ink on navy. Favicon, OG, social.
 *
 * ⚠️  WHY THE SITE USES `logo-lockup`, NOT `logo`
 * ------------------------------------------------
 * The supplied master carries a thin navy KEYLINE BOX around the mark. That
 * frame is fine at poster or signage size, but in a ~72px-tall header it eats
 * roughly a fifth of the height and boxes the whole thing in, so the wordmark
 * lands around 38px and the strapline and "SINCE 1982" rule stop being legible
 * — it reads as a small sticker rather than a masthead.
 *
 * `logo-lockup*.png` is the SAME artwork with the keyline cropped away — a
 * straight pixel crop of the supplied file at (88, 53)–(1312, 509) plus 12px
 * of breathing room. Nothing is redrawn, rescaled or recoloured; the chevron,
 * the letterforms and the strapline tracking are byte-identical to the master.
 * At the same box height the mark itself renders ~1.25× larger, and with the
 * header sizing below it lands at roughly double what it was.
 *
 * The framed masters stay in /public/brand untouched for print and socials.
 *
 * ⚠️  `logo-reversed.png` was DERIVED, not supplied. The brand pack had only
 * the navy-ink transparent master, a white-*plate* version (opaque white
 * rectangle) and the square badge — no transparent reversed lockup. On the
 * navy hero and footer the navy wordmark simply disappeared, leaving the red
 * chevron floating on its own.
 *
 * It was produced from the supplied master by mapping the navy ink to white
 * and leaving every red pixel untouched, preserving alpha so the edges stay
 * anti-aliased. Geometry, spacing and the red are therefore identical to the
 * original. If the client's designer has an official reversed EPS, swap it in
 * — but do not hand-redraw one.
 */

export type LogoVariant = "primary" | "reversed";

const VARIANTS: Record<LogoVariant, string> = {
  primary: "/brand/logo-lockup.png",
  reversed: "/brand/logo-lockup-reversed.png",
};

/**
 * Declared size, not the file's pixel size (the lockups are 1248×480).
 *
 * The mark renders ~190px wide, so declaring the full 1248 made Next build a
 * srcSet up to 2560w for something that never exceeds 190px — and adding
 * `sizes` to correct it swung the other way, emitting a sixteen-entry srcSet
 * into the markup three times per page. Declaring 416×160 keeps the 2.6:1
 * ratio and gets a two-entry 1x/2x srcSet that is still sharp on retina.
 *
 * The ratio matters: it is 2.6 for the frameless lockup and 2.5 for the framed
 * master. Getting it wrong squashes the wordmark, so update both numbers
 * together if the artwork is ever re-cropped.
 */
const W = 416;
const H = 160;

const ALT =
  "Wells Roofing — Prestige Slate & Tile Roofing Specialists, since 1982";

/**
 * ⚠️  NO DEFAULT HEIGHT — the caller must supply one.
 *
 * There used to be a `h-12 lg:h-16` default here, and it caused a real bug:
 * `LogoSwap` passes `h-full`, and tailwind-merge cannot drop a *breakpoint*
 * class in favour of an unprefixed one, so the merged result was
 * `lg:h-16 h-full`. Above `lg` the image ignored its wrapper and rendered at a
 * fixed 64px, which overflowed the bar and clipped "SINCE 1982".
 *
 * Leaving the height to the caller means there is nothing to lose the merge
 * against. Both call sites set it explicitly.
 */
export function Logo({
  variant = "primary",
  className,
  priority = false,
  /** Set on the decorative half of a cross-fading pair. */
  decorative = false,
}: {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  return (
    <Image
      src={VARIANTS[variant]}
      alt={decorative ? "" : ALT}
      width={W}
      height={H}
      priority={priority}
      className={cn("w-auto", className)}
    />
  );
}

/**
 * Cross-fading pair for the header, which sits over the dark hero on load and
 * over a light bar once scrolled.
 *
 * Both variants are rendered and their opacity swapped rather than swapping
 * `src`. Changing `src` mid-scroll causes a visible flash while the new file
 * decodes; two stacked images are both in memory and the transition is free.
 * The reversed copy is marked decorative so the alt text is announced once.
 */
export function LogoSwap({
  reversed,
  className,
}: {
  reversed: boolean;
  /**
   * Height for the pair — REQUIRED in practice. Both copies are `h-full`, so
   * the wrapper is the only thing setting the size; with no height class here
   * they fall back to their intrinsic 416px and blow out of the header.
   */
  className?: string;
}) {
  return (
    <span className={cn("relative block h-11 lg:h-14", className)}>
      <Logo
        variant="primary"
        priority
        className={cn(
          "h-full transition-opacity duration-base ease-out-quart",
          reversed && "opacity-0"
        )}
      />
      <Logo
        variant="reversed"
        priority
        decorative
        className={cn(
          "absolute top-0 left-0 h-full transition-opacity duration-base ease-out-quart",
          !reversed && "opacity-0"
        )}
      />
    </span>
  );
}

/**
 * The chevron alone, as inline SVG.
 *
 * Kept in code rather than as an image because its only job is decorative —
 * the oversized watermark in the footer — where it needs to inherit
 * `currentColor` and sit at 2.5% opacity. An <img> can't do that, and a
 * 500px-wide decorative PNG would be a wasted request.
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
