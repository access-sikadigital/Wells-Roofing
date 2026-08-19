import type { Metadata, Viewport } from "next";
import { jakarta, montserrat } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { organisationSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.strapline} | Melbourne & Mornington Peninsula`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "slate roofing Melbourne",
    "natural slate roofing",
    "Spanish slate roofing",
    "heritage roofing Melbourne",
    "slate roofing Mornington Peninsula",
    "terracotta roof replacement",
    "concrete tile roofing",
    "slate supplier Melbourne",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.strapline}`,
    description: siteConfig.tagline,
    images: ["/brand/wells-roofing-social.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a2354",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${jakarta.variable} ${montserrat.variable}`}
      /*
        The inline script below adds `js` to this element while the document is
        still parsing — before React hydrates — so the server-rendered class
        list and the live DOM class list can never match. The mismatch is
        deliberate, and suppressing it here (one level deep only) is cheaper
        than giving up the no-JS-safe text reveal.
      */
      suppressHydrationWarning
    >
      <head>
        {/*
          Marks the document as JS-capable before first paint, so animated
          headings can be hidden for the reveal without ever shipping hidden
          text to crawlers. See [data-text-reveal] in globals.css.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="bg-background font-sans text-foreground antialiased">
        {/*
          LocalBusiness / RoofingContractor schema on every route — required
          sitewide by the strategy doc (§7 Local SEO), and the single strongest
          structured-data signal for local ranking. Emitted once here rather
          than per page so it can never be forgotten on a new route, and so
          there is exactly one @id node for pages to reference.
        */}
        <JsonLd data={[organisationSchema()]} />

        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
