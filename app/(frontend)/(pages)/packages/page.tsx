import { createMetadata } from "../../lib/seo/seo";
import { PackageBrowser } from "./components/PackageBrowser";

export const metadata = createMetadata(
  "Event Packages | Catering Store",
  "Explore our customizable catering packages tailored for weddings, corporate events, parties, and special occasions."
);

export default function PackagesPage() {
  return <PackageBrowser />;
}