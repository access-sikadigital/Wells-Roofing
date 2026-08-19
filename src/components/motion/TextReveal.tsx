"use client";

import { type ElementType, type ReactNode, useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Seconds before the reveal starts */
  delay?: number;
  /** Per-line stagger in seconds */
  stagger?: number;
  /** If false, plays on scroll into view; if true, plays immediately (hero) */
  immediate?: boolean;
};

/**
 * Masked line-by-line headline reveal (GSAP SplitText).
 * The signature "premium" text entrance: lines rise out of an overflow mask.
 */
export function TextReveal({
  children,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.09,
  immediate = false,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }

      const split = new SplitText(el, {
        type: "lines",
        linesClass: "tr-line",
      });

      // Wrap each line in an overflow mask
      split.lines.forEach((line) => {
        const mask = document.createElement("div");
        mask.style.overflow = "hidden";
        mask.style.display = "block";
        line.parentNode?.insertBefore(mask, line);
        mask.appendChild(line);
      });

      gsap.set(el, { autoAlpha: 1 });
      gsap.from(split.lines, {
        yPercent: 115,
        duration: 1.2,
        ease: "expo.out",
        stagger,
        delay,
        ...(immediate
          ? {}
          : {
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
              },
            }),
      });

      return () => split.revert();
    },
    { scope: ref }
  );

  /**
   * NOTE: we do NOT render `visibility:hidden` in the server HTML.
   * A heading that ships as hidden text is an SEO liability. Instead the
   * `data-text-reveal` hook is only hidden once the inline script in
   * layout.tsx has added `.js` to <html> — so crawlers and no-JS users
   * always receive a visible H1, and JS users still get a clean reveal.
   */
  return (
    <Tag ref={ref} data-text-reveal className={cn("block", className)}>
      {children}
    </Tag>
  );
}
