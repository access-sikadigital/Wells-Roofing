# Wells Roofing — Website

Prestige Slate & Tile Roofing Specialists. Since 1982.
Project **26-Q3-WELL-01**, built by Sika Digital.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript, Turbopack dev) |
| Styling | Tailwind CSS v4 — **token-based theme** in `src/app/globals.css` |
| Fonts | Montserrat (display) + Plus Jakarta Sans (body) via `next/font` |
| Smooth scroll | Lenis (GSAP-ticker driven) |
| Scroll/timeline animation | GSAP + ScrollTrigger + SplitText (`@gsap/react`) |
| UI/state animation | Motion (Framer Motion) — `motion/react` |
| Micro-animation | anime.js v4 (counters, small delights) |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Brand

Everything below is **derived from the supplied brand assets** (logo lockup + July '26 EDM), not invented.

| Token | Value | Where it comes from |
|---|---|---|
| Brand Navy | `#0A2354` | Wordmark, dark surfaces |
| Brand Red | `#E51A1D` | Chevron mark, strapline, all CTAs |
| Display type | Montserrat 600/700/800 | Closest available match to the heavy geometric all-caps logo lockup |
| Body type | Plus Jakarta Sans | Matches the EDM body setting |
| Strapline | "Prestige Slate & Tile Roofing Specialists" | Part of the lockup — use verbatim |
| Motto | "Roofing for generations." | EDM sign-off |

Brand voice is structural and confident: squared-off radii, heavy uppercase display type, generous white space, red used **only** for accents and calls to action — never as a background wash.

Assets live in `public/brand` (logo PNG/EPS masters), `public/materials` (slate/terracotta/concrete swatches) and `public/photography`. The chevron mark is also available as inline SVG via `<LogoMark />` so it stays crisp and themeable.

## Design token system

All visual decisions are tokens in `src/app/globals.css`. **Never hardcode hex values or magic numbers in components.**

- **Primitives** — `navy-*` (900 = brand navy), `red-*` (500 = brand red), `stone-*` (cool neutrals). e.g. `bg-navy-900`, `text-red-500`.
- **Semantic tokens** — `bg-background`, `bg-surface`, `bg-surface-sunken`, `text-foreground`, `text-muted`, `text-faint`, `border-line`, `bg-brand`, `bg-accent`, `text-on-brand`… These **swap automatically** inside any element wrapped in `.theme-dark` (hero, CTA band, footer). Build sections with semantic tokens and dark inversion is free.
- **Fluid type scale** — `text-display`, `text-h1`…`text-h4`, `text-lead`, `text-body`, `text-small`, plus the `eyebrow` utility. All clamp()-based.
- **Layout** — `py-section` (90px top and bottom), `max-w-content` (1140px), `max-w-wide` (1400px).
- **Section banding** — every other top-level section is tinted with `--section-band` so a reader can see where one section ends and the next begins. This is driven by a single `main > section:nth-of-type()` rule in `globals.css`, **not** per-component, so the rhythm can never drift as sections are added or reordered. Section components are deliberately tone-agnostic: don't put `bg-surface` or `bg-background` on a top-level `<section>`. Because both sides of the alternation are semantic tokens, a `.theme-dark` section resolves them to its own dark pair and the banding survives inversion. The rule sits in `@layer base`, so an explicit `bg-*` utility on a section still wins — that's the opt-out.
- **Motion tokens** — `ease-out-expo`, `ease-out-quart`, `duration-base|slow|slower` (mirrored in `src/lib/motion.ts` and `src/lib/gsap.ts`).
- **Extras** — `grain` (film-grain for dark sections), `hairline-t`, `rule-accent` (the brand's short red underline), `shadow-soft`, `shadow-lift`, `shadow-accent`.

## Animation guidelines (which library when)

- **GSAP** — scroll-linked work: `TextReveal` (SplitText masked lines), `Parallax`, pinning, scrubbed timelines. Always import from `@/lib/gsap` (plugins registered once).
- **Motion** — component enter/exit and viewport reveals: `Reveal`, `AnimatePresence` menus, layout animation. Shared variants in `@/lib/motion.ts`.
- **anime.js** — targeted micro-animation: `Counter`, SVG line draws.
- **Lenis** — global smooth scroll via `SmoothScrollProvider`; runs on the GSAP ticker so ScrollTrigger stays in sync. `anchors: true` handles `#hash` links.
- All motion components respect `prefers-reduced-motion`.

## Structure

```
public/
├── brand/          logo masters (PNG transparent, white, social, EPS)
├── materials/      slate / terracotta / concrete swatches
└── photography/    project & stock imagery
src/
├── app/            layout, page, globals.css (tokens), robots, sitemap, icon
├── components/
│   ├── brand/      Logo, LogoMark (inline SVG chevron)
│   ├── layout/     Header, Footer
│   ├── motion/     Reveal, TextReveal, Parallax, Counter
│   ├── providers/  SmoothScrollProvider (Lenis + GSAP)
│   ├── sections/   Hero, Services, Craft, CTA
│   └── ui/         Button, Container, SectionHeading
├── config/site.ts  business data (single source of truth)
└── lib/            fonts, gsap, motion, utils
```

`src/config/site.ts` holds every piece of business data — phone, email, service copy, areas. `yearsTrading()` computes from `FOUNDED_YEAR = 1982` so the site never goes stale.

## Information architecture & SEO

The whole IA is encoded from the Sitemap/Keyword workbook into **`src/config/pages.ts`** — 17 routes with URL, page type, audience, build phase, primary + supporting keywords, title tag, meta description, H1 and schema types. Nothing is hardcoded in a page file.

```
Home
├── Slate Roofing ▾   natural-slate-roofing · slate-roof-restoration
│                     heritage-roofing · slate-roof-repairs · natural-slate-supply
├── Tile Roofing ▾    terracotta-tile-roofing · concrete-tile-roofing
├── For Architects & Builders
├── Projects · Reviews · About · Contact · FAQs
└── Areas             mornington-peninsula · bayside · melbourne
```

Everything downstream reads from that one file:

- `metadataFor(key)` → the exact title/meta/canonical/OG from the workbook
- `schemaForPage(page, faqs)` → JSON-LD blocks the page declares (RoofingContractor, Service, Product, FAQPage, BreadcrumbList)
- `sitemap.ts` → all URLs with priority derived from Phase + Priority columns
- `primaryNav` → header dropdowns; `Footer` → slate/tile/company/areas columns

**One focus keyword per page** so pages never compete. FAQ content in `src/config/faqs.ts` is verbatim real Semrush queries (Appendix B) — that's what wins the snippet.

**Deliberate exclusions** (`excludedTopics` / `excludedKeywords`): no asphalt/shingle, no tile repairs, no general/volume or broad commercial roofing, and the high-KD generic terms are off-target on purpose. Keep it that way — it's positioning, not oversight.

### Blueprint coverage

Every page is built to its section list in the Page Blueprints sheet — 104 sections across 9 templates, all present. The shared sections live in `src/components/sections/`; `ProjectGallery`, `ReviewsStrip`, `Guarantee`, `ArchitectsStrip`, `DownloadableResources` and `LocationMap` cover the proof/close half of every blueprint.

**`src/config/proof.ts` is the honesty boundary.** Everything that claims "we did this" or "someone said this" comes from that one file, so it can be audited in one place before launch. Two rules hold there:

- `testimonials` is **empty on purpose** and holds real reviews only. `ReviewsStrip` falls back to `sampleTestimonials` and renders a visible **"Sample content"** badge plus a dev console warning while it does. Wiring the GBP feed into `testimonials` retires the samples automatically — there's nothing to remember to delete. **Do not launch with the badge showing:** published testimonials nobody gave are misleading conduct (ACL s18), not a placeholder.
- Gallery projects carry **no `suburb`** until they're real jobs. Those captions are the local-SEO payload, so they have to be true.

Review/AggregateRating schema is deliberately not emitted while `testimonials` is empty — marking up reviews that don't exist is a manual-action risk.

### Background film — and why three pages don't have it

`src/config/video.ts` holds all background clips. **Read the note at the top before adding any.**

Every clip in the supplied stock library shows an **asphalt shingle** roof, which is on Wells' explicit exclusion list. Placement is therefore deliberate, not decorative:

| | Pages |
|---|---|
| **Video** | Home (4-clip crossfade) · About · Architects hub · Restoration · Terracotta · Concrete · 3 × location hubs |
| **Stills only** | **Natural Slate Roofing · Heritage Roofing · Natural Slate Supply** |

Those three are read by homeowners spending ~$80k and by architects specifying material — the exact audience that identifies a shingle roof instantly. They stay on stills until real Wells slate footage exists, or clips are generated from `docs/HERO-VIDEO-BRIEF.md`.

Where video *is* used, footage sits at 30% opacity under a 70–95% navy scrim, so it reads as "premium dark roofline" (true) rather than "asphalt shingle" (off-brand). Company and location pages make no material claim at all.

Weight: homepage ~5 MB across 4 clips, every other page a single 0.7–2.9 MB clip. Nothing downloads under `prefers-reduced-motion`.

### Two gotchas worth knowing

- `cn()` uses an **extended** tailwind-merge. Custom scales (`text-h1`, `shadow-lift`, `rounded-card`) must be registered there or twMerge silently drops them when a colour class is passed alongside.
- `TextReveal` never ships hidden text. Headings render visible; an inline script adds `.js` to `<html>` and only then does CSS hide them for the reveal. Don't reintroduce a static `invisible` class on an H1.

## Next steps (build phase)

1. **Quote form** — replace `QuoteFormPlaceholder` with the live multi-step qualifier → GHL webhook. Field spec is in the component's docblock; segmenting slate-vs-tile and homeowner-vs-trade is what enables cost-per-qualified-lead reporting.
2. **Photography** — real project galleries by material and suburb, before/after. Captions carry suburb names (local SEO payload). Replaces the stock placeholders.
3. **Reviews** — Google feed + Review/AggregateRating schema. Flagged in the audit as the biggest missing local ranking lever.
4. **Tracking** — GA4, GTM, Meta Pixel, call tracking (1800 number porting via Twilio).
5. **Phase 2** — premium-suburb pages (Toorak, Brighton, Mt Eliza) once the region hubs prove out. Each needs genuinely unique local copy; duplicated suburb pages get filtered.

> Page copy is drafted from the discovery questionnaire, audit and brand EDM. All of it needs client sign-off before launch.

See `docs/HERO-VIDEO-BRIEF.md` for the hero film generation prompts and encoding recipe.
