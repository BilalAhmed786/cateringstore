'use client'
import Link from "next/link";
import { UniButton } from "../../components/reusables/button/button";
import { MenuItemsBrowser } from "../reusable/menuitem/menuitemsbrowser";

export default function MenuItemsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Menu Items</h1>
        <Link href="/admin/menu-items/addmenu">
          <UniButton label="Add Menu" />
        </Link>
      </div>

      <MenuItemsBrowser showFilters selectable />
    </div>
  );
}
