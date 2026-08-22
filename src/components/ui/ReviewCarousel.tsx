"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ReviewCard } from "@/components/ui/ReviewCard";
import type { Testimonial } from "@/config/proof";

/**
 * Infinite, continuously-moving, drag-scrubbable review marquee.
 *
 * Built by hand rather than pulled from a carousel library, because the three
 * behaviours asked for here fight each other in most libraries: constant
 * autoplay, free-form dragging, and a seam-free wrap. Embla/Swiper autoplay
 * steps card-to-card and stutters on drag release; a CSS `@keyframes` marquee
 * can't be dragged at all. One rAF loop owning a single `offset` value does
 * all three cleanly.
 *
 * How the loop works
 * ------------------
 * The item list is rendered TWICE. `offset` is the track's translateX, and it
 * is wrapped modulo the width of one set — so when the first set has scrolled
 * fully out of view, offset resets by exactly one set width and the second set
 * is sitting pixel-identical where the first was. The reset is invisible
 * because nothing on screen moves.
 *
 * Drag adds to the same `offset`, so dragging and autoplay are never fighting
 * over two different sources of truth. On release, the pointer velocity decays
 * into the base speed rather than stopping dead.
 *
 * Accessibility / perf
 * --------------------
 * · `prefers-reduced-motion` → no rAF at all. Falls back to a native
 *   scroll-snap row that the user drives themselves.
 * · Pauses when the tab is hidden and when the section is off screen, so it
 *   isn't burning a rAF loop on a page nobody is looking at.
 * · The duplicated second set is `aria-hidden`, so screen readers hear each
 *   review once.
 * · `touch-action: pan-y` keeps vertical page scrolling working on mobile
 *   while horizontal drags are captured here.
 */

type Props = {
  items: Testimonial[];
  /** Pixels per second. Slow is more premium; 25–45 is the useful range. */
  speed?: number;
};

export function ReviewCarousel({ items, speed = 32 }: Props) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  const offset = useRef(0);
  /** Width of ONE set of cards — the wrap distance. */
  const setWidth = useRef(0);
  const paused = useRef(false);
  const dragging = useRef(false);
  const velocity = useRef(0);

  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const lastX = useRef(0);
  const lastT = useRef(0);

  const [reduced, setReduced] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /** Keep `offset` inside (-setWidth, 0] so the two sets alias perfectly. */
  const wrap = useCallback(() => {
    const w = setWidth.current;
    if (w <= 0) return;
    while (offset.current <= -w) offset.current += w;
    while (offset.current > 0) offset.current -= w;
  }, []);

  /* ---- measure one set, and re-measure on resize ---- */
  useEffect(() => {
    if (reduced) return;
    const el = track.current;
    if (!el) return;

    const measure = () => {
      // Two identical sets are rendered, so one set is half the scroll width.
      setWidth.current = el.scrollWidth / 2;
      wrap();
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [reduced, items.length, wrap]);

  /* ---- the single animation loop ---- */
  useEffect(() => {
    if (reduced) return;
    const el = track.current;
    if (!el) return;

    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(now - last, 64); // clamp after a tab switch
      last = now;

      if (!dragging.current) {
        if (Math.abs(velocity.current) > 0.02) {
          // Momentum from the last drag, decaying toward the base speed.
          offset.current += velocity.current * dt;
          velocity.current *= Math.pow(0.94, dt / 16.67);
        } else if (!paused.current) {
          offset.current -= (speed / 1000) * dt;
        }
      }

      wrap();
      el.style.transform = `translate3d(${offset.current}px,0,0)`;
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    const onVisibility = () => {
      // Reset the clock on return so it doesn't lurch forward by the whole
      // time the tab was hidden.
      last = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced, speed, wrap]);

  /* ---- stop entirely while off screen ---- */
  useEffect(() => {
    if (reduced) return;
    const el = viewport.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        paused.current = !entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  /* ---- drag ---- */
  const onPointerDown = (e: React.PointerEvent) => {
    if (reduced) return;
    dragging.current = true;
    setIsDragging(true);
    velocity.current = 0;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offset.current;
    lastX.current = e.clientX;
    lastT.current = performance.now();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    offset.current = dragStartOffset.current + (e.clientX - dragStartX.current);

    const now = performance.now();
    const dt = now - lastT.current;
    if (dt > 0) {
      // px per ms, smoothed a little so a single jittery event can't fling it
      const v = (e.clientX - lastX.current) / dt;
      velocity.current = velocity.current * 0.6 + v * 0.4;
      lastX.current = e.clientX;
      lastT.current = now;
    }
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);
    // If the pointer was held still before release, don't throw it.
    if (performance.now() - lastT.current > 90) velocity.current = 0;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  /* ---- reduced motion: a plain, user-driven scroll row ---- */
  if (reduced) {
    return (
      <div
        className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8"
        role="region"
        aria-label="Customer reviews"
      >
        {items.map((review, i) => (
          <div key={i} className="snap-start">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={viewport}
      role="region"
      aria-label="Customer reviews"
      aria-roledescription="carousel"
      className="relative overflow-hidden"
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{
        touchAction: "pan-y",
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      {/* Edge fades — the row should look like it continues past the viewport
          rather than being cut off at the container edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-surface to-transparent sm:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-surface to-transparent sm:w-24"
      />

      {/*
        The gap lives as padding on each card rather than `gap-5` on the track.
        With a flex gap, two sets measure `2×set + gap`, so `scrollWidth / 2`
        is half a gap short of a true set width — and the wrap lands 10px off
        every cycle, which reads as a visible tick. Padding makes both sets
        exactly equal, so scrollWidth / 2 is exact.
      */}
      <div ref={track} className="flex w-max select-none will-change-transform">
        {[0, 1].map((set) => (
          <div
            key={set}
            className="flex"
            /* Second set is a visual duplicate — read the reviews once. */
            aria-hidden={set === 1 || undefined}
          >
            {items.map((review, i) => (
              <div key={i} className="pr-5">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
