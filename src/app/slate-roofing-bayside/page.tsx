import { metadataFor } from "@/lib/metadata";
import { LocationPage } from "@/components/sections/LocationPage";

export const metadata = metadataFor("loc-bayside");

export default function Page() {
  return (
    <LocationPage
      pageKey="loc-bayside"
      image="/photography/hero-bayside.jpg"
      localImage="/content/local-bayside.jpg"
      intro="Premium slate and tile roofing across Bayside — Brighton, Hampton, Sandringham, Black Rock and Beaumaris. New builds, re-roofing and restoration."
      localAngle={{
        title: "Bayside's period stock, kept period-correct.",
        copy: "Brighton and Hampton hold some of Melbourne's best surviving period roofs, and some of its most ambitious new architecture. We work on both.",
        items: [
            "Slate on architect-designed new builds and knock-down rebuilds",
            "Victorian, Edwardian and Federation roofs restored sympathetically",
            "Matching original slate on homes where a mismatch would be obvious from the street",
            "Bay-facing exposure handled with appropriate fixings and detailing",
            "Architect-led contemporary builds specifying natural slate",
            "Honest restore-versus-replace assessment before you spend",
        ],
      }}
      localProof="Regular work across Brighton, Hampton, Sandringham, Black Rock and Beaumaris — ask us for references on your street."
    />
  );
}
