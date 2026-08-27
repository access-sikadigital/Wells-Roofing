import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { tileFaqs } from "@/config/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteFormPlaceholder } from "@/components/sections/QuoteFormPlaceholder";
import { TrustBar } from "@/components/sections/TrustBar";
import { ContentBlock, CheckList } from "@/components/sections/ContentBlock";
import { FaqSection } from "@/components/sections/FaqSection";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { CTA } from "@/components/sections/CTA";
import { ReviewsStrip } from "@/components/sections/ReviewsStrip";
import { Guarantee } from "@/components/sections/Guarantee";

const page = getPage("terracotta-tile-roofing");
export const metadata = metadataFor("terracotta-tile-roofing");

/**
 * TERRACOTTA — rewritten against client feedback v1.
 *
 * Three rules govern this page, all from the feedback brief:
 *
 *  1. Terracotta owns its OWN territory — warmth, colour, character, timeless
 *     design. "Timeless for a reason." is the approved tonal direction. It is
 *     not "the one below slate". The previous copy ranked it explicitly
 *     ("sits below natural slate on cost and above concrete on longevity"),
 *     which is exactly the ladder the client asked us to stop building.
 *  2. No "Roofing for generations" / legacy language — that is reserved for
 *     natural slate pages only.
 *  3. The trust bar and guarantee had been inheriting SLATE statistics. The
 *     confirmed terracotta figures are a 100-year product warranty and a
 *     lifetime colour warranty, so both are overridden below rather than left
 *     on their defaults.
 *
 * Body copy is adapted from the client's own approved content bank.
 */

/* Confirmed terracotta figures — NOT the slate defaults. */
const terracottaStats = [
  { stat: "100yr", label: "La Escandella product warranty" },
  { stat: "Lifetime", label: "Colour warranty — the colour is the clay" },
  { stat: "Spain", label: "Made by La Escandella, supplied by Bristile" },
];

const terracottaGuarantees = [
  {
    icon: "layers" as const,
    title: "100-year product warranty",
    copy: "La Escandella terracotta carries a 100-year product warranty. We supply the documentation with the roof, so the cover is yours on paper rather than on trust.",
  },
  {
    icon: "seal" as const,
    title: "Lifetime colour warranty",
    copy: "The colour of natural terracotta comes from the clay and the firing, not from a surface coating — so it is warranted for the life of the tile and cannot fade off the way a coloured finish does.",
  },
  {
    icon: "shieldCheck" as const,
    title: "Workmanship guarantee",
    copy: "Our installation is guaranteed in writing. If something we fitted fails because of how we fitted it, we come back and put it right.",
  },
  {
    icon: "camera" as const,
    title: "Documented handover",
    copy: "Every project finishes with photographs of the completed roof and the warranty paperwork in your hands.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page, tileFaqs)} />
      <PageHero
        page={page}
        image="/photography/hero-terracotta.jpg"
        /* Client-supplied footage of this exact material. The poster is
           frame 0 of the clip, so the still→film handoff is invisible. */
        video={{
          src: "/video/terracotta.mp4",
          poster: "/video/terracotta-poster.jpg",
        }}
        intro="Bristile La Escandella terracotta, supplied and installed across Melbourne and the Mornington Peninsula. Crafted in Spain from natural clay — warmth, colour and character that last."
        cta={{ label: "Get a Quote", href: "/contact" }}
      />
      <QuoteFormPlaceholder
        title="Get a terracotta roofing quote"
        intro="Tell us about the home and the look you're after, and we'll come back with profile and colour options plus a price."
      />

      <TrustBar items={terracottaStats} />

      <ContentBlock
        eyebrow="The material"
        title="A timeless roofing material."
        intro="From the terracotta rooftops of the Mediterranean to contemporary Australian homes, clay tiles have an enduring architectural appeal."
        image="/content/terracotta-reroof.jpg"
      >
        <p>
          La Escandella tiles come in a range of profiles, colours and finishes.
          Traditional unglazed tiles give you the warmth and variation
          associated with classic Mediterranean architecture; glazed finishes
          create a cleaner, more contemporary look.
        </p>
        <p>
          That range is why terracotta
          is equally at home on a coastal residence, a Mediterranean-inspired
          build, a traditional home or a modern architectural project.
        </p>
        <CheckList
          items={[
            "New terracotta roofs on premium and architect-led builds",
            "Full re-roofing where an existing tile roof has reached its end",
            "The full La Escandella spread of profiles, colours and glazes",
            "Ridge, valley and flashing detail finished to the same standard as the field",
          ]}
        />
      </ContentBlock>

      <ContentBlock
        eyebrow="Provenance"
        title="Spanish-made La Escandella terracotta."
        intro="La Escandella has been manufacturing terracotta roof tiles in Spain for generations. In Australia the range is supplied by Bristile, in profiles and finishes selected for Australian building conditions."
        flip
      >
        <p>
          Unlike surface-coloured roofing materials, the colour of natural
          terracotta comes from the clay itself and from the firing process.
          That is what gives the material its depth, and what lets a quality
          terracotta roof hold its appearance as it ages.
        </p>
        <p>
          It is also why the colour warranty runs for the life of the tile.
        </p>
      </ContentBlock>

      <ContentBlock
        eyebrow="Supply &amp; installation"
        title="Chosen properly, then laid properly."
        intro="We work with homeowners, builders and architects from tile selection through estimating, supply and installation."
      >
        <p>
          The finished result depends on more than choosing a good tile. Set-out,
          detailing and the quality of the installation all matter — they are what
          separates a terracotta roof that looks considered from one that looks
          merely new.
        </p>
        <p>
          We can help select the right La Escandella profile
          and finish for the home, provide a detailed quotation, and manage the
          complete installation.
        </p>
      </ContentBlock>

      {/* 5 — Gallery */}


      <Guarantee
        title="Backed in writing."
        intro="Terracotta carries its own warranties, separate from our slate work. Here they are in plain terms."
        items={terracottaGuarantees}
      />

      <ReviewsStrip title="What tile clients say." />

      <FaqSection faqs={tileFaqs} />
      <RelatedServices
        keys={[
          "concrete-tile-roofing",
          "natural-slate-roofing",
          "heritage-roofing",
        ]}
      />
      <CTA />
    </>
  );
}
