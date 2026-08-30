"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Button } from "@/components/ui/Button";

/**
 * Blueprint section — final CTA. The money moment, so it closes the page as a
 * spread rather than a centred band.
 *
 * Three decisions worth keeping:
 *
 *  · It is asymmetric and left-aligned. A centred stack reads as a template;
 *    the brand is structural, so the closing statement is set like one.
 *  · There is exactly ONE button. The phone is set as display type instead of
 *    a second button, so it stops competing with the primary action while
 *    still being the biggest thing on the right — which is what a high-intent
 *    caller is looking for anyway.
 *  · The background is the finished roof, not a texture. The last thing on the
 *    page should be the result you are buying.
 *
 * `id="contact"` is load-bearing — Hero and Craft both anchor to it.
 */
export function CTA() {
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

      // The rule draws the full width of the container, then the plate lifts.
      gsap
        .timeline({
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
          defaults: { ease: "expo.out" },
        })
        .from(q("[data-rule]"), {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
        })
        .from(q("[data-meta]"), { yPercent: 100, duration: 1 }, 0.25);

      // Slow push in on the roof behind, scrubbed — the page settles onto it.
      gsap.fromTo(
        q("[data-bg]"),
        { scale: 1.12, yPercent: -3 },
        {
          scale: 1,
          yPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="contact"
      className="theme-dark grain relative overflow-hidden py-section"
    >
      {/* The finished roof — the result, not a texture */}
      <div data-bg className="absolute inset-0">
        <Image
          src="/photography/roof-01.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Navy scrim — deep enough to carry display type at any frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgb(6 21 50 / 0.97) 0%, rgb(6 21 50 / 0.92) 45%, rgb(6 21 50 / 0.72) 100%)",
        }}
      />

      {/* Brand glow, low and off-centre so it never haloes the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 12% 115%, rgb(229 26 29 / 0.22) 0%, transparent 62%)",
        }}
      />

      <Container className="relative">
        {/* Structural rule across the full measure */}
        <span
          aria-hidden
          data-rule
          className="block h-px w-full bg-line-strong"
        />

        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:items-end lg:gap-10">
          {/* ---- The ask ---- */}
          <div className="lg:col-span-7">
            <Reveal y={12} duration={0.7}>
              <p className="eyebrow mb-6 flex items-center gap-3 text-accent">
                <span className="h-0.5 w-10 bg-accent" aria-hidden />
                Have a project to price?
              </p>
            </Reveal>

            <TextReveal
              as="h2"
              className="max-w-2xl font-display text-h1 uppercase text-white"
            >
              Send us your plans.
            </TextReveal>

            <Reveal delay={0.2}>
              <p className="mt-7 max-w-xl text-lead text-muted">
                Heritage restoration, a new slate roof or an
                architect-specified build — send the plans or the roofing
                specification and you&apos;ll get a straight, specialist
                answer.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-10">
                <Button
                  href={`mailto:${siteConfig.email}`}
                  variant="accent"
                  size="lg"
                  arrow
                >
                  Send Your Plans
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ---- The direct line ---- */}
          <div className="lg:col-span-5 lg:pb-2 lg:text-right">
            <Reveal delay={0.25}>
              <p className="eyebrow text-faint">Or speak to a specialist</p>

              {/*
                `inline-flex`, not `flex`. As a block-level flex container this
                link filled the column's full width, so the parent's
                `lg:text-right` had nothing to act on and the number sat hard
                left while the eyebrow above and the email below — both inline —
                sat right. Shrinking the box to its content lets text-align
                place it, and matches the email link directly beneath.

                `min-h-11` stays: it is what gives the number a 44px tap height
                on a phone, where a tel: link is the primary action.
              */}
              <a
                href={siteConfig.phoneHref}
                className="mt-4 inline-flex min-h-11 items-center font-display text-h2 font-extrabold tracking-tight text-white transition-colors duration-base ease-out-quart hover:text-accent"
              >
                {siteConfig.phone}
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-3 inline-flex min-h-11 items-center break-all text-small text-muted transition-colors hover:text-accent"
              >
                {siteConfig.email}
              </a>
            </Reveal>
          </div>
        </div>

        {/* ---- Signature ---- */}
        <div className="mt-16 overflow-hidden border-t border-line pt-8 lg:mt-20">
          <div
            data-meta
            className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between"
          >
            {/* Was `siteConfig.motto` — this band renders on every route, so
                the slate-only legacy line does not belong here. */}
            <p className="font-display text-h4 italic text-white/75">
              Specialist slate &amp; tile roofing {siteConfig.since.toLowerCase()}.
            </p>
            <p className="eyebrow text-faint">
              {siteConfig.strapline} — {siteConfig.since}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
