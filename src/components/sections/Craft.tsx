import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Button } from "@/components/ui/Button";

/**
 * "Why Wells" — three proof points, which is the cap the client set.
 *
 * Rebalanced under client feedback v1: "Heritage remains an important
 * capability and proof of skill, but should not dominate the visual/verbal
 * identity. The site must feel equally credible for contemporary
 * architect-designed homes and prestige new builds."
 *
 * Heritage previously had a proof point to itself — one of only three on the
 * homepage, which made a third of the whole pitch about period buildings.
 * It is now named inside the "new builds and period homes" point, where it
 * reads as one of two things Wells does rather than the headline.
 */
const points = [
  {
    title: "Supply to install",
    copy: "We source premium natural Spanish slate ourselves — provenance, specification support and installation under one roof.",
  },
  {
    title: "New builds and period homes",
    copy: "Contemporary architect-designed houses and prestige new builds, alongside the heritage restoration work the business was built on.",
  },
  {
    title: "Built for architects",
    copy: "Technical documentation at design stage, lead times we hold to a date, and one point of contact through the build.",
  },
];

export function Craft() {
  return (
    <section id="craft" className="py-section">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Visual with parallax */}
          <div className="overflow-hidden rounded-card lg:col-span-5">
            <Parallax amount={12} className="relative aspect-4/5">
              {/*
                A REAL Wells project photograph, supplied by the client —
                replacing the lead-valley detail shot that was here before.

                Worth keeping real: most of the remaining imagery on the site
                is stock or generated, and this is one of the few frames that
                is demonstrably our own work. It is cropped to 4:5 at build
                time from the original 4032×3024 landscape, weighted down the
                frame so the slate fills the slot rather than the sky — see
                public/content/wells-slate-home.jpg for the full frame.
              */}
              <Image
                src="/content/craft-detail.jpg"
                alt="Slate roof on a stone and render home by Wells Roofing, showing the entry gable, dormers and flashing detail"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="scale-110 object-cover"
              />
            </Parallax>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              /* Client feedback v1, table 4: "A specialist's eye, a generation
                 of hands." → "Specialist slate & tile roofing since 1982."
                 The intro also dropped its running year count in favour of a
                 fixed founding year, per the same brief. */
              eyebrow="Our Craft"
              title="Specialist slate &amp; tile roofing since 1982."
              intro="For over four decades the Wells family has worked with homeowners, builders and architects across Melbourne and the Mornington Peninsula — on natural slate, terracotta and concrete."
            />

            <div className="mt-10 space-y-8">
              {points.map((point, i) => (
                <Reveal key={point.title} delay={i * 0.1}>
                  <div className="border-l-2 border-accent/30 pl-6 transition-colors hover:border-accent">
                    <h3 className="font-display text-h4 font-extrabold uppercase tracking-tight text-foreground">
                      {point.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-small text-muted">
                      {point.copy}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-10">
                <Button href="#contact" variant="solid" size="lg" arrow>
                  Talk to a Specialist
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
