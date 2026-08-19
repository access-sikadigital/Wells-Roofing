import type { Transition, Variants } from "motion/react";

/**
 * Shared Motion (Framer) primitives.
 * Mirrors the CSS motion tokens in globals.css (--ease-out-expo, durations).
 */

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeOutQuart = [0.25, 1, 0.5, 1] as const;

export const transitions = {
  base: { duration: 0.5, ease: easeOutQuart } satisfies Transition,
  slow: { duration: 0.9, ease: easeOutExpo } satisfies Transition,
  spring: { type: "spring", stiffness: 260, damping: 28 } satisfies Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.slow,
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.slow },
};

export const staggerChildren = (stagger = 0.1, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});
