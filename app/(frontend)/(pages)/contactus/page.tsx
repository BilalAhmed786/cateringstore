import { createMetadata } from "../../lib/seo/seo";
import ContactHero from "./components/contact-hero";
import ContactInquiry from "./components/contact-inquiry";
import ContactMethods from "./components/contact-methods";
import ContactCTA from "./contact-cta";
import ContactHelp from "./contact-help";


export const metadata = createMetadata(
  "Contact Us | Catering Store",
  "Get in touch with Catering Store for catering inquiries, custom bookings, menu quotes, and event catering services."
);

export default function ContactPage() {
  return (
    <main className="overflow-hidden">
      <ContactHero />

      <ContactMethods />

      <ContactInquiry />

      <ContactHelp />

      <ContactCTA />
    </main>
  );
}