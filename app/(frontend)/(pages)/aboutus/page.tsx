import { createMetadata } from "../../lib/seo/seo";
import AboutCommitment from "./components/about-commitment";
import AboutCTA from "./components/about-cta";
import AboutHero from "./components/about-hero";
import AboutMission from "./components/about-mission";
import AboutProcess from "./components/about-process";
import AboutStory from "./components/about-story";


export const metadata = createMetadata(
  "About Us | Catering Store",
  "Learn about Catering Store, our culinary journey, commitment to quality, and dedication to creating memorable catering experiences."
);

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      <AboutHero />

      <AboutStory />

      <AboutMission />

      <AboutProcess />

      <AboutCommitment />

      <AboutCTA />
    </main>
  );
}