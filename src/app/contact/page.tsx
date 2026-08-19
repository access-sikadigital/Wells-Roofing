import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteFormPlaceholder } from "@/components/sections/QuoteFormPlaceholder";
import { ContentBlock, CheckList } from "@/components/sections/ContentBlock";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { siteConfig } from "@/config/site";

const page = getPage("contact");
export const metadata = metadataFor("contact");

/**
 * TODO (build phase): replace QuoteFormPlaceholder with the live multi-step
 * qualifying form posting to GoHighLevel. See the component for the field spec.
 */
export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page)} />
      <PageHero
        page={page}
        image="/photography/hero-contact.jpg"
        intro="Request a quote or book a consultation for slate, heritage or tile roofing. Based in Mornington, serving Melbourne and the Peninsula."
      />
      <QuoteFormPlaceholder />

      <ContentBlock eyebrow="Direct" title="Talk to us.">
        <CheckList
          items={[
            `Phone — ${siteConfig.phone}`,
            `Email — ${siteConfig.email}`,
            `Office — ${siteConfig.address}`,
            "Monday to Friday, and by appointment on site",
          ]}
        />
      </ContentBlock>

      <ServiceArea />
    </>
  );
}
