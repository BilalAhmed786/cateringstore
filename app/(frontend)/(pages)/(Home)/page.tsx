import { createMetadata } from "../../lib/seo/seo";
import { ShoppingCart } from "../../components/reusables/shopping-cart/ShoppingCart";
import CTASection from "./components/CTASection";
import EventsSection from "./components/EventsSection";
import FeaturedHampers from "./components/FeaturedHampers";
import FeaturedMenu from "./components/FeaturedMenu";
import FeaturedPackages from "./components/FeaturedPackages";
import HeroSection from "./components/HeroSection";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";


export const metadata = createMetadata(
  "Home | Premium Catering & Gourmet Hampers",
  "Explore our event catering packages, custom food menus, and exclusive gift hampers."
);


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
      <ShoppingCart/>
    </main>
  );
}