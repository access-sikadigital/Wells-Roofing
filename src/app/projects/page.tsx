import Image from "next/image";
import Link from "next/link";
import { getPage } from "@/config/pages";
import { projectCatalogues } from "@/config/proof";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { CTA } from "@/components/sections/CTA";

const page = getPage("projects");
export const metadata = metadataFor("projects");

/**
 * PROJECTS INDEX — one card per real project catalogue.
 *
 * Built from `projectCatalogues` (config/proof.ts), the same array that feeds
 * the Projects menu, so a new catalogue shows up here and in the nav at once.
 * Every card carries its suburb: that is the local-SEO payload of the page.
 *
 * Still to come (build phase): filtering by material and suburb, and
 * before/after pairs, once there are enough projects to need it.
 */
export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page)} />
      <PageHero
        page={page}
        image="/photography/hero-projects.jpg"
        intro="Slate, terracotta and concrete roofing projects across the Mornington Peninsula, Bayside and premium Melbourne — new builds, re-roofs and restorations."
      />

      <section className="py-section">
        <Container>
          <SectionHeading
            eyebrow="Project catalogue"
            title="Recent work."
            intro="Real Wells roofs, photographed on site. More projects are being added as they are photographed."
          />

          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {projectCatalogues.map((project, i) => {
              const cover = project.photos[project.cover];
              return (
                <li key={project.slug}>
                  <Reveal delay={(i % 3) * 0.1}>
                    <Link href={`/projects/${project.slug}/`} className="group block">
                      <div className="relative aspect-4/3 overflow-hidden rounded-card bg-surface">
                        <Image
                          src={cover.src}
                          alt={cover.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-slower ease-out-quart group-hover:scale-105"
                        />
                        <span className="absolute bottom-3 left-3 rounded-pill bg-navy-950/80 px-3 py-1 text-[0.75rem] font-semibold text-white">
                          {project.photos.length} photos
                        </span>
                      </div>
                      <h2 className="mt-5 font-display text-h4 font-extrabold uppercase tracking-tight text-foreground transition-colors group-hover:text-accent">
                        {project.title}
                      </h2>
                      <p className="mt-1 text-small text-muted">
                        {project.product} · {project.suburb}
                      </p>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <CTA />
    </>
  );
}
