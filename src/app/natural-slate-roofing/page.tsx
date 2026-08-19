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
import { ServiceArea } from "@/components/sections/ServiceArea";
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
        intro="New slate roofs, re-roofing and heritage restoration in premium natural Spanish slate — sourced, specified and installed by specialists, not subcontracted to a general roofing crew."
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
        eyebrow="The material"
        title="What a natural slate roof actually involves."
        intro="Slate is not a roof covering so much as a piece of the building. Understanding what goes into one is the difference between a roof that lasts a century and one that leaks in five years."
        image="/content/slate-anatomy.jpg"
      >
        <p>
          Natural slate is quarried stone, split by hand or machine into
          individual tiles and hung in overlapping courses. There is no coating,
          no substrate and nothing to degrade — which is why a correctly laid
          slate roof outlives the person who commissioned it.
        </p>
        <CheckList
          items={[
            "New slate roofs on prestige and architect-led builds",
            "Full re-roofing where an existing roof has reached its end",
            "Heritage restoration that preserves the character of a period home",
            "Structural assessment — slate is heavier than tile and the frame must carry it",
            "Correct flashing, valley and ridge detailing, where most roofs actually fail",
          ]}
        />
      </ContentBlock>

      {/* 5 — Why Wells (specialist proof) */}
      <ContentBlock
        eyebrow="Why Wells"
        title="Supply to install, under one roof."
        intro="Most roofers buy slate through a third party and install what turns up. We source it ourselves — which means we control provenance, grade and lead time."
        image="/content/slate-supply-to-install.jpg"
        flip
      >
        <CheckList
          items={[
            "Direct sourcing of premium Spanish slate — provenance you can verify",
            "Over four decades of specialist slate and tile work since 1982",
            "Heritage capability: period detailing, matching, sympathetic repair",
            "Specification support for architects and builders at design stage",
            "Not a generalist — we do not chase volume or general roofing work",
          ]}
        />
      </ContentBlock>

      {/* 6 — Spanish slate feature */}
      <ContentBlock
        eyebrow="Provenance"
        title="Premium Spanish slate, specified properly."
        intro="CUPA PIZARRAS and Del Carmen slate from the Galician quarries — the benchmark for roofing slate worldwide."
      >
        <p>
          Grade, thickness, size and colour all change how a slate roof performs
          and how it looks. Specify it wrong and you get a roof that reads cheap
          or fails early at the exposure it was never rated for. We advise on the
          right slate for the pitch, exposure and architectural intent — then
          supply it.
        </p>
      </ContentBlock>

      {/* 7 — Project gallery */}

      {/* 8 — Investment & how slate is priced */}
      <ContentBlock
        eyebrow="Investment"
        title="How a slate roof is priced."
        intro="We don't publish a 'from $X' rate, because no honest slate roofer can. Here is what actually drives the number."
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
            "Are you really slate specialists? Since 1982, and we supply the material as well as install it. Ask any roofer where their slate comes from — the answer tells you a lot.",
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

      {/* 13 — Service area */}
      <ServiceArea />

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
