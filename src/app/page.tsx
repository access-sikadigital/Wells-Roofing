import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { generalFaqs } from "@/config/faqs";
import { selectedProjects } from "@/config/proof";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Craft } from "@/components/sections/Craft";
import { ProcessSteps, summarySteps } from "@/components/sections/ProcessSteps";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { ArchitectsStrip } from "@/components/sections/ArchitectsStrip";
import { ReviewsStrip } from "@/components/sections/ReviewsStrip";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTA } from "@/components/sections/CTA";

const page = getPage("home");
export const metadata = metadataFor("home");

/**
 * HOMEPAGE — rebuilt to the order the client specified in feedback v1:
 *
 *   Hero → Three materials → Why Wells (3–4 proof points only)
 *        → Selected real projects → Architects & Builders (short)
 *        → Real reviews → Where we work → Final CTA
 *
 * ── What was cut, and why ──────────────────────────────────────────────────
 * The brief's "Cut:" list named the full six-step process, long FAQ content,
 * repeated service-area/guarantee/process blocks and competing slogans.
 *
 *  · `TrustBar`  — removed. It was three proof points immediately above
 *    `Craft`, which is itself three proof points. Two proof sections back to
 *    back is the duplication the brief objects to, and the bar also appears on
 *    six service pages. `Craft` is the better one: it has room to say why.
 *
 *  · `DualPath`  — removed. It routed "homeowner vs architect/builder", but
 *    `ArchitectsStrip` already routes the trade audience and the rest of the
 *    page addresses homeowners. Two routers on one page is a fork the visitor
 *    has to resolve twice.
 *
 *  · Six-step process → the three-step summary, per table 4. The full version
 *    still runs on the flagship slate page.
 *
 *  · FAQ → three questions and a link to /faqs. The FULL bank still goes to
 *    `schemaForPage` below, so the FAQPage rich result is unaffected — the cap
 *    is presentational only.
 */
export default function HomePage() {
  return (
    <>
      {/* Full FAQ bank to schema, three to the page — see FaqSection. */}
      <JsonLd data={schemaForPage(page, generalFaqs)} />

      {/* 1 — Hero */}
      <Hero h1={page.h1} />

      {/* 2 — Three materials */}
      <Services />

      {/* 3 — Why Wells: three proof points, no more */}
      <Craft />

      {/* 4 — How it works, in three steps */}
      <ProcessSteps
        steps={summarySteps}
        title="Three steps, start to finish."
        intro="The full process runs to six stages — here is the shape of it."
      />

      {/*
        5 — Selected real projects.
        Reads `selectedProjects`, which is deliberately empty until Wells
        supplies real photography; the gallery renders an honest
        "we're photographing recent work" state rather than dressing stock
        photos up as completed jobs. See src/config/proof.ts.
      */}
      <ProjectGallery
        eyebrow="Selected projects"
        title="Recent work."
        intro="Slate, terracotta and concrete roofs across Melbourne and the Mornington Peninsula."
        items={selectedProjects}
      />

      {/* 6 — Architects & builders, short */}
      <ArchitectsStrip />

      {/* 7 — Real reviews */}
      <ReviewsStrip />

      {/* 8 — Where we work */}
      <ServiceArea />

      {/* 9 — Three questions, then through to the full page */}
      <FaqSection
        faqs={generalFaqs}
        limit={3}
        more={{ label: "Read all FAQs", href: "/faqs/" }}
      />

      {/* 10 — Final CTA */}
      <CTA />
    </>
  );
}
