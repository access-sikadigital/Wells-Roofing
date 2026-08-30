import Link from "next/link";
import { getPage, serviceGroups } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { generalFaqs } from "@/config/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { ContentBlock } from "@/components/sections/ContentBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ReviewsStrip } from "@/components/sections/ReviewsStrip";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTA } from "@/components/sections/CTA";

const page = getPage("services");
export const metadata = metadataFor("services");

/**
 * SERVICES HUB — the parent of /services/*.
 *
 * Created when the eight service pages moved from the site root to
 * /services/<name>. Before that, /services/ simply 404'd: the mega-menu's
 * parent had nowhere of its own to point, anyone who trimmed the URL hit a
 * dead end, and every child page's breadcrumb had a missing rung.
 *
 * It is built from `serviceGroups` — the same config the mega-menu reads — so
 * the page and the menu can never disagree about what we offer. Adding a
 * service page to a cluster in `pages.ts` puts it in both places at once.
 *
 * ⚠️  DO NOT PARAPHRASE THE BODY COPY ON THIS PAGE.
 *
 * The client supplied their exact wording for this page, so every paragraph is
 * reproduced word for word, including the five section headings ("New Homes",
 * "Extensions & Additions", "Roof Replacements", "Melbourne & Mornington
 * Peninsula") and the closing two paragraphs.
 *
 * Editorial changes are limited to: casing and terminal full stops on the
 * headings, and one hyphen set as an em dash ("Family owned and operated — the
 * Wells family's..."). No words are changed.
 *
 * Each of the client's paragraphs sits in ONE place, whole — single-paragraph
 * sections go in `children` as a single <p> with no `intro`, so no paragraph
 * gets its first sentence promoted to a lead and separated from the rest.
 *
 * The card grid below the copy stays: it is built from `serviceGroups`, the
 * same config the mega-menu reads, so the page and the menu can never disagree
 * about what we offer. That is the hub's other job — getting a visitor to the
 * right child page in one click. The client's copy describes the *situations*
 * (new home, extension, replacement); the cards route by *material*.
 */
export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page, generalFaqs)} />

      <PageHero
        page={page}
        image="/photography/hero-slate.jpg"
        /* The client's opening paragraph, complete and unbroken. */
        intro="For more than 40 years, the Wells family has worked with homeowners, builders, architects and designers across Melbourne and the Mornington Peninsula. Wells Roofing specialises in the supply and installation of quality natural slate, concrete, terracotta and roofing systems for new homes, extensions and roof replacements."
        cta={{ label: "Get a Quote", href: "/contact" }}
      />

      <TrustBar />

      {/* The client's three "what kind of job is this" sections, verbatim.
          Each is a single paragraph, so each is a single <p> with no lead. */}
      <ContentBlock
        eyebrow="New builds"
        title="New homes."
        image="/content/slate-anatomy.jpg"
      >
        <p>
          The right roof should complement the architecture of the home while
          delivering lasting performance. Wells Roofing can assist with product,
          profile and colour selection through to estimating, supply and
          professional installation. Our team works with homeowners, builders
          and architects to deliver roofing solutions suited to both traditional
          and contemporary homes.
        </p>
      </ContentBlock>

      <ContentBlock
        eyebrow="Matching existing work"
        title="Extensions &amp; additions."
        image="/content/slate-supply-to-install.jpg"
        flip
      >
        <p>
          Matching a new extension to an existing roof takes experience. Wells
          Roofing can source new, reclaimed or matching roof tiles where
          available, with careful consideration given to profile, colour and
          weathering. Where an exact match can&rsquo;t be achieved, we&rsquo;ll
          recommend the most practical approach for a cohesive finish.
        </p>
      </ContentBlock>

      <ContentBlock eyebrow="Re-roofing" title="Roof replacements.">
        <p>
          Recurring leaks, deteriorating tiles, rusted valleys or ongoing
          repairs can indicate that it&rsquo;s time to consider replacing an
          ageing roof. Wells Roofing can assess the existing roof and provide
          straightforward advice on whether replacement is appropriate. If
          required, our team can manage the project from product selection and
          removal of the existing roof through to installation of the new
          roofing system.
        </p>
      </ContentBlock>

      <section className="py-section">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Every service, in one place."
            intro="Three materials and the full range of work on each — new roofs, re-roofing, restoration, repairs and supply."
          />

          <div className="mt-14 space-y-14 lg:mt-20 lg:space-y-20">
            {serviceGroups.map((group, gi) => (
              <Reveal key={group.href} delay={0.05 * gi}>
                <div className="border-t border-line pt-10">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
                    <h2 className="font-display text-h3 font-extrabold uppercase tracking-tight text-foreground">
                      {group.label}
                    </h2>
                    <Link
                      href={group.href}
                      className="inline-flex items-center gap-2 text-small font-semibold text-accent transition-opacity duration-base hover:opacity-70"
                    >
                      Overview
                      <span aria-hidden>&rarr;</span>
                    </Link>
                  </div>

                  <p className="mt-3 max-w-2xl text-body text-muted">
                    {group.blurb}
                  </p>

                  <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {group.children.map((child) => (
                      <li key={child.href}>
                        {/*
                          The whole card is the link, not a "read more" inside
                          it — a 3-line target beats a 12px one, and it is the
                          only interactive thing in the card so there is nothing
                          to nest.
                        */}
                        <Link
                          href={child.href}
                          className="group flex h-full items-center justify-between gap-4 rounded-card border border-line bg-surface px-5 py-5 transition-colors duration-base hover:border-accent"
                        >
                          <span className="text-small font-semibold text-foreground transition-colors group-hover:text-accent">
                            {child.label}
                          </span>
                          <span
                            aria-hidden
                            className="shrink-0 text-accent transition-transform duration-base ease-out-quart group-hover:translate-x-1"
                          >
                            &rarr;
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* "Melbourne & Mornington Peninsula" — the client's service-area
          paragraph plus their two closing paragraphs, all verbatim. */}
      <ContentBlock
        eyebrow="Where we work"
        title="Melbourne &amp; Mornington Peninsula."
      >
        <p>
          Wells Roofing services projects throughout greater Melbourne and the
          Mornington Peninsula, including Brighton, Toorak, Kew, Camberwell,
          Mornington, Mount Martha, Mount Eliza and surrounding areas.
        </p>
        <p>
          Wells Roofing has been delivering the highest quality roofs to
          Australia for over 40 years, well known for their high quality
          workmanship and service excellence throughout Melbourne suburbs and
          the Mornington Peninsula area as well as the distribution of Natural
          Spanish Slate roofing tiles throughout Australia. Family owned and
          operated &mdash; the Wells family&rsquo;s extensive experience within
          the roofing industry and commitment to excellence has long established
          their reputation for efficiency, quality and professionalism.
        </p>
        <p>
          Wells Roofing ensures that your roof will exude class and complement
          your individual design, providing this efficiently and professionally.
        </p>
      </ContentBlock>

      <ProcessSteps />

      <ReviewsStrip />

      <FaqSection faqs={generalFaqs} />

      <CTA />
    </>
  );
}
