import { metadataFor } from "@/lib/metadata";
import { LocationPage } from "@/components/sections/LocationPage";
import { pageVideo } from "@/config/video";

export const metadata = metadataFor("loc-mornington-peninsula");

export default function Page() {
  return (
    <LocationPage
      pageKey="loc-mornington-peninsula"
      image={pageVideo.peninsula.poster}
      video={pageVideo.peninsula.video}
      localImage="/content/local-peninsula.jpg"
      intro="Specialist slate, heritage and tile roofing across the Mornington Peninsula — and our home ground since 1982. Our yard is in Mornington."
      localAngle={{
        title: "Coastal exposure changes everything.",
        copy: "Peninsula roofs take salt air, wind off the bay and driving rain that inland roofs never see. Material choice and fixing detail have to answer to that.",
        items: [
            "Based in Mornington — we are local, not servicing the region from town",
            "Salt-air-appropriate fixings and flashings; copper and lead over cheaper alternatives",
            "Coastal and clifftop properties where exposure ratings genuinely matter",
            "Period homes in Sorrento, Portsea and Mount Eliza with original slate worth preserving",
            "Working knowledge of Peninsula heritage overlays and council requirements",
        ],
      }}
      localProof="Four decades working this coastline. Most weeks we are somewhere between Mornington and Portsea."
    />
  );
}
