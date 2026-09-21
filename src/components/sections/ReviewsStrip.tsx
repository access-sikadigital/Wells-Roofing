"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ReviewCarousel } from "@/components/ui/ReviewCarousel";
import { testimonials, type Testimonial } from "@/config/proof";

/**
 * Blueprint section — "Reviews" (and "Reviews (local)" on the region hubs).
 *
 * Renders the REAL Google reviews from `config/proof.ts`. The sample-content
 * fallback and its warning badge are gone — there is nothing left to fall back
 * to, which is the point.
 *
 * ── No rating badge ────────────────────────────────────────────────────────
 * The Google summary badge (G mark + star rating) was removed at the client's
 * request — four of five stars didn't read well. If a badge ever returns, its
 * stars must come from `googleRating` (the real profile figure), never from an
 * average of the carousel: the carousel shows only reviews with text, so its
 * average would overstate the score.
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
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

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
