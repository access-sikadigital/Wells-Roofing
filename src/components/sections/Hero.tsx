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

        This is STOCK, not one of the client's supplied photographs. It briefly
        used their slate-home photo; they asked for supplied photos to stay on
        the pages they were given for (About, process step 02), so this was
        reverted. Don't reuse a client photo here without asking.

        `priority` because this is the LCP element on the homepage.
      */}
      <Image
        src="/photography/hero-home.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-45"
      />

      {/* Navy scrim so the copy always holds contrast over the photograph */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(6 21 50 / 0.85) 0%, rgb(6 21 50 / 0.55) 35%, rgb(6 21 50 / 0.95) 100%)",
        }}
      />

      {/* Extra bottom-left wash — protects the headline and subheading */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 65% at 15% 85%, rgb(6 21 50 / 0.75) 0%, transparent 70%)",
        }}
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
              <Button href="#services" variant="outline" size="lg">
                Explore Our Materials
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
