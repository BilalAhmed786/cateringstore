import ContactHero from "./components/contact-hero";
import ContactInquiry from "./components/contact-inquiry";
import ContactMethods from "./components/contact-methods";
import ContactCTA from "./contact-cta";
import ContactHelp from "./contact-help";


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