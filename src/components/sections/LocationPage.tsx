import { getPage, type PageKey } from "@/config/pages";
import { schemaForPage } from "@/lib/schema";
import { generalFaqs, slateFaqs } from "@/config/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteFormPlaceholder } from "@/components/sections/QuoteFormPlaceholder";
import { TrustBar } from "@/components/sections/TrustBar";
import { ContentBlock, CheckList } from "@/components/sections/ContentBlock";
import { FaqSection } from "@/components/sections/FaqSection";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { CTA } from "@/components/sections/CTA";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ReviewsStrip } from "@/components/sections/ReviewsStrip";
import { LocationMap } from "@/components/sections/LocationMap";

/**
 * Shared template for the three region hubs.
 *
 * WARNING from the strategy doc: each region page must carry genuinely unique
 * copy and local proof. Duplicated suburb pages get filtered by Google and can
 * actively hurt. `intro`, `localAngle` and `localProof` are the per-region
 * differentiators — never ship two regions with the same text in them.
 */
export function LocationPage({
  pageKey,
  image,
  localImage,
  intro,
  localAngle,
  localProof,
}: {
  pageKey: PageKey;
  /**
   * Hero for this region. Required, not defaulted — all three hubs previously
   * shared one hardcoded frame, which is precisely what the strategy doc warns
   * against. Making it required means a new region cannot be added without
   * someone choosing its photograph.
   */
  image: string;
  /**
   * Portrait for the "In this area" block. Required for the same reason as
   * `image` — all three regions previously shared one hard-coded file.
   */
  localImage: string;
  intro: string;
  localAngle: { title: string; copy: string; items: string[] };
  localProof: string;
}) {
  const page = getPage(pageKey);
  const faqs = [...generalFaqs.slice(0, 2), ...slateFaqs.slice(0, 4)];

  return (
    <>
      <JsonLd data={schemaForPage(page, faqs)} />

      <PageHero page={page} image={image} intro={intro} />
      <QuoteFormPlaceholder
        title={`Get a quote in ${page.label}`}
        intro="Local, based in Mornington, and on the road across the region most days."
      />
      <TrustBar />

      <ContentBlock
        eyebrow="In this area"
        title={localAngle.title}
        intro={localAngle.copy}
        image={localImage}
      >
        <CheckList items={localAngle.items} />
      </ContentBlock>

      {/* 4 — Local projects */}

      {/* 5 — Suburbs served — the local SEO payload */}
      <section className="py-section">
        <Container>
          <SectionHeading
            eyebrow="Suburbs served"
            title={`Where we work in ${page.label}.`}
            intro={localProof}
          />
          <Reveal delay={0.15}>
            <ul className="mt-10 flex flex-wrap gap-3">
              {page.suburbs?.map((suburb) => (
                <li
                  key={suburb}
                  className="rounded-pill border border-line bg-background px-5 py-2.5 font-display text-small font-bold uppercase tracking-wide text-foreground"
                >
                  {suburb}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* 6 — Reviews (local) */}
      <ReviewsStrip
        eyebrow="Local reviews"
        title={`What ${page.label} clients say.`}
      />

      {/* 6 — Map + NAP */}
      <LocationMap region={page.label} />

      <FaqSection faqs={faqs} title={`Roofing in ${page.label}.`} />

      <RelatedServices
        keys={[
          "natural-slate-roofing",
          "slate-roof-restoration",
          "heritage-roofing",
        ]}
        eyebrow="Services here"
        title="What we do in this area."
      />

      <CTA />
    </>
  );
}
