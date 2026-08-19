import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Button } from "@/components/ui/Button";
import { yearsTrading } from "@/config/site";

const points = [
  {
    title: "Supply to install",
    copy: "We source premium natural Spanish slate ourselves — provenance, specification support and installation under one roof.",
  },
  {
    title: "Heritage capability",
    copy: "Period, heritage and architecturally significant homes restored correctly, preserving the character of the property.",
  },
  {
    title: "Built for architects",
    copy: "Technical documentation, scheduling certainty and first-class communication for architect-led and prestige builds.",
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
              <Image
                src="/content/craft-detail.jpg"
                alt="Detail of a Wells Roofing installation"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="scale-110 object-cover"
              />
            </Parallax>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Our Craft"
              title="A specialist's eye, a generation of hands."
              intro={`For more than ${yearsTrading()} years, Wells has been the name behind Melbourne's finest slate and tile roofs — not a general roofer, a specialist.`}
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
