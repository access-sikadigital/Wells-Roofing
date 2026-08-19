import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { generalFaqs, slateFaqs, tileFaqs, tradeFaqs } from "@/config/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTA } from "@/components/sections/CTA";

const page = getPage("faqs");
export const metadata = metadataFor("faqs");

/** Every question here is a real Semrush query (strategy doc, Appendix B). */
const allFaqs = [...generalFaqs, ...slateFaqs, ...tileFaqs, ...tradeFaqs];

export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page, allFaqs)} />
      <PageHero
        page={page}
        image="/photography/hero-faqs.jpg"
        intro="Slate roof cost and lifespan, restore versus replace, terracotta and concrete tile, and how we work."
      />
      <FaqSection faqs={generalFaqs} eyebrow="General" title="About Wells Roofing." />
      <FaqSection faqs={slateFaqs} eyebrow="Slate" title="Natural slate roofing." />
      <FaqSection faqs={tileFaqs} eyebrow="Tile & supply" title="Terracotta, concrete & supply." />
      <FaqSection faqs={tradeFaqs} eyebrow="Trade" title="Architects & builders." />
      <CTA />
    </>
  );
}
