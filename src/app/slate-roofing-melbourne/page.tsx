import { metadataFor } from "@/lib/metadata";
import { LocationPage } from "@/components/sections/LocationPage";
import { pageVideo } from "@/config/video";

export const metadata = metadataFor("loc-melbourne");

export default function Page() {
  return (
    <LocationPage
      pageKey="loc-melbourne"
      image={pageVideo.melbourne.poster}
      video={pageVideo.melbourne.video}
      localImage="/content/local-melbourne.jpg"
      intro="Premium slate and heritage roofing for Melbourne's inner-east — Toorak, Kew, Camberwell, Malvern, Hawthorn, Armadale and Elsternwick."
      localAngle={{
        title: "Melbourne's most significant roofs.",
        copy: "The inner-east carries the highest concentration of architecturally significant slate roofs in the state. They are also the least forgiving of a bad repair.",
        items: [
            "Heritage slate on Toorak, Kew and Camberwell period homes",
            "Architect-specified slate on prestige new builds and major renovations",
            "Restoration that preserves the character and the value of the property",
            "Coordination with builders and architects on programmed projects",
            "Documentation for heritage advisors, councils and insurers",
        ],
      }}
      localProof="Working across Toorak, South Yarra, Armadale, Malvern, Hawthorn, Kew, Camberwell and Elsternwick."
    />
  );
}
