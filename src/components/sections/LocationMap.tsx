import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

/**
 * Blueprint section 6 (Location pages) — "Map".
 *
 * Uses Google's keyless Maps *embed* rather than the JS Maps API: no API key
 * to leak or bill, no third-party script in the bundle, and `loading="lazy"`
 * means it costs nothing until it scrolls into view. A location page that
 * pulls in the full Maps SDK for a static pin is a Core Web Vitals problem for
 * no benefit.
 *
 * The NAP block beside it is the important part for local SEO. It repeats the
 * exact name, address and phone from siteConfig — the same strings that go in
 * the GBP listing and the LocalBusiness schema. Consistency across those three
 * is what the strategy doc's NAP requirement actually means, and it is why
 * this reads from config rather than being typed out per region.
 */
export function LocationMap({ region }: Readonly<{ region: string }>) {
  const query = encodeURIComponent(
    `${siteConfig.name}, ${siteConfig.address}`
  );

  return (
    <section className="py-section">
      <Container>
        <SectionHeading
          eyebrow="Find us"
          title="Local, and easy to reach."
          intro={`Our yard is in Mornington — a short run to anywhere in ${region}.`}
        />

        <div className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <div className="overflow-hidden rounded-card border border-line">
              <iframe
                title={`Map showing ${siteConfig.name}, ${siteConfig.address}`}
                src={`https://maps.google.com/maps?q=${query}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-4/3 w-full lg:aspect-16/10"
              />
            </div>
          </Reveal>

          {/* NAP — must match GBP and LocalBusiness schema exactly */}
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="rounded-card border border-line bg-surface p-8">
              <p className="font-display text-h4 font-extrabold uppercase tracking-tight text-foreground">
                {siteConfig.name}
              </p>

              <address className="mt-4 space-y-3 text-small not-italic text-muted">
                <p>{siteConfig.address}</p>
                <p>
                  <a
                    href={siteConfig.phoneHref}
                    className="font-display text-h4 font-bold tracking-tight text-foreground transition-colors hover:text-accent"
                  >
                    {siteConfig.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="transition-colors hover:text-accent"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </address>

              <p className="mt-6 border-t border-line pt-6 text-small text-faint">
                Serving {siteConfig.serviceAreas.join(", ")} — and further
                afield where a slate project is a strong fit.
              </p>

              <div className="mt-6">
                <Button href="/contact" variant="accent" arrow>
                  Get a Quote
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
