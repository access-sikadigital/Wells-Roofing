import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Blueprint section 2 — "Qualifying quote form".
 *
 * PLACEHOLDER. The live form is a multi-step qualifier posting to GoHighLevel:
 *   1. What do you need?      slate · terracotta · concrete · not sure
 *   2. Who are you?           homeowner · architect · builder · trade
 *   3. Project stage?         exploring · planning · ready to book
 *   4. Suburb                 (drives area routing + local reporting)
 *   5. Contact details
 *
 * Segmenting on 1 and 2 is what lets the CRM separate lead types and report
 * cost-per-qualified-slate-lead rather than a blended CPL — the gap the CRM
 * audit flagged. Build this once the GHL webhook URL is issued.
 */
export function QuoteFormPlaceholder({
  title = "Request a quote",
  intro = "Tell us about the roof and we'll come back with a straight, specialist answer.",
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <section className="border-y border-line">
      <Container className="py-14 lg:py-16">
        <Reveal>
          <div className="flex flex-col gap-8 rounded-card border border-line bg-background p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
            <div className="max-w-xl">
              <h2 className="font-display text-h3 font-extrabold uppercase tracking-tight text-foreground">
                {title}
              </h2>
              <p className="mt-3 text-small text-muted">{intro}</p>
              {/*
                CLIENT FEEDBACK v1 (compliance): a second paragraph used to sit
                here reading "Qualifies slate vs tile and homeowner vs
                architect/builder, so every enquiry lands in the right
                pipeline." That is an internal build note about CRM routing —
                it described the form's logic to the customer. Removed.

                The segmentation itself is unchanged and still documented in the
                comment at the top of this file, which is where notes like that
                belong. Nothing describing internal pipelines, lead scoring or
                CRM behaviour should ever be rendered.
              */}
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-4">
              <Button href="/contact" variant="accent" size="lg" arrow>
                Get a Quote
              </Button>
              <Button href={siteConfig.phoneHref} variant="outline" size="lg">
                {siteConfig.phone}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
