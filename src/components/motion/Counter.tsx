"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

type CounterProps = {
  /** Target value */
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Count-up stat (anime.js v4), triggered when scrolled into view.
 */
export function Counter({
  to,
  suffix = "",
  duration = 1800,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      el.textContent = `${to}${suffix}`;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || played.current) return;
        played.current = true;
        observer.disconnect();

        const state = { value: 0 };
        animate(state, {
          value: to,
          duration,
          ease: "outExpo",
          onUpdate: () => {
            el.textContent = `${Math.round(state.value)}${suffix}`;
          },
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
