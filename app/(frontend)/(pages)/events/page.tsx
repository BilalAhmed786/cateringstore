import { createMetadata } from "../../lib/seo/seo";
import { EventBrowser } from "./components/EventBrowser";


export const metadata = createMetadata(
  "Catering Events | Catering Store",
  "Discover tailored catering solutions and packages for weddings, corporate gatherings, birthday parties, and custom events."
);

export default function EventsPage() {
  return <EventBrowser />;
}