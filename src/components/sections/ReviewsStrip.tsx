"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ReviewCarousel } from "@/components/ui/ReviewCarousel";
import { GoogleGlyph, Star } from "@/components/ui/GoogleGlyph";
import {
  testimonials,
  sampleTestimonials,
  type Testimonial,
} from "@/config/proof";

/**
 * Blueprint section — "Reviews" (and "Reviews (local)" on the region hubs).
 *
 * Renders `testimonials` when it has content, and falls back to
 * `sampleTestimonials` when it doesn't — with a visible badge saying so.
 *
 * The badge is not decoration. Sample reviews are written to look real, which
 * is what makes them useful for sign-off and dangerous at launch: publishing
 * testimonials nobody gave is misleading conduct, not a placeholder. Wiring
 * the GBP feed into `testimonials` retires them automatically, so there is
 * nothing to remember to remove.
 *
 * NOTE: Review / AggregateRating schema is deliberately NOT emitted here.
 * Marking up reviews that aren't verified is a manual-action risk. Add it in
 * src/lib/schema.ts once the feed is live and the ratings are real.
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
  const live = items ?? testimonials;
  const usingSamples = live.length === 0;
  const shown = usingSamples ? sampleTestimonials : live;

  useEffect(() => {
    if (usingSamples && process.env.NODE_ENV !== "production") {
      console.warn(
        "[ReviewsStrip] Showing SAMPLE reviews — these are not real. " +
          "Populate `testimonials` in src/config/proof.ts from the Google " +
          "Business Profile feed before launch."
      );
    }
  }, [usingSamples]);

  const average =
    shown.reduce((sum, r) => sum + (r.rating ?? 5), 0) / (shown.length || 1);

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
                  {shown.length} Google reviews
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {usingSamples && (
          <Reveal delay={0.12}>
            <p className="mt-8 inline-flex items-center gap-2 rounded-pill border border-accent/30 bg-accent/5 px-4 py-2 text-small font-semibold text-accent">
              <span
                aria-hidden
                className="size-1.5 shrink-0 rounded-full bg-accent"
              />
              Sample content — replace with the live Google feed before launch
            </p>
          </Reveal>
        )}

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
