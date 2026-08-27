import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { tradeFaqs } from "@/config/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteFormPlaceholder } from "@/components/sections/QuoteFormPlaceholder";
import { TrustBar } from "@/components/sections/TrustBar";
import { ContentBlock, CheckList } from "@/components/sections/ContentBlock";
import { SpecAccordion } from "@/components/sections/SpecAccordion";
import { FaqSection } from "@/components/sections/FaqSection";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { CTA } from "@/components/sections/CTA";
import { DownloadableResources } from "@/components/sections/DownloadableResources";

const page = getPage("natural-slate-supply");
export const metadata = metadataFor("natural-slate-supply");

/**
 * B2B. Highest-volume organic opportunity on the site (slate tiles, 1,600/mo,
 * KD 17). Anchors the architects & builders hub. Trade tone throughout —
 * no homeowner language, no "get a quote", CTA is samples and spec support.
 */
export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page, tradeFaqs)} />
      <PageHero
        page={page}
        image="/photography/hero-supply.jpg"
        intro="Premium Spanish slate supplied and specified for architects, builders and trade — samples, technical specification support and lead times you can programme around."
        cta={{ label: "Request Samples", href: "/contact" }}
      />
      <QuoteFormPlaceholder
        title="Request samples or specification support"
        intro="Tell us the project, the stage and the slate you are considering. We will send samples and spec sheets."
      />
      <TrustBar
        items={[
          { stat: "CUPA", label: "PIZARRAS Spanish slate" },
          { stat: "Spec", label: "Technical support at design stage" },
          { stat: "Firm", label: "Documented lead times" },
        ]}
      />

      <ContentBlock
        eyebrow="Product"
        title="Premium natural Spanish slate."
        intro="Quarried in Galicia — the international benchmark for roofing slate, and the material specified on prestige and heritage work worldwide."
        image="/content/slate-product.jpg"
      >
        <CheckList
          items={[
            "CUPA PIZARRAS provenance, documented",
            "Full range of grades, thicknesses, sizes and colour",
            "Technical data, tolerances and durability classification supplied",
            "Advice on the correct grade for pitch, exposure and architectural intent",
          ]}
        />
      </ContentBlock>

      <ContentBlock
        eyebrow="Specification"
        title="Specified right at design stage."
        intro="Slate specified badly is corrected on site, at your cost. We would rather get it right on the drawing."
        flip
      >
        <CheckList
          items={[
            "Samples sent for selection and client presentation",
            "Spec sheets and technical documentation for your package",
            "Guidance on fixing, underlay, ventilation and detailing",
            "CPD-style briefings for practices specifying slate regularly",
          ]}
        />
      </ContentBlock>

      <ContentBlock
        eyebrow="Supply"
        title="Lead times you can build a programme around."
        intro="Because we source directly rather than through a third party, we can give a firm date at quotation and hold it."
      >
        <p>
          On a programmed build, the material arriving when it was promised is
          usually worth more than the material being marginally cheaper. That is
          the part of this we take most seriously.
        </p>
      </ContentBlock>

      {/* 6 — Projects specified / supplied */}

      {/* 7 — Downloadable resources */}
      <DownloadableResources />

      {/* 8 — National supply note */}
      <ContentBlock
        eyebrow="Beyond Victoria"
        title="National supply."
        intro="We are positioned to expand natural slate distribution beyond Victoria. If you are specifying slate interstate, talk to us."
      />

      <SpecAccordion
        eyebrow="Specification"
        title="Choosing the grade before you draw it."
        intro="Thickness and grade are the two decisions that set both the cost and the service life. They are also the two most often left to the builder to guess at."
        columns={[
          { name: "Where it belongs", note: "Typical application" },
          { name: "What to expect", note: "Service life and cost" },
        ]}
        rows={[
          {
            criterion: "First-grade, 5–6mm",
            values: [
              "Prestige new build and heritage replacement on sheltered pitches",
              "100 years plus; the usual specification for prestige work",
            ],
          },
          {
            criterion: "First-grade, 7–8mm",
            values: [
              "Exposed coastal and elevated sites, steep pitches, high wind",
              "100 years plus; heavier, so confirm structural loading",
            ],
          },
          {
            /* Client feedback v1: "Del Carmen" removed — not a confirmed
               supplier relationship. CUPA PIZARRAS only. Replaced with a
               genuine specification criterion rather than a brand. */
            criterion: "Consistent blue-black",
            values: [
              "Where minimal colour variation is specified across the roof",
              "Premium tier; the usual choice on architect-led work",
            ],
          },
          {
            criterion: "CUPA graded ranges",
            values: [
              "General prestige residential across Melbourne and the Peninsula",
              "Graded and certified; range of tones and thicknesses",
            ],
          },
          {
            criterion: "Salvaged / reclaimed",
            values: [
              "Heritage overlay work where new stone would read as a patch",
              "Availability-led — specify early or not at all",
            ],
          },
          {
            criterion: "Below first-grade",
            values: [
              "Not supplied — carbonate inclusions cause early delamination",
              "The saving is recovered in repairs inside 20 years",
            ],
          },
        ]}
        footnote="Slate is a natural product and every quarry run varies. Nothing here replaces a physical sample — which is what we would rather put in your hand before you specify it."
      />

      <ContentBlock
        eyebrow="Detailing"
        title="The details that decide whether the roof lasts."
        intro="A hundred-year slate can be undone by a twenty-year fixing. On a slate roof the ancillaries have to be specified to the same standard as the stone."
      >
        <p>
          Most premature slate failure we are called to is not the slate. It is
          a fixing, a lining or a lap that was specified to a shorter life than
          the material it was holding up, and the roof came apart around a
          perfectly good covering.
        </p>
        <CheckList
          items={[
            "Copper or silicon-bronze nails — galvanised will not see out the slate",
            "Lead or a comparable long-life lining to valleys, soakers and abutments",
            "Head lap set to the pitch and exposure, not to a standard detail",
            "Sarking and ventilation designed to move condensation out of the batten space",
            "Battens graded and sized for the slate weight and the rafter spacing",
            "Structural check where 7–8mm slate is specified over a lighter design",
          ]}
        />
      </ContentBlock>

      <FaqSection faqs={tradeFaqs} title="Trade questions, answered." />
      <RelatedServices
        keys={["for-architects-builders", "natural-slate-roofing", "heritage-roofing"]}
      />
      <CTA />
    </>
  );
}
