import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { generalFaqs } from "@/config/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ContentBlock, CheckList } from "@/components/sections/ContentBlock";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { CTA } from "@/components/sections/CTA";
import { pageVideo } from "@/config/video";

const page = getPage("about");
export const metadata = metadataFor("about");

/** Established and expert, not a start-up. Heritage story + repositioning. */
export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page, generalFaqs)} />
      <PageHero
        page={page}
        image={pageVideo.about.poster}
        video={pageVideo.about.video}
        intro="An established Mornington Peninsula roofing name, now Melbourne's premium natural slate and tile specialist."
      />
      <TrustBar />

      <ContentBlock
        eyebrow="Our story"
        title="Roofing for generations."
        intro="Wells has been roofing Melbourne and the Mornington Peninsula since 1982 — long enough to have re-roofed homes we first worked on decades ago."
        image="/content/about-generations.jpg"
      >
        <p>
          Four decades in, we have deliberately narrowed rather than widened.
          Where a lot of roofing businesses chase volume, we have moved the other
          way — toward natural slate, heritage restoration and premium tile,
          where the work is harder, the standard is higher and the specialist
          knowledge actually counts.
        </p>
      </ContentBlock>

      <ContentBlock
        eyebrow="What we are not"
        title="A specialist, by choice."
        intro="We say no to a lot of work. That is the point."
        flip
      >
        <CheckList
          items={[
            "No asphalt or shingle roofing",
            "No general or volume roofing work",
            "No broad commercial or industrial roofing",
            "Slate, heritage, terracotta and concrete tile — done properly",
          ]}
        />
        <p>
          Narrowing the work is what lets us hold the standard. A crew that lays
          slate every week is a different proposition to one that lays it twice a
          year.
        </p>
      </ContentBlock>

      <ServiceArea />
      <CTA />
    </>
  );
}
