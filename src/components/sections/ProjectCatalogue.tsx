"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type {
  CataloguePhoto,
  ProjectCatalogue as Catalogue,
} from "@/config/proof";
import { cn } from "@/lib/utils";

/**
 * Grid-thumbnail path for a photo: same file name in a `thumbs/` folder
 * beside it (1200px wide, generated when the photos were added).
 */
const thumbOf = (src: string) => src.replace(/\/([^/]+)$/, "/thumbs/$1");

/**
 * How many grid cells a tile spans. The row track is short, so spans set the
 * tile's shape:
 *  · portrait (3:4)       → 1 column × 3 rows, a tall tile
 *  · wide (16:9)          → 2 columns × 3 rows, a letterbox tile
 *  · feature landscape    → 2 columns × 4 rows — the cover and every sixth
 *                           landscape, so large tiles recur through the set
 *  · other landscape (4:3) → 1 column × 2 rows
 */
function tileSpan(photo: CataloguePhoto, i: number, cover: number) {
  const ratio = photo.width / photo.height;
  if (ratio < 1) return "row-span-3";
  if (ratio > 1.5) return "col-span-2 row-span-3";
  if (i === cover || i % 6 === 0) return "col-span-2 row-span-4";
  return "row-span-2";
}

/**
 * Full photo set for one project, with a click-to-enlarge viewer.
 *
 * ── Grid ───────────────────────────────────────────────────────────────────
 * Masonry grid: CSS grid with a short row track, tiles spanning rows and
 * columns by shape (see `tileSpan`), and `grid-flow-dense` so smaller tiles
 * fill the gaps beside larger ones. Photos are `object-cover` inside their
 * tile, so there is a light crop; the viewer always shows the full frame.
 *
 * ── Images ─────────────────────────────────────────────────────────────────
 * Tiles load pre-sized 1200px thumbnails and the viewer loads the 2400px
 * file, both `unoptimized` — they are already web-sized and stripped, so
 * they are served as they are rather than re-encoded on request. That also
 * keeps the gallery independent of the on-demand image optimiser, whose
 * dev-server cache left the first four tiles blank.
 *
 * ── Viewer ─────────────────────────────────────────────────────────────────
 * Native <dialog> + showModal(): focus trapping, Esc to close and the inert
 * page behind all come from the browser. Arrow keys and the on-screen buttons
 * step through the set; a horizontal swipe does the same on a phone.
 *
 * `data-lenis-prevent` stops smooth-scroll from hijacking the wheel while the
 * viewer is open, and the page's own scroll is locked for the same reason.
 */
export function ProjectCatalogue({
  catalogue,
}: Readonly<{ catalogue: Catalogue }>) {
  const { photos } = catalogue;
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };

  const close = () => dialog.current?.close();

  const step = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) =>
        i === null ? i : (i + dir + photos.length) % photos.length
      ),
    [photos.length]
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    // Fires for Esc, the close button and backdrop clicks alike.
    const onClose = () => {
      setIndex(null);
      document.documentElement.style.overflow = "";
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    el.addEventListener("close", onClose);
    el.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("close", onClose);
      el.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [step]);

  const current = index === null ? null : photos[index];

  return (
    <section className="py-section">
      <Container>
        <SectionHeading
          eyebrow="Project gallery"
          title={`${catalogue.title}, in ${photos.length} photographs.`}
          intro="Select any photograph to see it full size."
        />

        {/* 2 columns on phones, 3 on tablets, 4 on desktop. The row track
            grows with the column width so tile shapes hold at every size. */}
        <ul className="mt-12 grid grid-flow-dense auto-rows-18 grid-cols-2 gap-3 md:auto-rows-24 md:grid-cols-3 lg:mt-16 lg:auto-rows-30 lg:grid-cols-4 lg:gap-4">
          {photos.map((photo, i) => (
            <li key={photo.src} className={tileSpan(photo, i, catalogue.cover)}>
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`View photo ${i + 1} of ${photos.length}: ${photo.alt}`}
                className="group relative block size-full overflow-hidden rounded-card bg-surface"
              >
                <Image
                  src={thumbOf(photo.src)}
                  alt={photo.alt}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-slower ease-out-quart group-hover:scale-105"
                />
                {/* Soft darkening on hover so the tile reads as clickable. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-navy-950/0 transition-colors duration-base group-hover:bg-navy-950/15"
                />
              </button>
            </li>
          ))}
        </ul>
      </Container>

      <dialog
        ref={dialog}
        data-lenis-prevent
        aria-label={`${catalogue.title} photographs`}
        onClick={(e) => {
          // A click on the dialog itself (not its contents) is the backdrop.
          if (e.target === e.currentTarget) close();
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
        className="fixed inset-0 m-0 size-full max-h-none max-w-none overflow-hidden overscroll-contain bg-navy-950/95 p-0 text-white backdrop:bg-navy-950/80"
      >
        {current && index !== null && (
          <div className="flex size-full flex-col">
            <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
              <p className="font-display text-small font-bold tabular-nums">
                {index + 1} / {photos.length}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex size-11 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-accent hover:text-accent"
              >
                <svg viewBox="0 0 12 12" fill="none" aria-hidden className="size-4">
                  <path d="m2.5 2.5 7 7m0-7-7 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="relative min-h-0 flex-1" onClick={(e) => e.target === e.currentTarget && close()}>
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                unoptimized
                className="object-contain"
                priority
              />

              {([-1, 1] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => step(dir)}
                  aria-label={dir === -1 ? "Previous photo" : "Next photo"}
                  className={cn(
                    "absolute top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/60 ring-1 ring-white/25 transition-colors hover:bg-accent hover:ring-accent",
                    dir === -1 ? "left-3 sm:left-6" : "right-3 sm:right-6"
                  )}
                >
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden
                    className={cn("size-4", dir === -1 ? "rotate-90" : "-rotate-90")}
                  >
                    <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>

            <p className="px-5 py-4 text-center text-small text-stone-300 sm:px-8">
              {current.alt}
            </p>
          </div>
        )}
      </dialog>
    </section>
  );
}
