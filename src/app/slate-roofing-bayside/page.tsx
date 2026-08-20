import { metadataFor } from "@/lib/metadata";
import { LocationPage } from "@/components/sections/LocationPage";
import { pageVideo } from "@/config/video";

export const metadata = metadataFor("loc-bayside");

export default function Page() {
  return (
    <LocationPage
      pageKey="loc-bayside"
      image={pageVideo.bayside.poster}
      video={pageVideo.bayside.video}
      localImage="/content/local-bayside.jpg"
      intro="Premium slate, heritage and tile roofing across Bayside — Brighton, Hampton, Sandringham, Black Rock and Beaumaris."
      localAngle={{
        title: "Bayside's period stock, kept period-correct.",
        copy: "Brighton and Hampton hold some of Melbourne's best surviving Victorian and Edwardian roofs. Most of them want restoring, not replacing.",
        items: [
            "Victorian, Edwardian and Federation slate roofs restored sympathetically",
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
