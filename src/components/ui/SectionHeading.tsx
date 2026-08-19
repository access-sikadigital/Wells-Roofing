import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** h2 by default */
  as?: "h1" | "h2" | "h3";
};

/**
 * Standard section header: tracked red eyebrow, bold display title
 * (masked line reveal), the brand's short red rule, optional intro.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  as = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal y={12} duration={0.7}>
          <p className="eyebrow mb-4 flex items-center gap-3 text-accent">
            <span
              className={cn(
                "h-0.5 w-8 bg-accent",
                align === "center" && "hidden"
              )}
              aria-hidden
            />
            {eyebrow}
          </p>
        </Reveal>
      )}

      <TextReveal as={as} className="text-h2 text-foreground">
        {title}
      </TextReveal>

      <Reveal delay={0.1} y={0} duration={0.6}>
        <span
          aria-hidden
          className={cn(
            "mt-6 block h-1 w-14 bg-accent",
            align === "center" && "mx-auto"
          )}
        />
      </Reveal>

      {intro && (
        <Reveal delay={0.15}>
          <p className="mt-6 text-lead text-muted">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
