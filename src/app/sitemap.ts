import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allPages, type PageSpec } from "@/config/pages";

/**
 * Emitted from the page spec, so the sitemap can never drift from the IA.
 * Priority mirrors the Priority column in the sitemap workbook.
 */
const priorityFor = (p: PageSpec): number => {
  if (p.url === "/") return 1;
  if (p.priority === "High") return p.phase === "P1" ? 0.9 : 0.8;
  if (p.priority === "Med") return 0.6;
  return 0.4;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Anything flagged `noindex` (e.g. the built-but-empty blog) is excluded —
  // submitting a URL you are also telling Google not to index is a mixed signal.
  return allPages
    .filter((p) => !p.noindex)
    .map((p) => ({
      url: new URL(p.url, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: p.type === "trust" ? "weekly" : "monthly",
      priority: priorityFor(p),
    }));
}
