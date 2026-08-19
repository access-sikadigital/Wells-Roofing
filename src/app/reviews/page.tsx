import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { CTA } from "@/components/sections/CTA";

const page = getPage("reviews");
export const metadata = metadataFor("reviews");

/**
 * TODO (build phase): Google reviews feed + written testimonials + case
 * studies, with Review/AggregateRating schema once there is real volume.
 * Review velocity is flagged in the audit as the biggest local ranking and
 * conversion lever currently missing.
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
      <ContentBlock
        eyebrow="In progress"
        title="Reviews feed being connected."
        intro="Google reviews and written testimonials will publish here. If we have worked on your roof, we would genuinely value a review."
      />
      <CTA />
    </>
  );
}
