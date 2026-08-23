/**
 * Single source of truth for site-wide business data.
 * Sourced from the 26-Q3-WELL-01 Web Discovery Questionnaire
 * and the official brand assets (logo lockup + July '26 EDM).
 */

export const FOUNDED_YEAR = 1982;

export const siteConfig = {
  name: "Wells Roofing",
  /** Logo strapline — use verbatim, it is part of the lockup. */
  strapline: "Prestige Slate & Tile Roofing Specialists",
  straplineShort: "Slate & Tile Roofing Specialists",
  since: `Since ${FOUNDED_YEAR}`,
  /** Brand line from the EDM sign-off. */
  motto: "Roofing for generations.",
  tagline:
    "Natural slate, terracotta and concrete roofing — supplied and installed across Melbourne and the Mornington Peninsula.",
  description:
    "Wells Roofing is a prestige slate and tile roofing specialist providing natural slate supply and installation, heritage restoration, re-roofing, repairs and premium tile roofing across Melbourne and the Mornington Peninsula. Since 1982.",
  url: "https://www.wellsroofing.com.au",

  /* Contact — freecall number and direct line from the EDM/onboarding */
  phone: "1800 066 052",
  phoneHref: "tel:1800066052",
  mobile: "0408 860 711",
  mobileHref: "tel:+61408860711",
  email: "wellsroofing@wellsfooring.com.au",
  contactName: "Steve Wells",
  address: "2/4 Frank St, Mornington VIC",

  serviceAreas: [
    "Mornington Peninsula",
    "Bayside",
    "Premium Inner Melbourne",
  ],

  nav: [
    { label: "Natural Slate", href: "#services" },
    { label: "Tile Roofing", href: "#services" },
    { label: "Our Craft", href: "#craft" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Request a Quote", href: "#contact" },

  /** Material propositions — wording taken from the brand EDM. */
  services: [
    {
      number: "01",
      title: "Natural Slate",
      headline: "Timeless beauty. Built to last.",
      description:
        "New slate roofs, re-roofing and heritage restoration in premium natural Spanish slate — from sourcing and specification support through to expert installation.",
      image: "/materials/natural-slate.jpg",
      href: "/natural-slate-roofing/",
      flagship: true,
    },
    {
      number: "02",
      title: "Terracotta",
      headline: "Classic style. Enduring performance.",
      description:
        "Premium terracotta roofing and re-roofing for period homes and architect-led builds, installed to a standard that suits the architecture and lasts.",
      image: "/materials/terracotta-tile.jpg",
      href: "/terracotta-tile-roofing/",
      flagship: false,
    },
    {
      number: "03",
      title: "Concrete",
      headline: "Versatile design. Proven strength.",
      description:
        "Dependable concrete tile roofing and re-roofing for premium builders and owners — engineered detail, clean lines, decades of service life.",
      image: "/materials/concrete-tile.jpg",
      href: "/concrete-tile-roofing/",
      flagship: false,
    },
  ],
} as const;

/** Years trading, computed so it never goes stale. */
export function yearsTrading(now: Date = new Date()) {
  return now.getFullYear() - FOUNDED_YEAR;
}

