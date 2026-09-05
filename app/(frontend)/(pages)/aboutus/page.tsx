import AboutCommitment from "./components/about-commitment";
import AboutCTA from "./components/about-cta";
import AboutHero from "./components/about-hero";
import AboutMission from "./components/about-mission";
import AboutProcess from "./components/about-process";
import AboutStory from "./components/about-story";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our culinary journey, commitment to quality catering, and client story.',
};

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