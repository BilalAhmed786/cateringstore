'use client';
import Link from "next/link";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import PackageBrowser from "./(component)/packagebrowser";


export default function PackagesPage() {
  return (
    <section className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Packages</h1>

        <Link href="/admin/packages/addpackage">
          <UniButton label="Add Package" />
        </Link>
      </div>

      {/* Packages Grid */}
      <PackageBrowser showFilters selectable={true} />
    </section>
  );
}
