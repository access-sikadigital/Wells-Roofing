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
}: {
  faqs: Faq[];
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section className="py-section">
      <Container size="content">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

        <div className="mt-12 divide-y divide-line border-y border-line">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={Math.min(i, 5) * 0.06}>
              <details className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
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
                <p className="mt-4 max-w-3xl text-body text-muted">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
