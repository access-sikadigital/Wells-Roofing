import { type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/utils";
import type { PageSpec } from "@/config/pages";

type PageHeroProps = {
  page: PageSpec;
  /** Short supporting line under the H1. */
  intro: string;
  /**
   * Background image path. Required, not defaulted — a default is how one
   * photograph quietly ends up on several routes. Every caller passes its own.
   *
   */
  image: string;
  /** Primary CTA override. */
  cta?: { label: string; href: string };
  /**
   * Optional panel beside the hero copy — used by /contact to put the quote
   * form above the fold instead of making people scroll to it.
   *
   * When present the hero becomes a two-column layout and the CTA buttons are
   * dropped: a "Get a Quote" button sitting next to the actual quote form is
   * a second door to the room you are already standing in. The phone number
   * stays, as the alternative to filling anything in.
   */
  aside?: ReactNode;
};

/**
 * Blueprint section 1 — "Hero + offer".
 * Used by every page except Home (which has its own film hero).
 * The H1 always comes from the page spec so it matches the SEO workbook.
 *
 * The band is a **fixed height** (`--spacing-page-hero`, centred content)
 * rather than sized by its copy. H1 length varies from one line ("Get a
 * Quote") to four ("Natural Slate Roofing, Melbourne & Mornington
 * Peninsula"), and letting that drive the height made every route open at a
 * different size. `min-h` rather than `h` so an over-long H1 degrades by
 * growing instead of overflowing — if that ever happens, raise the token.
 */
export function PageHero({
  page,
  intro,
  image,
  cta,
  aside,
}: PageHeroProps) {
  const primary = cta ?? { label: "Get a Quote", href: "/contact" };

  return (
    <section className="theme-dark grain relative flex min-h-page-hero flex-col justify-center overflow-hidden pt-28 pb-16 lg:min-h-page-hero-lg lg:pt-32 lg:pb-20">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(6 21 50 / 0.9) 0%, rgb(6 21 50 / 0.7) 40%, rgb(6 21 50 / 0.95) 100%)",
        }}
      />

      <Container className="relative">
        <div
          className={cn(
            aside && "grid items-center gap-12 lg:grid-cols-12 lg:gap-16",
          )}
        >
          <div className={cn(aside && "lg:col-span-6")}>
            {/* Breadcrumb */}
            <Reveal y={10} duration={0.6}>
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex flex-wrap items-center gap-2 text-small text-faint">
                  <li>
                    <Link
                      href="/"
                      className="transition-colors hover:text-accent"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li className="text-muted">{page.label}</li>
                </ol>
              </nav>
            </Reveal>

            <TextReveal
              as="h1"
              immediate
              delay={0.1}
              className="max-w-4xl font-display text-h1 uppercase text-white"
            >
              {page.h1}
            </TextReveal>

            <Reveal delay={0.35}>
              <p
                className={cn(
                  "mt-6 text-lead text-muted",
                  aside ? "max-w-xl" : "max-w-2xl",
                )}
              >
                {intro}
              </p>

              {aside ? (
                <div className="mt-8">
                  <Button
                    href={siteConfig.phoneHref}
                    variant="outline"
                    size="lg"
                  >
                    Call {siteConfig.phone}
                  </Button>
                </div>
              ) : (
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button href={primary.href} variant="accent" size="lg" arrow>
                    {primary.label}
                  </Button>
                  <Button
                    href={siteConfig.phoneHref}
                    variant="outline"
                    size="lg"
                  >
                    Call {siteConfig.phone}
                  </Button>
                </div>
              )}
            </Reveal>
          </div>

          {aside && (
            <Reveal delay={0.2} y={20} className="lg:col-span-6">
              {aside}
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
