import { HamperBrowser } from "./components/HamperBrowser";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gourmet Gift Hampers", // Renders as "Gourmet Gift Hampers | Catering Store"
  description: "Browse luxury food hampers, custom gift boxes, and seasonal packages crafted for special occasions and corporate gifting.",
  openGraph: {
    title: "Gourmet Gift Hampers & Gift Boxes | Catering Store",
    description: "Browse luxury food hampers and seasonal gift boxes crafted for special occasions.",
  },
};

export default function HampersPage() {
  return <HamperBrowser />;
}