import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * Blueprint section 7 (Natural Slate Supply) — "Downloadable resources".
 *
 * Doubles as the page's lead magnet and as the capture for the
 * "where to buy roof tiles" intent (590/mo) the strategy doc calls out — a
 * searcher at that stage wants a document, not a quote form.
 *
 * Resources are marked `available: false` until the PDFs exist. An unavailable
 * item renders as a disabled card that says it is coming, rather than a live
 * link to a 404 — a broken download on the trade page costs more credibility
 * than a missing one.
 *
 * TODO: produce the three PDFs, drop them in /public/resources/, flip
 * `available` to true, and point `href` at the gated form once GHL is wired.
 */

type Resource = {
  title: string;
  description: string;
  meta: string;
  href: string;
  available: boolean;
};

const resources: Resource[] = [
  {
    title: "Slate selection guide",
    description:
      "Grades, thicknesses, sizes and colour across the CUPA PIZARRAS range, with guidance on matching slate to pitch and exposure.",
    meta: "PDF · Specification",
    href: "/resources/slate-selection-guide.pdf",
    available: false,
  },
  {
    title: "Technical specification sheet",
    description:
      "Durability classification, tolerances, fixing detail, underlay and ventilation requirements — written to drop straight into your specification package.",
    meta: "PDF · Technical",
    href: "/resources/slate-specification-sheet.pdf",
    available: false,
  },
  {
    title: "Request physical samples",
    description:
      "Nothing beats the material in your hand, or in front of a client. Tell us the project and we'll send the grades worth considering.",
    meta: "By post · Free",
    href: "/contact",
    available: true,
  },
];

export function DownloadableResources() {
  return (
    <section className="bg-surface py-section">
      <Container>
        <SectionHeading
          eyebrow="Resources"
          title="Specify it properly."
          intro="Everything you need to get slate right on the drawing rather than corrected on site."
        />

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3">
          {resources.map((resource, i) => {
            const Tag = resource.available ? "a" : "div";

            return (
              <Reveal key={resource.title} delay={i * 0.1} className="h-full">
                <Tag
                  {...(resource.available ? { href: resource.href } : {})}
                  className={cn(
                    "group flex h-full flex-col rounded-card border border-line bg-background p-8",
                    resource.available
                      ? "transition-all duration-slow ease-out-quart hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-lift"
                      : "opacity-70"
                  )}
                >
                  <p className="eyebrow text-faint">{resource.meta}</p>

                  <h3 className="mt-4 font-display text-h4 font-extrabold uppercase tracking-tight text-foreground">
                    {resource.title}
                  </h3>

                  <p className="mt-3 flex-1 text-small text-muted">
                    {resource.description}
                  </p>

                  <p
                    className={cn(
                      "mt-6 inline-flex items-center gap-2 font-display text-small font-bold uppercase tracking-wide",
                      resource.available
                        ? "text-foreground transition-colors group-hover:text-accent"
                        : "text-faint"
                    )}
                  >
                    {resource.available ? "Request" : "Coming soon"}
                    {resource.available && (
                      <span className="inline-block h-0.5 w-6 bg-accent transition-all duration-base ease-out-quart group-hover:w-10" />
                    )}
                  </p>
                </Tag>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
