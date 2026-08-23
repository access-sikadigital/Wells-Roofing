import { type ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { cn } from "@/lib/utils";

/**
 * Generic editorial section used for the body blueprint sections —
 * "What natural slate roofing involves", "Why Wells", "Spanish slate feature",
 * "Restore vs replace", "Investment & how slate is priced", etc.
 *
 * Two layouts, chosen by whether there is an image:
 *
 * · **With image** — the classic 5/7 media split. Alternate `flip` down the
 *   page so it reads as a rhythm rather than a stack of identical rows.
 *
 * · **Without image** — an editorial masthead split: the heading holds the
 *   left column and the prose runs down the right. The single centred column
 *   this replaced left half the row empty on desktop, which read as an
 *   unfinished section rather than a deliberately quiet one. Splitting the
 *   heading away from the body is what fills the measure *without* stretching
 *   the line length past readable — body copy stays around 60–70 characters
 *   either way, which is the whole reason the old layout capped itself.
 *
 * The heading column is sticky on desktop, so on a long block the title stays
 * with the copy it belongs to instead of scrolling away from it.
 */
export type BlockImage = { src: string; alt?: string };

export function ContentBlock({
  eyebrow,
  title,
  intro,
  children,
  image,
  images,
  flip = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  image?: string;
  /**
   * Two photographs instead of one, rendered as an offset overlapping pair.
   *
   * Stacking two portraits vertically was the obvious option and the wrong
   * one: it doubles the media column's height, so the copy beside it ends up
   * floating in the middle of a very tall row. The offset pair fills the same
   * vertical space as a single portrait while showing two images — and reads
   * as a designed composition rather than a list.
   *
   * Ignored when there is only one image; use `image` for that.
   */
  images?: BlockImage[];
  flip?: boolean;
}) {
  const pair = images && images.length >= 2 ? images.slice(0, 2) : null;

  if (pair) {
    return (
      <section className="py-section">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
            <div className={cn("lg:col-span-5", flip && "lg:order-2")}>
              {/* Extra bottom padding makes room for the offset second frame,
                  which hangs below the first by design. */}
              <div className="relative pb-[18%]">
                <Parallax
                  amount={8}
                  className="relative aspect-4/5 w-[82%] overflow-hidden rounded-card"
                >
                  <Image
                    src={pair[0].src}
                    alt={pair[0].alt ?? ""}
                    fill
                    sizes="(max-width: 1024px) 82vw, 33vw"
                    className="scale-105 object-cover"
                  />
                </Parallax>

                {/*
                  The ring is doing real work, not decoration: the second frame
                  overlaps the first, and without a border the two photographs
                  bleed into each other wherever their tones happen to match.
                */}
                <div className="absolute right-0 bottom-0 aspect-square w-[52%] overflow-hidden rounded-card ring-4 ring-background">
                  <Image
                    src={pair[1].src}
                    alt={pair[1].alt ?? ""}
                    fill
                    sizes="(max-width: 1024px) 52vw, 21vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
              {children && (
                <Reveal delay={0.2}>
                  <div className="mt-8 space-y-5 text-body text-muted">
                    {children}
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (!image) {
    return (
      <section className="py-section">
        <Container>
          {/* Hairline across the full measure — gives the split a top edge to
              hang from, so the two columns read as one unit. */}
          <div className="hairline-t pt-12 lg:pt-16">
            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <SectionHeading eyebrow={eyebrow} title={title} />
                </div>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                {intro && (
                  <Reveal delay={0.1}>
                    <p className="text-lead text-foreground">{intro}</p>
                  </Reveal>
                )}
                {children && (
                  <Reveal delay={0.2}>
                    <div
                      className={cn(
                        "space-y-5 text-body text-muted",
                        intro && "mt-8"
                      )}
                    >
                      {children}
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-section">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div
            className={cn(
              "overflow-hidden rounded-card lg:col-span-5",
              flip && "lg:order-2"
            )}
          >
            <Parallax amount={10} className="relative aspect-4/5">
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="scale-110 object-cover"
              />
            </Parallax>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
            {children && (
              <Reveal delay={0.2}>
                <div className="mt-8 space-y-5 text-body text-muted">
                  {children}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Bulleted list with the brand's red rule markers. */
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4">
          <span
            aria-hidden
            className="mt-2.5 h-0.5 w-5 shrink-0 bg-accent"
          />
          <span className="text-small">{item}</span>
        </li>
      ))}
    </ul>
  );
}
