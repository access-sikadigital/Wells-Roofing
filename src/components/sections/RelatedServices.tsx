import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { getPage, type PageKey } from "@/config/pages";

/**
 * Internal linking between service pages — builds the slate/heritage topic
 * cluster the strategy doc calls for, and keeps each page's authority
 * flowing to its neighbours.
 */
export function RelatedServices({
  keys,
  eyebrow = "Related",
  title = "Other specialist work.",
}: {
  keys: readonly PageKey[];
  eyebrow?: string;
  title?: string;
}) {
  const items = keys.map(getPage);

  return (
    <section className="py-section">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((page, i) => (
            <Reveal key={page.key} delay={(i % 3) * 0.1} className="h-full">
              <Link
                href={page.url}
                className="group flex h-full flex-col rounded-card border border-line bg-background p-7 transition-all duration-slow ease-out-quart hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-lift"
              >
                <h3 className="font-display text-h4 font-extrabold uppercase tracking-tight text-foreground">
                  {page.label}
                </h3>
                <p className="mt-3 flex-1 text-small text-muted">
                  {page.description}
                </p>
                <p className="mt-6 inline-flex items-center gap-2 font-display text-small font-bold uppercase tracking-wide text-foreground transition-colors group-hover:text-accent">
                  Read more
                  <span className="inline-block h-0.5 w-6 bg-accent transition-all duration-base ease-out-quart group-hover:w-10" />
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
