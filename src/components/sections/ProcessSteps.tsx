import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Blueprint section — "Process".
 *
 * THREE STEPS, EVERYWHERE. Consult → Quote → Installation.
 *
 * This used to run a six-step journey (consultation, survey, specification,
 * supply, installation, handover) on the service pages, with a three-step
 * summary reserved for the homepage. The client has asked for the three-step
 * version across the whole site, so there is now ONE set of steps and every
 * page renders it identically.
 *
 * Note that the three are NOT a `.slice()` of the old six: "Quote" folds
 * survey, specification and supply into a single step, so the copy is written
 * for three rather than trimmed from six. Do not reintroduce the long version
 * for "detail" on service pages — the whole point of the change is that a
 * visitor sees the same simple promise wherever they land.
 *
 * Each step carries a photograph with the step number sitting *on* the image
 * rather than above the heading, so the imagery costs no extra vertical space.
 * A step without an `image` renders as a text-only card, so the section keeps
 * working if photography is ever swapped out.
 */

export type Step = {
  title: string;
  copy: string;
  /** Optional 3:2 photograph. Omit for a text-only card. */
  image?: string;
  /** Describe the scene, not the brand — this is editorial imagery. */
  alt?: string;
};

/**
 * The site's process. Exported as `summarySteps` too, because pages imported
 * it under that name back when there was also a longer version to summarise.
 */
const defaultSteps: Step[] = [
  {
    title: "Consult",
    copy: "We look at the property, talk through what the roof needs to do, and give you a straight answer on the options.",
    image: "/process/01-consultation.jpg",
    alt: "Roof plans and a slate sample laid out on a homeowner's table",
  },
  {
    title: "Quote",
    copy: "A proper roof inspection, the material specified and a sample in your hand — then a quote priced to the actual job.",
    image: "/process/03-specification.jpg",
    alt: "Natural slate tile samples fanned out beside a technical specification sheet",
  },
  {
    title: "Installation",
    copy: "Material supplied to a firm lead time, installed to the standard we specify, and handed over with photographs and paperwork.",
    image: "/process/05-installation.jpg",
    alt: "Gloved hands setting a natural slate tile onto a timber batten",
  },
];

/** @deprecated The long version is gone; this is simply the process. */
export const summarySteps = defaultSteps;

export function ProcessSteps({
  steps = defaultSteps,
  eyebrow = "How it works",
  title = "How a Wells roof comes together.",
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
