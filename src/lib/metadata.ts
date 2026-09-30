import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getPage, type PageKey } from "@/config/pages";

/**
 * Build Next Metadata straight from the page spec, so the title tag and
 * meta description on every route are exactly what the SEO workbook says.
 *
 *   export const metadata = metadataFor("natural-slate-roofing");
 */
export function metadataFor(key: PageKey): Metadata {
  const page = getPage(key);
  const canonical = page.url === "/" ? "/" : page.url;

  return {
    // `absolute` stops the root layout's "%s — Wells Roofing" template from
    // appending to titles that already contain the brand.
    title: { absolute: page.title },
    description: page.description,
    keywords: [
      ...(page.primaryKeyword ? [page.primaryKeyword.term] : []),
      ...(page.supportingKeywords ?? []),
    ],
    alternates: { canonical },
    /*
      `noindex` pages (the empty blog, the thank-you page) were excluded from
      sitemap.xml but never carried the meta tag, so Google could still index
      them from a link. `follow` stays on deliberately — the page shouldn't
      rank, but the links out of it should still count.
    */
    ...(page.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName: siteConfig.name,
      url: canonical,
      title: page.title,
      description: page.description,
      images: ["/brand/og.png"],
    },
  };
}
