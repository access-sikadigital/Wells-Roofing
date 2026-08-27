import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { tileFaqs } from "@/config/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteFormPlaceholder } from "@/components/sections/QuoteFormPlaceholder";
import { TrustBar } from "@/components/sections/TrustBar";
import { ContentBlock, CheckList } from "@/components/sections/ContentBlock";
import { FaqSection } from "@/components/sections/FaqSection";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { CTA } from "@/components/sections/CTA";
import { ReviewsStrip } from "@/components/sections/ReviewsStrip";
import { Guarantee } from "@/components/sections/Guarantee";

const page = getPage("concrete-tile-roofing");
export const metadata = metadataFor("concrete-tile-roofing");

/**
 * CONCRETE — rewritten against client feedback v1.
 *
 * The governing rule: "Do not frame it as the cheap option underneath slate
 * and terracotta." The previous copy called it "the workhorse — dependable,
 * cost-effective", which is exactly that framing. Concrete's territory is
 * VERSATILITY: profile and colour choice, clean contemporary design, reliable
 * performance.
 *
 * Also note there is no "Roofing for generations" language here — reserved for
 * natural slate pages only.
 *
 * Body copy adapted from the client's own approved content bank.
 */

/* Concrete's own proof, not the slate defaults. */
const concreteStats = [
  { stat: "25yr+", label: "Bristile distributor — since before most rivals existed" },
  { stat: "Profiles", label: "A full range of profiles, colours and finishes" },
  { stat: "Warranty", label: "Material & workmanship backed in writing" },
];

export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page, tileFaqs)} />
      <PageHero
        page={page}
        image="/photography/hero-concrete.jpg"
        /* Client-supplied footage of this exact material. The poster is
           frame 0 of the clip, so the still→film handoff is invisible. */
        video={{
          src: "/video/concrete.mp4",
          poster: "/video/concrete-poster.jpg",
        }}
        intro="Bristile concrete tile roofing and re-roofing across Melbourne and the Mornington Peninsula — the widest range of profiles, colours and finishes of any material we lay."
        cta={{ label: "Get a Quote", href: "/contact" }}
      />
      <QuoteFormPlaceholder
        title="Get a concrete tile roofing quote"
        intro="Tell us about the project and we'll come back with profile and colour options plus a price."
      />

      <TrustBar items={concreteStats} />

      <ContentBlock
        eyebrow="The material"
        title="A practical and versatile roofing choice."
        intro="Concrete tiles remain one of Australia's most widely used roofing materials, offering a genuine balance of durability, design flexibility and value."
        image="/content/concrete-versatility.jpg"
      >
        <p>
          Available in a wide range of profiles, colours and finishes, concrete
          tiles can complement everything from traditional homes to
          contemporary architectural designs.
        </p>
        <p>
          Profile and colour make a real difference to how a home finishes, so we
          help select an option that works with the building&apos;s style, its exterior finishes and
          the environment around it.
        </p>
        <CheckList
          items={[
            "New concrete tile roofs for architect-led builds and premium homes",
            "Re-roofing and full tile roof replacement",
            "Product selection, estimating and supply as well as installation",
            "Roof replacement assessment based on structure, design and desired finish",
          ]}
        />
      </ContentBlock>

      <ContentBlock
        eyebrow="Provenance"
        title="Bristile concrete roof tiles."
        intro="Wells Roofing has been a Bristile distributor for more than 25 years, which gives our team a deep working knowledge of the range and where each profile belongs."
        flip
      >
        <p>
          We can assist with product selection, estimating and supply, as well
          as complete professional installation. On an existing home we can
          assess what a replacement actually requires and recommend suitable
          tile options based on the roof structure, the design and the finish
          you are after.
        </p>
      </ContentBlock>

      <ContentBlock
        eyebrow="Supply &amp; installation"
        title="Advice from selection through to installation."
        intro="We work with homeowners, builders and architects across Melbourne and the Mornington Peninsula."
      >
        <p>
          Whether you are building a new home, extending an existing property or
          replacing an ageing roof, we can help choose and install a Bristile
          concrete tile system suited to the project.
        </p>
        <p>
          Set-out and detailing are what separate a good concrete roof from an
          ordinary one. They are specified the same way here as on our slate work.
        </p>
      </ContentBlock>

      {/* 4 — Gallery */}


      <Guarantee />

      <ReviewsStrip title="What builders say." />

      <FaqSection faqs={tileFaqs} />
      <RelatedServices
        keys={[
          "terracotta-tile-roofing",
          "natural-slate-roofing",
          "for-architects-builders",
        ]}
      />
      <CTA />
    </>
  );
}
