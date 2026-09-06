import { createMetadata } from "../../lib/seo/seo";
import { MenuItemBrowser } from "./components/menu-item-browser";

export const metadata = createMetadata(
  "Menu Items | Catering Store",
  "Browse our complete selection of fresh menu items, appetizers, main courses, and catering options."
);

export default function MenuItemsPage() {
  return <MenuItemBrowser />;
}