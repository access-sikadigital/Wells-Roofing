import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { generalFaqs } from "@/config/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { DualPath } from "@/components/sections/DualPath";
import { Services } from "@/components/sections/Services";
import { Craft } from "@/components/sections/Craft";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTA } from "@/components/sections/CTA";
import { ArchitectsStrip } from "@/components/sections/ArchitectsStrip";
import { ReviewsStrip } from "@/components/sections/ReviewsStrip";

const page = getPage("home");
export const metadata = metadataFor("home");

/** Blueprint 6.1 — position Wells as the premium specialist, route both audiences. */
export default function HomePage() {
  return (
    <>
      <JsonLd data={schemaForPage(page, generalFaqs)} />

      {/* 1 — Hero */}
      <Hero />
      {/* 2 — Trust bar */}
      <TrustBar />
      {/* 3 — Dual path */}
      <DualPath />
      {/* 4 — Premium services */}
      <Services />
      {/* 5/6 — Slate feature & craft proof */}
      <Craft />
      {/* 6 — Heritage / project proof + 8 — Gallery */}

      {/* 7 — Architects & builders strip */}
      <ArchitectsStrip />

      {/* 9 — Process */}
      <ProcessSteps />
      {/* 10 — Reviews */}
      <ReviewsStrip />

      {/* 11 — Service area */}
      <ServiceArea />
      {/* 12 — FAQ */}
      <FaqSection faqs={generalFaqs} />
      {/* 13 — Final CTA */}
      <CTA />
    </>
  );
}
