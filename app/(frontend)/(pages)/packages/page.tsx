import { PackageBrowser } from "./components/PackageBrowser";
import type { Metadata } from "next";
// 1. Export metadata on the server side
export const metadata: Metadata = {
  title: "Event Packages",
  description: "Explore our customizable catering packages tailored for weddings, corporate events, parties, and special occasions.",
  openGraph: {
    title: "Event Catering Packages | Catering Store",
    description: "Explore our customizable catering packages tailored for weddings, corporate events, and parties.",
  },
};

export default function PackagesPage() {
  return <PackageBrowser />;
}