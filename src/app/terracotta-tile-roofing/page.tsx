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

const page = getPage("terracotta-tile-roofing");
export const metadata = metadataFor("terracotta-tile-roofing");

export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page, tileFaqs)} />
      <PageHero
        page={page}
        image="/photography/hero-terracotta.jpg"
        intro="Premium terracotta tile roofing, re-roofing and replacement across Melbourne and the Peninsula — classic style, enduring performance."
        cta={{ label: "Get a Quote", href: "/contact" }}
      />
      <QuoteFormPlaceholder />
      <TrustBar />
      <ContentBlock
        eyebrow="Options"
        title="New roofs, re-roofing and replacement."
        intro="Terracotta suits period homes and warm architectural palettes, and holds its colour for the life of the roof because the colour is the clay."
        image="/content/terracotta-reroof.jpg"
      >
        <CheckList
          items={[
            "New terracotta roofs on premium and architect-led builds",
            "Full re-roofing where an existing tile roof has reached its end",
            "Premium ranges including Bristile, in a full spread of profiles and glazes",
            "Ridge, valley and flashing detail finished to the same standard as the field",
          ]}
        />
      </ContentBlock>
      <ContentBlock
        eyebrow="Why terracotta"
        title="Classic style. Enduring performance."
        intro="Fired clay does not fade, does not need coating and carries a look concrete cannot imitate."
        flip
      >
        <p>Terracotta is the right answer when the architecture calls for warmth and the owner intends to keep the home. It sits below natural slate on cost and above concrete on longevity and appearance.</p>
      </ContentBlock>

      {/* 5 — Gallery */}

      <ProcessSteps />
      {/* Guarantee / warranty */}
      <Guarantee />

      {/* Reviews */}
      <ReviewsStrip title="What tile clients say." />

      <ServiceArea />
      <FaqSection faqs={tileFaqs} />
      <RelatedServices keys={["concrete-tile-roofing", "natural-slate-roofing", "heritage-roofing"]} />
      <CTA />
    </>
  );
}
