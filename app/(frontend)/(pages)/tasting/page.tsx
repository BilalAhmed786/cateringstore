import TastingForm from "@/app/(frontend)/components/tasting/TastingForm";
import type { Metadata } from "next";
// Your client component
export const metadata: Metadata = {
  title: "Book a Catering Tasting Session", // Renders as "Book a Catering Tasting Session | Catering Store"
  description: "Schedule a private catering menu tasting session for your upcoming wedding, corporate event, or special occasion.",
  openGraph: {
    title: "Book a Catering Tasting Session | Catering Store",
    description: "Try our menu items before booking your event. Schedule a private tasting session online.",
  },
  robots: {
    index: true, 
    follow: true,
  },
};

export default function TastingPage() {
  return (
    <main className="px-10 mt-30">
      <div className="container">
        <TastingForm />
      </div>
    </main>
  );
}