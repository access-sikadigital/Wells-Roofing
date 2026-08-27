"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/config/site";
import { locationPages } from "@/config/pages";

/**
 * Blueprint section — "Service area".
 *
 * Also does the internal-linking job: every service page links out to the
 * region hubs, and the hubs link back. That reciprocal linking is what makes
 * the local cluster rank — so every suburb name here is deliberate payload,
 * not decoration.
 *
 * Built as a full-width region index rather than three boxes. Three reasons:
 *
 *  · The suburb lists are the substance of this section, and a run-on list
 *    separated by "·" wrapped badly — lines began with a stray separator.
 *    Chips wrap cleanly at any width and read as a set.
 *  · Boxes wasted the right half of the section; rows use the full measure and
 *    give the region name room to be set at display size.
 *  · A directory of places should look like an index. Rows with a hover tint
 *    behave like one; a grid of cards does not.
 */
export function ServiceArea({
  intro = "Based in Mornington, working across the Peninsula, Bayside and premium inner Melbourne.",
}: {
  intro?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const q = gsap.utils.selector(el);

      gsap
        .timeline({
          scrollTrigger: { trigger: q("[data-index]"), start: "top 82%", once: true },
          defaults: { ease: "expo.out" },
        })
        .from(q("[data-row]"), { y: 26, opacity: 0, duration: 1, stagger: 0.1 })
        .from(
          q("[data-chip]"),
          { y: 10, opacity: 0, duration: 0.6, stagger: 0.02 },
          0.25
        );
    },
    { scope: root }
  );

  const totalSuburbs = locationPages.reduce(
    (n, p) => n + (p.suburbs?.length ?? 0),
    0
  );

  return (
    <section ref={root} className="py-section">
      <Container>
        {/* ---- Header: heading left, locator right (was dead space) ---- */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Where we work"
              /* Was "Local, and deliberately so." — a slogan where a plain
                 statement does more work. Client voice rules: no headlines
                 that are slogans for the sake of it. */
              title="Where we work."
              intro={intro}
            />
          </div>

          <Reveal delay={0.2} className="lg:col-span-5">
            <dl className="grid grid-cols-1 gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:justify-items-end lg:text-right">
              <div>
                <dt className="eyebrow text-faint">Based in</dt>
                <dd className="mt-2 font-display text-h4 font-extrabold uppercase tracking-tight text-foreground">
                  Mornington
                </dd>
                <dd className="mt-1 text-small text-muted">
                  {siteConfig.address}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-faint">Coverage</dt>
                <dd className="mt-2 font-display text-h4 font-extrabold uppercase tracking-tight text-foreground tabular-nums">
                  {locationPages.length} regions
                </dd>
                <dd className="mt-1 text-small text-muted tabular-nums">
                  {totalSuburbs} suburbs served
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* ---- Region index ---- */}
        <ol
          data-index
          className="mt-14 divide-y divide-line border-y border-line lg:mt-16"
        >
          {locationPages.map((region, i) => (
            <li key={region.key} data-row>
              <Link
                href={region.url}
                className="group grid gap-5 py-8 transition-colors duration-base ease-out-quart hover:bg-surface lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-6"
              >
                {/* Index */}
                <span
                  aria-hidden
                  className="font-display text-small font-extrabold tabular-nums text-accent lg:col-span-1"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Region */}
                <h3 className="font-display text-h3 font-extrabold uppercase leading-tight tracking-tight text-foreground transition-colors duration-base group-hover:text-accent lg:col-span-4">
                  {region.label}
                </h3>

                {/* Suburbs — chips wrap cleanly at any width */}
                <ul className="flex flex-wrap gap-2 lg:col-span-6">
                  {region.suburbs?.map((suburb) => (
                    <li
                      key={suburb}
                      data-chip
                      className="rounded-pill border border-line px-3 py-1 text-[0.8125rem] text-muted transition-colors duration-base group-hover:border-line-strong"
                    >
                      {suburb}
                    </li>
                  ))}
                </ul>

                {/* Affordance */}
                <span
                  aria-hidden
                  className="flex items-center gap-3 font-display text-small font-bold uppercase tracking-wide text-foreground transition-colors group-hover:text-accent lg:col-span-1 lg:justify-end"
                >
                  <span className="lg:hidden">View area</span>
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="size-4 shrink-0 transition-transform duration-base ease-out-quart group-hover:translate-x-1.5"
                  >
                    <path
                      d="M1 8h13m0 0L9 3m5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
