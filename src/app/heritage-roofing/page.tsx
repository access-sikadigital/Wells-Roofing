import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { slateFaqs } from "@/config/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteFormPlaceholder } from "@/components/sections/QuoteFormPlaceholder";
import { TrustBar } from "@/components/sections/TrustBar";
import { ContentBlock, CheckList } from "@/components/sections/ContentBlock";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SpecAccordion } from "@/components/sections/SpecAccordion";
import { FaqSection } from "@/components/sections/FaqSection";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { CTA } from "@/components/sections/CTA";
import { ReviewsStrip } from "@/components/sections/ReviewsStrip";
import { Guarantee } from "@/components/sections/Guarantee";

const page = getPage("heritage-roofing");
export const metadata = metadataFor("heritage-roofing");

export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page, slateFaqs)} />
      <PageHero
        page={page}
        image="/photography/hero-heritage.jpg"
        intro="Heritage roofing specialists for Melbourne&apos;s period homes — slate, terracotta and sympathetic restoration that preserves what makes the building worth keeping."
        cta={{ label: "Book a Consultation", href: "/contact" }}
      />
      <QuoteFormPlaceholder />
      <TrustBar />
      <ContentBlock
        eyebrow="Capability"
        title="Period roofs, done period-correct."
        intro="Heritage work is a different discipline to roofing. The material, the detail and the method all have to answer to the building."
        image="/content/heritage-detail.jpg"
      >
        <CheckList
          items={[
            "Natural slate and terracotta on Victorian, Edwardian and Federation homes",
            "Period detailing — ridging, finials, leadwork, valleys and dormers",
            "Matching original material rather than substituting the nearest modern equivalent",
            "Working within heritage overlays and character requirements",
            "Documentation for councils, heritage advisors and insurers",
          ]}
        />
      </ContentBlock>
      <ContentBlock
        eyebrow="Why it matters"
        title="Get it wrong once and it is permanent."
        intro="A period roof re-covered in the wrong material devalues the home and cannot be undone cheaply. The care is the point."
        flip
      >
        <p>We have worked on Melbourne and Peninsula period homes since 1982. That length of exposure is what lets us match a slate to a roof laid a century ago — and know when a repair will show and when it will disappear.</p>
      </ContentBlock>

      <SpecAccordion
        eyebrow="Know your house"
        title="What period your roof is, and what it wants."
        intro="Melbourne's period housing stock falls into a handful of eras, and each one carries its own roof. Identifying yours is the first thing we do on site."
        columns={[
          { name: "Typical roof", note: "As originally built" },
          { name: "What usually fails first", note: "After 80–120 years" },
        ]}
        rows={[
          {
            criterion: "Victorian terrace, 1850–1900",
            values: [
              "Welsh or Spanish slate, low pitch, cast-iron lacework, parapet gutters",
              "Parapet and box gutters, then the iron fixings behind them",
            ],
          },
          {
            criterion: "Victorian villa, 1870–1900",
            values: [
              "Banded slate in two colours, decorative ridge cresting, finials",
              "Ridge bedding and the cresting fixings, then valley leadwork",
            ],
          },
          {
            criterion: "Federation, 1890–1915",
            values: [
              "Unglazed terracotta Marseille tiles, terracotta ridging, deep gables",
              "Ridge pointing and cracked tiles around the gable ends",
            ],
          },
          {
            criterion: "Edwardian, 1901–1915",
            values: [
              "Slate or early terracotta, shingle-banded gables, tall chimneys",
              "Chimney flashings and the mortar in the gable barge",
            ],
          },
          {
            criterion: "Interwar / Californian bungalow, 1915–1940",
            values: [
              "Terracotta or early concrete tile, broad low-pitch gables",
              "Sarking-free valleys and the original wire ties",
            ],
          },
        ]}
        footnote="A guide, not a diagnosis — Melbourne homes were altered constantly, and a Victorian villa re-roofed in the 1960s presents very differently. We confirm what is actually up there at survey."
      />

      <ContentBlock
        eyebrow="Heritage overlays"
        title="Working inside a heritage overlay."
        intro="If your property sits in a heritage overlay, the roof is not a free choice — and the approval process rewards getting the specification right the first time."
      >
        <p>
          Councils are generally concerned with what is visible from the street
          and whether the work reads as original. That usually means retaining
          the existing material where it is sound, matching profile, colour and
          course gauge where it is not, and keeping the period detailing —
          ridging, finials, bargeboards — rather than quietly simplifying it.
        </p>
        <CheckList
          items={[
            "Retention of original material wherever its condition allows it",
            "Like-for-like matching on profile, size, colour and course gauge",
            "Period detailing reinstated, not substituted with a modern equivalent",
            "Photographic records before, during and after the work",
            "Specification and product documentation for the heritage advisor",
            "Reversible methods where the significance of the building calls for it",
          ]}
        />
      </ContentBlock>

      <ContentBlock
        eyebrow="Matching"
        title="Why matching old slate is harder than it looks."
        intro="Two slates can be the same size, the same colour and still read as wrong from the footpath."
        flip
      >
        <p>
          A century of Melbourne weather changes slate. It fades, it picks up
          lichen, it dulls. Set a brand-new slate of exactly the right
          specification into that roof and it reads as a patch — the right
          stone, the wrong age. Matching means accounting for how the original
          has weathered, not just what it started as.
        </p>
        <p>
          Course gauge matters as much as the stone. Period roofs were laid to
          the slate sizes of their day, and modern metric sizes rarely land on
          the same lap. Get the gauge wrong and every course below the repair
          sits fractionally out for the rest of the roof&apos;s life. Where a match
          genuinely is not available, salvaged slate from the same era is
          usually the better answer, and we will say so.
        </p>
      </ContentBlock>

      {/* 4 — Project proof */}

      <ProcessSteps />
      {/* Guarantee / warranty */}
      <Guarantee />

      {/* Reviews */}
      <ReviewsStrip title="What heritage clients say." />

      <ServiceArea />
      <FaqSection faqs={slateFaqs} />
      <RelatedServices keys={["slate-roof-restoration", "natural-slate-roofing", "terracotta-tile-roofing"]} />
      <CTA />
    </>
  );
}
