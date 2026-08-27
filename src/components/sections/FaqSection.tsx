import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import type { Faq } from "@/config/faqs";

/**
 * Blueprint section — "FAQ".
 * Questions come from the real-search FAQ bank (Appendix B). Rendered as
 * native <details> so the answers are in the HTML for crawlers with zero JS.
 * Pair with faqSchema() for the FAQPage rich result.
 */
export function FaqSection({
  faqs,
  eyebrow = "Common questions",
  title = "The questions people actually ask.",
  intro,
  /**
   * Cap the number shown. Client feedback v1: "long homepage FAQ content
   * (keep 3 max, link to full FAQ page)".
   *
   * The cap is applied HERE rather than by slicing at the call site, because
   * the same array is also passed to `faqSchema()` for the FAQPage rich
   * result. Slicing before the call would shrink the structured data too —
   * and there is no reason to publish fewer questions to Google than the site
   * actually answers. This way the page shows three and the schema keeps all
   * of them.
   */
  limit,
  /** Renders a link through to the full FAQ page beneath the list. */
  more,
}: {
  faqs: Faq[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  limit?: number;
  more?: { label: string; href: string };
}) {
  const shown = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section className="py-section">
      <Container size="content">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

        <div className="mt-12 divide-y divide-line border-y border-line">
          {shown.map((faq, i) => (
            <Reveal key={faq.q} delay={Math.min(i, 5) * 0.06}>
              <details className="group">
                <summary /* py-6 lives HERE, not on <details>. It used to sit on the
                     parent, so the visual row was 74px tall but only the 26px
                     of text was tappable. Same look, whole row now a target. */
                  className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-h4 font-bold text-foreground transition-colors group-hover:text-accent">
                    {faq.q}
                  </h3>
                  <span
                    aria-hidden
                    className="relative mt-2 size-4 shrink-0 text-accent"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current" />
                    <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-current transition-transform duration-base ease-out-quart group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="-mt-1 max-w-3xl pb-6 text-body text-muted">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>

        {more && (
          <Reveal delay={0.2}>
            <p className="mt-8">
              <Link
                href={more.href}
                className="inline-flex min-h-11 items-center gap-3 font-display text-small font-bold uppercase tracking-wide text-foreground transition-colors hover:text-accent"
              >
                {more.label}
                <span aria-hidden className="inline-block h-0.5 w-6 bg-accent" />
              </Link>
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
