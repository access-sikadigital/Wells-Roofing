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

const page = getPage("slate-roof-repairs");
export const metadata = metadataFor("slate-roof-repairs");

export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page, slateFaqs)} />
      <PageHero
        page={page}
        image="/photography/hero-repairs.jpg"
        /* Client feedback v1: scope stated explicitly and up front. Wells takes
           SLATE repairs only under this brand — no tile, no general roofing. */
        intro="Specialist slate roof repairs — slipped slates, leaks and failed flashings, fixed and matched to your existing roof. Slate only: it is the material we know best."
        cta={{ label: "Get a Quote", href: "/contact" }}
      />
      <QuoteFormPlaceholder />
      <TrustBar />
      <ContentBlock
        eyebrow="What we fix"
        title="Common slate roof failures."
        intro="Most slate &quot;roof&quot; problems are not the slate. Diagnosing the actual entry point is the job."
        image="/content/repairs-failures.jpg"
      >
        <CheckList
          items={[
            "Slipped, cracked or missing slates",
            "Leaks traced to their true source, not the nearest wet patch",
            "Failed lead flashings, valleys and chimney abutments",
            "Damage from foot traffic, solar installs or antenna mounts",
          ]}
        />
      </ContentBlock>
      <ContentBlock
        eyebrow="The difference"
        /* Was: "A general roofer will get water to stop today. A slate roofer
           will stop it without costing you the roof." Removed under the client's
           voice rules — no competitor jabs. States what we do instead. */
        title="Repaired as slate, not patched."
        intro="A slate roof asks for particular materials and a particular way of working on it. Getting both right is the difference between a repair that lasts and one that costs you slates."
        flip
      >
        <CheckList
          items={[
            "Matched replacement slates — repairs that disappear rather than stand out",
            "Correct access technique, so we do not crack ten slates fixing one",
            "Copper and lead fixings that outlast the repair",
            "Honest assessment of whether repair or restoration is the right spend",
          ]}
        />
      </ContentBlock>

      <SpecAccordion
        eyebrow="Diagnosis"
        title="What you are seeing, and what it usually means."
        intro="The symptom and the cause are rarely in the same place on a slate roof. Water can enter at a chimney and appear three metres away."
        columns={[
          { name: "Usual cause", note: "What is actually failing" },
          { name: "What it needs", note: "The correct fix", highlight: true },
        ]}
        rows={[
          {
            criterion: "A slate has slipped out of course",
            values: [
              "Corroded nail, not broken slate — often the first of many",
              "Re-fix with copper or a slate hook; check the surrounding course",
            ],
          },
          {
            criterion: "Damp patch on the ceiling near a chimney",
            values: [
              "Failed lead apron, soaker or back gutter at the abutment",
              "Strip and re-form the leadwork; patching mastic buys one season",
            ],
          },
          {
            criterion: "Staining that runs down a wall internally",
            values: [
              "Valley or box gutter, usually corroded or under-sized",
              "Replace the valley lining and check the gutter falls",
            ],
          },
          {
            criterion: "Slate fragments in the gutters after wind",
            values: [
              "Delamination — the stone splitting along its own bed",
              "Assess the whole roof; isolated repair may not be the answer",
            ],
          },
          {
            criterion: "Several cracked slates in one area",
            values: [
              "Foot traffic — a solar, antenna or aerial install",
              "Replace with matched slate and review roof access",
            ],
          },
        ]}
        footnote="Slate repairs only. We do not take on tile or general roof repairs — pointing you to the right trade is more useful than taking a job outside what we specialise in."
      />

      <ContentBlock
        eyebrow="Before we arrive"
        title="What helps us find it faster."
        intro="A leak that only appears in certain conditions is the hardest kind to chase. Anything you have noticed narrows it down considerably."
      >
        <p>
          You do not need to diagnose anything — but the pattern of when water
          appears tells us a great deal about where it is getting in, and it
          often saves an hour on the roof.
        </p>
        <CheckList
          items={[
            "Which rooms show it, and whereabouts on the ceiling",
            "Whether it only happens in driving rain from one direction",
            "Whether it appeared after a storm, or has crept up over seasons",
            "Any recent work on the roof — solar, antenna, air conditioning, painting",
            "Photographs of anything you have found on the ground",
            "Whether the house is in a heritage overlay",
          ]}
        />
      </ContentBlock>

      <ContentBlock
        eyebrow="Access"
        title="Getting up there without causing the next repair."
        intro="Slate does not forgive being walked on. Most of the cracked slates we replace were broken by someone fixing something else."
        flip
      >
        <p>
          A slate roof carries load along its courses, not across them. Step in
          the wrong place and the slate cracks under the nail head where nobody
          will see it until it slips a year later. It is why a roof that has
          had several trades over it often needs more work than the original
          fault ever justified.
        </p>
        <p>
          We work off roof ladders and staging that spread load across the
          courses rather than walking the field, and we check the surrounding
          slates before we come down. It is slower. It is also the difference
          between a repair and the start of a cycle of them.
        </p>
      </ContentBlock>


      {/* Reviews */}
      <ReviewsStrip title="What repair clients say." />

      <FaqSection faqs={slateFaqs} />
      <RelatedServices keys={["slate-roof-restoration", "natural-slate-roofing", "heritage-roofing"]} />
      <CTA />
    </>
  );
}
