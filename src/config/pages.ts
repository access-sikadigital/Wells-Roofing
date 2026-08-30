/**
 * INFORMATION ARCHITECTURE + SEO SPEC
 * ===================================
 * Encoded verbatim from:
 *   · Wells_Roofing_Sitemap_Keywords_Page_Blueprints.docx
 *   · Wells_Roofing_Sitemap_and_Keyword_Workbook.xlsx
 * Keyword data: Semrush, Australia database (validated, not assumed).
 *
 * This is the single source of truth for every route, title tag, meta
 * description, H1, keyword focus and schema type on the site. Routes read
 * from here — never hardcode metadata in a page file.
 *
 * Rule from the strategy doc: one focus keyword per page, so pages never
 * compete with each other. Supporting keywords go in H2s, body and FAQs.
 */

export type Phase = "P1" | "P2";
export type Priority = "High" | "Med" | "Low";
export type Audience = "homeowner" | "trade" | "both";
export type PageType =
  | "home"
  | "service"
  | "service-b2b"
  | "hub"
  | "trust"
  | "company"
  | "conversion"
  | "support"
  | "location"
  | "content";

export type SchemaType =
  | "RoofingContractor"
  | "LocalBusiness"
  | "Service"
  | "Product"
  | "FAQPage"
  | "CollectionPage"
  | "ImageGallery"
  | "Review"
  | "AboutPage"
  | "Organization"
  | "ContactPage";

export type Keyword = {
  term: string;
  /** Avg monthly searches, Australia */
  vol: number;
  /** Keyword difficulty 0–100, lower = easier */
  kd: number;
  cpc?: number;
};

export type PageSpec = {
  /** Stable key used for lookups */
  key: string;
  /** Nav / internal label */
  label: string;
  /** Full title as it appears in the sitemap sheet */
  name: string;
  /** Route. Trailing slash matches the spec; Next resolves without it. */
  url: string;
  type: PageType;
  audience: Audience;
  phase: Phase;
  priority: Priority;
  /** The one keyword this page owns */
  primaryKeyword?: Keyword;
  supportingKeywords?: string[];
  /** ~55–60 chars */
  title: string;
  /** ~150–155 chars */
  description: string;
  h1: string;
  schema: SchemaType[];
  /** Location hubs only */
  suburbs?: string[];
  /** One-line brief of the page's job, from the blueprint doc */
  job?: string;
  /** Kept out of sitemap.xml and marked noindex. Used for built-but-empty routes. */
  noindex?: boolean;
};

/* ==========================================================================
   PAGES
   ========================================================================== */

export const pages = [
  {
    key: "home",
    label: "Home",
    name: "Home",
    url: "/",
    type: "home",
    audience: "both",
    phase: "P1",
    priority: "High",
    primaryKeyword: {
      term: "slate roofing melbourne",
      vol: 140,
      kd: 33,
      cpc: 3.22,
    },
    supportingKeywords: [
      "premium slate & tile roofing",
      "slate roof melbourne",
      "roofers mornington peninsula",
    ],
    title: "Slate & Tile Roofing Melbourne & Mornington | Wells Roofing",
    description:
      "Melbourne & Mornington Peninsula's premium natural slate & tile roofing specialists. Family owned since 1982. Get a quote.",
    /*
     * APPROVED by the client (feedback v1, table 3): "Still setting the
     * standard in slate & tile roofing." — use as the primary H1/hero line.
     *
     * It replaces both the previous spec H1 ("Melbourne's Premium Slate & Tile
     * Roofing Specialists") and the line the Hero was actually rendering
     * ("Roofing for generations."), which was hardcoded and never read this
     * field at all. `Hero` now takes the H1 as a prop like every other page.
     */
    h1: "Still setting the standard in slate & tile roofing.",
    schema: ["RoofingContractor", "FAQPage"],
    job: "Position Wells as the premium slate & tile specialist and route the two audiences.",
  },

  /* ----------------------------------------------------------------------
     SERVICES HUB — the parent of /services/*.
     Added when the service pages moved from the root to /services/<name>.
     A section of a site should have something at its own root: /services/
     previously 404'd, which is a dead end for anyone who trims the URL and a
     missing rung in the breadcrumb trail for all eight children.
     ---------------------------------------------------------------------- */
  {
    key: "services",
    label: "Services",
    name: "Services (hub)",
    url: "/services/",
    type: "hub",
    audience: "both",
    phase: "P1",
    priority: "High",
    primaryKeyword: { term: "roofing services melbourne", vol: 90, kd: 30 },
    supportingKeywords: [
      "slate roofing services",
      "tile roofing services",
      "roof replacement melbourne",
    ],
    title: "Roofing Services Melbourne | Wells Roofing",
    description:
      "Natural slate, terracotta and concrete tile roofing across Melbourne & the Mornington Peninsula — new roofs, re-roofing, restoration, repairs and supply.",
    h1: "Our Roofing Services",
    schema: ["CollectionPage"],
    job: "Hub for the eight service pages; catches broad 'roofing services' intent and passes authority down to the clusters.",
  },

  /* ---------------- Slate cluster ---------------- */
  {
    key: "natural-slate-roofing",
    label: "Natural Slate Roofing",
    name: "Natural Slate Roofing (flagship)",
    url: "/services/natural-slate-roofing/",
    type: "service",
    audience: "homeowner",
    phase: "P1",
    priority: "High",
    primaryKeyword: { term: "slate roofing", vol: 390, kd: 39, cpc: 5.38 },
    supportingKeywords: [
      "natural slate roofing",
      "slate roof installation",
      "new slate roof",
      "spanish slate roofing",
      "slate roofers melbourne",
    ],
    title: "Natural Slate Roofing Melbourne | Wells Roofing",
    description:
      "Premium natural & Spanish slate roofs across Melbourne & the Mornington Peninsula. Slate specialists since 1982. Get a quote.",
    h1: "Natural Slate Roofing, Melbourne & Mornington Peninsula",
    schema: ["RoofingContractor", "Service", "FAQPage"],
    job: "Flagship money page. Also the PPC landing page for slate search & Meta campaigns — same URL.",
  },
  {
    key: "slate-roof-restoration",
    label: "Slate Roof Restoration",
    name: "Slate Roof Restoration",
    url: "/services/slate-roof-restoration/",
    type: "service",
    audience: "homeowner",
    phase: "P1",
    priority: "High",
    primaryKeyword: {
      term: "slate roof restoration",
      vol: 170,
      kd: 40,
      cpc: 8.5,
    },
    supportingKeywords: [
      "heritage roof restoration",
      "restore vs replace slate roof",
      "slate roof melbourne",
    ],
    title: "Slate Roof Restoration Melbourne | Wells Roofing",
    description:
      "Sympathetic slate & heritage roof restoration that preserves your home's character. Specialist craftsmanship, honest advice. Book a consultation.",
    h1: "Slate & Heritage Roof Restoration",
    schema: ["Service", "FAQPage"],
    job: "Answer the #1 objection: restore vs replace.",
  },
  {
    key: "heritage-roofing",
    label: "Heritage Roofing",
    name: "Heritage Roofing",
    url: "/services/heritage-roofing/",
    type: "service",
    audience: "homeowner",
    phase: "P1",
    priority: "High",
    primaryKeyword: { term: "heritage roofing", vol: 110, kd: 20, cpc: 4.24 },
    supportingKeywords: [
      "heritage roofing melbourne",
      "heritage roof restoration",
      "period slate roofs",
    ],
    title: "Heritage Roofing Melbourne | Wells Roofing",
    description:
      "Heritage roofing specialists for Melbourne's period homes — slate, terracotta & sympathetic restoration. Since 1982.",
    h1: "Heritage Roofing for Melbourne's Period Homes",
    schema: ["Service", "FAQPage"],
    job: "Anchors the heritage topic cluster; links tightly with Slate Roofing and Restoration.",
  },
  {
    key: "slate-roof-repairs",
    label: "Slate Roof Repairs",
    name: "Slate Roof Repairs",
    url: "/services/slate-roof-repairs/",
    type: "service",
    audience: "homeowner",
    phase: "P2",
    priority: "Med",
    primaryKeyword: {
      term: "slate roof repairs melbourne",
      vol: 140,
      kd: 22,
      cpc: 8.92,
    },
    supportingKeywords: [
      "slate roof repairs",
      "slate roof leak repair",
      "slate replacement tiles",
    ],
    title: "Slate Roof Repairs Melbourne | Wells Roofing",
    description:
      "Specialist slate roof repairs — slipped slates, leaks & flashings fixed and matched to your roof. Melbourne & the Peninsula.",
    h1: "Slate Roof Repairs by Specialists",
    schema: ["Service", "FAQPage"],
    job: "Slate repairs only — tile repairs deliberately excluded.",
  },
  {
    key: "natural-slate-supply",
    label: "Natural Slate Supply",
    name: "Natural Slate Supply & Specification",
    url: "/services/natural-slate-supply/",
    type: "service-b2b",
    audience: "trade",
    phase: "P1",
    priority: "High",
    primaryKeyword: { term: "slate tiles", vol: 1600, kd: 17, cpc: 0.71 },
    supportingKeywords: [
      "slate roof tiles",
      "slate tiles melbourne",
      "slate supplier australia",
      "cupa pizarras",
      "where to buy roof tiles",
      "del carmen slate",
    ],
    title: "Natural Slate Supply & Specification | Wells Roofing",
    description:
      "Premium Spanish slate from CUPA PIZARRAS supplied & specified for architects and builders. Samples, specification support, reliable lead times.",
    h1: "Natural Slate Supply & Specification for Architects & Builders",
    schema: ["Service", "Product", "FAQPage"],
    job: "Highest-volume organic opportunity on the site. Anchors the architects & builders hub.",
  },

  /* ---------------- Tile cluster ---------------- */
  {
    key: "terracotta-tile-roofing",
    label: "Terracotta Tile Roofing",
    name: "Terracotta Tile Roofing",
    url: "/services/terracotta-tile-roofing/",
    type: "service",
    audience: "both",
    phase: "P2",
    priority: "High",
    primaryKeyword: {
      term: "terracotta roof tiles",
      vol: 1300,
      kd: 12,
      cpc: 3.61,
    },
    supportingKeywords: [
      "terracotta roofing",
      "terracotta roof replacement",
      "tile roof replacement",
      "bristile roof tiles",
    ],
    title: "Terracotta Tile Roofing & Re-Roofing | Wells Roofing",
    description:
      "Premium terracotta tile roofing, re-roofing & replacement across Melbourne & the Peninsula. Quality tiles, expert installation. Get a quote.",
    h1: "Premium Terracotta Tile Roofing",
    schema: ["Service", "FAQPage"],
    job: "~$40k projects. High-volume, low-difficulty — can move to Phase 1 if budget allows.",
  },
  {
    key: "concrete-tile-roofing",
    label: "Concrete Tile Roofing",
    name: "Concrete Tile Roofing",
    url: "/services/concrete-tile-roofing/",
    type: "service",
    audience: "both",
    phase: "P2",
    priority: "High",
    primaryKeyword: {
      term: "concrete roof tiles",
      vol: 1300,
      kd: 17,
      cpc: 2.04,
    },
    supportingKeywords: [
      "concrete tile roofing",
      "concrete tile roof replacement",
      "re roofing melbourne",
      "tile roof replacement",
    ],
    title: "Concrete Tile Roofing & Re-Roofing | Wells Roofing",
    description:
      "Concrete tile roofing & re-roofing to a premium standard for homeowners & builders across Melbourne & the Peninsula. Get a quote.",
    h1: "Concrete Tile Roofing & Re-Roofing",
    schema: ["Service", "FAQPage"],
    job: "~$30k projects. Builder cash-flow and trust base.",
  },

  /* ---------------- Audience, trust & conversion ---------------- */
  {
    key: "for-architects-builders",
    label: "For Architects & Builders",
    name: "For Architects & Builders",
    url: "/services/for-architects-builders/",
    type: "hub",
    audience: "trade",
    phase: "P1",
    priority: "High",
    title: "Roofing for Architects & Builders | Wells Roofing",
    description:
      "Slate & premium tile supply, specification support and expert installation for architects and builders on prestige Melbourne projects.",
    h1: "Slate & Premium Tile Roofing for Architects & Builders",
    schema: ["Service", "FAQPage"],
    job: "B2B hub routing to slate supply + specification support. Distinct, professional tone.",
  },
  {
    key: "projects",
    label: "Projects",
    name: "Projects / Gallery",
    url: "/projects/",
    type: "trust",
    audience: "both",
    phase: "P1",
    priority: "High",
    title: "Our Roofing Projects | Wells Roofing",
    description:
      "Real slate, heritage & tile roofing projects across the Mornington Peninsula, Bayside & premium Melbourne. Before & after.",
    h1: "Our Roofing Projects",
    schema: ["CollectionPage", "ImageGallery"],
    job: "Filterable by material and suburb; before/after; captions with location for local SEO.",
  },
  {
    key: "reviews",
    label: "Reviews",
    name: "Reviews",
    url: "/reviews/",
    type: "trust",
    audience: "both",
    phase: "P1",
    priority: "Med",
    title: "Reviews & Testimonials | Wells Roofing",
    description:
      "What Melbourne & Peninsula homeowners, architects and builders say about Wells Roofing's slate and tile work.",
    h1: "Reviews & Testimonials",
    schema: ["Review"],
    job: "Google reviews feed + written testimonials + case studies as they build.",
  },
  {
    key: "about",
    label: "About",
    name: "About",
    url: "/about/",
    type: "company",
    audience: "both",
    phase: "P1",
    priority: "Med",
    title: "About Wells Roofing | Slate Roofing Since 1982",
    description:
      "An established Mornington Peninsula roofing name, now Melbourne's premium natural slate & tile specialist. Meet the team.",
    h1: "Specialist Roofing Since 1982",
    schema: ["AboutPage", "Organization"],
    job: "Established and expert, not a start-up. Heritage story + deliberate premium repositioning.",
  },
  {
    key: "contact",
    label: "Contact",
    name: "Contact / Get a Quote",
    url: "/contact/",
    type: "conversion",
    audience: "both",
    phase: "P1",
    priority: "High",
    title: "Contact Wells Roofing | Get a Quote",
    description:
      "Request a quote or book a consultation for slate, heritage or tile roofing. Based in Mornington, serving Melbourne & the Peninsula.",
    h1: "Get a Quote",
    schema: ["ContactPage"],
    job: "Multi-step qualifying form (slate vs tile, homeowner vs architect/builder, project stage, suburb) → GHL.",
  },
  {
    key: "faqs",
    label: "FAQs",
    name: "FAQs",
    url: "/faqs/",
    type: "support",
    audience: "both",
    phase: "P1",
    priority: "Med",
    title: "Roofing FAQs | Wells Roofing",
    description:
      "Answers on slate roof cost & lifespan, restore vs replace, terracotta & concrete tiles, and our process.",
    h1: "Frequently Asked Questions",
    schema: ["FAQPage"],
    job: "Sitewide FAQ built from real search questions.",
  },

  {
    key: "blog",
    label: "Insights",
    name: "Blog (built-for-it)",
    url: "/blog/",
    type: "content",
    audience: "both",
    phase: "P2",
    priority: "Low",
    title: "Roofing Insights & Advice | Wells Roofing",
    description:
      "Practical advice on slate, heritage and tile roofing from Melbourne's specialists — restore versus replace, materials, costs and care.",
    h1: "Roofing Insights",
    schema: ["CollectionPage"],
    noindex: true,
    job: "Built for it, not populated. Ships noindex until there are real posts — an empty blog is a thin-content liability, not a quick win.",
  },

  /* ---------------- Location hubs ---------------- */
  {
    key: "loc-mornington-peninsula",
    label: "Mornington Peninsula",
    name: "Slate Roofing Mornington Peninsula",
    url: "/slate-roofing-mornington-peninsula/",
    type: "location",
    audience: "both",
    phase: "P2",
    priority: "High",
    primaryKeyword: {
      term: "roofing mornington peninsula",
      vol: 140,
      kd: 5,
      cpc: 4.91,
    },
    supportingKeywords: [
      "roofing mornington",
      "slate roofing mornington peninsula",
      "roofers mornington",
      "roofing mount martha",
      "roofing mount eliza",
    ],
    title: "Slate Roofing Mornington Peninsula | Wells Roofing",
    description:
      "Specialist slate, heritage & tile roofing across the Mornington Peninsula — Mornington, Mt Eliza, Mt Martha & more. Local since 1982.",
    /*
     * Client feedback v1: heritage must not dominate the identity — the site
     * has to read as equally credible for contemporary architect-designed
     * homes. Three location H1s opened on "Slate & Heritage Roofing", which
     * made heritage the first thing a local searcher saw.
     *
     * Checked before changing: none of these pages carries a heritage keyword,
     * primary or supporting. The word was pure positioning, not SEO, so
     * swapping it for "Tile" costs nothing and matches the master brand
     * ("premium slate & tile roofing specialist"). Every primary keyword —
     * "roofing brighton", "roofing mornington peninsula", "slate roofing
     * melbourne" — is untouched.
     *
     * /slate-roof-restoration/ KEEPS "Heritage" in its H1: it genuinely targets
     * "heritage roof restoration" as a supporting keyword.
     */
    h1: "Slate & Tile Roofing on the Mornington Peninsula",
    schema: ["RoofingContractor", "FAQPage"],
    /* ⚠️  STEVE TO CONFIRM COVERAGE.
       Suburbs below the original list were added to flesh out the region
       index — all are unambiguously inside the region Wells already claims
       sitewide, but strike any the team does not actually travel to. These
       names are indexable content on the region pages, so they earn their
       place twice: they drive the "+N more" count on the homepage AND they
       are what someone searching "slate roofer <suburb>" matches against. */
    suburbs: [
      "Mornington",
      "Mount Martha",
      "Mount Eliza",
      "Sorrento",
      "Portsea",
      "Flinders",
      "Red Hill",
      "Rye",
      "Rosebud",
      "Dromana",
      "Safety Beach",
    ],
    job: "Home region. Must have genuinely unique local copy and proof.",
  },
  {
    key: "loc-bayside",
    label: "Bayside",
    name: "Slate Roofing Bayside",
    url: "/slate-roofing-bayside/",
    type: "location",
    audience: "both",
    phase: "P2",
    priority: "Med",
    primaryKeyword: { term: "roofing brighton", vol: 210, kd: 17, cpc: 10.76 },
    supportingKeywords: [
      "roofing bayside melbourne",
      "slate roofing brighton",
      "roofers bayside",
    ],
    title: "Slate Roofing Bayside Melbourne | Wells Roofing",
    description:
      "Premium slate, heritage & tile roofing across Bayside — Brighton, Hampton, Sandringham, Black Rock & Beaumaris.",
    h1: "Slate & Tile Roofing in Bayside",
    schema: ["RoofingContractor", "FAQPage"],
    /* ⚠️  STEVE TO CONFIRM COVERAGE.
       Suburbs below the original list were added to flesh out the region
       index — all are unambiguously inside the region Wells already claims
       sitewide, but strike any the team does not actually travel to. These
       names are indexable content on the region pages, so they earn their
       place twice: they drive the "+N more" count on the homepage AND they
       are what someone searching "slate roofer <suburb>" matches against. */
    suburbs: [
      "Brighton",
      "Hampton",
      "Sandringham",
      "Black Rock",
      "Beaumaris",
      "Brighton East",
      "Elwood",
      "Hampton East",
      "Cheltenham",
      "Mentone",
    ],
  },
  {
    key: "loc-melbourne",
    label: "Melbourne (inner-east)",
    name: "Slate Roofing Melbourne (inner-east)",
    url: "/slate-roofing-melbourne/",
    type: "location",
    audience: "both",
    phase: "P2",
    priority: "Med",
    primaryKeyword: {
      term: "slate roofing melbourne",
      vol: 140,
      kd: 33,
      cpc: 3.22,
    },
    supportingKeywords: [
      "roofing toorak",
      "roofing kew",
      "roofing camberwell",
    ],
    title: "Slate Roofing Melbourne | Wells Roofing",
    description:
      "Premium slate & heritage roofing for Melbourne's inner-east — Toorak, Kew, Camberwell, Malvern, Hawthorn & Armadale.",
    h1: "Slate & Tile Roofing in Premium Melbourne",
    schema: ["RoofingContractor", "FAQPage"],
    /* ⚠️  STEVE TO CONFIRM COVERAGE.
       Suburbs below the original list were added to flesh out the region
       index — all are unambiguously inside the region Wells already claims
       sitewide, but strike any the team does not actually travel to. These
       names are indexable content on the region pages, so they earn their
       place twice: they drive the "+N more" count on the homepage AND they
       are what someone searching "slate roofer <suburb>" matches against. */
    suburbs: [
      "Toorak",
      "South Yarra",
      "Armadale",
      "Malvern",
      "Hawthorn",
      "Kew",
      "Camberwell",
      "Elsternwick",
      "Prahran",
      "Balwyn",
      "Canterbury",
      "Glen Iris",
    ],
  },
] as const satisfies readonly PageSpec[];

export type PageKey = (typeof pages)[number]["key"];

/**
 * `pages` is `as const`, which is what gives us the literal `PageKey` union —
 * but it also means optional fields (`noindex`, `suburbs`, `primaryKeyword`)
 * only exist on the members that set them, so reading them off the union
 * fails to type-check. Iterate over this widened view instead; use `pages`
 * when you want the literal types.
 */
export const allPages: readonly PageSpec[] = pages;

/* ==========================================================================
   LOOKUPS
   ========================================================================== */

const byKey = new Map(pages.map((p) => [p.key, p as PageSpec]));

export function getPage(key: PageKey): PageSpec {
  const page = byKey.get(key);
  if (!page) throw new Error(`Unknown page key: ${key}`);
  return page;
}

export const pagesByType = (type: PageType) =>
  pages.filter((p) => p.type === type) as readonly PageSpec[];

export const phase1Pages = pages.filter(
  (p) => p.phase === "P1"
) as readonly PageSpec[];

export const locationPages = pagesByType("location");

export const slateCluster = [
  "natural-slate-roofing",
  "slate-roof-restoration",
  "heritage-roofing",
  "slate-roof-repairs",
  "natural-slate-supply",
] as const;

export const tileCluster = [
  "terracotta-tile-roofing",
  "concrete-tile-roofing",
] as const;

/* ==========================================================================
   NAVIGATION — per the strategy doc:
   Home · Slate Roofing (dropdown) · Tile Roofing (dropdown) ·
   For Architects & Builders · Projects · About · Contact
   ========================================================================== */

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
  /**
   * Render this item as the two-level Services flyout built from
   * `serviceGroups`, rather than as a flat `children` dropdown.
   */
  mega?: boolean;
};

/**
 * A group inside the Services mega-menu: a heading on the left, its pages on
 * the right. Mirrors the two-level flyout pattern the client asked for.
 */
export type NavGroup = {
  label: string;
  /** The group's own landing page — the heading is clickable, not just a label. */
  href: string;
  blurb: string;
  children: { label: string; href: string }[];
};

export const serviceGroups: NavGroup[] = [
  {
    label: "Slate Roofing",
    href: getPage("natural-slate-roofing").url,
    blurb: "New slate roofs, restoration, repairs and supply.",
    children: slateCluster.map((k) => ({
      label: getPage(k).label,
      href: getPage(k).url,
    })),
  },
  {
    label: "Tile Roofing",
    href: getPage("terracotta-tile-roofing").url,
    blurb: "Terracotta and concrete, supplied and installed.",
    children: tileCluster.map((k) => ({
      label: getPage(k).label,
      href: getPage(k).url,
    })),
  },
  {
    label: "Architects & Builders",
    href: getPage("for-architects-builders").url,
    blurb: "Specification support, samples and lead times.",
    children: [
      {
        label: getPage("for-architects-builders").label,
        href: getPage("for-architects-builders").url,
      },
      {
        label: getPage("natural-slate-supply").label,
        href: getPage("natural-slate-supply").url,
      },
    ],
  },
];

/**
 * Top-level nav.
 *
 * The three service clusters used to sit side by side as separate top-level
 * dropdowns ("Slate Roofing", "Tile Roofing", "For Architects & Builders"),
 * which put three of the six nav slots on variations of the same idea. They
 * are now one "Services" mega-menu — `mega: true` tells the header to render
 * the two-level flyout from `serviceGroups` instead of a plain list.
 */
export const primaryNav: NavItem[] = [
  {
    /* The label links to the hub at /services/. It used to point at the
       flagship slate page, which meant clicking the parent landed you on a
       child — confusing, and it left the hub unreachable from the nav. */
    label: "Services",
    href: getPage("services").url,
    mega: true,
  },
  { label: "Projects", href: getPage("projects").url },
  { label: "Reviews", href: getPage("reviews").url },
  { label: "About", href: getPage("about").url },
  { label: "Contact", href: getPage("contact").url },
];

/* ==========================================================================
   DELIBERATE EXCLUSIONS
   Never build, optimise or advertise these — they dilute the premium
   positioning and attract the wrong leads. (Strategy doc, principle 5.)
   ========================================================================== */

export const excludedTopics = [
  "asphalt / shingle roofing",
  "tile repairs",
  "general & volume roofing",
  "broad commercial / industrial roofing",
] as const;

/** De-prioritised: high difficulty and off-positioning. */
export const excludedKeywords: Keyword[] = [
  { term: "roof restoration melbourne", vol: 1600, kd: 54 },
  { term: "roof replacement melbourne", vol: 1300, kd: 56 },
  { term: "roofing melbourne", vol: 880, kd: 59 },
  { term: "roofing contractors melbourne", vol: 390, kd: 56 },
  { term: "roofer melbourne", vol: 390, kd: 43 },
];

/* ==========================================================================
   KEYWORD MASTER — Appendix A
   Full validated list, Semrush (Australia). Low-volume terms are retained
   where they signal high-value intent (e.g. cupa pizarras, spanish slate
   roofing) — volume is not the only reason to own a term.

   This is reference data for content and PPC planning; the per-page focus
   keywords above are what the pages are actually built around.
   ========================================================================== */

/**
 * Keywords have one priority value pages don't: "Skip" — the high-difficulty,
 * off-positioning terms the strategy doc deliberately walks away from
 * (roof restoration melbourne, KD 54, etc). Keeping them in the data with an
 * explicit Skip is more useful than deleting them: it records that the call
 * was made on purpose, so nobody re-adds them in six months.
 */
export type KeywordPriority = Priority | "Skip";

export type MasterKeyword = Keyword & {
  cluster: string;
  intent: string;
  targetPage: string;
  priority: KeywordPriority;
};

export const keywordMaster: MasterKeyword[] = [
  { term: "slate roof", cluster: "Slate core", vol: 880, kd: 35, cpc: 3.72, intent: "Informational", targetPage: "Natural Slate Roofing", priority: "High" },
  { term: "slate roofing", cluster: "Slate core", vol: 390, kd: 39, cpc: 5.38, intent: "Commercial", targetPage: "Natural Slate Roofing", priority: "High" },
  { term: "roofing slate", cluster: "Slate core", vol: 210, kd: 28, cpc: 3.72, intent: "Commercial", targetPage: "Natural Slate Roofing", priority: "High" },
  { term: "slate roofing melbourne", cluster: "Slate core", vol: 140, kd: 33, cpc: 3.22, intent: "Commercial", targetPage: "Home / Natural Slate Roofing", priority: "High" },
  { term: "slate roof replacement", cluster: "Slate core", vol: 170, kd: 34, cpc: undefined, intent: "Transactional", targetPage: "Natural Slate Roofing", priority: "High" },
  { term: "slate roof installation", cluster: "Slate core", vol: 90, kd: 15, cpc: undefined, intent: "Transactional", targetPage: "Natural Slate Roofing", priority: "High" },
  { term: "slate roof melbourne", cluster: "Slate core", vol: 50, kd: 25, cpc: 3.22, intent: "Commercial", targetPage: "Natural Slate Roofing", priority: "Med" },
  { term: "slate roofers melbourne", cluster: "Slate core", vol: 50, kd: 0, cpc: undefined, intent: "Commercial", targetPage: "Natural Slate Roofing", priority: "Med" },
  { term: "natural slate roofing", cluster: "Slate core", vol: 20, kd: 0, cpc: 2.79, intent: "Commercial", targetPage: "Natural Slate Roofing", priority: "Med" },
  { term: "spanish slate roofing", cluster: "Slate core", vol: 10, kd: 0, cpc: undefined, intent: "Commercial", targetPage: "Natural Slate Roofing", priority: "Med" },
  { term: "slate roof restoration", cluster: "Restoration", vol: 170, kd: 40, cpc: 8.50, intent: "Commercial", targetPage: "Slate Roof Restoration", priority: "High" },
  { term: "heritage roof restoration", cluster: "Heritage", vol: 140, kd: 5, cpc: 13.20, intent: "Informational", targetPage: "Heritage Roofing / Restoration", priority: "High" },
  { term: "heritage roofing", cluster: "Heritage", vol: 110, kd: 20, cpc: 4.24, intent: "Commercial", targetPage: "Heritage Roofing", priority: "High" },
  { term: "heritage roofing melbourne", cluster: "Heritage", vol: 30, kd: 0, cpc: 4.92, intent: "Commercial", targetPage: "Heritage Roofing", priority: "Med" },
  { term: "slate roof repairs melbourne", cluster: "Repairs", vol: 140, kd: 22, cpc: 8.92, intent: "Transactional", targetPage: "Slate Roof Repairs", priority: "High" },
  { term: "slate roof repairs", cluster: "Repairs", vol: 110, kd: 44, cpc: 9.71, intent: "Commercial", targetPage: "Slate Roof Repairs", priority: "Med" },
  { term: "slate tiles", cluster: "Slate supply", vol: 1600, kd: 17, cpc: 0.71, intent: "Commercial", targetPage: "Natural Slate Supply", priority: "High" },
  { term: "slate roof tiles", cluster: "Slate supply", vol: 480, kd: 13, cpc: 3.47, intent: "Commercial", targetPage: "Natural Slate Supply", priority: "High" },
  { term: "slate tiles melbourne", cluster: "Slate supply", vol: 140, kd: 7, cpc: 0.76, intent: "Commercial", targetPage: "Natural Slate Supply", priority: "High" },
  { term: "slate supplier australia", cluster: "Slate supply", vol: 30, kd: 0, cpc: undefined, intent: "Commercial", targetPage: "Natural Slate Supply", priority: "Med" },
  { term: "slate suppliers melbourne", cluster: "Slate supply", vol: 20, kd: 0, cpc: undefined, intent: "Commercial", targetPage: "Natural Slate Supply", priority: "Med" },
  { term: "cupa pizarras", cluster: "Slate supply", vol: 20, kd: 0, cpc: undefined, intent: "Navigational", targetPage: "Natural Slate Supply", priority: "Med" },
  { term: "where to buy roof tiles", cluster: "Slate supply", vol: 590, kd: 46, cpc: undefined, intent: "Commercial", targetPage: "Natural Slate Supply", priority: "Med" },
  { term: "terracotta roof tiles", cluster: "Terracotta", vol: 1300, kd: 12, cpc: 3.61, intent: "Commercial", targetPage: "Terracotta Tile Roofing", priority: "High" },
  { term: "terracotta roofing", cluster: "Terracotta", vol: 70, kd: 18, cpc: 4.59, intent: "Commercial", targetPage: "Terracotta Tile Roofing", priority: "Med" },
  { term: "terracotta roof replacement", cluster: "Terracotta", vol: 20, kd: 0, cpc: 4.14, intent: "Commercial", targetPage: "Terracotta Tile Roofing", priority: "Med" },
  { term: "bristile roof tiles", cluster: "Terracotta", vol: 720, kd: 17, cpc: 6.84, intent: "Navigational", targetPage: "Terracotta Tile Roofing", priority: "Med" },
  { term: "concrete roof tiles", cluster: "Concrete", vol: 1300, kd: 17, cpc: 2.04, intent: "Informational", targetPage: "Concrete Tile Roofing", priority: "High" },
  { term: "concrete tile roofing", cluster: "Concrete", vol: 30, kd: 0, cpc: 3.28, intent: "Commercial", targetPage: "Concrete Tile Roofing", priority: "Med" },
  { term: "concrete tile roof replacement", cluster: "Concrete", vol: 20, kd: 0, cpc: 3.06, intent: "Transactional", targetPage: "Concrete Tile Roofing", priority: "Med" },
  { term: "tile roof replacement", cluster: "Tile general", vol: 110, kd: 18, cpc: 5.49, intent: "Transactional", targetPage: "Terracotta / Concrete Tile", priority: "Med" },
  { term: "re roofing melbourne", cluster: "Re-roof", vol: 320, kd: 6, cpc: 9.07, intent: "Transactional", targetPage: "Concrete / Terracotta Tile", priority: "High" },
  { term: "roofing mornington", cluster: "Local", vol: 320, kd: 11, cpc: 4.91, intent: "Commercial", targetPage: "Loc: Mornington Peninsula", priority: "High" },
  { term: "roofing brighton", cluster: "Local", vol: 210, kd: 17, cpc: 10.76, intent: "Commercial", targetPage: "Loc: Bayside", priority: "High" },
  { term: "roofing mornington peninsula", cluster: "Local", vol: 140, kd: 5, cpc: 4.91, intent: "Commercial", targetPage: "Loc: Mornington Peninsula", priority: "High" },
  { term: "roofing toorak", cluster: "Local", vol: 140, kd: 6, cpc: undefined, intent: "Commercial", targetPage: "Loc: Melbourne (inner-east)", priority: "High" },
  { term: "roofing kew", cluster: "Local", vol: 90, kd: 6, cpc: undefined, intent: "Commercial", targetPage: "Loc: Melbourne (inner-east)", priority: "Med" },
  { term: "roofing camberwell", cluster: "Local", vol: 90, kd: 6, cpc: undefined, intent: "Commercial", targetPage: "Loc: Melbourne (inner-east)", priority: "Med" },
  { term: "roofing mount martha", cluster: "Local", vol: 70, kd: 0, cpc: undefined, intent: "Transactional", targetPage: "Loc: Mornington Peninsula", priority: "Med" },
  { term: "roofing bayside melbourne", cluster: "Local", vol: 50, kd: 0, cpc: undefined, intent: "Commercial", targetPage: "Loc: Bayside", priority: "Med" },
  { term: "roofing mount eliza", cluster: "Local", vol: 30, kd: 0, cpc: undefined, intent: "Commercial", targetPage: "Loc: Mornington Peninsula", priority: "Med" },
  { term: "roof restoration melbourne", cluster: "De-prioritised", vol: 1600, kd: 54, cpc: 7.22, intent: "Commercial", targetPage: "Not targeted (off-positioning)", priority: "Skip" },
  { term: "roof replacement melbourne", cluster: "De-prioritised", vol: 1300, kd: 56, cpc: 7.81, intent: "Commercial", targetPage: "Not targeted (off-positioning)", priority: "Skip" },
  { term: "roofing melbourne", cluster: "De-prioritised", vol: 880, kd: 59, cpc: 5.64, intent: "Commercial", targetPage: "Not targeted (too broad)", priority: "Skip" },
];
