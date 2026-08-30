import type { NextConfig } from "next";

/**
 * The eight service pages moved from the site root to /services/<name>.
 *
 * Every one of those old URLs must keep working. They are in the sitemap that
 * has already been generated, they are what the Google Ads final URLs point
 * at, and any of them may already be linked from a supplier page or a quote
 * PDF. A 404 on a money page is the single most expensive kind of broken link
 * there is.
 *
 * `permanent: true` issues a 308, which tells Google to move the indexed URL
 * and its accumulated authority to the new path rather than treating the new
 * one as an unrelated page starting from zero. It also preserves the request
 * method, unlike a 301.
 *
 * These entries are cheap and must NOT be removed once "everything has
 * updated" — old links live in other people's systems indefinitely, and the
 * only cost of leaving a redirect in place is one line in this file.
 */
const MOVED_TO_SERVICES = [
  "natural-slate-roofing",
  "slate-roof-restoration",
  "heritage-roofing",
  "slate-roof-repairs",
  "natural-slate-supply",
  "terracotta-tile-roofing",
  "concrete-tile-roofing",
  "for-architects-builders",
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
  },
  poweredByHeader: false,

  async redirects() {
    return MOVED_TO_SERVICES.map((slug) => ({
      source: `/${slug}`,
      destination: `/services/${slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
