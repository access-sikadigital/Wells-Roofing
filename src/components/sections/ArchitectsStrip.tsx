import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { getPage } from "@/config/pages";

/**
 * Blueprint section 7 (Home) — "Architects & builders strip".
 *
 * Deliberately NOT another three-card row. By this point the homepage has
 * already shown services, slate and project proof in card grids; a fourth
 * would blur into them. This is a single full-width band with one offer and
 * one action — a hard tonal switch that signals "this part is not for
 * homeowners", which is the whole job of the section.
 *
 * The trade offer is samples and specification support, not a quote. That
 * distinction matters: architects are not buying yet, they are specifying,
 * and asking them for a quote request at this stage is the mismatch the
 * strategy doc says competitors leave open.
 */
export function ArchitectsStrip() {
  const supply = getPage("natural-slate-supply");
  const hub = getPage("for-architects-builders");

  return (
    <section className="theme-dark relative overflow-hidden bg-background">
      <Image
        src="/materials/natural-slate.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgb(6 21 50 / 0.95) 0%, rgb(6 21 50 / 0.8) 55%, rgb(6 21 50 / 0.6) 100%)",
        }}
      />

      <Container className="relative py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal y={12} duration={0.7}>
              <p className="eyebrow flex items-center gap-3 text-accent">
                <span className="h-0.5 w-8 bg-accent" aria-hidden />
                For architects &amp; builders
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-5 max-w-2xl font-display text-h2 font-extrabold uppercase tracking-tight text-foreground">
                Specifying slate? Start with a sample.
              </h2>
              <p className="mt-5 max-w-xl text-lead text-muted">
                Premium Spanish slate supplied and specified for prestige
                projects — CUPA PIZARRAS and Del Carmen provenance, technical
                spec support at design stage, and lead times you can programme
                around.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-5">
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end">
              <Button href={supply.url} variant="accent" size="lg" arrow>
                Request samples
              </Button>
              <Button href={hub.url} variant="outline" size="lg">
                Trade &amp; specification
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
