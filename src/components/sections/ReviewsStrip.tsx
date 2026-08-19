import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { testimonials, type Testimonial } from "@/config/proof";

/**
 * Blueprint section — "Reviews" (and "Reviews (local)" on the region hubs).
 *
 * `testimonials` in src/config/proof.ts is intentionally empty, so today this
 * renders the empty state. That is the correct behaviour, not a gap to paper
 * over: a placeholder quote that survives to production reads as a fake
 * testimonial, which is worse for trust than admitting the feed is being
 * connected.
 *
 * The empty state still earns its place — it asks for reviews, which is the
 * lever the audit identifies as the biggest missing local ranking and
 * conversion factor. Once the Google feed is wired, the same component
 * renders the real quotes with no change at the call sites.
 *
 * NOTE: Review / AggregateRating schema is deliberately NOT emitted while this
 * is empty. Marking up reviews that do not exist is a manual-action risk.
 */

function Stars({ rating }: { rating: number }) {
  return (
    <p
      className="flex gap-0.5 text-accent"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="size-4"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </p>
  );
}

export function ReviewsStrip({
  eyebrow = "What people say",
  title = "Reviews.",
  intro,
  items = testimonials,
}: Readonly<{
  eyebrow?: string;
  title?: string;
  intro?: string;
  items?: Testimonial[];
}>) {
  return (
    <section className="bg-surface py-section">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

        {items.length === 0 ? (
          <Reveal delay={0.15}>
            <div className="mt-12 flex max-w-3xl flex-col gap-6 rounded-card border border-line bg-background p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
              <div>
                <p className="font-display text-h4 font-extrabold uppercase tracking-tight text-foreground">
                  Our reviews are moving here
                </p>
                <p className="mt-3 max-w-lg text-small text-muted">
                  We&apos;re connecting our Google Business Profile so reviews
                  publish straight to this page. If we&apos;ve worked on your
                  roof, we&apos;d genuinely value a few words.
                </p>
              </div>
              <Button
                href="/reviews"
                variant="outline"
                size="lg"
                className="shrink-0"
                arrow
              >
                Leave a review
              </Button>
            </div>
          </Reveal>
        ) : (
          <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3">
            {items.map((testimonial, i) => (
              <Reveal
                key={testimonial.attribution + i}
                delay={(i % 3) * 0.1}
                className="h-full"
              >
                <figure className="flex h-full flex-col rounded-card border border-line bg-background p-8">
                  {testimonial.rating && <Stars rating={testimonial.rating} />}
                  <blockquote className="mt-4 flex-1 text-body text-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 text-small text-muted">
                    {testimonial.attribution}
                    {testimonial.source && (
                      <span className="text-faint">
                        {" "}
                        · via {testimonial.source}
                      </span>
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
