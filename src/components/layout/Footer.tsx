import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getPage, locationPages, serviceGroups } from "@/config/pages";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

/**
 * Site footer.
 *
 * Deliberately a server component with no motion: it renders on every route,
 * and a footer that animates on every page is noise rather than craft.
 *
 * Layout: contact detail sits with the brand rather than buried under "Areas
 * We Serve", and the link columns are equal width. The service groups mirror
 * the header mega-menu exactly — see `columns` below.
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

type LinkGroup = {
  heading: string;
  links: { key: string; label: string; href: string }[];
};

/**
 * A column holds one OR MORE headed groups stacked vertically.
 *
 * Tile Roofing (2 links) and Architects & Builders (2 links) each occupied a
 * whole column while being barely two rows tall, which left two columns mostly
 * whitespace and pushed the total to five. Stacking them in one column gets the
 * footer back to four and closes that gap without dropping anything or
 * renaming a group.
 */
type FooterColumn = LinkGroup[];

/**
 * The service groups come from `serviceGroups` — the SAME config the header
 * mega-menu and the /services hub read.
 *
 * They used to be hand-rolled here as "Slate" and "Tile" off the raw clusters,
 * which meant the footer and the menu were two independent lists of the same
 * pages: different headings for the same groups, and the Architects & Builders
 * group missing from the footer entirely. Adding a service page to a cluster
 * updated one and silently left the other stale. Now all three render from one
 * source and cannot disagree.
 *
 * `toGroup` maps a serviceGroup into a footer group so the column layout below
 * can pick them out by index and decide which share a column.
 */
const toGroup = (group: (typeof serviceGroups)[number]): LinkGroup => ({
  heading: group.label,
  links: group.children.map((child) => ({
    key: `${group.href}${child.href}`,
    label: child.label,
    href: child.href,
  })),
});

const [slateGroup, tileGroup, architectsGroup] = serviceGroups.map(toGroup);

const columns: FooterColumn[] = [
  [slateGroup],
  /* The two short service groups share one column — see FooterColumn. */
  [tileGroup, architectsGroup],
  [
    {
      heading: "Company",
      links: company.map((k) => {
        const p = getPage(k);
        return { key: k, label: p.label, href: p.url };
      }),
    },
  ],
  [
    {
      heading: "Areas We Serve",
      links: locationPages.map((p) => ({
        key: p.key,
        label: p.label,
        href: p.url,
      })),
    },
  ],
];

export function Footer() {
  return (
    /*
      The oversized chevron watermark that used to sit here has been removed at
      the client's request. `overflow-hidden` stays — it was clipping the
      watermark, but it also guards against anything else in the footer
      bleeding sideways.
    */
    <footer className="theme-dark hairline-t relative overflow-hidden bg-background text-foreground">
      <Container className="relative py-14 lg:py-16">
        {/*
          The link columns live in their OWN nested grid rather than sharing the
          outer 12-column track with the brand block, so the two can be sized
          independently — the brand block keeps its own span while the four link
          columns stay equal whatever is left over.
        */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---- Brand ---- */}
          <div className="lg:col-span-3">
            <Logo variant="reversed" className="h-12 lg:h-14" />

            <p className="mt-6 max-w-sm text-small text-muted">
              {siteConfig.tagline}
            </p>

            {/*
              Was `siteConfig.motto` ("Roofing for generations."). Client
              feedback v1 reserves that line for natural-slate pages and
              campaigns only — and the footer renders on every route, including
              terracotta and concrete. Swapped for the positioning line, which
              is true everywhere.
            */}
            <p className="mt-6 font-display text-h4 italic text-white">
              Specialist slate &amp; tile roofing {siteConfig.since.toLowerCase()}.
            </p>
          </div>

          {/*
            ---- Four link columns, deliberately UNEQUAL on desktop ----

            Four equal columns wasted width on "Company" — whose longest label
            is "Projects" — while forcing "ARCHITECTS & BUILDERS" to wrap onto
            two lines. The eyebrow style is uppercase with wide letter-spacing,
            so that heading needs noticeably more room than its two-word count
            suggests.

            The track gives column 2 the extra space it needs to keep that
            heading on one line and takes it back from Company, which has none
            of its own to spare. Ratios rather than fixed widths, so the whole
            row still flexes with the container.
          */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-10 lg:col-span-9 lg:grid-cols-[1fr_1.3fr_0.75fr_1.05fr]">
            {columns.map((column) => (
              <div key={column[0].heading} className="space-y-10">
                {column.map((group) => (
                  <nav key={group.heading} aria-label={group.heading}>
                    <p className="eyebrow mb-5 text-faint">{group.heading}</p>
                    {/*
                      TAP TARGETS — why the link carries the padding, not the <li>.

                      These were inline links in a `space-y-3` list: a 19px line
                      box with 12px of margin between rows. Measured properly —
                      the link's own height plus the clear space around it —
                      that is a 36px target, under the 44px minimum, and the
                      margin belongs to the list item rather than the link, so a
                      tap in the gap hits nothing at all.

                      `block py-2.5` moves that space inside the anchor, which
                      makes the whole band clickable and puts the effective
                      target past 44px. The negative margin on the <ul> keeps the
                      column's visual rhythm identical — a hit-area fix, not a
                      spacing change.
                    */}
                    <ul className="-my-2.5 text-small">
                      {group.links.map((link) => (
                        <li key={link.key}>
                          <Link
                            href={link.href}
                            className="block py-2.5 text-muted transition-colors hover:text-accent"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/*
          CONTACT STRIP — horizontal, and on the SAME 12-column track as the
          row above it.

          Phone, email and address used to be stacked under the logo. That made
          the brand column about twice the height of the tallest link column, so
          the footer ended in a large empty rectangle to its right. Laying the
          three across the full width removes the dead space and gives the phone
          number the prominence it deserves as the primary conversion path.

          The grid is 12 columns, not 3 or 4 equal cells, so each item sits on
          the same vertical lines as the brand block and link columns above —
          three free-standing cells would have set up a second, competing
          rhythm. The fourth cell is a real CTA rather than filler: the footer
          previously had no action in it at all, which is a waste of the one
          section that appears on every page.
        */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-10 sm:gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <p className="eyebrow text-faint">Talk to a specialist</p>
            <a
              href={siteConfig.phoneHref}
              className="mt-3 flex min-h-11 items-center font-display text-h3 font-extrabold tracking-tight text-white transition-colors duration-base ease-out-quart hover:text-accent"
            >
              {siteConfig.phone}
            </a>
          </div>

          <div className="col-span-2 lg:col-span-3">
            <p className="eyebrow text-faint">Email</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 flex min-h-11 items-center break-all text-small text-muted transition-colors hover:text-accent"
            >
              {siteConfig.email}
            </a>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <p className="eyebrow text-faint">Workshop</p>
            <p className="mt-3 flex min-h-11 items-center text-small text-muted">
              {siteConfig.address}
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <p className="eyebrow text-faint">Start a project</p>
            <Button href="/contact" variant="accent" arrow className="mt-3">
              Get a Quote
            </Button>
          </div>
        </div>

        {/* ---- Bottom bar ---- */}
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-small text-faint sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          {/* Legal entity and ABN, confirmed in the client feedback brief.
              Trading name above, registered name here — they differ. */}
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName} · ABN{" "}
            {siteConfig.abn} — {siteConfig.since}. All rights reserved.
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
