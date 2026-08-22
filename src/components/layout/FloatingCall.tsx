"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { siteConfig } from "@/config/site";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Sitewide floating call button, bottom-right.
 *
 * Phone is the primary conversion path for this business — an $80k slate job
 * starts with a conversation, not a form — so the number should be one thumb
 * away on every page without scrolling back to the header.
 *
 * Two parts:
 *
 *  · **The pill** — icon + number only. Kept deliberately small: it sits over
 *    live content on every page, so it has to be reachable without being the
 *    loudest thing on screen.
 *
 *  · **The chip** — a rotating question above it, changing every few seconds.
 *    Instead of announcing what the button is, it names the problem the
 *    visitor already has. "Slipped or cracked slates?" converts better than
 *    "Call us" because it's about them.
 *
 * NO PULSE. The expanding-halo treatment was removed on purpose: every
 * plumber and locksmith site runs one, so it reads as a template rather than a
 * premium brand, and a red ring throbbing in the corner competes with the
 * copy it sits beside. The movement that remains is the handset ring and a
 * slow sheen — both distinctive, neither a pulse — and the rotating chip is
 * what actually catches the eye.
 *
 * Other decisions worth keeping:
 *  · Hidden until scrolled past the hero (which already has two CTAs).
 *  · Chip is desktop-only; on a phone it would span the screen and cover
 *    content, so small screens get the pill alone.
 *  · Chip colour inverts against the section behind it — see the observer.
 *  · Fully still under `prefers-reduced-motion`.
 */

/**
 * Rotating prompts. Three to five words, phrased as the visitor's problem
 * rather than Wells' service. Safe to edit — the chip is a fixed width, so
 * keep them under ~30 characters or they'll wrap.
 */
const callPrompts = [
  "Slipped or cracked slates?",
  "Roof leaking again?",
  "Repair or replacement?",
  "Heritage roof needs work?",
  "Planning a re-roof?",
  "Specifying slate?",
  "Terracotta tiles tired?",
  "Want a straight answer?",
] as const;

const PROMPT_MS = 3600;

export function FloatingCall() {
  const [visible, setVisible] = useState(false);
  const [prompt, setPrompt] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  /* Reveal once the hero is behind us. */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 0.6);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Advance the question. Paused while hidden so it isn't cycling off screen. */
  useEffect(() => {
    if (reduce || !visible) return;
    const id = window.setInterval(
      () => setPrompt((i) => (i + 1) % callPrompts.length),
      PROMPT_MS
    );
    return () => window.clearInterval(id);
  }, [reduce, visible]);

  /* Animate each new question in. */
  useGSAP(
    () => {
      const el = promptRef.current;
      if (!el || reduce) return;
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 9 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: EASE.expo }
      );
    },
    { dependencies: [prompt, reduce] }
  );

  /* Entrance, then a quiet periodic ring. */
  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      gsap.to(el, {
        autoAlpha: visible ? 1 : 0,
        y: visible ? 0 : 20,
        duration: reduce ? 0 : 0.5,
        ease: EASE.expo,
        pointerEvents: visible ? "auto" : "none",
      });

      if (reduce || !visible) return;

      const handset = el.querySelector("[data-handset]");
      const sheen = el.querySelector("[data-sheen]");
      if (!handset || !sheen) return;

      // Long repeatDelay on purpose — this should register as an occasional
      // detail, not a loop the eye starts tracking.
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 7 });

      tl.to(handset, {
        keyframes: {
          rotate: [0, -16, 12, -10, 7, -4, 0],
          transformOrigin: "50% 60%",
        },
        duration: 0.75,
        ease: "none",
      }).fromTo(
        sheen,
        { xPercent: -140 },
        { xPercent: 140, duration: 1.1, ease: "power2.inOut" },
        0.1
      );

      return () => {
        tl.kill();
      };
    },
    { scope: root, dependencies: [visible, reduce] }
  );

  return (
    <div
      ref={root}
      className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2.5 opacity-0 sm:right-6 sm:bottom-6"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      {/*
        Prompt chip. Fixed width and centred text, so the question can change
        without the chip resizing on every swap — an auto-width chip snapping
        between eight widths draws the eye for the wrong reason.
      */}
      <div className="relative hidden sm:block">
        {/*
          FIXED white — deliberately not adaptive.

          An earlier version inverted this against the section behind it. It
          was technically clever and looked wrong: a colour flip is itself a
          change the eye catches, so the chip pulled focus every time you
          crossed a section boundary — the same "look at me" behaviour the
          pulse was removed for. One colour, always.

          White works over the dark sections on its own. Over the light ones it
          shares its background colour, so `shadow-chip` is what holds the
          edge — a tighter, darker shadow than `lift` for exactly that reason.
          The hairline ring adds definition the shadow alone can't give at the
          top edge, where the shadow falls away.

          Explicit primitives rather than semantic tokens on purpose — the chip
          must NOT inherit the surrounding theme, which is what tokens do.
        */}
        <div
          className={cn(
            "flex h-10 w-60 items-center justify-center rounded-pill px-4",
            "bg-white text-navy-900 shadow-chip ring-1 ring-navy-900/8"
          )}
        >
          {/*
            aria-live is deliberately absent: this is decorative marketing copy
            on a rotation, and announcing a new question every 3.6 seconds
            would make a screen reader unusable. The button's own aria-label
            already says what it does.
          */}
          <span
            ref={promptRef}
            aria-hidden
            className="block text-center font-display text-[0.8125rem] leading-none font-bold tracking-tight"
          >
            {callPrompts[prompt]}
          </span>
        </div>

        {/* Tail — points at the button, so the chip reads as the button speaking */}
        {/* Tail sits UNDER the chip (-z-10) so the chip's own shadow and ring
            aren't drawn across it — otherwise the join shows as a seam. */}
        <span
          aria-hidden
          className="absolute -bottom-1 right-7 -z-10 size-2.5 rotate-45 bg-white shadow-chip"
        />
      </div>

      <a
        href={siteConfig.phoneHref}
        aria-label={`Call ${siteConfig.name} on ${siteConfig.phone}`}
        className={cn(
          "group relative flex items-center gap-2.5 overflow-hidden rounded-pill bg-accent p-2 text-on-accent shadow-lift",
          "transition-[transform,background-color] duration-base ease-out-quart",
          "hover:-translate-y-0.5 hover:bg-accent-hover active:scale-95",
          "sm:pr-5"
        )}
      >
        {/* Sheen — clipped by the pill's overflow, which is the point:
            it travels across the surface, not beyond it. */}
        <span
          data-sheen
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-white/20 blur-md"
        />

        <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15">
          <svg
            data-handset
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            aria-hidden
          >
            <path
              d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1l-2.22 2.2z"
              fill="currentColor"
            />
          </svg>
        </span>

        {/* Number only — the chip above carries the message now */}
        <span className="relative hidden font-display text-small leading-none font-extrabold tracking-tight sm:block">
          {siteConfig.phone}
        </span>
      </a>
    </div>
  );
}
