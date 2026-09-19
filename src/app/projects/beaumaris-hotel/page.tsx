import { getPage } from "@/config/pages";
import { getCatalogue } from "@/config/proof";
import { metadataFor } from "@/lib/metadata";
import { breadcrumbSchema, imageGallerySchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCatalogue } from "@/components/sections/ProjectCatalogue";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { CTA } from "@/components/sections/CTA";

const page = getPage("project-beaumaris-hotel");
const catalogue = getCatalogue("beaumaris-hotel");
const projects = getPage("projects");

export const metadata = {
  ...metadataFor("project-beaumaris-hotel"),
};

/**
 * PROJECT CATALOGUE — Beaumaris Hotel (Spanish slate).
 *
 * Photos and captions live in config/proof.ts (`projectCatalogues`); this file
 * only arranges them. To add another project, copy this file into
 * src/app/projects/<slug>/ and change the two keys above.
 */
export default function Page() {
  const cover = catalogue.photos[catalogue.cover];

  return (
    <>
      <JsonLd
        data={[
          imageGallerySchema({ ...catalogue, url: page.url }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: projects.label, url: projects.url },
            { name: page.label, url: page.url },
          ]),
        ]}
      />

      <PageHero
        page={page}
        parent={{ label: projects.label, href: projects.url }}
        image={cover.src}
        intro={`${catalogue.product} · ${catalogue.suburb}. ${catalogue.summary}`}
        cta={{ label: "Talk to us about slate", href: "/contact" }}
      />

      <ProjectCatalogue catalogue={catalogue} />

      <RelatedServices
        keys={["natural-slate-roofing", "heritage-roofing", "loc-bayside"]}
        eyebrow="Related"
        title="Slate work like this."
      />

      <CTA />
    </>
  );
}
