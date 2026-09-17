import { metadataFor } from "@/lib/metadata";
import { LocationPage } from "@/components/sections/LocationPage";

export const metadata = metadataFor("loc-melbourne");

/*
 * Client feedback WRv2 (Sept '26): "Remove mention to inner-east. We don't
 * want to limit our reach and are happy to service all of Vic and even
 * interstate for supply of slate. Happy to optimise for the suburbs shown
 * though."
 *
 * Every "inner-east" is gone from this page. The named suburbs stay; they
 * are the local-SEO payload the client asked to keep. `localProof` now says
 * plainly that the reach goes beyond them.
 */
export default function Page() {
  return (
    <LocationPage
      pageKey="loc-melbourne"
      image="/photography/hero-melbourne.jpg"
      localImage="/content/local-melbourne.jpg"
      intro="Premium slate and tile roofing across Melbourne — including Toorak, Kew, Camberwell, Malvern, Hawthorn, Armadale and Elsternwick."
      localAngle={{
        title: "Melbourne's most significant roofs.",
        copy: "Melbourne's established suburbs carry the highest concentration of architecturally significant slate roofs in the state. They are also the least forgiving of a bad repair.",
        items: [
            "Slate on architect-led new builds across Melbourne",
            "Heritage slate on Toorak, Kew and Camberwell period homes",
            "Architect-specified slate on prestige new builds and major renovations",
            "Restoration that preserves the character and the value of the property",
            "Coordination with builders and architects on programmed projects",
            "Documentation for heritage advisors, councils and insurers",
        ],
      }}
      localProof="Working across Toorak, South Yarra, Armadale, Malvern, Hawthorn, Kew, Camberwell and Elsternwick — and throughout Victoria, with natural slate supplied interstate."
    />
  );
}
