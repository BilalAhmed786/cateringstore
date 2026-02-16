'use client'
import Link from "next/link";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import MenuItemBrowser from "./(components)/menuitemsbrowser";

export default function MenuItemsPage() {
  return (
    <section className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Menu Items</h1>
        <Link href="/admin/menu-items/addmenu">
          <UniButton label="Add Menu" />
        </Link>
      </div>

      {/* Menu Items Grid */}
      <MenuItemBrowser showFilters selectable />
    </section>
  );
}
