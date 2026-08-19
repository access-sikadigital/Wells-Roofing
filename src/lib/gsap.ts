"use client";

/**
 * Central GSAP setup.
 * Import gsap ONLY from this file so plugins are registered once.
 *
 *   import { gsap, ScrollTrigger, SplitText, useGSAP, EASE } from "@/lib/gsap";
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1 });
}

/** House easing names — keep GSAP + Motion + CSS in sync. */
export const EASE = {
  out: "power3.out",
  expo: "expo.out",
  inOut: "power2.inOut",
} as const;

export { gsap, ScrollTrigger, SplitText, useGSAP };
