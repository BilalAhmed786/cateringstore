import CTASection from "./components/CTASection";
import EventsSection from "./components/EventsSection";
import FeaturedHampers from "./components/FeaturedHampers";
import FeaturedMenu from "./components/FeaturedMenu";
import FeaturedPackages from "./components/FeaturedPackages";
import HeroSection from "./components/HeroSection";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";


export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <WhyChooseUs />
      <FeaturedMenu />
      <FeaturedPackages />
      <FeaturedHampers />
      <EventsSection />
      <Testimonials />
      <CTASection />
    </main>
  );
}