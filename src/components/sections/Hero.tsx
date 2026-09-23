import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

/*
 * Hero content is CENTRED, not bottom-aligned.
 *
 * `justify-end` pinned the whole block to the floor of a 100svh section, which
 * left a large dead area under the header and made the hero read bottom-heavy.
 * Centring balances it.
 *
 * `pb` is deliberately larger than `pt`: with `justify-center` the padding
 * shifts the centre point, so heavier bottom padding lifts the block slightly
 * above true centre — which is where it belongs optically, since the fixed
 * header already occupies the top of the viewport.
 */
export function Hero({
  /**
   * The H1. Comes from the page spec now rather than being hardcoded here —
   * this was the one page on the site whose H1 didn't read from
   * `config/pages.ts`, so the spec's headline never actually reached the DOM.
   *
   * Client feedback v1 approved "Still setting the standard in slate & tile
   * roofing." as the hero line, which is what the spec holds.
   */
  h1,
}: {
  h1: string;
}) {
  return (
    <section className="theme-dark grain relative flex min-h-svh flex-col justify-center overflow-hidden pt-24 pb-20 lg:pb-28">
      {/*
        Still, not film — background video was removed at the client's request.

        A REAL Wells roof: the Beaumaris Hotel's Spanish slate, from the
        project catalogue at /projects/beaumaris-hotel/. It replaces the stock
        frame that was here (/photography/hero-home.jpg) at the client's
        request. Of the 29 frames, this one keeps the building on the open
        right-hand side with the slate mansard above the verandah, and has no
        poles, wires or branches crossing the headline.

        `priority` because this is the LCP element on the homepage.
      */}
      <Image
        src="/projects/beaumaris-hotel/26.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />

      {/*
        HORIZONTAL scrim — deep navy on the left where the copy sits, opening
        up to the bare photograph on the right. Matches the inner-page heroes
        in PageHero.tsx so every hero on the site reads the same way.

        The many stops are not decoration: a two-stop linear ramp interpolates
        in a straight line, which the eye reads as a hard edge in the middle
        and a visible band at the light end. These stops follow an ease curve
        (slow fall, then quick, then slow), which is what makes the falloff
        read as smooth. The `grain` class on the section dithers what is left.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgb(6 21 50 / 0.94) 0%, rgb(6 21 50 / 0.92) 12%, rgb(6 21 50 / 0.86) 24%, rgb(6 21 50 / 0.74) 36%, rgb(6 21 50 / 0.58) 48%, rgb(6 21 50 / 0.40) 60%, rgb(6 21 50 / 0.24) 72%, rgb(6 21 50 / 0.12) 84%, rgb(6 21 50 / 0.04) 93%, rgb(6 21 50 / 0) 100%)",
        }}
      />

      {/*
        Vertical wash — kept light, or it would cancel the horizontal ramp and
        flatten the whole frame back to navy. It only has to sit the headline
        off the sky at the top and hold the buttons at the bottom.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(6 21 50 / 0.55) 0%, rgb(6 21 50 / 0.18) 22%, rgb(6 21 50 / 0.06) 50%, rgb(6 21 50 / 0.30) 82%, rgb(6 21 50 / 0.55) 100%)",
        }}
      />

      {/*
        Below `sm` the copy runs full width, so it ends up over the open right
        end of the horizontal ramp. Flat wash at small sizes only — same fix,
        and same 0.66 value, as PageHero.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[rgb(6_21_50/0.66)] sm:hidden"
      />

      {/* Spacing now lives on the section so it participates in the centring;
          a second pb here would push the block back down. */}
      <Container className="relative">
        <Reveal y={14} duration={0.8}>
          <p className="eyebrow mb-6 flex items-center gap-3 text-accent">
            <span className="h-0.5 w-10 bg-accent" aria-hidden />
            {siteConfig.strapline} — {siteConfig.since}
          </p>
        </Reveal>

        <TextReveal
          as="h1"
          immediate
          delay={0.25}
          className="max-w-5xl font-display text-display uppercase text-white"
        >
          {h1}
        </TextReveal>

        {/*
          The three stats that sat to the right of this block ("1982 / Family
          owned", "3 / Specialist materials", "Slate / Supply & install") were
          removed under client feedback WRv2: "They feel disconnected and don't
          add value here." The founding year is still in the strapline above
          the H1, so nothing is lost. With no right-hand column there is no
          grid left to split, so the block runs as a single column.
        */}
        <div className="mt-10">
          <Reveal delay={0.55}>
            {/*
              Hero subheading — one line, not a paragraph. A six-line block
              under a display H1 competes with it; one or two lines support it.

              Client feedback WRv2 supplied this line. It replaces "Natural
              slate, terracotta and concrete roofing — supplied and installed
              across Melbourne and the Mornington Peninsula.", which the
              materials section directly below repeated almost word for word.
            */}
            <p className="max-w-2xl text-lead text-muted">
              Unsure what your roof needs? We&rsquo;ll assess it and recommend
              the right approach.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Was `siteConfig.cta`, an "#contact" anchor with no matching
                  element on this page — it scrolled nowhere. */}
              <Button href="/contact" variant="accent" size="lg" arrow>
                Get a Quote
              </Button>
              {/* Was "Explore Our Materials", a jump link to #services.
                  Client asked for the phone number here instead — same pairing
                  as every inner-page hero: quote form, or call. */}
              <Button href={siteConfig.phoneHref} variant="outline" size="lg">
                Call {siteConfig.phone}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
