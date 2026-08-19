"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { projects, type Project, type ProjectMaterial } from "@/config/proof";
import { cn } from "@/lib/utils";

/**
 * Blueprint section — "Project gallery" / "Gallery" / "Before/after gallery" /
 * "Project proof" / "Local projects" / "Projects specified & supplied".
 *
 * One component serves all of them because they are the same section with a
 * different filter and heading; giving each its own file would have meant six
 * copies of the same grid drifting apart.
 *
 * ── Layout: a full-bleed horizontal rail ────────────────────────────────────
 * The previous version was a three-column grid whose first tile spanned two
 * columns. Six projects then occupy seven column-slots, leaving a single
 * orphaned tile stranded on the last row beside two empty cells — and because
 * the count is set by a `limit` prop and a material filter, almost every page
 * hit a different ragged ending.
 *
 * A rail removes the whole class of problem. Height is fixed by the tile, so
 * the section occupies the same vertical space whether it holds three projects
 * or thirty — it can never grow a ragged last row because there is only ever
 * one row. Adding projects costs scroll distance, not page height.
 *
 * It also runs the full width of the viewport rather than stopping at the
 * content measure. The rail's inner padding matches `Container`, so the first
 * tile still lines up with the heading above it while the strip itself bleeds
 * off both edges — which is what signals there is more to scroll to.
 *
 * ── Captions sit under the image, not over it ───────────────────────────────
 * Overlaying meant a scrim across the bottom two-fifths of every photograph,
 * darkening the exact part of a roof shot that carries the eave, gutter and
 * verge detail. Below the image costs one compact line of height and keeps the
 * photograph whole.
 *
 * Captions carry the suburb when there is one. That text is the local SEO
 * payload of this section — but `suburb` is optional precisely so a
 * placeholder project can never claim a location Wells did not work in.
 * See the rule at the top of src/config/proof.ts.
 *
 * With an empty `items` array it renders an honest in-production state rather
 * than an empty grid, so it is safe to place on every page today.
 */
export function ProjectGallery({
  eyebrow = "Proof",
  title = "Recent work.",
  intro,
  /** Show only these materials. Omit for everything. */
  material,
  /** Cap the number shown. */
  limit = 6,
  items = projects,
  /** Link through to the full gallery. */
  cta = true,
}: Readonly<{
  eyebrow?: string;
  title?: string;
  intro?: string;
  material?: ProjectMaterial | ProjectMaterial[];
  limit?: number;
  items?: Project[];
  cta?: boolean;
}>) {
  const root = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  const wanted = material
    ? Array.isArray(material)
      ? material
      : [material]
    : null;

  const shown = (
    wanted ? items.filter((p) => wanted.includes(p.material)) : items
  ).slice(0, limit);

  /**
   * A horizontal rail is unreachable with a plain mouse — a wheel scrolls the
   * page, not the strip. Trackpads and touch are fine, but a desktop mouse
   * needs a control, so the arrows below are the difference between this
   * section working and it looking broken.
   *
   * They only appear when the rail actually overflows: with a material filter
   * applied a page may show two projects that fit on screen, and arrows that
   * do nothing are worse than no arrows.
   */
  const syncScroll = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScroll({ left: el.scrollLeft > 4, right: el.scrollLeft < max - 4 });
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    syncScroll();
    el.addEventListener("scroll", syncScroll, { passive: true });
    const ro = new ResizeObserver(syncScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", syncScroll);
      ro.disconnect();
    };
  }, [syncScroll, shown.length]);

  const nudge = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const q = gsap.utils.selector(el);
      const tiles = q("[data-tile]");
      if (!tiles.length) return;

      // One timeline for the whole rail, not a trigger per tile. Every tile
      // sits on the same row, so per-tile triggers would all fire together and
      // the stagger would be invisible. Tiles arrive from the right, which is
      // also the direction the rail scrolls — the entrance doubles as a hint
      // that there is more off-screen.
      gsap
        .timeline({
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
          defaults: { ease: EASE.expo },
        })
        .from(tiles, {
          x: 56,
          opacity: 0,
          duration: 1.1,
          stagger: 0.09,
        })
        .from(
          q("[data-rule]"),
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.8,
            stagger: 0.09,
          },
          0.25
        );
    },
    { scope: root, dependencies: [shown.length] }
  );

  return (
    <section ref={root} className="py-section">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

        {shown.length === 0 ? (
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-2xl rounded-card border border-line bg-surface p-8 text-small text-muted">
              We&apos;re photographing recent work for this page. In the
              meantime, ask us for project references in your suburb — we can
              usually point you at a roof within a few streets.
            </p>
          </Reveal>
        ) : null}
      </Container>

      {shown.length > 0 && (
        /* Outside `Container` so the strip runs the full viewport width.
           `data-lenis-prevent` keeps smooth-scroll off it, so a trackpad
           swipe scrolls the rail instead of the page. */
        <div
          ref={scroller}
          data-lenis-prevent
          className="mt-12 overflow-x-auto overscroll-x-contain pb-2 lg:mt-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ol className="flex snap-x snap-mandatory gap-4 px-5 sm:px-8 lg:gap-6 lg:px-12">
            {shown.map((project, i) => (
              <li
                key={project.title + project.image}
                data-tile
                className="group w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[26vw]"
              >
                <figure>
                  {/* Fixed height is what keeps the section short and stops it
                      growing as projects are added. */}
                  <div className="relative h-64 overflow-hidden rounded-card bg-surface sm:h-72 lg:h-80">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 30vw"
                      className="object-cover transition-transform duration-slower ease-out-quart group-hover:scale-105"
                    />
                  </div>

                  <figcaption className="mt-4 flex items-baseline gap-3">
                    <span className="font-display text-small font-extrabold tabular-nums text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      data-rule
                      aria-hidden
                      className="mt-2 h-px w-5 shrink-0 bg-line-strong transition-colors duration-base group-hover:bg-accent"
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-display text-small font-extrabold uppercase tracking-wide text-foreground">
                        {project.title}
                      </span>
                      <span className="mt-0.5 block truncate text-small text-muted">
                        {project.suburb
                          ? `${project.material} · ${project.suburb}`
                          : project.material}
                        {project.beforeAfter && " · Before / after"}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
        </div>
      )}

      <Container>
        {(canScroll.left || canScroll.right) && (
          <div className="mt-8 flex items-center gap-3">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => nudge(dir)}
                disabled={dir === -1 ? !canScroll.left : !canScroll.right}
                aria-label={dir === -1 ? "Previous projects" : "Next projects"}
                className="flex size-12 items-center justify-center rounded-full border border-line text-foreground transition-colors duration-base hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
              >
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden
                  className={cn("size-4", dir === -1 ? "rotate-90" : "-rotate-90")}
                >
                  <path
                    d="M2.5 4.5 6 8l3.5-3.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
        )}

        {cta && (
          <Reveal delay={0.25}>
            <div className="mt-16">
              <Button href="/projects" variant="outline" size="lg" arrow>
                View all projects
              </Button>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

/**
 * Compact variant for the location hubs — "Local projects".
 * Same data, no CTA, and it says plainly when there is nothing region-specific
 * to show yet rather than padding with unrelated work.
 */
export function LocalProjects({ region }: Readonly<{ region: string }>) {
  const local = projects.filter((p) => p.suburb);

  return (
    <ProjectGallery
      eyebrow="Local proof"
      title={`Recent work around ${region}.`}
      intro={
        local.length === 0
          ? undefined
          : `Real projects in the region — every one of them a roof you could drive past.`
      }
      items={local}
      limit={4}
      cta={local.length > 0}
    />
  );
}
