import ContactHero from "./components/contact-hero";
import ContactInquiry from "./components/contact-inquiry";
import ContactMethods from "./components/contact-methods";
import ContactCTA from "./contact-cta";
import ContactHelp from "./contact-help";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with us for catering inquiries, custom booking, or menu quotes.',
};

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