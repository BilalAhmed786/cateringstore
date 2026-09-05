import { MenuItemBrowser } from "./components/menu-item-browser";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Menu Items", // Automatically becomes "Menu Items | Catering Store"
  description: "Browse our complete selection of fresh menu items, appetizers, main courses, and catering options.",
};

export default function MenuItemsPage() {
  return <MenuItemBrowser />;
}