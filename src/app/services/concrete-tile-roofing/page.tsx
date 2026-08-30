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
 * CONCRETE — the client's approved copy, VERBATIM.
 *
 * ⚠️  DO NOT PARAPHRASE THE BODY COPY ON THIS PAGE.
 *
 * Same treatment as the terracotta page. An earlier pass adapted the client's
 * content bank into the house voice; the client then supplied their exact
 * wording, so every paragraph below is reproduced word for word, including the
 * three section headings ("A Practical and Versatile Roofing Choice",
 * "Bristile Concrete Roof Tiles", "Supply & Installation by Wells Roofing").
 *
 * The only editorial changes are casing and terminal full stops on the
 * headings, so they match every other section heading on the site.
 *
 * Two structural notes, both learned from the terracotta fix:
 *
 *  · Each of the client's paragraphs sits in ONE place, whole. Where a section
 *    is a single paragraph it goes in `children` as a single <p> with no
 *    `intro`, rather than having its first sentence promoted to a lead — that
 *    is what broke the terracotta opening and made it read as though the copy
 *    was missing.
 *  · The opening paragraph IS the page introduction, so it is the hero intro.
 *    The "A practical and versatile roofing choice" section below therefore
 *    carries the service list rather than repeating it.
 *
 * Carried over from client feedback v1, which this does not undo: concrete is
 * never framed as the cheap option underneath slate and terracotta. Its
 * territory is versatility — profile and colour choice, design flexibility,
 * reliable performance. There is also no "Roofing for generations" language
 * here; that is reserved for the natural slate pages.
 */

/* Concrete's own proof, not the slate defaults. Figures are the client's. */
const concreteStats = [
  { stat: "25yr+", label: "A Bristile distributor for more than 25 years" },
  { stat: "40yr+", label: "Wells family roofing experience" },
  { stat: "Profiles", label: "A range of profiles, colours and finishes" },
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
        /*
          The client's opening paragraph, COMPLETE and unbroken — all three
          sentences. In their document this paragraph is the page introduction,
          which is exactly what the hero intro slot is. Do not break it up and
          do not move a sentence of it into the section below.
        */
        intro="Concrete roof tiles remain one of Australia's most widely used roofing materials, offering a good balance of durability, design flexibility and value. Available in a range of profiles, colours and finishes, concrete tiles can complement everything from traditional homes to contemporary architectural designs. The choice of profile and colour can have a significant impact on the finished appearance of a home, and our team can help you select an option that works with the building's style, exterior finishes and surrounding environment."
        cta={{ label: "Get a Quote", href: "/contact" }}
      />
      <QuoteFormPlaceholder
        title="Get a concrete tile roofing quote"
        intro="Tell us about the project and we'll come back with profile and colour options plus a price."
      />

      <TrustBar items={concreteStats} />

      {/* Section 1 — "A Practical and Versatile Roofing Choice".
          The client's prose for this section is the hero intro above, so this
          block carries the service list rather than repeating it. */}
      <ContentBlock
        eyebrow="The material"
        title="A practical and versatile roofing choice."
        image="/content/concrete-versatility.jpg"
      >
        <CheckList
          items={[
            "New concrete tile roofs for architect-led builds and premium homes",
            "Re-roofing and full tile roof replacement",
            "Product selection, estimating and supply as well as installation",
            "Roof replacement assessment based on structure, design and desired finish",
          ]}
        />
      </ContentBlock>

      {/* Section 2 — "Bristile Concrete Roof Tiles", verbatim. */}
      <ContentBlock
        eyebrow="Provenance"
        title="Bristile concrete roof tiles."
        intro="Wells Roofing has been a Bristile distributor for more than 25 years, giving our team a strong understanding of the Bristile concrete tile range and its applications."
        flip
      >
        <p>
          We can assist with product selection, estimating and supply, as well
          as complete professional installation. For existing homes, we can also
          assess roof replacement requirements and recommend suitable tile
          options based on the roof structure, design and desired finish.
        </p>
      </ContentBlock>

      {/* Section 3 — "Supply & Installation by Wells Roofing", verbatim.
          One paragraph in the client's document, so one <p> here and no lead —
          promoting its first sentence to an `intro` would split it. */}
      <ContentBlock
        eyebrow="Supply &amp; installation"
        title="Supply &amp; installation by Wells Roofing."
      >
        <p>
          With more than 40 years of roofing experience, the Wells family has
          built its reputation on quality workmanship, product knowledge and
          reliable service. We work with homeowners, builders and architects
          across Melbourne and the Mornington Peninsula, providing advice from
          initial tile selection through to supply and installation. Whether
          you&rsquo;re building a new home, extending an existing property or
          replacing an ageing roof, Wells Roofing can help you choose and
          install a Bristile concrete tile system suited to the project.
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
