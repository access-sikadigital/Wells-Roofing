import Image from "next/image";
import { siteConfig, FOUNDED_YEAR } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Counter } from "@/components/motion/Counter";

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

      {/* Extra bottom-left wash — protects the headline and stats */}
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

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.55} className="lg:col-span-6">
            {/*
              Hero subheading — one line of positioning, not a paragraph.
              Cut from ~45 words to 16 and widened from max-w-xl to max-w-2xl,
              so it sets as two lines rather than six. A six-line block under a
              display H1 competes with it; two lines support it.

              The "builders, architects and homeowners" detail that used to
              live here was cut rather than moved: the stats row to the right
              already carries the founding year, and the Dual Path section
              below routes the two audiences. It was saying the same things
              twice.
            */}
            <p className="max-w-2xl text-lead text-muted">
              Natural slate, terracotta and concrete roofing — supplied and
              installed across Melbourne and the Mornington Peninsula.
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

          {/* Stats */}
          <Reveal delay={0.75} className="lg:col-span-6">
            {/*
              The first cell used to count up `yearsTrading()` — "44+". Client
              feedback v1 asked for "Since 1982" sitewide and "over four
              decades" where a round figure is more natural, because the
              computed 44 was contradicting hardcoded "45 years" claims in the
              meta descriptions. A fixed founding year cannot drift; a running
              total can, and did.
            */}
            <dl className="grid grid-cols-3 gap-4 border-t border-line pt-8 sm:gap-6 lg:justify-items-end">
              <div>
                <dd className="font-display text-h2 font-extrabold text-white">
                  {FOUNDED_YEAR}
                </dd>
                {/*
                  "Family owned since" — at 320px this column is 82px wide and
                  the label broke to THREE lines ("Family / owned / since")
                  while its two neighbours took two. Shortened so all three
                  labels wrap to at most two lines and the row stays even. The
                  figure above is the year, so "since" was doing no work.
                */}
                <dt className="mt-1 text-small text-faint">Family owned</dt>
              </div>
              <div>
                <dd className="font-display text-h2 font-extrabold text-white">
                  <Counter to={3} />
                </dd>
                <dt className="mt-1 text-small text-faint">
                  Specialist materials
                </dt>
              </div>
              <div>
                <dd className="font-display text-h2 font-extrabold text-accent">
                  Slate
                </dd>
                <dt className="mt-1 text-small text-faint">
                  Supply &amp; install
                </dt>
              </div>
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
