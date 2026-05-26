'use client'
import Link from "next/link";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import MenuItemBrowser from "./(components)/menuitemsbrowser";
import Metadata from "../../components/reusables/metadata/metadata";

export default function MenuItemsPage() {
  return (
    <section className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Metadata
          title="Menu items"
          desc="food items available"
        />

        <Link href="/admin/menu-items/addmenu">
          <UniButton label="Add Menu" />
        </Link>
      </div>

      {/* Menu Items Grid */}
      <MenuItemBrowser showFilters selectable />
    </section>
  );
}
