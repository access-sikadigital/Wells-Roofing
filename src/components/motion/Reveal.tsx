"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { easeOutExpo } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Delay in seconds */
  delay?: number;
  /** Initial vertical offset in px */
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
};

/**
 * Viewport-triggered fade/rise reveal (Motion).
 * Use for cards, copy blocks and media. For headline text use <TextReveal />.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.9,
  className,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration, delay, ease: [...easeOutExpo] }}
    >
      {children}
    </motion.div>
  );
}
