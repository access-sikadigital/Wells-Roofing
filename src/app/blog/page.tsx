import type { Metadata } from "next";
import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { CTA } from "@/components/sections/CTA";

const page = getPage("blog");

/**
 * "Blog (built-for-it)" — P2 / Low in the sitemap workbook.
 *
 * The spec says built *for* it, not built. The route, metadata, breadcrumb and
 * nav slot all exist so posts can be added without restructuring — but it
 * ships `noindex` and stays out of the sitemap until there are real articles.
 *
 * That is deliberate: an empty or thin blog is a sitewide quality signal
 * problem, not a harmless placeholder. Google assesses helpfulness across the
 * whole domain, so three filler posts would put the money pages at risk to win
 * nothing. Remove the robots override below on the day real posts land.
 *
 * When it is populated, the content plan comes from Appendix B (real search
 * questions) — those are already encoded in src/config/faqs.ts and each one is
 * a validated article brief.
 */
export const metadata: Metadata = {
  ...metadataFor("blog"),
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        page={page}
        image="/photography/roof-02.jpg"
        intro="Practical advice on slate, heritage and tile roofing — what lasts, what doesn't, and what a premium roof is actually worth."
      />

      <ContentBlock
        eyebrow="In production"
        title="Articles are on the way."
        intro="We're writing this properly rather than filling it. First pieces cover restore versus replace, what drives the cost of a slate roof, and specifying slate for exposure."
      >
        <p>
          In the meantime, the questions we get asked most are answered in
          full on our FAQs page — including how long a slate roof lasts, whether
          you can walk on one, and how solar panels can be fitted without
          compromising it.
        </p>
      </ContentBlock>

      <RelatedServices
        keys={["natural-slate-roofing", "slate-roof-restoration", "faqs"]}
        eyebrow="In the meantime"
        title="Start here."
      />

      <CTA />
    </>
  );
}
