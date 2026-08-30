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
import { FaqSection } from "@/components/sections/FaqSection";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { CTA } from "@/components/sections/CTA";
import { ReviewsStrip } from "@/components/sections/ReviewsStrip";
import { Guarantee } from "@/components/sections/Guarantee";

const page = getPage("natural-slate-roofing");
export const metadata = metadataFor("natural-slate-roofing");

/**
 * FLAGSHIP MONEY PAGE — and the PPC landing page for slate search and Meta.
 * Same URL serves both, so ad spend compounds the SEO.
 *
 * ⚠️  DO NOT PARAPHRASE THE BODY COPY ON THIS PAGE.
 *
 * Same treatment as the terracotta and concrete pages. The client supplied
 * their exact wording, so every paragraph below is reproduced word for word,
 * including the three section headings ("Quality Natural Slate Matters",
 * "A Roofing Legacy You Can See", "From One Generation to the Next") and the
 * closing line.
 *
 * Editorial changes are limited to: casing and terminal full stops on the
 * headings so they match the rest of the site, and one hyphen set as an em
 * dash ("what it is today — a specialist roofing business"), which is the
 * dash the rest of the site uses. No words are changed.
 *
 * Structural rule, learned from the terracotta fix: each of the client's
 * paragraphs sits in ONE place, whole. Where a section is a single paragraph
 * it goes in `children` as a single <p> with no `intro`, rather than having
 * its first sentence promoted to a lead.
 *
 * The client's two opening paragraphs are the page introduction, so the first
 * is the hero intro and the second is the body of the section it describes
 * ("An investment in a home for generations").
 *
 * NOTE ON NAMING: the client's copy says "Wells Slate Roofing" here, while the
 * rest of the site says "Wells Roofing". Reproduced as written rather than
 * silently normalised — this is the third page it has come up on and it still
 * needs a decision from Steve.
 *
 * The "Roofing for generations" line is allowed here and ONLY here — client
 * feedback v1 reserves it for the natural slate pages.
 */
export default function NaturalSlateRoofingPage() {
  return (
    <>
      <JsonLd data={schemaForPage(page, slateFaqs)} />

      {/* 1 — Hero + offer */}
      <PageHero
        page={page}
        image="/photography/hero-slate.jpg"
        /* Client-supplied footage of this exact material. The poster is
           frame 0 of the clip, so the still→film handoff is invisible. */
        video={{ src: "/video/slate.mp4", poster: "/video/slate-poster.jpg" }}
        /*
          The client's FIRST opening paragraph, complete and unbroken. In their
          document this and the paragraph below it are the page introduction;
          this one is the hero, the second is the body of the section that
          follows. Do not split either of them.
        */
        intro="For more than 40 years, the Wells family has been working with natural slate, supplying and installing slate roofs across Melbourne and Victoria. That experience has shaped Wells Slate Roofing into what it is today — a specialist roofing business with a deep understanding of natural slate, traditional craftsmanship and the importance of doing the job properly."
        cta={{ label: "Book a Consultation", href: "/contact" }}
      />

      {/* 2 — Qualifying quote form */}
      <QuoteFormPlaceholder
        title="Get a slate roofing quote"
        intro="Tell us about the roof, the home and where you are in the project. We'll come back with honest, specialist advice."
      />

      {/* 3 — Trust / stats bar */}
      <TrustBar />

      {/* 4 — The client's SECOND opening paragraph, verbatim and whole.
             No `intro`: promoting its first sentence to a lead would split it,
             which is exactly what went wrong on terracotta. */}
      <ContentBlock
        eyebrow="The material"
        title="An investment in a home for generations."
        image="/content/slate-anatomy.jpg"
      >
        <p>
          A natural slate roof is an investment in a home for generations.
          Timeless in appearance and remarkably durable, slate has been used on
          significant homes and buildings for centuries. Its natural variation
          in colour and texture gives every roof its own character, while its
          ability to age beautifully with minimal maintenance is one of the
          reasons it remains such an enduring architectural material.
        </p>
        <CheckList
          items={[
            "New slate roofs on architect-led and prestige new builds",
            "Full re-roofing where an existing roof has reached its end",
            "Contemporary architectural work — large formats, clean verges, concealed detailing",
            "Heritage restoration that preserves the character of a period home",
            "Structural assessment — slate is heavier than tile and the frame must carry it",
            "Correct flashing, valley and ridge detailing, where most roofs actually fail",
          ]}
        />
      </ContentBlock>

      {/* 5 — "Quality Natural Slate Matters", verbatim.
             Two separate paragraphs in the client's document, so intro + body
             is a legitimate split here: neither paragraph is broken. */}
      <ContentBlock
        eyebrow="Why Wells"
        title="Quality natural slate matters."
        intro="Not all slate is the same. The quality and origin of the stone, how it has been selected and graded, and the experience of the people installing it all contribute to how a slate roof will look and perform over its lifetime. Wells Slate Roofing uses carefully selected natural slate suited to Australian conditions, including premium Spanish slate from Cupa Pizarras quarries."
        image="/content/slate-supply-to-install.jpg"
        flip
      >
        <p>
          We look for consistency, durability and natural character, while
          avoiding the quality issues that can lead to premature deterioration,
          staining or an uneven finish. Just as importantly, our slate is
          installed by experienced roofers who understand the material and the
          detailing required to get it right.
        </p>
      </ContentBlock>

      {/* 6 — "A Roofing Legacy You Can See", verbatim. One paragraph. */}
      <ContentBlock eyebrow="Legacy" title="A roofing legacy you can see.">
        <p>
          Some of the best evidence of our work is already sitting on rooftops
          across Victoria. Our completed projects range from newly built
          architectural homes and heritage restorations to slate roofs installed
          decades ago that continue to perform and look beautiful today.
        </p>
      </ContentBlock>

      {/*
        7 — "From One Generation to the Next", verbatim, plus the client's
        closing line.

        This is the ONE place the "Roofing for generations" line runs. Client
        feedback v1 reserves it for natural-slate pages and campaigns, so it was
        pulled out of the homepage hero and the sitewide footer and lives here,
        on the flagship slate page, where it is actually earned.
      */}
      <ContentBlock
        eyebrow="Our approach"
        title="From one generation to the next."
      >
        <p>
          Wells Slate Roofing combines generations of roofing knowledge with a
          professional, considered approach to every project. From selecting the
          right slate and working through technical requirements to supply and
          specialist installation, our focus is on creating roofs worthy of the
          buildings they protect.
        </p>
        <p className="font-display text-h4 italic text-foreground">
          Natural slate. Specialist craftsmanship. Roofing for generations.
        </p>
      </ContentBlock>

      {/* 7 — Project gallery */}

      {/* 8 — Investment & how slate is priced */}
      <ContentBlock
        eyebrow="Investment"
        title="How a slate roof is priced."
        /* Client feedback v1, table 4: the "no honest slate roofer" line
           implied everyone else is dishonest. States the reason plainly now. */
        intro="Slate roofing is priced to the roof, the material, the access and the detail. We quote each project individually — here is what moves the number."
      >
        <CheckList
          items={[
            "Roof size and complexity — hips, valleys, dormers and penetrations all add labour",
            "Access — height, scaffold requirements and site constraints",
            "Slate grade and origin — premium Spanish slate costs more than lower grades",
            "Structural work — whether the existing frame can carry the load",
            "Ancillary detail — flashings, ridging, guttering and leadwork",
          ]}
        />
        <p>
          Measured across its service life, slate is typically the cheapest roof
          a premium home can have. It is a one-off investment rather than a
          recurring cost — which is the frame worth holding when comparing
          quotes.
        </p>
      </ContentBlock>

      {/* 9 — Process */}
      <ProcessSteps
        title="From first call to finished roof."
        intro="Three steps, each documented, so you always know where the project stands."
      />

      {/* 10 — Objection handling */}
      <ContentBlock
        eyebrow="Straight answers"
        title="The three things everyone asks."
      >
        <CheckList
          items={[
            "Repair or full replacement? If the slate is sound and the fixings have failed, restoration is the right call — and far cheaper. We tell you which you need, not which pays us more.",
            "Slate versus alternatives? Slate costs more upfront and less per year of service. If you plan to keep the home, the maths favours slate.",
            "Are you really slate specialists? Since 1982, and we supply the material as well as install it — so we can document the provenance and specification of the natural slate we supply.",
          ]}
        />
      </ContentBlock>

      {/* 11 — Guarantee / warranty */}
      <Guarantee />

      {/* 12 — Reviews */}
      <ReviewsStrip
        title="What slate clients say."
        intro="Slate-specific feedback from homeowners, architects and builders."
      />


      {/* 14 — FAQ */}
      <FaqSection
        faqs={slateFaqs}
        title="Slate roofing questions, answered."
      />

      {/* Internal linking — heritage cluster */}
      <RelatedServices
        keys={[
          "slate-roof-restoration",
          "heritage-roofing",
          "natural-slate-supply",
        ]}
        title="Related slate work."
      />

      {/* 15 — Final CTA */}
      <CTA />
    </>
  );
}
