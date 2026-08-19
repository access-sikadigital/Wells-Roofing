import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { CTA } from "@/components/sections/CTA";

const page = getPage("projects");
export const metadata = metadataFor("projects");

/**
 * TODO (build phase): filterable gallery by material (slate / terracotta /
 * concrete / heritage) and suburb, with before/after pairs. Every caption
 * carries the suburb name — that is the local SEO payload of this page.
 * Requires real project photography from the client.
 */
export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page)} />
      <PageHero
        page={page}
        image="/photography/hero-projects.jpg"
        intro="Real slate, heritage and tile roofing projects across the Mornington Peninsula, Bayside and premium Melbourne."
      />
      <ContentBlock
        eyebrow="Coming soon"
        title="Project gallery in production."
        intro="We are photographing recent slate, heritage and tile work for this page. In the meantime, ask us for project references in your suburb."
      />
      <ServiceArea />
      <CTA />
    </>
  );
}
