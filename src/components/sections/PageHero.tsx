import { type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { HeroVideo } from "@/components/media/HeroVideo";
import { cn } from "@/lib/utils";
import type { PageSpec } from "@/config/pages";

type PageHeroProps = {
  page: PageSpec;
  /** Short supporting line under the H1. */
  intro: string;
  /**
   * Background image path. Required, not defaulted — a default is how one
   * photograph quietly ends up on several routes. Every caller passes its own.
   *
   */
  image: string;
  /**
   * Optional looping background film, for the three material pages the client
   * supplied footage for. When set it REPLACES `image` — the video's own
   * poster frame becomes the still, so the handoff from image to film is
   * invisible instead of a cross-dissolve between two different photographs.
   *
   * `image` is still required alongside it. That is deliberate: it is the
   * fallback the page falls back *to* if the footage is ever pulled, and it
   * keeps every route honest about owning a photograph.
   */
  video?: { src: string; poster: string };
  /** Primary CTA override. */
  cta?: { label: string; href: string };
  /**
   * Optional panel beside the hero copy — used by /contact to put the quote
   * form above the fold instead of making people scroll to it.
   *
   * When present the hero becomes a two-column layout and the CTA buttons are
   * dropped: a "Get a Quote" button sitting next to the actual quote form is
   * a second door to the room you are already standing in. The phone number
   * stays, as the alternative to filling anything in.
   */
  aside?: ReactNode;
};

/**
 * Blueprint section 1 — "Hero + offer".
 * Used by every page except Home (which has its own film hero).
 * The H1 always comes from the page spec so it matches the SEO workbook.
 *
 * The band is a **fixed height** (`--spacing-page-hero`, centred content)
 * rather than sized by its copy. H1 length varies from one line ("Get a
 * Quote") to four ("Natural Slate Roofing, Melbourne & Mornington
 * Peninsula"), and letting that drive the height made every route open at a
 * different size. `min-h` rather than `h` so an over-long H1 degrades by
 * growing instead of overflowing — if that ever happens, raise the token.
 */
export function PageHero({
  page,
  intro,
  image,
  video,
  cta,
  aside,
}: PageHeroProps) {
  const primary = cta ?? { label: "Get a Quote", href: "/contact" };

  return (
    <section className="theme-dark grain relative flex min-h-page-hero flex-col justify-center overflow-hidden pt-28 pb-16 lg:min-h-page-hero-lg lg:pt-32 lg:pb-20">
      {/*
        MEDIA AT 95%, NOT 30%.

        The footage is warm orange terracotta against a blue sky. At 30% under
        a flat 0.9/0.95 navy scrim, the orange and the navy averaged into a
        muddy blue-grey and the fine tile courses read as moiré banding — it
        looked like a rendering fault rather than a roof. That is the whole of
        the "glitchy background" problem: the scrim was not too weak, it was
        too heavy and it was desaturating the one thing the hero exists to
        show.

        The media now runs at 95% and ALL of the text protection is carried by
        the directional scrim below. That split is the point: at 70% the clip
        was still blending with the near-black section behind it, so even the
        open side came out blue-grey. Let the picture be the picture, and darken
        only the column the words sit in.

        Contrast was measured, not eyeballed — see the note on the scrim.
      */}
      {video ? (
        <HeroVideo src={video.src} poster={video.poster} opacity="opacity-95" />
      ) : (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-95"
        />
      )}

      {/*
        DIRECTIONAL SCRIM — dark where the words are, open where the roof is.

        The old scrim was a single vertical gradient at 0.9/0.7/0.95, which
        darkened the whole frame equally to protect copy that only occupies the
        left half. Splitting it in two lets the right side breathe:

         1. Horizontal — heavy behind the copy column, clearing toward the
            right so the material is legible as material.
         2. Vertical — a top band so the fixed header keeps contrast, and a
            bottom band so the section reads as a defined edge rather than
            fading into the next one.

        Below `sm` the copy runs FULL WIDTH, so the open right-hand end of the
        horizontal ramp ends up directly under text. The third layer is a flat
        wash present only at small sizes. It is set at 0.66 because 0.45 was
        measured at 3.87:1 on the concrete hero at 320px — under the 4.5:1 floor.
        Do not lower it without re-measuring.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgb(6 21 50 / 0.96) 0%, rgb(6 21 50 / 0.93) 32%, rgb(6 21 50 / 0.62) 60%, rgb(6 21 50 / 0.10) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(6 21 50 / 0.66) 0%, rgb(6 21 50 / 0.00) 30%, rgb(6 21 50 / 0.08) 60%, rgb(6 21 50 / 0.72) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[rgb(6_21_50/0.66)] sm:hidden"
      />

      <Container className="relative">
        <div
          className={cn(
            aside && "grid items-center gap-12 lg:grid-cols-12 lg:gap-16",
          )}
        >
          <div className={cn(aside && "lg:col-span-6")}>
            {/* Breadcrumb */}
            <Reveal y={10} duration={0.6}>
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex flex-wrap items-center gap-2 text-small text-faint">
                  <li>
                    <Link
                      href="/"
                      className="transition-colors hover:text-accent"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li className="text-muted">{page.label}</li>
                </ol>
              </nav>
            </Reveal>

            <TextReveal
              as="h1"
              immediate
              delay={0.1}
              className="max-w-4xl font-display text-h1 uppercase text-white"
            >
              {page.h1}
            </TextReveal>

            <Reveal delay={0.35}>
              <p
                className={cn(
                  "mt-6 text-lead text-muted",
                  /* Widened from max-w-2xl at the client's request — the
                     terracotta opening paragraph is three sentences and was
                     setting to seven lines. */
                  aside ? "max-w-xl" : "max-w-3xl",
                )}
              >
                {intro}
              </p>

              {aside ? (
                <div className="mt-8">
                  <Button
                    href={siteConfig.phoneHref}
                    variant="outline"
                    size="lg"
                  >
                    Call {siteConfig.phone}
                  </Button>
                </div>
              ) : (
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button href={primary.href} variant="accent" size="lg" arrow>
                    {primary.label}
                  </Button>
                  <Button
                    href={siteConfig.phoneHref}
                    variant="outline"
                    size="lg"
                  >
                    Call {siteConfig.phone}
                  </Button>
                </div>
              )}
            </Reveal>
          </div>

          {aside && (
            <Reveal delay={0.2} y={20} className="lg:col-span-6">
              {aside}
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
