import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Blueprint section — "Process".
 * Default is the slate journey from the doc:
 * consultation → survey → specification & sample → supply → installation → handover.
 *
 * Each step can carry a photograph. The step number sits *on* the image rather
 * than above the heading, so the imagery costs no extra vertical space in the
 * row. Steps without an `image` render as text-only cards exactly as before —
 * so the section keeps working while photography is in production, and shorter
 * pages can opt out of imagery entirely.
 *
 * Photography: the six files in public/process/ are delivered and unique to
 * this section. See docs/IMAGE-PROMPTS.md for the site-wide image plan.
 */

export type Step = {
  title: string;
  copy: string;
  /** Optional 3:2 photograph. Omit for a text-only card. */
  image?: string;
  /** Describe the scene, not the brand — this is editorial imagery. */
  alt?: string;
};

const defaultSteps: Step[] = [
  {
    title: "Consultation",
    copy: "We talk through the property, the problem and what you want the roof to do. No pressure, no obligation.",
    image: "/process/01-consultation.jpg",
    alt: "Roof plans and a slate sample laid out on a homeowner's table",
  },
  {
    title: "Roof survey",
    copy: "A proper inspection of the roof, structure and existing material — so the quote reflects the actual job, not a guess.",
    image: "/process/02-survey.jpg",
    // Real Wells crew, branded workwear, on an actual slate job — not stock.
    alt: "Wells Roofing crew working on a slate roof, harnessed and in branded workwear",
  },
  {
    title: "Specification & sample",
    copy: "We specify the slate or tile, grade and detail, and put a physical sample in your hand before anything is ordered.",
    image: "/process/03-specification.jpg",
    alt: "Natural slate tile samples fanned out beside a technical specification sheet",
  },
  {
    title: "Supply",
    copy: "Material sourced directly through our own supply chain, with a firm lead time we hold you to a date on.",
    image: "/process/04-supply.jpg",
    alt: "Banded pallets of natural slate roofing tiles stacked in a yard",
  },
  {
    title: "Expert installation",
    copy: "Installed by slate and tile specialists — not subcontracted to a general roofing crew.",
    image: "/process/05-installation.jpg",
    alt: "Gloved hands setting a natural slate tile onto a timber batten",
  },
  {
    title: "Photographed handover",
    copy: "Documented completion, warranty paperwork, and photographs of the finished roof for your records.",
    image: "/process/06-handover.jpg",
    alt: "Completed natural slate roof with copper ridge capping in afternoon light",
  },
];

export function ProcessSteps({
  steps = defaultSteps,
  eyebrow = "How it works",
  title = "Six steps, no surprises.",
  intro,
}: {
  steps?: Step[];
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section className="py-section">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line lg:mt-16 lg:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={(i % 3) * 0.1} className="h-full">
              <li className="group flex h-full flex-col bg-background">
                {step.image ? (
                  <div className="relative aspect-3/2 overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.alt ?? ""}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-slower ease-out-quart group-hover:scale-105"
                    />
                    <span className="absolute bottom-0 left-0 bg-accent px-3.5 py-2 font-display text-small font-extrabold leading-none tabular-nums text-on-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                ) : (
                  <span className="px-8 pt-8 font-display text-small font-extrabold tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}

                <div className="flex flex-1 flex-col p-8">
                  <h3 className="font-display text-h4 font-extrabold uppercase tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-small text-muted">{step.copy}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
