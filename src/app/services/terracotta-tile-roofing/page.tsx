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
 * TERRACOTTA — the client's approved copy, VERBATIM.
 *
 * ⚠️  DO NOT PARAPHRASE THE BODY COPY ON THIS PAGE.
 *
 * An earlier pass adapted the client's content bank into the house voice. The
 * client then asked for their exact wording, so every paragraph below is now
 * reproduced word for word from the supplied text, including the three section
 * headings ("A Timeless Roofing Material", "Spanish-Made La Escandella
 * Terracotta", "Supply & Installation by Wells Roofing").
 *
 * The only editorial changes are casing and terminal full stops on the
 * headings, so they match every other section heading on the site. The words
 * themselves are untouched.
 *
 * Two things carried over from client feedback v1, which this does not undo:
 *  · Terracotta owns warmth, colour, character and timeless design. It is
 *    never ranked against slate or concrete.
 *  · The trust bar and guarantee carry TERRACOTTA figures — a 100-year product
 *    warranty and a lifetime colour warranty — not the slate defaults.
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
        /*
          The client's opening paragraph, COMPLETE and unbroken.

          It was previously split — sentences 1–2 here and sentence 3 stranded
          as the lead of the section below — so the paragraph never appeared
          intact anywhere on the page. In the client's document this paragraph
          IS the page introduction, which is exactly what the hero intro slot
          is, so all three sentences belong here together. Do not break it up.
        */
        intro="Wells Slate Roofing supplies and installs the Bristile range of La Escandella terracotta roof tiles across Melbourne and the Mornington Peninsula. Crafted in Spain from high-quality natural clay, terracotta has been used to protect homes for centuries. From the sun-washed roofs of Mediterranean villages to contemporary Australian architecture, its enduring appeal comes from the warmth, character and permanence of a natural material."
        cta={{ label: "Get a Quote", href: "/contact" }}
      />

      <QuoteFormPlaceholder
        title="Get a terracotta roofing quote"
        intro="Tell us about the home and the look you're after, and we'll come back with profile and colour options plus a price."
      />

      <TrustBar items={terracottaStats} />

      {/* Section 1 — "A Timeless Roofing Material", verbatim. */}
      <ContentBlock
        eyebrow="The material"
        title="A timeless roofing material."
        intro="From the terracotta rooftops of the Mediterranean to contemporary Australian homes, clay tiles have an enduring architectural appeal."
        image="/content/terracotta-reroof.jpg"
      >
        <p>
          La Escandella tiles are available in a range of profiles, colours and
          finishes. Traditional unglazed tiles provide the warmth and variation
          associated with classic Mediterranean architecture, while glazed
          finishes can create a cleaner, more contemporary look.
        </p>
        <p>
          This versatility makes terracotta equally at home on a coastal
          residence, Mediterranean-inspired build, traditional home or modern
          architectural project.
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

      {/* Section 2 — "Spanish-Made La Escandella Terracotta", verbatim. */}
      <ContentBlock
        eyebrow="Provenance"
        title="Spanish-made La Escandella terracotta."
        intro="La Escandella has been manufacturing terracotta roof tiles in Spain for generations."
        flip
      >
        <p>
          In Australia, the range is supplied by our supplier, Bristile Roofing
          and includes profiles and finishes selected for Australian building
          conditions.
        </p>
        <p>
          Unlike surface-coloured roofing materials, the colour of natural
          terracotta comes from the clay itself and the firing process. This
          gives the material its characteristic depth and allows a quality
          terracotta roof to retain its appearance as it ages.
        </p>
      </ContentBlock>

      {/* Section 3 — "Supply & Installation by Wells Roofing", verbatim. */}
      <ContentBlock
        eyebrow="Supply &amp; installation"
        title="Supply &amp; installation by Wells Roofing."
        intro="The Wells family has been roofing homes across Melbourne and Victoria for more than 40 years."
      >
        <p>
          We work with homeowners, builders and architects from initial roof and
          tile selection through to estimating, supply and installation.
        </p>
        <p>
          Our team understands that the finished result depends on more than
          choosing a good tile — set-out, detailing and the quality of
          installation all matter.
        </p>
        <p>
          For projects across Melbourne and the Mornington Peninsula, Wells
          Roofing can assist with selecting the right La Escandella profile and
          finish for the home, provide a detailed quotation and manage the
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
