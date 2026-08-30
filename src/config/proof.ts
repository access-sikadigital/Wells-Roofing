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
 * were written to avoid — the same problem the fabricated reviews had before
 * the real Google feed replaced them.
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
