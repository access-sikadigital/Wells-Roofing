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

/**
 * SELECTED PROJECTS — the homepage "Selected real projects" slot.
 *
 * ⚠️  EMPTY ON PURPOSE. Do not point this at `projects` above.
 *
 * Client feedback v1 asks the homepage for "Selected real projects". The
 * `projects` array above is stock and material photography with deliberately
 * generic captions — honest as a texture gallery, but putting it under a
 * heading that says these are Wells jobs makes exactly the claim the captions
 * were written to avoid. Same category of problem as `sampleTestimonials`.
 *
 * `ProjectGallery` renders an honest "we're photographing recent work"
 * state from an empty array, so the section is presentable today and turns on
 * the moment real photographs exist.
 *
 * To go live: add real Wells jobs here with a real `suburb` on each — the
 * suburb is the local-SEO payload of the section, which is the whole reason
 * it sits on the homepage.
 */
export const selectedProjects: Project[] = [];

export type Testimonial = {
  quote: string;
  /** First name + suburb is the norm for trade reviews. */
  attribution: string;
  /** Relative date as Google renders it — "3 weeks ago". */
  date?: string;
  /** 1–5. Only set when it comes from a real review. */
  rating?: number;
  source?: "Google" | "Direct";
};

/**
 * REAL REVIEWS. Empty until the Google Business Profile feed is connected.
 *
 * When wiring the feed, write into THIS array. `ReviewsStrip` prefers it and
 * only falls back to the samples below when it is empty, so populating this
 * automatically retires the placeholder content — nobody has to remember to
 * delete anything.
 */
export const testimonials: Testimonial[] = [];

/**
 * ⚠️  SAMPLE CONTENT — NOT REAL REVIEWS. DO NOT LAUNCH WITH THESE.
 * ─────────────────────────────────────────────────────────────────
 * These exist so the carousel can be designed, demoed and signed off before
 * the GBP feed exists. They are written as plausible Wells reviews, which is
 * exactly what makes them dangerous if they ship — published testimonials
 * that nobody actually said are a consumer-law problem (ACL s18, misleading
 * conduct), not a cosmetic one.
 *
 * Three things stop them shipping quietly:
 *   1. They are in a separately-named export, never in `testimonials`.
 *   2. `ReviewsStrip` renders a visible "Sample content" badge whenever it is
 *      falling back to these.
 *   3. The same component logs a console warning in development.
 *
 * Delete this array once the feed is live.
 */
export const sampleTestimonials: Testimonial[] = [
  {
    quote:
      "Wells re-roofed our 1890s place in Brighton with Spanish slate. Steve talked us out of a full replacement on the rear section — said the slate was fine and it was the flashings that had gone. Saved us a fortune and the roof looks original.",
    attribution: "Andrew M · Brighton",
    date: "2 weeks ago",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "We specify slate on a lot of our projects and lead times are usually the headache. Wells quoted a date and held it. Technical support at design stage was genuinely useful too — they picked up a fixing detail we'd have had to correct on site.",
    attribution: "Priya S · Architect, Hawthorn",
    date: "1 month ago",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "Had three roofers out. Two wanted to replace the whole thing. Wells was the only one who got up there properly, took photos, and explained what was actually wrong. Ended up being a restoration at about a third of the price.",
    attribution: "Denise K · Mount Eliza",
    date: "1 month ago",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "Terracotta re-roof on a Federation home. The colour match on the ridge capping is spot on — you genuinely cannot tell where the new work starts. Tidy crew, cleaned up every day.",
    attribution: "Michael T · Camberwell",
    date: "2 months ago",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "We build eight to ten homes a year and Wells does the roofs on all of them now. They turn up when they say, the finish never generates defect items at handover, and I can put them in front of a client without worrying.",
    attribution: "Rob H · Builder, Mornington",
    date: "3 months ago",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "Slate roof on a clifftop place at Portsea — brutal exposure. Wells specified a heavier grade than the previous quote and explained exactly why. Two winters in and not a single slipped slate.",
    attribution: "Catherine W · Portsea",
    date: "4 months ago",
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
 * Drafted from the discovery questionnaire. MUST be confirmed by the client
 * before launch: warranty periods and insurance figures are contractual.
 */
export const guarantees: Guarantee[] = [
  {
    icon: "layers",
    title: "Material warranty",
    copy: "Premium natural Spanish slate carries a manufacturer's warranty measured in decades, not years. We supply the documentation with the roof, so the provenance and the cover are yours on paper.",
  },
  {
    icon: "shieldCheck",
    title: "Workmanship guarantee",
    copy: "Our installation is guaranteed in writing. If something we fitted fails because of how we fitted it, we come back and put it right — that is the whole of the promise, with no small print about access or weather.",
  },
  {
    icon: "seal",
    title: "Licensed and insured",
    copy: "Fully licensed and insured for domestic and commercial roofing work in Victoria. Certificates are provided with every quote, before you commit to anything.",
  },
  {
    icon: "camera",
    title: "Documented handover",
    copy: "Every project finishes with photographs of the completed roof and the warranty paperwork in your hands — so if you sell the home, the roof is an asset you can evidence.",
  },
];
