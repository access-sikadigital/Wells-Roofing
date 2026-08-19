import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be taught our custom scales, otherwise it guesses.
 *
 * Without this, `cn("text-h1", "text-white")` silently DROPS `text-h1` —
 * twMerge can't tell a custom font-size utility from a text-colour one and
 * assumes the later class wins. That was quietly killing heading sizes
 * anywhere a colour was passed alongside them.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "h4",
            "lead",
            "body",
            "small",
            "eyebrow",
          ],
        },
      ],
      shadow: [{ shadow: ["soft", "lift", "accent"] }],
      rounded: [{ rounded: ["card", "button", "pill"] }],
    },
  },
});

/** Merge Tailwind classes with correct precedence. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
