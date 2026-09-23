import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Blueprint section — "Our process".
 *
 * SIX STEPS, EVERYWHERE. Consult → Site inspection → Quote → Scheduling →
 * Installation → Warranty.
 *
 * History: v1 feedback cut an earlier six-step journey to three (Consult,
 * Quote, Installation). Client feedback WRv2 (Sept '26) replaced that with
 * the six steps below, which are the client's own wording, and renamed the
 * eyebrow from "How it works" to "Our process".
 *
 * There is still ONE set of steps and every page renders it identically.
 * Don't add a shorter version for any one page: a visitor should see the same
 * process wherever they land.
 *
 * Each step carries a photograph with the step number sitting *on* the image
 * rather than above the heading, so the imagery costs no extra vertical space.
 * A step without an `image` renders as a text-only card, so the section keeps
 * working if photography is ever swapped out.
 *
 * Photography: 02-survey.jpg is a REAL Wells photograph (crew on a re-roof),
 * supplied for the survey/inspection step, which is where it sits. The rest
 * are editorial stills matched to the step.
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
 * The site's process — client wording, WRv2. Exported as `summarySteps` too,
 * because pages imported it under that name back when there was also a
 * longer version to summarise.
 *
 * The warranty step is a contractual claim (7-year workmanship warranty). It
 * matches the "Workmanship warranty" entry in config/proof.ts; if either
 * changes, change both.
 */
const defaultSteps: Step[] = [
  {
    title: "Consult",
    copy: "We discuss your project, roofing requirements, preferred materials and any plans or specifications.",
    image: "/process/01-consultation.jpg",
    alt: "Roof plans and a slate sample laid out on a homeowner's table",
  },
  {
    title: "Site inspection",
    copy: "We assess the roof or project onsite and bring relevant slate and tile samples so you can see the options in person.",
    image: "/process/02-survey.jpg",
    alt: "Wells Roofing crew in safety harnesses working on a slate re-roof",
  },
  {
    title: "Quote",
    copy: "We provide a clear, itemised quotation based on the agreed scope, materials and project requirements.",
    image: "/process/03-specification.jpg",
    alt: "Natural slate tile samples fanned out beside a technical specification sheet",
  },
  {
    title: "Scheduling",
    copy: "Once approved, we confirm your material selection, final details and installation timing.",
    image: "/process/04-supply.jpg",
    alt: "Pallets of natural slate stacked in a supply yard beside a delivery truck",
  },
  {
    title: "Installation",
    copy: "Our experienced roofing teams complete the works with careful attention to safety and workmanship.",
    image: "/process/05-installation.jpg",
    alt: "Gloved hands setting a natural slate tile onto a timber batten",
  },
  {
    title: "Warranty",
    copy: "All installations are backed by a 7-year workmanship warranty, with applicable manufacturer warranties also provided for the roofing products used.",
    image: "/process/06-handover.jpg",
    alt: "Completed natural slate roof with copper flashings on a stone home",
  },
];

/** @deprecated The long version is gone; this is simply the process. */
export const summarySteps = defaultSteps;

export function ProcessSteps({
  steps = defaultSteps,
  /* Client feedback WRv2: was "How it works". */
  eyebrow = "Our process",
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

        {/* Six steps: 1 column on phones, 2×3 on tablets, 3×2 on desktop.
            Six divides evenly by both, so the hairline grid never ends on a
            ragged row. */}
        <ol className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
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
                  <h3 className="font-display text-h4 font-extrabold tracking-tight text-foreground">
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
