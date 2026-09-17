"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * Blueprint section — "Trust / stats bar".
 * Spanish slate provenance · service life · warranty.
 *
 * Built as one GSAP ScrollTrigger timeline rather than four independent
 * reveals, so the row reads as a single structural gesture: the column rules
 * draw down, the figures rise out of their masks and the numerals count up —
 * in that order, left to right.
 *
 * The final values are rendered in the server HTML (never hidden, never
 * zeroed) — GSAP only takes over once it has confirmed motion is welcome.
 */

export type TrustItem = { stat: string; label: string };

/**
 * Client wording, feedback WRv2 (Sept '26). Was "Spanish / Slate provenance —
 * CUPA PIZARRAS", "100yr+ / Slate roof service life" and "Warranty / Material
 * & workmanship backed".
 *
 * "Guaranteed" is a contractual claim. It is backed by the 7-year workmanship
 * warranty and the manufacturer warranties in config/proof.ts; keep the two
 * in step.
 *
 * Casing follows the client's text, since the same revision asks for the
 * material names to be capitalised ("Natural Slate"). The only edits are a
 * capital F on "From" and the spelling of "Guaranteed".
 */
const defaultItems: TrustItem[] = [
  { stat: "Natural Slate", label: "From Cupa Pizarras" },
  { stat: "100+yr", label: "Natural Slate lifespan" },
  { stat: "Warranty", label: "Workmanship & Products Guaranteed" },
];

/**
 * Split a stat into its leading number and trailing unit so numerals can be
 * counted up and words can't be. "100yr+" → 100/"yr+", "Spanish" → null.
 * Keeps the component's `{ stat: string }` API unchanged.
 */
function parseStat(stat: string): { value: number; suffix: string } | null {
  const trimmed = stat.trim();
  const digits = /^\d+/.exec(trimmed)?.[0];
  if (!digits) return null;
  return { value: Number(digits), suffix: trimmed.slice(digits.length) };
}

/**
 * A column rule sits on the left edge of every cell that isn't starting a row.
 * The grid is a single column on mobile and three from `sm`, so no cell earns
 * a rule until that row actually exists — hence every rule is `sm:` only.
 * Keyed off `% 3` rather than a hardcoded index, so a caller passing six items
 * still gets its rules in the right places.
 */
function ruleFor(i: number): "none" | "row" {
  return i % 3 === 0 ? "none" : "row";
}

export function TrustBar({
  items = defaultItems,
}: Readonly<{ items?: TrustItem[] }>) {
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

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        defaults: { ease: "expo.out" },
      });

      tl.from(q("[data-divider]"), {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.1,
        stagger: 0.08,
      })
        .from(
          q("[data-figure]"),
          { yPercent: 115, duration: 1.2, stagger: 0.08 },
          0.15
        )
        .from(
          q("[data-label]"),
          { opacity: 0, y: 10, duration: 0.8, stagger: 0.08 },
          0.4
        );

      // Count the numeric figures up on the same timeline, so the numerals
      // land with the rise rather than after it.
      q("[data-count]").forEach((node, i) => {
        const target = Number(node.dataset.count);
        const suffix = node.dataset.suffix ?? "";
        const proxy = { v: 0 };

        tl.to(
          proxy,
          {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              node.textContent = `${Math.round(proxy.v)}${suffix}`;
            },
          },
          0.15 + i * 0.08
        );
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-y border-line"
    >
      {/* Brand hairline across the top of the band */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line-strong to-transparent"
      />

      <Container className="py-12 lg:py-16">
        {/*
          From `sm` each item is a two-row SUBGRID (figure, label), so the rows
          are shared across the whole bar. A figure long enough to wrap, like
          "Natural Slate" in a narrow column, can't push its own label out of
          line with its neighbours. The figures sit at the foot of their row
          (`self-end`), so every label is the same distance below its figure.
        */}
        <dl className="grid grid-cols-1 gap-y-10 sm:grid-cols-3">
          {items.map((item, i) => {
            const numeric = parseStat(item.stat);

            const rule = ruleFor(i);

            return (
              <div
                key={item.label}
                className={cn(
                  "relative sm:row-span-2 sm:grid sm:grid-rows-subgrid sm:gap-y-0",
                  rule === "row" && "sm:pl-8"
                )}
              >
                {rule !== "none" && (
                  <span
                    aria-hidden
                    data-divider
                    className="absolute inset-y-0 left-0 hidden w-px bg-line-strong sm:block"
                  />
                )}

                {/* Figure, rising out of an overflow mask */}
                <dd className="overflow-hidden sm:self-end">
                  <span
                    data-figure
                    className="block font-display text-h2 font-extrabold leading-none tracking-tight text-foreground tabular-nums"
                  >
                    {numeric ? (
                      <span
                        data-count={numeric.value}
                        data-suffix={numeric.suffix}
                      >
                        {item.stat}
                      </span>
                    ) : (
                      item.stat
                    )}
                  </span>
                </dd>

                <dt
                  data-label
                  className="mt-3 max-w-[22ch] text-small leading-snug text-muted"
                >
                  {item.label}
                </dt>
              </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
