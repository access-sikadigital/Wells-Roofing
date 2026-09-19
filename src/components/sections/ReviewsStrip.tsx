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
 * ── The badge is the Google mark and stars only ────────────────────────────
 * The client asked for the "4+" figure and the "9 Google reviews" count to be
 * removed. The stars still come from `googleRating` (the real profile figure,
 * 4.1 → four filled), never from an average of the carousel. The carousel
 * only shows reviews with text, so its average would overstate the score.
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

  return (
    <section className="bg-surface py-section">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

          {/* Google summary badge — the credibility anchor for the row.
              Client request: Google mark and stars only. The "4+" figure and
              the "9 Google reviews" count were removed. */}
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4 rounded-card border border-line bg-background px-5 py-4">
              <GoogleGlyph className="size-7 shrink-0" />
              <span
                className="flex gap-0.5"
                role="img"
                aria-label={`Rated ${googleRating.average} out of 5 on Google`}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} filled={i < Math.round(googleRating.average)} />
                ))}
              </span>
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
