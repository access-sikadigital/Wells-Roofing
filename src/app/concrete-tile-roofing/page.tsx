import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { tileFaqs } from "@/config/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteFormPlaceholder } from "@/components/sections/QuoteFormPlaceholder";
import { TrustBar } from "@/components/sections/TrustBar";
import { ContentBlock, CheckList } from "@/components/sections/ContentBlock";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FaqSection } from "@/components/sections/FaqSection";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { CTA } from "@/components/sections/CTA";
import { ReviewsStrip } from "@/components/sections/ReviewsStrip";
import { Guarantee } from "@/components/sections/Guarantee";
import { pageVideo } from "@/config/video";

const page = getPage("concrete-tile-roofing");
export const metadata = metadataFor("concrete-tile-roofing");

export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page, tileFaqs)} />
      <PageHero
        page={page}
        image={pageVideo.concrete.poster}
        video={pageVideo.concrete.video}
        intro="Concrete tile roofing and re-roofing to a premium standard for homeowners and builders across Melbourne and the Mornington Peninsula."
        cta={{ label: "Get a Quote", href: "/contact" }}
      />
      <QuoteFormPlaceholder />
      <TrustBar />
      <ContentBlock
        eyebrow="Options"
        title="Versatile design. Proven strength."
        intro="Concrete tile is the workhorse — dependable, cost-effective and, laid properly, very hard to fault."
        image="/content/concrete-versatility.jpg"
      >
        <CheckList
          items={[
            "New concrete tile roofs for premium builders and owners",
            "Re-roofing and full tile roof replacement",
            "Broad range of profiles and colours to suit the architecture",
            "Engineered detail and clean lines — the finish is what separates the trades",
          ]}
        />
      </ContentBlock>
      <ContentBlock
        eyebrow="For builders"
        title="Built for programmed work."
        intro="Reliable lead times, a crew that turns up, and a finish that does not generate defect-list items at handover."
        flip
      >
        <p>We work with premium builders on new homes, extensions and architectural projects across Melbourne and the Peninsula — the tile side of the business is what keeps the schedule and the relationships moving.</p>
      </ContentBlock>

      {/* 4 — Gallery */}

      <ProcessSteps />
      {/* Guarantee / warranty */}
      <Guarantee />

      {/* Reviews */}
      <ReviewsStrip title="What builders say." />

      <ServiceArea />
      <FaqSection faqs={tileFaqs} />
      <RelatedServices keys={["terracotta-tile-roofing", "natural-slate-roofing", "for-architects-builders"]} />
      <CTA />
    </>
  );
}
