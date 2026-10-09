import Link from "next/link";
import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { ProjectGallery } from "@/components/sections/ProjectGallery";

const page = getPage("thank-you");
export const metadata = metadataFor("thank-you");

/**
 * POST-ENQUIRY CONFIRMATION
 * =========================
 * Reached by redirect from the quote form, not by navigation. Three jobs, in
 * this order:
 *
 *  1. **Confirm, specifically.** "Thanks, we'll be in touch" tells the person
 *     nothing they can act on. The three steps below say who calls, when, and
 *     what they'll be asked — which is what stops the follow-up call going to
 *     voicemail.
 *  2. **Fire the ad conversion.** It is a distinct URL so Google Ads and Meta
 *     can count a conversion on destination. That is the whole reason this is
 *     a route rather than an inline success state.
 *  3. **Keep them on the site.** Someone who has just enquired is the most
 *     engaged visitor Wells gets, and a dead-end page wastes that. The links
 *     below send them to proof (projects), reassurance (reviews, about) and
 *     the rest of the service cluster while they wait for the call.
 *
 * Deliberately no hero photograph: this page loads straight after a form
 * submit, and the person is checking that it worked, not admiring a roof.
 * The band is flat navy so the confirmation is the first and only thing read.
 */
export default function Page() {
  return (
    <>
      <section className="theme-dark grain relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28">
        {/* Same horizontal navy ramp as the page heroes, minus the image. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 10% 0%, rgb(16 42 92 / 0.85) 0%, rgb(6 21 50 / 0) 60%)",
          }}
        />

        <Container className="relative">
          <div className="max-w-3xl">
            <Reveal y={12} duration={0.7}>
              <p className="eyebrow mb-6 flex items-center gap-3 text-accent">
                <span className="h-0.5 w-10 bg-accent" aria-hidden />
                Enquiry received
              </p>
            </Reveal>

            <TextReveal
              as="h1"
              immediate
              className="font-display text-h1 uppercase text-white"
            >
              {page.h1}
            </TextReveal>

            <Reveal delay={0.3}>
              <p className="mt-7 max-w-2xl text-lead text-muted">
                One of our roofing specialists will call you back — usually the
                same business day, and always within one. If you&rsquo;d rather
                not wait, call us directly.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button href={siteConfig.phoneHref} variant="accent" size="lg">
                  Call {siteConfig.phone}
                </Button>
                <Button href="/projects" variant="outline" size="lg" arrow>
                  See recent work
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* WHAT HAPPENS NEXT — the part that earns the callback being answered */}
      <section className="py-section">
        <Container>
          <SectionHeading
            eyebrow="What happens next"
            title="Three steps, and no obligation."
          />

          <ol className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                n: "01",
                h: "We call you back",
                p: "A specialist, not a call centre — usually the same business day. We'll confirm the address and talk through what the roof is doing.",
              },
              {
                n: "02",
                h: "We look at the roof",
                p: "For most jobs we need to see it. We'll book a time that suits, inspect properly, and tell you what we find — including when the answer is that it doesn't need replacing.",
              },
              {
                n: "03",
                h: "You get it in writing",
                p: "A written quote with the material, the scope and the warranty spelled out. No pressure, and no deposit to hold a price.",
              },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 0.1} className="h-full">
                <li className="flex h-full flex-col rounded-card border border-line bg-surface p-8">
                  <span className="font-display text-small font-extrabold tabular-nums text-accent">
                    {step.n}
                  </span>
                  <h3 className="mt-4 font-display text-h4 font-extrabold tracking-tight text-foreground">
                    {step.h}
                  </h3>
                  <p className="mt-3 text-small text-muted">{step.p}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          {/*
            WHILE YOU WAIT — plain internal links, not cards. A second grid of
            cards directly under the first reads as one undifferentiated block
            and nothing gets clicked. A short list of specific destinations
            does better, and it hands the crawler a clean set of links out of
            a page that would otherwise be a cul-de-sac.
          */}
          <Reveal delay={0.2}>
            <div className="mt-14 rounded-card border border-line bg-background p-8 lg:p-10">
              <p className="font-display text-h4 font-extrabold tracking-tight text-foreground">
                While you wait
              </p>
              <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {[
                  {
                    href: "/projects",
                    label: "Recent projects",
                    note: "Slate, terracotta and heritage work we've completed",
                  },
                  {
                    href: "/reviews",
                    label: "Reviews",
                    note: "What Melbourne and Peninsula clients say",
                  },
                  {
                    href: "/faqs",
                    label: "Roofing FAQs",
                    note: "Cost, lifespan, and restore versus replace",
                  },
                  {
                    href: "/services/slate-roof-restoration",
                    label: "Slate roof restoration",
                    note: "What's involved, and when it beats a re-roof",
                  },
                  {
                    href: "/services/natural-slate-roofing",
                    label: "Natural slate roofing",
                    note: "Our flagship material, supplied and installed",
                  },
                  {
                    href: "/about",
                    label: "About Wells Roofing",
                    note: "Family owned, specialist since 1982",
                  },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex min-h-11 flex-col border-b border-line py-3 transition-colors hover:border-accent/40"
                    >
                      <span className="font-display text-small font-bold text-foreground transition-colors group-hover:text-accent">
                        {link.label}
                      </span>
                      <span className="mt-0.5 text-small text-muted">
                        {link.note}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Proof, then the rest of the service cluster. Both already exist as
          sections, so this page links the same way every other page does. */}
      <ProjectGallery
        eyebrow="Proof"
        title="Roofs we've finished."
        intro="A sample of recent slate, terracotta and heritage work across Melbourne and the Mornington Peninsula."
        limit={6}
      />

      <RelatedServices
        keys={[
          "natural-slate-roofing",
          "slate-roof-restoration",
          "heritage-roofing",
          "slate-roof-repairs",
          "terracotta-tile-roofing",
          "concrete-tile-roofing",
        ]}
        eyebrow="Our work"
        title="What we specialise in."
      />
    </>
  );
}
