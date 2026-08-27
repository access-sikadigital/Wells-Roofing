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
 * Blueprint 6.2 — 15 sections.
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
        /* Client feedback v1: dropped "not subcontracted to a general roofing
           crew" — false as written, and a misleading-advertising risk. */
        intro="New slate roofs, re-roofing and slate restoration in premium natural Spanish slate — sourced, specified and installed by trades who work in slate every day."
        cta={{ label: "Book a Consultation", href: "/contact" }}
      />

      {/* 2 — Qualifying quote form */}
      <QuoteFormPlaceholder
        title="Get a slate roofing quote"
        intro="Tell us about the roof, the home and where you are in the project. We'll come back with honest, specialist advice."
      />

      {/* 3 — Trust / stats bar */}
      <TrustBar />

      {/* 4 — What natural slate roofing involves */}
      <ContentBlock
        /* Adapted from the client's approved content bank. */
        eyebrow="The material"
        title="An investment in a home for generations."
        intro="Timeless in appearance and remarkably durable, slate has been used on significant homes and buildings for centuries. Its natural variation in colour and texture gives every roof its own character."
        image="/content/slate-anatomy.jpg"
      >
        <p>
          Natural slate is quarried stone, split into individual tiles and hung
          in overlapping courses. There is no coating, no substrate and nothing
          to degrade — which, along with its ability to age well on very little
          maintenance, is why it remains such an enduring architectural
          material.
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

      {/* 5 — Why Wells (specialist proof) */}
      <ContentBlock
        /* Adapted from the client's content bank, "Quality Natural Slate
           Matters". The previous intro opened on what other roofers do; the
           client's voice rules ask for our own proof instead of comparison. */
        eyebrow="Why Wells"
        title="Not all slate is the same."
        intro="The quality and origin of the stone, how it has been selected and graded, and the experience of the people installing it all decide how a slate roof looks and performs over its lifetime."
        image="/content/slate-supply-to-install.jpg"
        flip
      >
        <CheckList
          items={[
            "Carefully selected natural slate suited to Australian conditions, including premium Spanish slate from the CUPA PIZARRAS quarries",
            "Chosen for consistency, durability and natural character — avoiding the quality issues that lead to premature deterioration, staining or an uneven finish",
            "Installed by roofers who understand the material and the detailing it needs",
            "Equally at home on a contemporary architectural build and on a period restoration",
            "Specification support for architects and builders at design stage",
          ]}
        />
      </ContentBlock>

      {/* 6 — Spanish slate feature */}
      <ContentBlock
        eyebrow="Provenance"
        title="Premium Spanish slate, specified properly."
        intro="Premium Spanish slate from the CUPA PIZARRAS quarries in Galicia, graded and certified for the exposure it is going onto."
      >
        <p>
          Grade, thickness, size and colour all change how a slate roof performs
          and how it looks. Specify it wrong and you get a roof that reads cheap
          or fails early at the exposure it was never rated for. We advise on the
          right slate for the pitch, exposure and architectural intent — then
          supply it.
        </p>
      </ContentBlock>

      {/*
        Legacy block — adapted from the client's content bank ("A Roofing
        Legacy You Can See" / "From One Generation to the Next").

        This is the ONE place the "Roofing for generations" line still runs.
        Client feedback v1 reserves it for natural-slate pages and campaigns,
        so it was pulled out of the homepage hero and the sitewide footer and
        lives here, on the flagship slate page, where it is actually earned.
      */}
      <ContentBlock
        eyebrow="Legacy"
        title="A roofing legacy you can see."
        intro="Some of the best evidence of our work is already sitting on rooftops across Victoria."
      >
        <p>
          Our completed projects range from newly built architectural homes and
          heritage restorations through to slate roofs installed decades ago
          that continue to perform and look beautiful today.
        </p>
        <p>
          From selecting the right slate and working through the technical
          requirements to supply and specialist installation, the focus is on
          creating roofs worthy of the buildings they protect.
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
            "Slate grade and origin — premium Spanish slate sits above budget alternatives",
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
        title="From first call to photographed handover."
        intro="Six steps, each documented, so you always know where the project stands."
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
