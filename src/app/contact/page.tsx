import { getPage } from "@/config/pages";
import { metadataFor } from "@/lib/metadata";
import { schemaForPage } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { LocationMap } from "@/components/sections/LocationMap";
import { ServiceArea } from "@/components/sections/ServiceArea";

const page = getPage("contact");
export const metadata = metadataFor("contact");

/**
 * The quote form sits IN the hero rather than in a band below it — this page
 * exists to capture the enquiry, so making people scroll past a headline to
 * reach the form was costing conversions for no benefit.
 *
 * Submissions go to /api/quote, which forwards to GoHighLevel.
 * TODO before launch: set GHL_WEBHOOK_URL in the hosting environment.
 *
 * The "Talk to us" list that used to sit here was removed rather than moved:
 * LocationMap already renders the phone, email and address as a proper NAP
 * block beside the map. Printing the same four lines twice on one page is a
 * maintenance trap — the two copies drift, and on a contact page the wrong
 * phone number is the most expensive kind of stale content there is.
 */
export default function Page() {
  return (
    <>
      <JsonLd data={schemaForPage(page)} />

      <PageHero
        page={page}
        image="/photography/hero-contact.jpg"
        intro="Request a quote or book a consultation for slate, heritage or tile roofing. Based in Mornington, serving Melbourne and the Peninsula."
        aside={<QuoteForm />}
      />

      {/* Map + NAP. No `region` — this is the office, not a service area. */}
      <LocationMap />

      <ServiceArea />
    </>
  );
}
