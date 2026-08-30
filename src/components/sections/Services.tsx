"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Blueprint section — "Premium services", one card per material.
 *
 * Built in the same panel language as <DualPath /> so the homepage reads as
 * one system: full-bleed photograph, navy scrim, copy anchored to the foot of
 * the panel, `.theme-dark` so the semantic tokens invert for free.
 *
 * The material IS the product here, so it gets the whole panel rather than the
 * 80px swatch this used to carry — where slate read as a black disc and
 * concrete as grey mush. The oversized index numeral sits top-right, in the
 * dead space above the copy, as the one device that separates these cards
 * from the dual-path pair.
 *
 * Photography: the three material textures belong to this section and nowhere
 * else — texture works here because the material *is* the product. See
 * docs/IMAGE-PROMPTS.md (prompt C1). `terracotta-tile.jpg` is still 354×354
 * against a 480px-tall card and must be replaced before sign-off.
 */
export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      /*
       * DESKTOP ONLY — both animations below are gated behind `lg`.
       *
       * On a phone the three panels are stacked full-width, so each one fills
       * most of the viewport. At that size the clip-path wipe reads as the card
       * being half-drawn rather than as a reveal, and the scrubbed parallax has
       * to move the image while the card itself is already moving with the
       * scroll — the two cancel and the texture looks like it is sliding
       * independently of its own frame. Neither problem exists in the
       * three-across desktop grid, where the panels are small relative to the
       * viewport and the motion is peripheral.
       *
       * `gsap.matchMedia` is what makes this safe: it registers the tweens and
       * their ScrollTriggers only while the query matches and REVERTS them —
       * including the inline clip-path and transform — when it stops matching.
       * A plain `if (window.innerWidth > 1024)` would leave a phone that was
       * resized from desktop holding a half-clipped card forever.
       */
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isDesktop, reduced } = ctx.conditions as {
            isDesktop: boolean;
            reduced: boolean;
          };
          if (!isDesktop || reduced) return;

          const q = gsap.utils.selector(el);

          // Panels wipe up into view, staggered — matching DualPath.
          gsap.from(q("[data-panel]"), {
            clipPath: "inset(0% 0% 100% 0%)",
            yPercent: 6,
            duration: 1.4,
            ease: "expo.out",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top 75%", once: true },
          });

          // Slow parallax drift on each material, scrubbed to scroll, so the
          // texture behaves like a real surface passing the window.
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
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="services" className="py-section">
      <Container>
        <SectionHeading
          eyebrow="What We Roof"
          title="Natural slate, terracotta and concrete."
          /*
            CLIENT FEEDBACK v1 (compliance): the previous line claimed roofs are
            "never subcontracted". Wells operates on a subcontractor model by
            design, so that was factually false as written and a
            misleading-advertising risk under ACL s18.
            Reframed around quality control — the standard the installer works
            to — rather than their employment status. Do not reintroduce any
            claim about who employs the trades.
          */
          intro="Three materials, one standard. Every roof is specified, sourced and installed by specialist slate and tile trades working to the Wells standard."
        />

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
          {siteConfig.services.map((service) => (
            <Link
              key={service.number}
              href={service.href}
              data-panel
              className="theme-dark group relative flex min-h-120 flex-col justify-end overflow-hidden rounded-card bg-background p-8 transition-shadow duration-slow ease-out-quart hover:shadow-lift lg:min-h-140 lg:p-9"
            >
              {/* Material — oversized so the parallax never exposes an edge */}
              <div
                data-panel-image
                className="absolute inset-x-0 inset-y-[-8%] transition-transform duration-slower ease-out-quart group-hover:scale-105"
              >
                <Image
                  src={service.image}
                  alt={`${service.title} roofing material, laid detail`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
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

              {/* Index numeral, in the dead space above the copy */}
              <span
                aria-hidden
                className="absolute right-7 top-5 font-display text-[4.5rem] font-extrabold leading-none tracking-tighter text-white/15 transition-colors duration-slow ease-out-quart group-hover:text-white/25"
              >
                {service.number}
              </span>

              {service.flagship && (
                <span className="absolute left-8 top-8 rounded-pill bg-accent px-3 py-1.5 font-display text-[0.75rem] font-bold uppercase tracking-[0.14em] text-on-accent lg:left-9">
                  Flagship
                </span>
              )}

              <div className="relative">
                <p className="eyebrow flex items-center gap-3 text-accent">
                  <span className="h-0.5 w-8 bg-accent" aria-hidden />
                  {service.headline}
                </p>

                <h3 className="mt-5 font-display text-h3 font-extrabold uppercase tracking-tight text-foreground">
                  {service.title}
                </h3>

                <p className="mt-4 text-small text-muted">
                  {service.description}
                </p>

                <p className="mt-8 inline-flex items-center gap-3 font-display text-small font-bold uppercase tracking-wide text-foreground transition-colors group-hover:text-accent">
                  Learn more
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
