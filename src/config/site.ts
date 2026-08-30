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
  /**
   * APPROVED HOMEPAGE H1 — client feedback v1, table 3.
   * "Still setting the standard in slate & tile roofing."
   */
  headline: "Still setting the standard in slate & tile roofing.",
  /**
   * Legacy brand line from the EDM sign-off.
   *
   * ⚠️  DELIBERATELY NAMED `slateMotto`, NOT `motto`.
   *
   * Client feedback v1: "Reserve for natural slate-specific pages and
   * campaigns only — do not use on terracotta or concrete pages."
   *
   * When it was called `motto` it read as a general-purpose brand line and
   * duly leaked into three sitewide surfaces — the homepage H1, the footer,
   * the final CTA band and the LocalBusiness `slogan` in the JSON-LD, which
   * put it on all 19 pages including terracotta and concrete. The name now
   * carries the constraint, so anyone reaching for it on a tile page has to
   * type the word "slate" to do it.
   *
   * Sitewide surfaces should use `straplineShort` + `since` instead.
   */
  slateMotto: "Roofing for generations.",
  tagline:
    "Natural slate, terracotta and concrete roofing — supplied and installed across Melbourne and the Mornington Peninsula.",
  description:
    "Wells Roofing is a prestige slate and tile roofing specialist providing natural slate supply and installation, re-roofing, slate repairs, restoration and premium terracotta and concrete tile roofing across Melbourne and the Mornington Peninsula. Since 1982.",
  url: "https://www.wellsroofing.com.au",

  /* Contact — freecall number and direct line from the EDM/onboarding */
  phone: "1800 066 052",
  phoneHref: "tel:1800066052",
  mobile: "0408 860 711",
  mobileHref: "tel:+61408860711",
  /* Client feedback v1: was "wellsroofing@wellsfooring.com.au" — the domain
     was misspelled. Confirmed correct address below. */
  email: "wellsroofing@wellsroofing.com.au",
  contactName: "Steve Wells",
  address: "2/4 Frank St, Mornington VIC",
  /* Confirmed in the client feedback brief letterhead. Legally required on
     commercial correspondence and used in the LocalBusiness schema. */
  abn: "28 700 020 499",
  legalName: "Wells Roofing Pty Ltd",

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
        "Premium natural Spanish slate for architect-designed new builds, re-roofing and heritage restoration — sourced, specified and installed by us.",
      image: "/materials/natural-slate.jpg",
      href: "/services/natural-slate-roofing/",
      flagship: true,
    },
    {
      number: "02",
      title: "Terracotta",
      /* Client feedback v1: terracotta owns warmth, colour, character and
         timeless design — its own territory, not a step below slate. */
      headline: "Timeless for a reason.",
      description:
        "Bristile La Escandella terracotta from Spain — colour that comes from the clay itself, in profiles and finishes that suit anything from a coastal home to a modern architectural build.",
      image: "/materials/terracotta-tile.jpg",
      href: "/services/terracotta-tile-roofing/",
      flagship: false,
    },
    {
      number: "03",
      title: "Concrete",
      /* Client feedback v1: concrete is about versatility and design choice.
         Do NOT frame it as the cheap option underneath slate and terracotta. */
      headline: "Versatile by design.",
      description:
        "Bristile concrete tiles in a wide range of profiles, colours and finishes — the most design-flexible of the three, and a Wells distribution range for over 25 years.",
      image: "/materials/concrete-tile.jpg",
      href: "/services/concrete-tile-roofing/",
      flagship: false,
    },
  ],
} as const;

/** Years trading, computed so it never goes stale. */
export function yearsTrading(now: Date = new Date()) {
  return now.getFullYear() - FOUNDED_YEAR;
}

