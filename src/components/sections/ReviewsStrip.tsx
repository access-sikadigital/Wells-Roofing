"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ReviewCarousel } from "@/components/ui/ReviewCarousel";
import { GoogleGlyph, Star } from "@/components/ui/GoogleGlyph";
import { testimonials, googleRating, type Testimonial } from "@/config/proof";

/**
 * Blueprint section — "Reviews" (and "Reviews (local)" on the region hubs).
 *
 * Renders the REAL Google reviews from `config/proof.ts`. The sample-content
 * fallback and its warning badge are gone — there is nothing left to fall back
 * to, which is the point.
 *
 * ── The rating badge does not average the carousel ─────────────────────────
 * It reads `googleRating`, transcribed from the Google profile: 4.1 from 9.
 * The carousel shows six, because three of the nine have no written text or
 * are negative. Averaging what happens to be on screen would print 5.0 and be
 * false. Curating which reviews to feature is normal; misstating the score is
 * not, so the score comes from Google and the quotes come from the carousel.
 *
 * NOTE: Review / AggregateRating schema is still deliberately NOT emitted.
 * Google treats a business marking up its own reviews as self-serving and it
 * is a manual-action risk, so the figures stay visual-only.
 */
export function ReviewsStrip({
  eyebrow = "What people say",
  title = "Reviews.",
  intro,
  items,
}: Readonly<{
  eyebrow?: string;
  title?: string;
  intro?: string;
  items?: Testimonial[];
}>) {
  const shown = items ?? testimonials;
  const { average, count } = googleRating;

  return (
    <section className="bg-surface py-section">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

          {/* Google summary badge — the credibility anchor for the row */}
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4 rounded-card border border-line bg-background px-5 py-4">
              <GoogleGlyph className="size-7 shrink-0" />
              <div>
                <p className="flex items-center gap-2">
                  <span className="font-display text-h4 font-extrabold leading-none text-foreground">
                    {average.toFixed(1)}
                  </span>
                  <span className="flex gap-0.5" aria-hidden>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} filled={i < Math.round(average)} />
                    ))}
                  </span>
                </p>
                <p className="mt-1 text-small text-faint">
                  {count} Google reviews
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10">
            <ReviewCarousel items={shown} />
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/reviews" variant="outline" size="lg" arrow>
              Read all reviews
            </Button>
            <p className="text-small text-faint">
              Worked with us? A few words on Google genuinely helps.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
