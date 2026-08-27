import { siteConfig, FOUNDED_YEAR } from "@/config/site";
import type { Faq } from "@/config/faqs";
import type { PageSpec } from "@/config/pages";

/**
 * JSON-LD generators.
 * Schema types per page come from the On-Page SEO sheet in the workbook.
 * Emit with <JsonLd /> (src/components/seo/JsonLd.tsx).
 */

type Json = Record<string, unknown>;

const abs = (path: string) =>
  new URL(path, siteConfig.url).toString().replace(/\/$/, "") || siteConfig.url;

/** Core business entity — reused as the @id target across the site. */
export const ORGANISATION_ID = `${siteConfig.url}/#organisation`;

export function organisationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": ["RoofingContractor", "LocalBusiness"],
    "@id": ORGANISATION_ID,
    name: siteConfig.name,
    /* Registered entity differs from the trading name; both are useful to
       Google for entity resolution. `vatID` is the closest schema.org property
       to an Australian ABN — there is no dedicated one. */
    legalName: siteConfig.legalName,
    vatID: siteConfig.abn,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    foundingDate: String(FOUNDED_YEAR),
    /*
      Was `siteConfig.motto` — "Roofing for generations."
      This schema block renders in the <head> of EVERY route from the root
      layout, so the slogan was being asserted sitewide, including on the
      terracotta and concrete pages. Client feedback v1 reserves that line for
      natural-slate pages and campaigns only. The positioning line is true
      everywhere, so it is the one that belongs in a sitewide entity.
    */
    slogan: `${siteConfig.straplineShort} — ${siteConfig.since}`,
    image: abs("/brand/badge.png"),
    logo: abs("/brand/logo.png"),
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2/4 Frank St",
      addressLocality: "Mornington",
      addressRegion: "VIC",
      postalCode: "3931",
      addressCountry: "AU",
    },
    areaServed: siteConfig.serviceAreas.map((a) => ({
      "@type": "AdministrativeArea",
      name: a,
    })),
    knowsAbout: [
      "Natural slate roofing",
      "Spanish slate",
      "Heritage roof restoration",
      "Terracotta tile roofing",
      "Concrete tile roofing",
    ],
  };
}

export function serviceSchema(page: PageSpec): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${abs(page.url)}#service`,
    name: page.h1,
    description: page.description,
    serviceType: page.primaryKeyword?.term ?? page.label,
    url: abs(page.url),
    provider: { "@id": ORGANISATION_ID },
    areaServed:
      page.suburbs?.map((s) => ({ "@type": "Place", name: s })) ??
      siteConfig.serviceAreas.map((a) => ({
        "@type": "AdministrativeArea",
        name: a,
      })),
  };
}

export function faqSchema(faqs: Faq[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Slate as a supplied product — /natural-slate-supply/ only. */
export function productSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Premium Natural Spanish Slate",
    description:
      "Premium natural Spanish roofing slate from the CUPA PIZARRAS quarries, supplied and specified for architects and builders.",
    brand: { "@type": "Brand", name: "CUPA PIZARRAS" },
    category: "Roofing slate",
    seller: { "@id": ORGANISATION_ID },
  };
}

export function breadcrumbSchema(
  trail: { name: string; url: string }[]
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.url),
    })),
  };
}

/**
 * Assemble every schema block a page declares in its spec.
 * Pass `faqs` when the page declares FAQPage.
 */
export function schemaForPage(page: PageSpec, faqs?: Faq[]): Json[] {
  const blocks: Json[] = [];

  /*
   * The organisation block is emitted by the root layout on EVERY route, not
   * here — the strategy doc (§7 Local SEO) requires LocalBusiness schema
   * sitewide, and pages like /projects and /contact never declared it.
   * Emitting it again on the pages that do declare it would produce a
   * duplicate node, so this only adds the page-specific blocks.
   * See organisationSchema() in the root layout.
   */
  if (page.schema.includes("Service")) blocks.push(serviceSchema(page));
  if (page.schema.includes("Product")) blocks.push(productSchema());
  if (page.schema.includes("FAQPage") && faqs?.length) {
    blocks.push(faqSchema(faqs));
  }

  if (page.url !== "/") {
    blocks.push(
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: page.label, url: page.url },
      ])
    );
  }

  return blocks;
}
