import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { guarantees, type Guarantee as GuaranteeItem } from "@/config/proof";
import { icons } from "@/components/ui/Icons";

/**
 * Blueprint section — "Guarantee / warranty".
 *
 * Appears on every service page in the blueprints, and for good reason: on a
 * considered purchase this is the section that closes the gap between "I like
 * these people" and "I'll sign". It sits immediately after objection-handling
 * on the flagship page for exactly that reason.
 *
 * Set on `.theme-dark` so it reads as a deliberate pause in the page — a
 * statement band rather than another card row. The semantic tokens invert for
 * free, so there is not a hardcoded colour anywhere in here.
 *
 * The copy lives in src/config/proof.ts and is CONTRACTUAL — warranty periods
 * and insurance claims must be signed off by the client before launch.
 */
export function Guarantee({
  eyebrow = "Our guarantee",
  title = "Backed in writing.",
  intro = "A premium roof is only as good as the promise behind it. Here is ours, in plain terms.",
  items = guarantees,
}: Readonly<{
  eyebrow?: string;
  title?: string;
  intro?: string;
  items?: GuaranteeItem[];
}>) {
  return (
    <section className="theme-dark grain relative overflow-hidden bg-background py-section">
      <Container className="relative">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

        <dl className="mt-14 grid gap-x-10 gap-y-10 lg:mt-16 lg:grid-cols-2">
          {items.map((item, i) => {
            /*
              Looked up by name rather than stored as a component, so proof.ts
              stays plain data. Unknown keys can't reach here — `IconName` is
              derived from this same map — but the guard keeps a bad merge from
              taking the page down.
            */
            const Icon = icons[item.icon];

            return (
              <Reveal key={item.title} delay={(i % 2) * 0.1}>
                <div className="border-t border-line pt-6">
                  {/*
                    Icon lives INSIDE the <dt>, not beside it: a <dl> only
                    permits <dt>/<dd> children, so a third sibling would be
                    invalid markup. It is decorative — the heading text already
                    carries the meaning — hence aria-hidden on the svg itself.
                  */}
                  <dt className="flex items-center gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-card bg-accent/15 text-accent ring-1 ring-accent/25">
                      {Icon ? <Icon /> : null}
                    </span>
                    <span className="font-display text-h4 font-extrabold uppercase tracking-tight text-foreground">
                      {item.title}
                    </span>
                  </dt>
                  {/*
                    pl-14 = the 2.5rem tile + the 1rem gap, so the copy hangs
                    under the title rather than under the icon.
                  */}
                  <dd className="mt-3 max-w-lg pl-14 text-small text-muted">
                    {item.copy}
                  </dd>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
