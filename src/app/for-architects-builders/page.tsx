import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { tradeFaqs } from "@/config/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteFormPlaceholder } from "@/components/sections/QuoteFormPlaceholder";
import { TrustBar } from "@/components/sections/TrustBar";
import { ContentBlock, CheckList } from "@/components/sections/ContentBlock";
import { FaqSection } from "@/components/sections/FaqSection";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { CTA } from "@/components/sections/CTA";

const page = getPage("for-architects-builders");
export const metadata = metadataFor("for-architects-builders");

/** B2B hub. Routes to slate supply + specification support. */
export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page, tradeFaqs)} />
      <PageHero
        page={page}
        image="/photography/hero-trade.jpg"
        intro="Slate and premium tile supply, specification support and expert installation for architects and builders working on prestige Melbourne and Peninsula projects."
        cta={{ label: "Talk to Our Spec Team", href: "/contact" }}
      />
      <QuoteFormPlaceholder
        title="Trade & specification enquiry"
        intro="Tell us your role, the project and the stage it is at. We will route you to the right person."
      />
      <TrustBar />

      <ContentBlock
        eyebrow="What we do for you"
        title="Three ways we work with practices and builders."
        intro="Supply only, specification support, or full supply-and-install — whichever the project needs."
        image="/content/trade-collaboration.jpg"
      >
        <CheckList
          items={[
            "Supply only — premium Spanish slate delivered to site with documented lead times",
            "Specification support — samples, spec sheets and detailing guidance at design stage",
            "Supply and install — one accountable party for material and workmanship",
            "Premium terracotta and concrete tile for the balance of the roof package",
          ]}
        />
      </ContentBlock>

      <ContentBlock
        eyebrow="Why practices use us"
        title="One party accountable for the roof."
        intro="When the material and the installation come from the same specialist, there is no gap for the problem to fall into."
        flip
      >
        <CheckList
          items={[
            "Specialist slate knowledge — it is the material we work in every day",
            "Technical documentation for your package and for council",
            "Communication and scheduling certainty on programmed work",
            "Over four decades of Melbourne and Peninsula project experience",
          ]}
        />
      </ContentBlock>

      <FaqSection faqs={tradeFaqs} title="Trade questions, answered." />
      <RelatedServices
        keys={["natural-slate-supply", "natural-slate-roofing", "concrete-tile-roofing"]}
      />
      <CTA />
    </>
  );
}
