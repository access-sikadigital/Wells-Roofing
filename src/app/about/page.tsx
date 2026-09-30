import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { generalFaqs } from "@/config/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ContentBlock, CheckList } from "@/components/sections/ContentBlock";
import { CTA } from "@/components/sections/CTA";

const page = getPage("about");
export const metadata = metadataFor("about");

/** Established and expert, not a start-up. Heritage story + repositioning. */
export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page, generalFaqs)} />
      <PageHero
        page={page}
        image="/photography/hero-about.jpg"
        intro="An established Mornington Peninsula roofing name, now Melbourne's premium natural slate and tile specialist."
      />
      <TrustBar />

      <ContentBlock
        eyebrow="Our story"
        /* Client brief, About updates: "Roofing for generations." removed at
           the client's request; the section now leads on longevity of the
           business rather than of the family. */
        title="Four decades of specialist roofing."
        intro="Family owned and operated. For over four decades the Wells family has been supplying and installing roofs across Melbourne and Victoria — long enough to have re-roofed homes we first worked on decades ago."
        /*
          Both of these are real Wells photographs, which is why they replaced
          the stock tool still-life that was here. On an About page the proof
          IS the point — a staged shot of hammers on a workbench says nothing
          a competitor couldn't also say.
        */
        images={[
          {
            src: "/content/about-slate-home.jpg",
            alt: "Completed natural slate roof on a stone and render home",
          },
          {
            src: "/content/about-crew.jpg",
            alt: "Wells Roofing crew laying natural slate on a re-roof",
          },
        ]}
      >
        <p>
          That experience is what shaped the business into what it is today: a
          specialist roofing company with a deep understanding of natural slate,
          traditional craftsmanship and the importance of doing the job properly.
        </p>
        <p>
          We work with homeowners, builders and architects on new homes,
          extensions and roof replacements — slate, terracotta and concrete alike.
        </p>
        <p>
          Over four decades in, we have deliberately narrowed rather than
          widened — toward the materials and the detail where specialist
          knowledge actually counts.
        </p>
      </ContentBlock>

      <ContentBlock
        /* Client feedback v1, table 4: "We say no to a lot of work. That is
           the point." → state what we DO.

           The first pass carried that as three "No …" bullets. The About
           updates brief rejected them: a prestige page should not open its
           capability list with what the company refuses. The same positioning
           now runs positively — the list is the work itself, and the prose
           underneath does the excluding. */
        eyebrow="What we do"
        title="Specialists, by choice."
        intro="We focus on what we do best: natural slate, terracotta and concrete tile roofing — for new builds, re-roofs and heritage restoration."
        flip
      >
        <CheckList
          items={[
            "Natural slate roofing — supply, new roofs and restoration",
            "Terracotta tile roofing",
            "Concrete tile roofing",
            "New builds, re-roofs and heritage restoration",
          ]}
        />
        <p>
          By focusing only on slate and tile, we hold a standard general roofers
          can&rsquo;t. A crew that lays slate every week is a different
          proposition to one that lays it twice a year.
        </p>
      </ContentBlock>

      {/*
        THE THREE JOB TYPES — adapted from the client's content bank
        ("Roofing Services" / New Homes / Extensions & Additions / Roof
        Replacements). This was the last unused block in the bank.

        Why it lives on About rather than a /services page:

         · The SEO workbook marks "roof replacement melbourne" (vol 1300) as
           `priority: "Skip"`, `targetPage: "Not targeted (off-positioning)"`.
           A generic services page would chase exactly that term.
         · The brief's own master-brand rule is "not a general roofer". A page
           organised by job type rather than material is general-roofer IA.
         · The homepage order the client specified has no services slot, and
           the same brief asks to CUT homepage sections, not add one.

        So the copy runs here, where it supports the story and reaches anyone
        working out whether Wells handles their kind of job — without building
        a page that competes with the material pages or softens the
        positioning. The material pages stay the commercial landing pages.
      */}
      <ContentBlock
        eyebrow="How we work with you"
        title="New homes, extensions and replacements."
        intro="We work with homeowners, builders, architects and designers across Melbourne and the Mornington Peninsula — from first tile selection through to estimating, supply and installation."
      >
        <div className="space-y-8">
          <div>
            <h3 className="font-display text-h4 font-extrabold tracking-tight text-foreground">
              New homes
            </h3>
            <p className="mt-2 max-w-xl text-small text-muted">
              The roof should complement the architecture of the home and still
              perform for decades. We help with product, profile and colour
              selection, then estimate, supply and install — on traditional and
              contemporary houses alike.
            </p>
          </div>

          <div>
            <h3 className="font-display text-h4 font-extrabold tracking-tight text-foreground">
              Extensions &amp; additions
            </h3>
            <p className="mt-2 max-w-xl text-small text-muted">
              Matching a new extension to an existing roof takes experience. We
              can source new, reclaimed or matching tiles where they exist, with
              proper attention to profile, colour and weathering. Where an exact
              match is not achievable we will say so, and recommend the most
              practical way to a cohesive finish.
            </p>
          </div>

          <div>
            <h3 className="font-display text-h4 font-extrabold tracking-tight text-foreground">
              Roof replacements
            </h3>
            <p className="mt-2 max-w-xl text-small text-muted">
              {/* Opened on leaks, rust and deterioration in the first pass.
                  Softened per the About updates brief — the failure imagery
                  worked against the prestige and longevity line the rest of
                  the page holds. */}
              When an older roof is past its best, we assess what&rsquo;s
              actually there and give you a straight, honest answer on whether a
              replacement is warranted. If it is, we manage the whole project —
              material selection, removal and installation of your new slate or
              tile roof — for a finish built to last.
            </p>
          </div>
        </div>
      </ContentBlock>

      <CTA />
    </>
  );
}
