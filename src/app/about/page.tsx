import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { generalFaqs } from "@/config/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ContentBlock, CheckList } from "@/components/sections/ContentBlock";
import { CTA } from "@/components/sections/CTA";

const page = getPage("about");
export const metadata = metadataFor("about");

/** Established and expert, not a start-up. Heritage story + repositioning. */
export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page, generalFaqs)} />
      <PageHero
        page={page}
        image="/photography/hero-about.jpg"
        intro="An established Mornington Peninsula roofing name, now Melbourne's premium natural slate and tile specialist."
      />
      <TrustBar />

      <ContentBlock
        eyebrow="Our story"
        title="Roofing for generations."
        intro="Family owned and operated. For over four decades the Wells family has been supplying and installing roofs across Melbourne and Victoria — long enough to have re-roofed homes we first worked on decades ago."
        /*
          Both of these are real Wells photographs, which is why they replaced
          the stock tool still-life that was here. On an About page the proof
          IS the point — a staged shot of hammers on a workbench says nothing
          a competitor couldn't also say.
        */
        images={[
          {
            src: "/content/about-slate-home.jpg",
            alt: "Completed natural slate roof on a stone and render home",
          },
          {
            src: "/content/about-crew.jpg",
            alt: "Wells Roofing crew laying natural slate on a re-roof",
          },
        ]}
      >
        <p>
          That experience is what shaped the business into what it is today: a
          specialist roofing company with a deep understanding of natural slate,
          traditional craftsmanship and the importance of doing the job properly.
        </p>
        <p>
          We work with homeowners, builders and architects on new homes,
          extensions and roof replacements — slate, terracotta and concrete alike.
        </p>
        <p>
          Over four decades in, we have deliberately narrowed rather than
          widened — toward the materials and the detail where specialist
          knowledge actually counts.
        </p>
      </ContentBlock>

      <ContentBlock
        /* Client feedback v1, table 4: "We say no to a lot of work. That is
           the point." → state what we DO. */
        eyebrow="What we do"
        title="What we do."
        intro="We focus on natural slate, terracotta and concrete tile roofing."
        flip
      >
        <CheckList
          items={[
            "No asphalt or shingle roofing",
            "No general or volume roofing work",
            "No broad commercial or industrial roofing",
            "Natural slate, terracotta and concrete tile — new builds, re-roofs and restoration",
          ]}
        />
        <p>
          Narrowing the work is what lets us hold the standard. A crew that lays
          slate every week is a different proposition to one that lays it twice a
          year.
        </p>
      </ContentBlock>

      <CTA />
    </>
  );
}
