"use client";

import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import { gsap, EASE } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * Blueprint section — "Specification / comparison".
 *
 * This started as a table and was cut back to an accordion: the detail earns
 * its place for search and for the minority who want it, but nobody reads six
 * rows of dense prose on arrival. Closed by default, the whole section reads as
 * a short list of questions — the page looks scannable and the depth is one tap
 * away.
 *
 * Built on native <details>/<summary>, matching FaqSection, which buys three
 * things a div-and-state accordion does not: the content ships in the HTML for
 * crawlers, keyboard and screen-reader behaviour is the browser's, and with JS
 * off it still opens. GSAP only intercepts the toggle to animate the height —
 * remove the script and this degrades to a working accordion rather than a
 * broken one.
 *
 * `columns` describes what each value *is*; those become the labels inside the
 * open panel. Keeping that prop shape means callers written for the table
 * needed no data changes.
 */

export type SpecColumn = {
  name: string;
  /** Short qualifier shown beside the label. */
  note?: string;
  /** Draws the eye to the recommended option. */
  highlight?: boolean;
};

export type SpecRow = {
  criterion: string;
  /** One value per column, in column order. */
  values: string[];
};

function AccordionRow({
  row,
  columns,
}: Readonly<{ row: SpecRow; columns: SpecColumn[] }>) {
  const details = useRef<HTMLDetailsElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  /**
   * Height 0 ↔ auto, measured by GSAP rather than guessed with a max-height.
   * On close the element has to stay rendered until the tween finishes, which
   * is why `open` is set by hand afterwards instead of letting the browser
   * toggle it.
   */
  const onToggle = (e: React.MouseEvent) => {
    const d = details.current;
    const p = panel.current;
    if (!d || !p) return;

    e.preventDefault();
    gsap.killTweensOf(p);

    if (d.open) {
      gsap.to(p, {
        height: 0,
        opacity: 0,
        duration: reduce ? 0 : 0.35,
        ease: EASE.inOut,
        onComplete: () => {
          d.open = false;
        },
      });
    } else {
      d.open = true;
      gsap.fromTo(
        p,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: reduce ? 0 : 0.45,
          ease: EASE.expo,
          clearProps: "height",
        }
      );
    }
  };

  return (
    <details ref={details} className="group py-6">
      <summary
        onClick={onToggle}
        className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden"
      >
        <h3 className="font-display text-h4 font-bold text-foreground transition-colors group-hover:text-accent">
          {row.criterion}
        </h3>
        {/* Plus that becomes a minus — same mark as the FAQ accordion. */}
        <span aria-hidden className="relative mt-2 size-4 shrink-0 text-accent">
          <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current" />
          <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-current transition-transform duration-base ease-out-quart group-open:rotate-90 group-open:opacity-0" />
        </span>
      </summary>

      <div ref={panel} className="overflow-hidden">
        <div className="grid gap-6 pt-5 sm:grid-cols-2 sm:gap-10">
          {columns.map((col, i) => (
            <div key={col.name}>
              <p className="eyebrow text-faint">
                {col.name}
                {col.note && (
                  <span className="ml-2 font-normal normal-case tracking-normal">
                    {col.note}
                  </span>
                )}
              </p>
              <p
                className={cn(
                  "mt-2 text-body",
                  col.highlight ? "font-medium text-foreground" : "text-muted"
                )}
              >
                {row.values[i]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </details>
  );
}

export function SpecAccordion({
  eyebrow,
  title,
  intro,
  columns,
  rows,
  footnote,
}: Readonly<{
  eyebrow?: string;
  title: string;
  intro?: string;
  columns: SpecColumn[];
  rows: SpecRow[];
  footnote?: string;
}>) {
  return (
    <section className="py-section">
      <Container size="content">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

        <div className="mt-12 divide-y divide-line border-y border-line">
          {rows.map((row, i) => (
            <Reveal key={row.criterion} delay={Math.min(i, 5) * 0.06}>
              <AccordionRow row={row} columns={columns} />
            </Reveal>
          ))}
        </div>

        {footnote && (
          <p className="mt-8 max-w-3xl text-small text-faint">{footnote}</p>
        )}
      </Container>
    </section>
  );
}
