import { EventBrowser } from "./components/EventBrowser";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catering Events", // Renders as "Catering Events | Catering Store"
  description: "Discover tailored catering solutions and packages for weddings, corporate gatherings, birthday parties, and custom events.",
  openGraph: {
    title: "Catering Services for Every Event | Catering Store",
    description: "Discover tailored catering solutions and packages for weddings, corporate gatherings, and custom events.",
  },
};

export default function EventsPage() {
  return <EventBrowser />;
}