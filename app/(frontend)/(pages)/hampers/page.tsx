import { createMetadata } from "../../lib/seo/seo";
import { HamperBrowser } from "./components/HamperBrowser";


export const metadata = createMetadata(
  "Gourmet Gift Hampers | Catering Store",
  "Browse luxury food hampers, custom gift boxes, and seasonal packages crafted for special occasions and corporate gifting."
);

export default function HampersPage() {
  return <HamperBrowser />;
}