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
};

/**
 * PLACEHOLDER SET — real imagery only, no fabricated provenance.
 * Note the absence of `suburb` on every entry: that is intentional, not an
 * oversight. Add it when the project is real.
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

export type Testimonial = {
  quote: string;
  /** First name + suburb is the norm for trade reviews. */
  attribution: string;
  /** 1–5. Only set when it comes from a real review. */
  rating?: number;
  source?: "Google" | "Direct";
};

/**
 * EMPTY BY DESIGN. Do not seed this with example copy — `ReviewsStrip`
 * renders a proper empty state, and a placeholder quote that ships to
 * production is far worse than a section that admits it is being built.
 *
 * The audit flags review velocity as the single biggest local ranking and
 * conversion lever currently missing, so this is a priority to populate.
 */
export const testimonials: Testimonial[] = [];

export type Guarantee = {
  title: string;
  copy: string;
};

/**
 * Blueprint section — "Guarantee / warranty".
 * Drafted from the discovery questionnaire. MUST be confirmed by the client
 * before launch: warranty periods and insurance figures are contractual.
 */
export const guarantees: Guarantee[] = [
  {
    title: "Material warranty",
    copy: "Premium natural Spanish slate carries a manufacturer's warranty measured in decades, not years. We supply the documentation with the roof, so the provenance and the cover are yours on paper.",
  },
  {
    title: "Workmanship guarantee",
    copy: "Our installation is guaranteed in writing. If something we fitted fails because of how we fitted it, we come back and put it right — that is the whole of the promise, with no small print about access or weather.",
  },
  {
    title: "Licensed and insured",
    copy: "Fully licensed and insured for domestic and commercial roofing work in Victoria. Certificates are provided with every quote, before you commit to anything.",
  },
  {
    title: "Documented handover",
    copy: "Every project finishes with photographs of the completed roof and the warranty paperwork in your hands — so if you sell the home, the roof is an asset you can evidence.",
  },
];
