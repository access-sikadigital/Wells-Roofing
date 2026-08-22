import { GoogleGlyph, Star } from "@/components/ui/GoogleGlyph";
import type { Testimonial } from "@/config/proof";
import { cn } from "@/lib/utils";

/**
 * A single review, laid out the way Google lays one out: avatar and name top
 * left, platform mark top right, gold stars, then the body copy.
 *
 * The familiarity is the point. People have seen thousands of these, so the
 * format itself carries credibility that a bespoke "testimonial card" does
 * not — which is exactly why the Google colours are kept and only the
 * surrounding chrome (radius, border, type) follows the Wells system.
 */

/** Google assigns a flat colour avatar when a reviewer has no photo. */
const AVATAR_COLOURS = [
  "#0F9D58",
  "#4285F4",
  "#DB4437",
  "#F4B400",
  "#7B1FA2",
  "#00838F",
];

function avatarColour(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + hash * 31;
  return AVATAR_COLOURS[Math.abs(hash) % AVATAR_COLOURS.length];
}

export function ReviewCard({
  review,
  className,
}: {
  review: Testimonial;
  className?: string;
}) {
  const initial = review.attribution.trim().charAt(0).toUpperCase();
  const rating = review.rating ?? 5;

  return (
    <figure
      className={cn(
        "flex h-full w-80 shrink-0 flex-col rounded-card border border-line bg-background p-6 sm:w-88",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className="flex size-10 shrink-0 items-center justify-center rounded-full font-display text-body font-bold text-white"
          style={{ backgroundColor: avatarColour(review.attribution) }}
        >
          {initial}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-foreground">
            {review.attribution}
          </p>
          {review.date && (
            <p className="text-small text-faint">{review.date}</p>
          )}
        </div>

        <GoogleGlyph className="mt-0.5 size-5 shrink-0" />
      </div>

      <p
        className="mt-4 flex gap-0.5"
        aria-label={`${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} filled={i < rating} />
        ))}
      </p>

      {/*
        Clamped to five lines so every card in the row is the same height
        however long the review is. Google truncates with "More" for the same
        reason — a ragged row of different-height cards reads as broken.
      */}
      <blockquote className="mt-3 line-clamp-5 text-small leading-relaxed text-muted">
        {review.quote}
      </blockquote>
    </figure>
  );
}
