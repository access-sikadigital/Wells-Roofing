import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { slateFaqs } from "@/config/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteFormPlaceholder } from "@/components/sections/QuoteFormPlaceholder";
import { TrustBar } from "@/components/sections/TrustBar";
import { ContentBlock, CheckList } from "@/components/sections/ContentBlock";
import { SpecAccordion } from "@/components/sections/SpecAccordion";
import { FaqSection } from "@/components/sections/FaqSection";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { CTA } from "@/components/sections/CTA";
import { ReviewsStrip } from "@/components/sections/ReviewsStrip";

const page = getPage("slate-roof-restoration");
export const metadata = metadataFor("slate-roof-restoration");

export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page, slateFaqs)} />
      <PageHero
        page={page}
        image="/photography/hero-restoration.jpg"
        /* Client feedback v1: restoration under Wells is scoped to SLATE. */
        /* Client feedback v1: heritage should not dominate. A slate roof laid in
    the 1990s on a contemporary home needs restoring on the same terms as a
    Victorian one, so the copy no longer assumes a period property. */
        intro="Slate roof restoration for period homes and contemporary houses alike — and a straight answer on whether yours needs restoring or replacing."
        cta={{ label: "Book a Consultation", href: "/contact" }}
      />
      <QuoteFormPlaceholder />
      <TrustBar />
      <ContentBlock
        eyebrow="The honest answer"
        title="Restore, or replace?"
        intro="The single question that decides the cost of your project. We assess the roof and tell you which one you actually need."
        image="/content/restore-vs-replace.jpg"
      >
        <p>Restoration typically costs a fraction of a full re-roof and buys decades.</p>
        <p>Sometimes the answer is &quot;nothing yet&quot;, and we will say so.</p>
        {/* Client feedback WRv2: points 1 and 4 reworded (client wording);
            points 2 and 3 "are fine" and unchanged. Point 4 no longer
            asserts that an overlay REQUIRES retention — it now says it may be
            a consideration, assessed against the roof's condition. */}
        <CheckList
          items={[
            "Restore when the slate is sound and the fixings, flashings or ridging have deteriorated",
            "Replace when the slate is delaminating widely across the roof",
            "Replace when years of mismatched patch repairs have compromised the courses",
            "For heritage properties, retaining original slate and detailing may be an important consideration and will be assessed alongside the condition of the roof and any applicable heritage requirements",
          ]}
        />
      </ContentBlock>
      {/* Method — intro and all four points are client wording, WRv2. */}
      <ContentBlock
        eyebrow="Method"
        title="How we restore a slate roof."
        intro="Carefully assessed, selectively repaired and detailed to respect the existing roof."
        flip
      >
        <CheckList
          items={[
            "Full assessment of the slate, fixings, flashings, valleys and overall roof condition",
            "Careful replacement of damaged or deteriorated slates, matched as closely as practical to the existing roof",
            "Renewal or repair of leadwork, flashings, valleys, ridges and other detailing where required",
            "Traditional detailing and finishing appropriate to the age, character and construction of the building",
          ]}
        />
      </ContentBlock>

      {/*
        Decision guide — revised under client feedback WRv2.

        · Title: client supplied "Restoration or Re-Roofing; side by side."
          Set in the site's sentence case, with the comma the old title used.
        · Intro: "the things that actually decide it —" struck by the client.
        · Restoration note: "failed detailing" → "worn detailing".
        · Rows: client wording throughout. "When it is the wrong call" is
          replaced by "When we recommend it". "Repairs only defer replacement
          in short term" gains "the" so it reads correctly.
        · The "Figures are indicative…" footnote was struck and replaced by
          the client's paragraph on how the assessment is made. That is a
          statement, not a caveat, so it runs as body copy (`outro`) rather
          than in the faint footnote style.
        · Restoration's "20–30 years" became "Many more good years depending
          on the slate age". Don't reintroduce a fixed figure: the client
          removed it because the honest answer depends on the roof.
      */}
      <SpecAccordion
        eyebrow="Decision guide"
        title={
          <>
            {/* nowrap: at desktop width the title otherwise breaks inside
                the hyphen as "re- / roofing". */}
            Restoration or <span className="whitespace-nowrap">re-roofing</span>
            , side by side.
          </>
        }
        intro="The two options compared on condition, cost, disruption and how long the result lasts."
        columns={[
          {
            name: "Restoration",
            note: "Sound slate, worn detailing",
            highlight: true,
          },
          { name: "Full re-roof", note: "Slate itself has failed" },
        ]}
        rows={[
          {
            criterion: "Typical cost",
            values: ["Roughly a third of a re-roof", "Full project cost"],
          },
          {
            criterion: "Life it buys",
            values: [
              "Many more good years depending on the slate age",
              "80–100 years for a new slate roof",
            ],
          },
          {
            criterion: "Time on site",
            values: [
              "One to two weeks on a standard home",
              "Three to six weeks",
            ],
          },
          {
            criterion: "Original material",
            values: ["Retained", "Salvaged and reused where possible"],
          },
          {
            criterion: "What it fixes",
            values: [
              "Fixings, flashings, valleys, ridging, capping",
              "Everything, including battens, sarking and slate as required",
            ],
          },
          {
            criterion: "When we recommend it",
            values: [
              "When inspections confirm the existing roof is sound",
              "When deterioration is widespread and repairs only defer replacement in the short term",
            ],
          },
        ]}
        outro="Our assessment looks beyond the immediate repair. We consider the overall condition, repair history and remaining serviceability of the roof so you can make an informed decision about whether restoration is worthwhile or whether replacement represents a better investment."
      />

      {/* Warning signs — both paragraphs are client wording, WRv2, each kept
          whole: the first as the lead, the second as body. The list is
          unchanged; the client's "the signs below" refers to it. */}
      <ContentBlock
        eyebrow="Warning signs"
        title="What tells you the roof is asking for attention."
        intro="We can tell a great deal about a slate roof without leaving the ground. It shows its age at the edges, the ridging and the flashings first, and those signals appear long before the slate itself gives way."
      >
        <p>
          Read early, they point to a straightforward repair. Read late, they
          point to a re-roof. The signs below are the ones worth acting on
          before the next wet winter.
        </p>
        <CheckList
          items={[
            "Slates slipped out of course, or a dark gap where one has gone entirely",
            "Fragments of slate in the gutters or on the ground after wind",
            "Rust staining running down from the nail line — the fixings are going before the slate is",
            "Ridge or hip capping working loose",
            "Damp patches or staining on upstairs ceilings, particularly near chimneys",
            "Previous repairs in an obviously different slate, colour or size",
          ]}
        />
      </ContentBlock>

      {/* Nail sickness — title and body are client wording, WRv2. The client
          wrote the body as ONE paragraph, so it runs as a single <p> with no
          `intro`; promoting its first sentence to a lead would split it. */}
      <ContentBlock
        eyebrow="Nail sickness"
        title="Why sound slate can still end up on the ground."
        flip
      >
        <p>
          The most common reason a century-old slate roof fails often has
          nothing to do with the slate. Natural slate outlives the iron nails
          that hold it. The original fixings corrode long before the stone
          does, and as they go the slates begin to release one by one, a
          condition known in the trade as nail sickness. Where the slate is
          good stone, it comes down with decades of service still in it. This
          is why the distinction matters. A roof losing slates to failed
          fixings is a candidate for restoration, and re-fixing in copper or
          silicon-bronze returns it to reliable service for a generation. A
          roof losing slates because the stone itself is delaminating is not.
          The two cannot be told apart from the ground, which is why we assess
          every roof in person before we quote.
        </p>
      </ContentBlock>

      {/* 5 — Before/after gallery */}


      {/* Reviews */}
      <ReviewsStrip title="What restoration clients say." />

      <FaqSection faqs={slateFaqs} />
      <RelatedServices keys={["heritage-roofing", "natural-slate-roofing", "slate-roof-repairs"]} />
      <CTA />
    </>
  );
}
