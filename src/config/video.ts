/**
 * BACKGROUND FILM
 * ===============
 * Stock aerial roofing footage, encoded from the client-supplied library.
 *
 * ────────────────────────────────────────────────────────────────────────
 * ⚠️  WHY SOME PAGES HAVE NO VIDEO — read before adding any.
 * ────────────────────────────────────────────────────────────────────────
 * Every clip in the supplied library shows an **asphalt shingle** roof.
 * Asphalt/shingle is on Wells' explicit exclusion list in the strategy doc:
 * "No asphalt/shingles… on or off the page. These dilute the premium
 * positioning and attract the wrong leads."
 *
 * So placement is deliberate rather than decorative:
 *
 *  ✓ USED where the material is not legible or not contradicted —
 *    distant/abstract aerials sitting under a navy scrim at 70–95% with the
 *    footage itself at 30%. At that treatment they read as "premium dark
 *    roofline", which is true, rather than "asphalt shingle", which is
 *    off-brand. Company and location pages make no material claim at all.
 *
 *  ✗ NOT USED on /natural-slate-roofing/, /heritage-roofing/ and
 *    /natural-slate-supply/. Those pages are read by homeowners spending
 *    ~$80k and by architects specifying material — the exact audience that
 *    identifies a shingle roof instantly. A slate specialist showing asphalt
 *    on its flagship page is a credibility problem, not a design detail.
 *    Those heroes stay on stills until real Wells slate footage exists, or
 *    until clips are generated from docs/HERO-VIDEO-BRIEF.md.
 *
 * Two clips are genuinely on-message and are used on their own pages:
 *  · restoration-reroof — a roof stripped back to exposed trusses. True of
 *    any re-roof regardless of final material.
 *  · terracotta-village — actual terracotta tile. European rather than
 *    Australian rooftops, so it is scrimmed hard; replace when possible.
 *
 * All posters are frame-accurate stills pulled from their own clip, so the
 * handoff from poster to video is invisible.
 */

/** Homepage — four clips crossfaded into a never-ending sequence. */
export const heroVideo = {
  clips: [
    "/video/hero-01-architectural.mp4",
    "/video/hero-02-roofline.mp4",
    "/video/hero-03-ridges.mp4",
    "/video/hero-04-topdown.mp4",
  ],
  poster: "/photography/hero-01-architectural-poster.jpg",
} as const;

/**
 * Single-clip backgrounds for interior page heroes.
 * Pair each with its own poster — `PageHero` uses `image` as the poster.
 */
export const pageVideo = {
  restoration: {
    video: "/video/restoration-reroof.mp4",
    poster: "/photography/restoration-reroof-poster.jpg",
  },
  terracotta: {
    video: "/video/terracotta-village.mp4",
    poster: "/photography/terracotta-village-poster.jpg",
  },
  concrete: {
    video: "/video/concrete-tile.mp4",
    poster: "/photography/concrete-tile-poster.jpg",
  },
  architects: {
    video: "/video/architects-farmhouse.mp4",
    poster: "/photography/architects-farmhouse-poster.jpg",
  },
  about: {
    video: "/video/about-drone.mp4",
    poster: "/photography/about-drone-poster.jpg",
  },
  peninsula: {
    video: "/video/loc-peninsula.mp4",
    poster: "/photography/loc-peninsula-poster.jpg",
  },
  bayside: {
    video: "/video/loc-bayside.mp4",
    poster: "/photography/loc-bayside-poster.jpg",
  },
  melbourne: {
    video: "/video/loc-melbourne.mp4",
    poster: "/photography/loc-melbourne-poster.jpg",
  },
} as const;
