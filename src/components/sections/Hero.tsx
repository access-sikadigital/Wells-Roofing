import {
  siteConfig,
  FOUNDED_YEAR,
  yearsTrading,
} from "@/config/site";
import { heroVideo } from "@/config/video";
import { HeroVideo } from "@/components/media/HeroVideo";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Counter } from "@/components/motion/Counter";

export function Hero() {
  return (
    <section className="theme-dark grain relative flex min-h-svh flex-col justify-end overflow-hidden pt-32">
      {/* Never-ending crossfaded background film */}
      <div className="absolute inset-0 opacity-45">
        <HeroVideo clips={heroVideo.clips} poster={heroVideo.poster} />
      </div>

      {/* Navy scrim so the copy always holds contrast over any frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(6 21 50 / 0.85) 0%, rgb(6 21 50 / 0.55) 35%, rgb(6 21 50 / 0.95) 100%)",
        }}
      />

      {/* Extra bottom-left wash — protects the headline and stats */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 65% at 15% 85%, rgb(6 21 50 / 0.75) 0%, transparent 70%)",
        }}
      />

      <Container className="relative pb-16 lg:pb-24">
        <Reveal y={14} duration={0.8}>
          <p className="eyebrow mb-6 flex items-center gap-3 text-accent">
            <span className="h-0.5 w-10 bg-accent" aria-hidden />
            {siteConfig.strapline} — {siteConfig.since}
          </p>
        </Reveal>

        <TextReveal
          as="h1"
          immediate
          delay={0.25}
          className="max-w-5xl font-display text-display uppercase text-white"
        >
          Roofing for generations.
        </TextReveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.55} className="lg:col-span-6">
            <p className="max-w-xl text-lead text-muted">
              Natural slate, terracotta and concrete roofing — supplied and
              installed across Melbourne and the Mornington Peninsula. For more
              than {yearsTrading()} years, Wells has worked with builders,
              architects and homeowners on prestige new homes, heritage
              restorations and complete roof replacements.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={siteConfig.cta.href} variant="accent" size="lg" arrow>
                {siteConfig.cta.label}
              </Button>
              <Button href="#services" variant="outline" size="lg">
                Explore Our Materials
              </Button>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.75} className="lg:col-span-6">
            <dl className="grid grid-cols-3 gap-4 border-t border-line pt-8 sm:gap-6 lg:justify-items-end">
              <div>
                <dd className="font-display text-h2 font-extrabold text-white">
                  <Counter to={yearsTrading()} suffix="+" />
                </dd>
                <dt className="mt-1 text-small text-faint">
                  Years since {FOUNDED_YEAR}
                </dt>
              </div>
              <div>
                <dd className="font-display text-h2 font-extrabold text-white">
                  <Counter to={3} />
                </dd>
                <dt className="mt-1 text-small text-faint">
                  Specialist materials
                </dt>
              </div>
              <div>
                <dd className="font-display text-h2 font-extrabold text-accent">
                  Slate
                </dd>
                <dt className="mt-1 text-small text-faint">
                  Supply &amp; install
                </dt>
              </div>
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
