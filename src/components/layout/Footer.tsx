import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  getPage,
  locationPages,
  slateCluster,
  tileCluster,
} from "@/config/pages";
import { Container } from "@/components/ui/Container";
import { Logo, LogoMark } from "@/components/brand/Logo";

/**
 * Site footer.
 *
 * Deliberately a server component with no motion: it renders on every route,
 * and a footer that animates on every page is noise rather than craft. The
 * depth comes from an oversized chevron watermark instead, which costs nothing.
 *
 * Structure fixes two things the old layout got wrong: contact detail was
 * buried under "Areas We Serve" in a shared column, and Tile/Company were
 * stacked in one column while the brand column sat half empty. Now contact
 * lives with the brand, and the four link columns are equal width.
 */

/** "Blog" sits in the footer per the sitemap workbook's Nav location column. */
const company = [
  "about",
  "projects",
  "reviews",
  "faqs",
  "blog",
  "contact",
] as const;

type FooterColumn = {
  heading: string;
  links: { key: string; label: string; href: string }[];
};

const columns: FooterColumn[] = [
  {
    heading: "Slate",
    links: slateCluster.map((k) => {
      const p = getPage(k);
      return { key: k, label: p.label, href: p.url };
    }),
  },
  {
    heading: "Tile",
    links: tileCluster.map((k) => {
      const p = getPage(k);
      return { key: k, label: p.label, href: p.url };
    }),
  },
  {
    heading: "Company",
    links: company.map((k) => {
      const p = getPage(k);
      return { key: k, label: p.label, href: p.url };
    }),
  },
  {
    heading: "Areas We Serve",
    links: locationPages.map((p) => ({
      key: p.key,
      label: p.label,
      href: p.url,
    })),
  },
];

export function Footer() {
  return (
    <footer className="theme-dark hairline-t relative overflow-hidden bg-background text-foreground">
      {/* Oversized chevron watermark — depth with zero JS and zero requests */}
      <LogoMark className="pointer-events-none absolute -right-16 -top-24 size-136 text-white/2.5 lg:-right-10 lg:size-176" />

      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---- Brand + direct contact ---- */}
          <div className="lg:col-span-4">
            <Logo withStrapline className="text-white" />

            <p className="mt-6 max-w-sm text-small text-muted">
              {siteConfig.tagline}
            </p>

            <p className="mt-6 font-display text-h4 italic text-white">
              {siteConfig.motto}
            </p>

            <div className="mt-8 max-w-sm border-t border-line pt-8">
              <p className="eyebrow text-faint">Talk to a specialist</p>

              <a
                href={siteConfig.phoneHref}
                className="mt-3 block font-display text-h3 font-extrabold tracking-tight text-white transition-colors duration-base ease-out-quart hover:text-accent"
              >
                {siteConfig.phone}
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-3 block text-small text-muted transition-colors hover:text-accent"
              >
                {siteConfig.email}
              </a>

              <p className="mt-2 text-small text-faint">{siteConfig.address}</p>
            </div>
          </div>

          {/* ---- Four equal link columns ---- */}
          {columns.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className="lg:col-span-2"
            >
              <p className="eyebrow mb-5 text-faint">{column.heading}</p>
              <ul className="space-y-3 text-small">
                {column.links.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ---- Bottom bar ---- */}
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-small text-faint sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} — {siteConfig.since}.
            All rights reserved.
          </p>
          <p>
            Site by{" "}
            <a
              href="https://sikadigital.com"
              className="text-muted transition-colors hover:text-accent"
            >
              Sika Digital
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
