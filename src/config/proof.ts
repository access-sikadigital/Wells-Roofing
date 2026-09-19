import type { IconName } from "@/components/ui/Icons";

/**
 * PROOF — projects, testimonials and guarantees.
 * =============================================
 * Everything on the site that asserts "we did this" or "someone said this"
 * comes from here, so there is exactly one place to audit before launch.
 *
 * ────────────────────────────────────────────────────────────────────────
 * RULE: nothing in this file may be invented.
 * ────────────────────────────────────────────────────────────────────────
 * A fabricated testimonial or a project captioned with a suburb Wells never
 * worked in is a legal and reputational problem, not a placeholder. The
 * gallery below therefore uses the stock/material photography that actually
 * exists in /public with generic captions and NO location or date claims.
 * `testimonials` is deliberately empty until the Google feed is connected.
 *
 * Components handle empty arrays gracefully — they render an honest
 * "in production" state rather than collapsing or faking content.
 *
 * TODO before launch:
 *  1. Replace `projects` with real Wells jobs — real photography, real
 *     suburbs, real materials. The suburb captions are the local-SEO payload
 *     of the gallery, so they have to be true.
 *  2. Populate `testimonials` from the Google Business Profile feed.
 *  3. Have Sachelle/Steve sign off `guarantees` — these are contractual
 *     claims and must match what Wells actually offers.
 */

export type ProjectMaterial =
  | "Natural slate"
  | "Terracotta"
  | "Concrete"
  | "Heritage";

export type Project = {
  /** Short descriptive title. Never invent a client name. */
  title: string;
  material: ProjectMaterial;
  /** Suburb — omit entirely rather than guessing. Drives local SEO. */
  suburb?: string;
  image: string;
  alt: string;
  /** Set when the pair is a genuine before/after of the same roof. */
  beforeAfter?: boolean;
  /** Project page this tile links to, when there is one. */
  href?: string;
};

/**
 * PLACEHOLDER SET — real imagery only, no fabricated provenance.
 * Note the absence of `suburb` on every entry: that is intentional, not an
 * oversight. Add it when the project is real.
 */
/*
 * NOTE: the client's own photographs are deliberately NOT in this array.
 *
 * The two real Wells photos supplied so far are used only where they were
 * given for — the About page pair and process step 02. They were briefly
 * pulled into the gallery and the homepage hero as well; the client asked for
 * them to stay where they were specified, so they were reverted. Ask before
 * reusing a supplied photo somewhere it wasn't intended.
 */
export const projects: Project[] = [
  {
    title: "Natural slate re-roof",
    material: "Natural slate",
    image: "/photography/roof-01.jpg",
    alt: "Natural slate roof laid in even courses on a premium home",
  },
  {
    title: "Slate detail and flashing",
    material: "Natural slate",
    image: "/photography/roof-02.jpg",
    alt: "Close detail of slate courses and lead flashing",
  },
  {
    title: "Heritage roofline restoration",
    material: "Heritage",
    image: "/photography/roof-03.jpg",
    alt: "Restored heritage roofline with ridge capping",
  },
  {
    title: "Architectural tile roof",
    material: "Concrete",
    image: "/photography/roof-04.jpg",
    alt: "Contemporary tile roof on an architect-led build",
  },
  {
    title: "Premium terracotta",
    material: "Terracotta",
    image: "/materials/terracotta-tile.jpg",
    alt: "Premium terracotta roof tiles",
  },
  {
    title: "Natural Spanish slate",
    material: "Natural slate",
    image: "/materials/natural-slate.jpg",
    alt: "Natural Spanish slate roofing tile",
  },
];

/* ==========================================================================
   PROJECT CATALOGUES — one full photo set per real Wells job.
   ========================================================================== */

export type CataloguePhoto = {
  src: string;
  /** Describe what is in frame. Never claim work the photo doesn't show. */
  alt: string;
  /** Intrinsic size, so the gallery reserves space and never jumps. */
  width: number;
  height: number;
};

export type ProjectCatalogue = {
  /** URL segment: /projects/<slug>/. Must match a route and a pages.ts key. */
  slug: string;
  title: string;
  material: ProjectMaterial;
  /** Specific product, shown under the title. */
  product: string;
  /** Real suburb of the job — this is the local-SEO payload. */
  suburb: string;
  /** One or two sentences. Facts only. */
  summary: string;
  /** Index into `photos` used for the catalogue card and page hero. */
  cover: number;
  photos: CataloguePhoto[];
};

/** Landscape 4:3 / 16:9 and portrait 3:4 — the three shapes the phone shot. */
const L = { width: 2400, height: 1800 };
const W = { width: 2400, height: 1350 };
const P = { width: 1800, height: 2400 };

/**
 * Real Wells projects, each with its own page under /projects/ and an entry in
 * the Projects menu (built from this array — see `primaryNav` in pages.ts).
 *
 * TO ADD A PROJECT:
 *  1. Put web-sized, metadata-stripped photos in public/projects/<slug>/.
 *     Phone originals carry GPS in their EXIF — never publish them as-is.
 *  2. Add an entry here.
 *  3. Add a page spec in pages.ts (key `project-<slug>`) and a route at
 *     src/app/projects/<slug>/page.tsx — copy the Beaumaris Hotel one.
 */
export const projectCatalogues: ProjectCatalogue[] = [
  {
    slug: "beaumaris-hotel",
    title: "Beaumaris Hotel",
    material: "Natural slate",
    product: "Spanish slate",
    suburb: "Beaumaris",
    /*
     * ⚠️  STEVE TO CONFIRM / EXPAND. The supplied folder was titled "Beaumaris
     * Hotel (Spanish Slate)" and nothing more, so this says only that. Scope
     * (new roof, re-roof or restoration), year, the slate range, and whether
     * Wells supplied, installed or both, are all worth adding — but only once
     * someone who was on the job has confirmed them.
     */
    summary:
      "Spanish slate across the mansard roofs, towers and dormers of the Beaumaris Hotel — one of Bayside's best-known buildings.",
    cover: 25,
    photos: [
      { src: "/projects/beaumaris-hotel/01.jpg", alt: "Spanish slate mansard roof above the upper verandah of the Beaumaris Hotel", ...L },
      { src: "/projects/beaumaris-hotel/02.jpg", alt: "Slate mansard roof, dormers and chimney along the hotel frontage", ...L },
      { src: "/projects/beaumaris-hotel/03.jpg", alt: "Close view of the slate between the dormers and a rendered chimney", ...L },
      { src: "/projects/beaumaris-hotel/04.jpg", alt: "Central tower and slate mansard roof of the Beaumaris Hotel", ...L },
      { src: "/projects/beaumaris-hotel/05.jpg", alt: "Slate mansard roof and chimney above the cast-iron verandah", ...L },
      { src: "/projects/beaumaris-hotel/06.jpg", alt: "Corner view of the Beaumaris Hotel with its slate roofs and verandahs", ...L },
      { src: "/projects/beaumaris-hotel/07.jpg", alt: "Slate mansard with dormer windows beneath iron roof cresting", ...L },
      { src: "/projects/beaumaris-hotel/08.jpg", alt: "Slate roof planes meeting between the dormers and chimneys", ...L },
      { src: "/projects/beaumaris-hotel/09.jpg", alt: "Corner tower of the Beaumaris Hotel with slate roof and iron cresting", ...L },
      { src: "/projects/beaumaris-hotel/10.jpg", alt: "Steep slate mansard roof beneath decorative iron cresting", ...L },
      { src: "/projects/beaumaris-hotel/11.jpg", alt: "The Beaumaris Hotel from across the street, slate roofs along the full frontage", ...L },
      { src: "/projects/beaumaris-hotel/12.jpg", alt: "Street view of the Beaumaris Hotel frontage and slate roofline", ...L },
      { src: "/projects/beaumaris-hotel/13.jpg", alt: "Beaumaris Hotel front elevation with slate mansard roofs and iron cresting", ...L },
      { src: "/projects/beaumaris-hotel/14.jpg", alt: "The Beaumaris Hotel slate roofline against the afternoon sun", ...L },
      { src: "/projects/beaumaris-hotel/15.jpg", alt: "Pedimented dormer set into the slate roof, framed by iron cresting", ...L },
      { src: "/projects/beaumaris-hotel/16.jpg", alt: "Slate roof behind the parapet dormers and iron cresting", ...L },
      { src: "/projects/beaumaris-hotel/17.jpg", alt: "Slate mansard roof and dormers above the corner balcony", ...L },
      { src: "/projects/beaumaris-hotel/18.jpg", alt: "The Beaumaris Hotel roofline silhouetted against the sky", ...W },
      { src: "/projects/beaumaris-hotel/19.jpg", alt: "Slate tower roof with iron cresting, seen from below", ...W },
      { src: "/projects/beaumaris-hotel/20.jpg", alt: "The Beaumaris Hotel and its slate roofs from the street", ...W },
      { src: "/projects/beaumaris-hotel/21.jpg", alt: "The Beaumaris Hotel through the trees, slate roofline in view", ...W },
      { src: "/projects/beaumaris-hotel/22.jpg", alt: "Slate mansard roofs and dormers along the upper storey", ...W },
      { src: "/projects/beaumaris-hotel/23.jpg", alt: "Corner of the Beaumaris Hotel with slate roofs above two levels of verandah", ...P },
      { src: "/projects/beaumaris-hotel/24.jpg", alt: "Spanish slate mansard roof above the lacework verandah", ...L },
      { src: "/projects/beaumaris-hotel/25.jpg", alt: "Beaumaris Hotel frontage with its slate roof and central tower", ...L },
      { src: "/projects/beaumaris-hotel/26.jpg", alt: "The Beaumaris Hotel, roofed in Spanish slate", ...L },
      { src: "/projects/beaumaris-hotel/27.jpg", alt: "The Beaumaris Hotel from the roadside", ...P },
      { src: "/projects/beaumaris-hotel/28.jpg", alt: "Beaumaris Hotel façade and slate roofs", ...P },
      { src: "/projects/beaumaris-hotel/29.jpg", alt: "Corner of the Beaumaris Hotel and its slate tower roof", ...P },
    ],
  },
];

/**
 * SELECTED PROJECTS — the homepage "Selected real projects" slot.
 *
 * REAL WELLS JOBS ONLY. Do not point this at `projects` above: that is stock
 * and material photography, and a heading that says "Recent work" over it
 * would claim jobs Wells didn't do.
 *
 * Built from `projectCatalogues`: a few of the strongest frames from each
 * catalogue, each tile linking to that project's page. The suburb on every
 * tile is the local-SEO payload of the section.
 */
const featuredFrames: Record<string, number[]> = {
  // Cover, front elevation, central tower, iron cresting, verandah, frontage.
  "beaumaris-hotel": [25, 12, 3, 9, 23, 1],
};

export const selectedProjects: Project[] = projectCatalogues.flatMap((c) =>
  (featuredFrames[c.slug] ?? [c.cover]).map((i) => ({
    title: c.title,
    material: c.material,
    suburb: c.suburb,
    // The 1200px grid thumbnail — see ProjectCatalogue.
    image: c.photos[i].src.replace(/\/([^/]+)$/, "/thumbs/$1"),
    alt: c.photos[i].alt,
    href: `/projects/${c.slug}/`,
  }))
);

export function getCatalogue(slug: string): ProjectCatalogue {
  const found = projectCatalogues.find((c) => c.slug === slug);
  if (!found) throw new Error(`Unknown project catalogue: ${slug}`);
  return found;
}

export type Testimonial = {
  quote: string;
  /**
   * Reviewer name exactly as it appears on Google.
   *
   * NO SUBURB. The fabricated set this replaced used "Andrew M · Brighton"
   * because it read well; not one of the real reviews states a location, and
   * inferring one would be inventing detail about a named person.
   */
  attribution: string;
  /** Relative date as Google renders it — "3 weeks ago". */
  date?: string;
  /** 1–5, exactly as given. */
  rating?: number;
  source?: "Google" | "Direct";
};

/**
 * THE REAL GOOGLE AGGREGATE — transcribed from the Google Business Profile
 * panel, not computed from the reviews below.
 *
 * This distinction matters. Nine reviews exist; two carry a rating with no
 * written text and cannot be displayed, and the two 1-star reviews are not
 * shown on Wells' own site. Averaging whatever the carousel happens to render
 * would therefore print "5.0", which is false. Google says 4.1 from 9, so the
 * badge says 4.1 from 9 — while the carousel shows the reviews that have
 * something to read.
 *
 * Update both numbers whenever the reviews below are refreshed.
 */
export const googleRating = { average: 4.1, count: 9 } as const;

/**
 * REAL GOOGLE REVIEWS for Wells Roofing (Mornington), transcribed verbatim.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * Do not edit the wording. These are other people's words.
 * ───────────────────────────────────────────────────────────────────────────
 *
 * Sorted newest first. Two reviews from the profile are omitted here and both
 * omissions are deliberate:
 *
 *  · Azza (5★) and Kroon K (1★) left a rating with no text — nothing to show.
 *  · Timothy Harty (1★) and Kroon K (1★) are negative. A business does not
 *    republish its own criticism, and Wells answered Timothy publicly on
 *    Google. They are still counted in `googleRating` above, which is what
 *    keeps the 4.1 honest.
 *
 * Kat W's review is truncated by Google's own "More" link; only the portion
 * that was fully visible is reproduced, ending on a complete sentence. Do not
 * guess the rest.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Wells Roofing completed the roof on our home and we're extremely happy with the result. Steve and the team were professional, reliable and easy to deal with throughout the project.",
    attribution: "S B Peagram",
    date: "2 days ago",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "Wonderfully helpful staff and willing to help out no matter how small or large your project or expected spend is.",
    attribution: "Kat W",
    date: "a year ago",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "absolute superstar, no problems supplying a few tiles whilst on a job, quick efficient and cheap, thanks heaps again",
    attribution: "Calem",
    date: "2 years ago",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "Needed a couple of spare roof tiles, I emailed, and they had what I needed within a couple of days. Super helpful, great service and great price. Would highly recommend",
    attribution: "Kate Adriaans",
    date: "3 years ago",
    rating: 5,
    source: "Google",
  },
  {
    quote: "Excellent products at best prices",
    attribution: "mark andreasen",
    date: "4 years ago",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "Excellent service, Joe's a real gentleman, a pleasure to do business with.",
    attribution: "Kane McCartin",
    date: "5 years ago",
    rating: 5,
    source: "Google",
  },
];

export type Guarantee = {
  title: string;
  copy: string;
  /**
   * Icon key from components/ui/Icons.tsx. Stored as a NAME, not a component —
   * this file is plain data imported by server components, and putting JSX in
   * it would drag the icon module into every consumer whether it draws one or
   * not.
   */
  icon: IconName;
};

/**
 * Blueprint section — "Guarantee / warranty".
 * Warranty periods and insurance claims are CONTRACTUAL.
 *
 * Client feedback WRv2 (Sept '26) supplied the wording for three of the four:
 * workmanship, licensed & insured, and documented handover. Material warranty
 * was marked "no change". So these are now the client's own words, not
 * drafts. The earlier drafts promised more than Wells has put in writing: "no
 * small print", "certificates with every quote", photographs on "every
 * project". The client replaced them with language that matches the actual
 * warranty terms. Do not re-embellish.
 *
 * The 7-year workmanship term also appears in the Warranty step of
 * ProcessSteps. If one changes, change both.
 */
export const guarantees: Guarantee[] = [
  {
    icon: "layers",
    title: "Material warranty",
    copy: "Premium natural Spanish slate carries a manufacturer's warranty measured in decades, not years. We supply the documentation with the roof, so the provenance and the cover are yours on paper.",
  },
  {
    icon: "shieldCheck",
    title: "Workmanship warranty",
    copy: "Our workmanship is covered by a written 7-year Wells Roofing warranty. If an issue is found to result from our workmanship, we will assess and rectify it in accordance with the warranty terms.",
  },
  {
    icon: "seal",
    title: "Licensed & insured",
    copy: "Wells Roofing holds the relevant registrations and insurances for the roofing work we undertake. Details can be provided as part of the quoting and contracting process.",
  },
  {
    icon: "camera",
    title: "Documented handover",
    copy: "On completion, we provide the relevant project documentation, which may include completed-work photographs, product information and applicable warranty details.",
  },
];
