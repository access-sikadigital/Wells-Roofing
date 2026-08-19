"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type HeroVideoProps = {
  /** Ordered clip sources. 2+ clips gives a true never-ending sequence. */
  clips: readonly string[];
  /** Still shown before first paint, on reduced-motion, and on failure. */
  poster: string;
  posterAlt?: string;
  /** Crossfade length in seconds. */
  fade?: number;
  className?: string;
};

/**
 * Never-ending hero video background.
 *
 * Two stacked <video> layers crossfade into each other. As one clip nears its
 * end the next begins underneath and the opacity swaps; once the fade is done
 * the retired layer quietly preloads the following clip. With N clips the
 * sequence cycles forever with no visible seam, cut or restart — so no single
 * clip ever has to loop perfectly on itself.
 *
 * Also handles:
 *  - prefers-reduced-motion  → static poster only, no video fetched
 *  - element scrolled off screen → pauses (saves battery/CPU)
 *  - decode or network failure → falls back to the poster
 */
export function HeroVideo({
  clips,
  poster,
  posterAlt = "",
  fade = 1.5,
  className,
}: HeroVideoProps) {
  const layerA = useRef<HTMLVideoElement>(null);
  const layerB = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  /** Which layer is currently visible: 0 = A, 1 = B */
  const [active, setActive] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  /** Index of the next clip to queue into whichever layer is hidden. */
  const nextClip = useRef(0);
  /** Guards against timeupdate firing the swap more than once per clip. */
  const swapping = useRef(false);

  const getLayer = useCallback(
    (i: number) => (i === 0 ? layerA.current : layerB.current),
    []
  );

  /* ---- Enable only when motion is welcome and we have clips ---- */
  useEffect(() => {
    if (clips.length === 0) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setEnabled(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [clips.length]);

  /* ---- Prime both layers, then start layer A ---- */
  useEffect(() => {
    if (!enabled || failed) return;
    const a = layerA.current;
    const b = layerB.current;
    if (!a || !b) return;

    a.src = clips[0];
    a.load();
    void a.play().catch(() => {
      /* autoplay refused — poster remains, harmless */
    });

    if (clips.length > 1) {
      b.src = clips[1];
      b.load();
      nextClip.current = 2 % clips.length;
    } else {
      nextClip.current = 0;
    }
  }, [enabled, failed, clips]);

  /* ---- Pause while off screen ---- */
  useEffect(() => {
    if (!enabled || failed) return;
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const live = getLayer(active);
        if (!live) return;
        if (entry.isIntersecting) void live.play().catch(() => {});
        else live.pause();
      },
      { threshold: 0.01 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [enabled, failed, active, getLayer]);

  /* ---- Crossfade handoff ---- */
  const handleTimeUpdate = useCallback(
    (layer: number) => {
      if (layer !== active || swapping.current) return;
      if (clips.length < 2) return;

      const current = getLayer(layer);
      const incoming = getLayer(1 - layer);
      if (!current || !incoming || !Number.isFinite(current.duration)) return;

      if (current.duration - current.currentTime > fade) return;

      swapping.current = true;
      incoming.currentTime = 0;
      void incoming.play().catch(() => {});
      setActive(1 - layer);

      // Once the fade has finished, queue the following clip into the
      // layer that just went dark.
      window.setTimeout(
        () => {
          const retired = getLayer(layer);
          if (retired) {
            retired.pause();
            retired.src = clips[nextClip.current];
            retired.load();
            nextClip.current = (nextClip.current + 1) % clips.length;
          }
          swapping.current = false;
        },
        fade * 1000 + 120
      );
    },
    [active, clips, fade, getLayer]
  );

  const videoClasses = "absolute inset-0 size-full object-cover";
  const transition = { transitionDuration: `${fade}s` };

  return (
    <div ref={rootRef} className={cn("absolute inset-0", className)}>
      {/* Poster — always rendered beneath as the guaranteed floor */}
      <Image
        src={poster}
        alt={posterAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {enabled && !failed && (
        <>
          <video
            ref={layerA}
            muted
            playsInline
            preload="auto"
            aria-hidden
            onTimeUpdate={() => handleTimeUpdate(0)}
            onCanPlay={() => setReady(true)}
            onError={() => setFailed(true)}
            loop={clips.length === 1}
            className={cn(
              videoClasses,
              "transition-opacity ease-in-out",
              active === 0 && ready ? "opacity-100" : "opacity-0"
            )}
            style={transition}
          />
          <video
            ref={layerB}
            muted
            playsInline
            preload="auto"
            aria-hidden
            onTimeUpdate={() => handleTimeUpdate(1)}
            onError={() => setFailed(true)}
            className={cn(
              videoClasses,
              "transition-opacity ease-in-out",
              active === 1 && ready ? "opacity-100" : "opacity-0"
            )}
            style={transition}
          />
        </>
      )}
    </div>
  );
}
