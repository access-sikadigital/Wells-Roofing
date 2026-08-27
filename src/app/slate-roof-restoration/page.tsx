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
        <CheckList
          items={[
            "Restore when the slate is sound and the fixings, flashings or ridging have failed",
            "Replace when the slate is delaminating widely across the roof",
            "Replace when years of mismatched patch repairs have compromised the courses",
            "Restore first where a heritage overlay requires original material retained",
          ]}
        />
      </ContentBlock>
      <ContentBlock
        eyebrow="Method"
        title="How we restore a slate roof."
        intro="Staged, reversible where the building calls for it, and detailed to match what is already there."
        flip
      >
        <CheckList
          items={[
            "Full assessment of slate condition, fixings, flashings and structure",
            "Sympathetic replacement of damaged slates, matched to the original",
            "Renewal of lead flashings, valleys and ridge bedding",
            "Period-correct detailing and finishing throughout",
          ]}
        />
      </ContentBlock>

      <SpecAccordion
        eyebrow="Decision guide"
        title="Restore or replace, side by side."
        intro="The two options compared on the things that actually decide it — condition, cost, disruption and how long the result lasts."
        columns={[
          {
            name: "Restoration",
            note: "Sound slate, failed detailing",
            highlight: true,
          },
          { name: "Full re-roof", note: "Slate itself has failed" },
        ]}
        rows={[
          {
            criterion: "Typical cost",
            values: [
              "Roughly a third of a re-roof",
              "Full project cost, staged over the roof",
            ],
          },
          {
            criterion: "Life it buys",
            values: [
              "20–30 years before the question returns",
              "80–100 years from a new slate roof",
            ],
          },
          {
            criterion: "Time on site",
            values: ["One to two weeks on a typical home", "Three to six weeks"],
          },
          {
            criterion: "Original material",
            values: [
              "Retained — the reason heritage overlays prefer it",
              "Salvaged and reused where the slate is sound enough",
            ],
          },
          {
            criterion: "What it fixes",
            values: [
              "Fixings, flashings, valleys, ridging, pointing",
              "Everything, including battens, sarking and structure",
            ],
          },
          {
            criterion: "When it is the wrong call",
            values: [
              "Slate delaminating widely — you are paying twice",
              "Slate still sound — you are replacing what works",
            ],
          },
        ]}
        footnote="Figures are indicative for a typical Melbourne home and are confirmed against your roof at survey."
      />

      <ContentBlock
        eyebrow="Warning signs"
        title="What tells you the roof is asking for attention."
        intro="Slate rarely fails suddenly. It signals for years first, and the signals are visible from the ground if you know what you are looking at."
      >
        <p>
          A roof that has started to move will show it at the edges and the
          junctions long before it shows it in the field. These are the things
          worth acting on before the next wet winter, not after it.
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

      <ContentBlock
        eyebrow="Nail sickness"
        title="Why sound slate still ends up on the ground."
        intro="The most common reason a century-old slate roof fails has nothing to do with the slate."
        flip
      >
        <p>
          Natural slate outlives the nails that hold it. Original iron fixings
          corrode long before the stone does, and once enough of them have gone
          the slates begin to slip one at a time — a condition the trade calls
          nail sickness. The slate itself is usually still perfectly good.
        </p>
        <p>
          It matters because it changes the answer. A roof shedding slates
          through failed fixings is a restoration candidate, and re-fixing with
          copper or silicon-bronze nails resets the clock for decades. A roof
          shedding slates because the stone is delaminating is not. Telling
          those two apart from the ground is guesswork, which is why we get on
          the roof before quoting.
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
