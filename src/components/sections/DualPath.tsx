"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPage } from "@/config/pages";

/**
 * Blueprint section — "Dual path".
 * The competitive gap the strategy doc identifies: rivals leave homeowners and
 * architects/builders on the same journey. This splits them at the top.
 *
 * Rebuilt as two full-height image panels rather than bordered text boxes —
 * the choice is between two kinds of project, so it should look like two kinds
 * of project. Each panel carries `.theme-dark`, so the semantic tokens invert
 * for free and the copy sits on the imagery without a single hardcoded colour.
 *
 * Photography: see docs/IMAGE-PROMPTS.md for the site-wide image plan.
 * Swap `image` below for the exported files once they land.
 */

const paths = [
  {
    eyebrow: "Homeowners",
    title: "Restoring or replacing a premium roof",
    copy: "Period, heritage and architecturally significant homes across the Peninsula, Bayside and inner Melbourne. Honest advice on whether to restore or re-roof.",
    href: getPage("natural-slate-roofing").url,
    cta: "Explore slate roofing",
    image: "/photography/roof-03.jpg",
    /** Alt text describes the roof, not the brand — it is editorial imagery. */
    alt: "Heritage slate roofline on a period Melbourne home",
  },
  {
    eyebrow: "Architects & Builders",
    title: "Specifying and sourcing natural slate",
    copy: "Premium Spanish slate supplied and specified for prestige builds — samples, technical spec support and lead times you can programme around.",
    href: getPage("for-architects-builders").url,
    cta: "Trade & specification",
    image: "/photography/roof-04.jpg",
    alt: "Natural slate laid in courses on a contemporary architect-led build",
  },
];

export function DualPath() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const q = gsap.utils.selector(el);

      // Panels wipe up into view, staggered.
      gsap.from(q("[data-panel]"), {
        clipPath: "inset(0% 0% 100% 0%)",
        yPercent: 6,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.14,
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });

      // Slow parallax drift on each panel's photograph, scrubbed to scroll.
      q("[data-panel-image]").forEach((image) => {
        gsap.fromTo(
          image,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: image.closest("[data-panel]"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="py-section">
      <Container>
        <SectionHeading
          eyebrow="Where to start"
          title="Two audiences. Two journeys."
          intro="Whether you own the home or specify the build, the path from here is different — pick yours."
        />

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2">
          {paths.map((path) => (
            <Link
              key={path.eyebrow}
              href={path.href}
              data-panel
              className="theme-dark group relative flex min-h-120 flex-col justify-end overflow-hidden rounded-card bg-background p-8 transition-shadow duration-slow ease-out-quart hover:shadow-lift lg:min-h-144 lg:p-10"
            >
              {/* Photograph — oversized so the parallax never exposes an edge */}
              <div
                data-panel-image
                className="absolute inset-x-0 inset-y-[-8%] transition-transform duration-slower ease-out-quart group-hover:scale-105"
              >
                <Image
                  src={path.image}
                  alt={path.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Navy scrim — holds contrast over any frame, deepens on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-opacity duration-slow ease-out-quart group-hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(180deg, rgb(6 21 50 / 0.45) 0%, rgb(6 21 50 / 0.65) 45%, rgb(6 21 50 / 0.94) 100%)",
                }}
              />

              <div className="relative">
                <p className="eyebrow flex items-center gap-3 text-accent">
                  <span className="h-0.5 w-8 bg-accent" aria-hidden />
                  {path.eyebrow}
                </p>

                <h3 className="mt-5 max-w-md font-display text-h3 font-extrabold uppercase tracking-tight text-foreground">
                  {path.title}
                </h3>

                <p className="mt-4 max-w-md text-small text-muted">
                  {path.copy}
                </p>

                <p className="mt-8 inline-flex items-center gap-3 font-display text-small font-bold uppercase tracking-wide text-foreground transition-colors group-hover:text-accent">
                  {path.cta}
                  <span className="inline-block h-0.5 w-6 bg-accent transition-all duration-base ease-out-quart group-hover:w-12" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
