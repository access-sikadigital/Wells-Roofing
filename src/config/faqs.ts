/**
 * FAQ BANK
 * ========
 * Questions are taken verbatim from Appendix B of the strategy doc — these are
 * real Semrush search queries, not invented. Answering them word-for-word is
 * what wins the featured snippet and the FAQPage rich result.
 *
 * Answers below are drafts written from the discovery questionnaire; they must
 * be signed off by the client before launch.
 */

export type Faq = { q: string; a: string };

/** Slate — used on slate roofing, restoration and repairs pages. */
export const slateFaqs: Faq[] = [
  {
    q: "Are slate roofs expensive?",
    a: "Natural slate costs more upfront than concrete or terracotta tile, but it is the cheapest roof per year of service life. A correctly installed slate roof lasts 100 years or more, so it is typically the last roof the home will ever need. Cost is driven by roof size and complexity, access, slate grade and any structural work required — not by a fixed rate per square metre.",
  },
  {
    q: "How long does a slate roof last?",
    a: "A quality natural slate roof, properly installed, lasts well over 100 years. The slate itself often outlives the fixings and flashings, which is why periodic restoration — rather than full replacement — is usually all an older slate roof needs.",
  },
  {
    q: "Can you walk on a slate roof?",
    a: "Slate can be walked on, but only by someone who knows where and how to step. Individual slates crack under point loading, and damage is often not visible until it leaks. Any access should be left to a slate specialist using proper roof ladders and load spreading.",
  },
  {
    q: "Can you install solar panels on a slate roof?",
    a: "Yes, but the mounting must be designed for slate. Standard tile hooks crack slates and create leak paths. We work with installers to specify slate-appropriate fixings and flash them correctly so the roof's integrity and warranty are preserved.",
  },
  {
    q: "How much are slate roof tiles?",
    a: "Slate tile pricing depends on grade, thickness, size and origin. Premium Spanish slate such as CUPA PIZARRAS sits at the higher end and is what we specify for prestige and heritage work. We supply slate to architects, builders and trade — contact us for current pricing and lead times.",
  },
  {
    q: "How do you clean a slate roof?",
    a: "Gently, and rarely. Slate does not need chemical cleaning or high-pressure washing — both damage the stone surface and drive water under the laps. Moss and debris are best removed by hand or with low-pressure water by someone who can access the roof safely.",
  },
  {
    q: "Can you paint slate roof tiles?",
    a: "No. Painting or sealing natural slate traps moisture in the stone, causes delamination and voids any material warranty. If a slate roof looks tired, the correct answer is restoration — replacing damaged slates and renewing flashings and ridging — not coating it.",
  },
];

/** Tile & supply — terracotta, concrete and slate supply pages. */
export const tileFaqs: Faq[] = [
  {
    q: "Where can I buy roof tiles in Melbourne?",
    a: "We supply premium natural Spanish slate directly to homeowners, architects, builders and trade across Melbourne and Victoria, including CUPA PIZARRAS. For terracotta and concrete we supply the Bristile range, including La Escandella terracotta. Contact us for samples, specification support and current lead times.",
  },
  {
    q: "Can you paint terracotta roof tiles?",
    a: "Terracotta can be coated, but we generally advise against it on quality roofs. Coatings sit on the surface, weather unevenly and need redoing every several years. Where tiles are sound, cleaning and re-bedding the ridging usually gives a far better and longer-lasting result.",
  },
  {
    q: "How do you replace broken roof tiles?",
    a: "The tile is lifted clear of the ones interlocking with it, the fixing released, and a matched replacement bedded in. The hard part is matching — profile, colour and age all matter. On slate and premium tile we hold matching stock so repairs disappear rather than stand out.",
  },
  {
    q: "How do you fix leaking roof tiles?",
    a: "Most tile leaks are not the tiles at all — they are flashings, valleys, ridge bedding or pointing. We diagnose the actual entry point rather than patching the nearest tile, because a misdiagnosed leak reappears in the next heavy rain.",
  },
  {
    q: "How do you clean roof tiles?",
    a: "Low-pressure washing and, where needed, a suitable treatment for moss and lichen. High-pressure cleaning strips the surface off concrete tiles and forces water under the laps, so it should be avoided on any roof you intend to keep.",
  },
];

/** Homepage / general — the top-of-funnel questions. */
export const generalFaqs: Faq[] = [
  {
    q: "Should I restore or replace my slate roof?",
    a: "If the slates themselves are sound and it is the fixings, flashings or ridging that have failed, restoration is almost always the right call and costs a fraction of a re-roof. Full replacement is warranted when the slate is delaminating widely or the roof has been repeatedly patched with mismatched material. We give an honest assessment either way.",
  },
  {
    q: "What areas do you service?",
    a: "We are based in Mornington and work across the Mornington Peninsula, Bayside and premium inner Melbourne — including Brighton, Toorak, Kew, Camberwell, Mount Eliza and Sorrento. We also take on slate projects further afield where the job is a strong fit.",
  },
  {
    q: "Do you work with architects and builders?",
    a: "Yes. Alongside installation we supply and specify natural slate for architect-led and prestige builds, with samples, technical specification support and reliable lead times. There is a dedicated path for trade enquiries.",
  },
  {
    q: "How long has Wells Roofing been operating?",
    a: "Since 1982. Over four decades of specialist slate and tile work across Melbourne and the Mornington Peninsula.",
  },
];

/** Trade / B2B — architects & builders and slate supply pages. */
export const tradeFaqs: Faq[] = [
  {
    q: "Can you supply slate without installing it?",
    a: "Yes. We supply premium Spanish slate to architects, builders and trade as a standalone service, with specification support, samples and documented lead times.",
  },
  {
    q: "Can you help specify slate for a project?",
    a: "Yes. We advise on grade, thickness, size, colour and fixing detail, and provide spec sheets and samples so the material is specified correctly at design stage rather than corrected on site.",
  },
  {
    q: "What slate do you carry?",
    a: "Premium natural Spanish slate from the CUPA PIZARRAS quarries in Galicia. We can advise on the appropriate grade for the exposure, pitch and architectural intent of the project.",
  },
  {
    q: "What are your lead times?",
    a: "Lead times depend on grade and quantity. Because we source directly rather than through a third party, we can give a firm date at quotation stage and hold it — which is usually the difference that matters on a programmed build.",
  },
];
