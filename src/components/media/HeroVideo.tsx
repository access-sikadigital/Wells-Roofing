"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * HERO BACKGROUND VIDEO
 * =====================
 * One silent, seamlessly-looping clip behind a hero band. Deliberately small
 * in scope: this is *decoration*, and every branch below exists so that when
 * the decoration cannot play, the page is still exactly right.
 *
 * The poster does the real work. It ships in the server HTML as an <img>, so
 * it is the LCP element and paints on the first frame regardless of whether
 * the video ever arrives. The <video> is only mounted client-side, fades in
 * once it can actually play, and is layered *over* the poster — so a failed
 * decode, a slow network or a blocked autoplay policy all degrade to "the
 * still image you were already looking at" rather than a black rectangle.
 *
 * Three things are handled without configuration:
 *
 *  · prefers-reduced-motion  → the <video> is never mounted, so the file is
 *    never requested. Not merely paused: paused still costs the download.
 *  · scrolled out of view    → playback pauses. A hero video quietly decoding
 *    four sections below the fold is pure battery cost.
 *  · error / stall           → `canplay` never fires, opacity stays 0, poster
 *    remains. No error state to design.
 *
 * The clips are pre-processed so the last second crossfades back into the
 * first (see docs/HERO-VIDEO-BRIEF.md). `loop` therefore never shows a cut,
 * which is what lets a 9-second file feel endless.
 */
export function HeroVideo({
  src,
  poster,
  className,
  /** Matches the still treatment on photo heroes. */
  opacity = "opacity-30",
}: {
  src: string;
  poster: string;
  className?: string;
  opacity?: string;
}) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  /*
   * Mount the <video> only after hydration, and only when motion is welcome.
   * Doing this in an effect rather than at render keeps the server HTML and
   * the first client render identical — mounting it during render would be a
   * hydration mismatch.
   */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setEnabled(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /**
   * THE HANDOFF — why this is a hard swap on frame 0, not a cross-fade.
   *
   * The previous version faded the video in over the poster across 1000ms.
   * That looked correct on paper — the poster IS frame 0 of the clip — but the
   * video autoplays the moment it can, so by the time the fade ran it was
   * already a second or more into the shot. The result was a full second of
   * two DIFFERENT frames blended together: a static frame 0 ghosted over a
   * moving frame ~30. On a slow drone pan that reads as a rendering glitch for
   * the first second or two of every fresh page load.
   *
   * Seeking back to 0 before revealing makes the video's first visible frame
   * pixel-identical to the poster, so the swap has nothing to cross-fade and
   * the transition genuinely is invisible. The poster is then hidden outright
   * so the two are never composited.
   */
  const handleCanPlay = () => {
    const el = ref.current;
    if (el && el.currentTime > 0.05) el.currentTime = 0;
    setReady(true);
  };

  /* Pause once the hero has scrolled away; resume when it comes back. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden", className)}>
      {/*
        Plain <img>, not next/image. The poster is a fixed full-bleed
        background at one size, so the srcSet machinery buys nothing, and
        next/image would add a wrapper that complicates stacking the video
        exactly on top of it.
      */}
      {/*
        The poster is HIDDEN the instant the video takes over, rather than
        being cross-faded under it. See the note on `handleCanPlay`.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        className={cn(
          "absolute inset-0 size-full object-cover",
          ready ? "opacity-0" : opacity
        )}
      />

      {enabled && (
        <video
          ref={ref}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={handleCanPlay}
          className={cn(
            "absolute inset-0 size-full object-cover",
            ready ? opacity : "opacity-0"
          )}
        />
      )}
    </div>
  );
}
