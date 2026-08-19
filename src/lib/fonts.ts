import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";

/**
 * Type pairing — matched to the Wells Roofing brand assets.
 * ---------------------------------------------------------
 * Montserrat        — geometric grotesque. Closest widely-available match to
 *                     the "WELLS ROOFING" logo lockup. Used for all headings,
 *                     eyebrows and the wordmark via `font-display`.
 * Plus Jakarta Sans — modern humanist sans matching the EDM body setting.
 *                     Used for body copy and UI via `font-sans`.
 */

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});
