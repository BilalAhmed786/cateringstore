"use client";
import Link from "next/link";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import MenuItemBrowser from "./(components)/menuitemsbrowser";
import Metadata from "../../components/reusables/metadata/metadata";

export default function MenuItemsPage() {
  return (
    <section className="p-6 space-y-6">
      <Metadata
        title="Menu items"
        desc="Manage your menu items, update pricing and categories, and keep your catering menu organized."
        classname="flex max-w-xl"
      />

      {/* Header */}
      <div className="flex justify-between items-center">
        <Link href="/admin/menu-items/addmenu">
          <UniButton label="Add Menu" />
        </Link>
      </div>

      {/* Menu Items Grid */}
      <MenuItemBrowser showFilters selectable />
    </section>
  );
}
