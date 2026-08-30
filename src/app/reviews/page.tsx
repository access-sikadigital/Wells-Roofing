import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { ReviewsStrip } from "@/components/sections/ReviewsStrip";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { CTA } from "@/components/sections/CTA";
import { googleRating } from "@/config/proof";

const page = getPage("reviews");
export const metadata = metadataFor("reviews");

/**
 * Now showing the REAL Google reviews rather than a "feed being connected"
 * placeholder.
 *
 * The page is honest about the gap between the count and what is displayed:
 * Google holds nine reviews, six of which have text worth reading. Rather than
 * quietly showing six and letting the badge say nine, the note below says so
 * and links out to the profile, where anyone can read all of them including
 * the two that are critical.
 *
 * Review / AggregateRating schema is still not emitted — see ReviewsStrip.
 */
export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page)} />
      <PageHero
        page={page}
        image="/photography/hero-reviews.jpg"
        intro="What Melbourne and Peninsula homeowners, architects and builders say about our slate and tile work."
      />

      <ReviewsStrip
        eyebrow="Google reviews"
        title="In our customers' words."
        intro="Every review below is from our Google Business Profile, reproduced exactly as it was written."
      />

      <ContentBlock
        eyebrow="Straight about it"
        title="Read them all on Google."
        intro={`Our Google rating is ${googleRating.average} from ${googleRating.count} reviews. The ones above are those with something written; the rest are ratings without a comment.`}
      >
        <p>
          If we have worked on your roof, a few words on Google genuinely helps
          — and if something has gone wrong, call the office before you write
          it. We would rather fix it.
        </p>
      </ContentBlock>

      <CTA />
    </>
  );
}
