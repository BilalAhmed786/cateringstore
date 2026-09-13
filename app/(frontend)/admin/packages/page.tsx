"use client";
import Link from "next/link";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import PackageBrowser from "./(component)/packagebrowser";
import Metadata from "../../components/reusables/metadata/metadata";

export default function PackagesPage() {
  return (
    <section className="p-6 space-y-6">
      <Metadata
        title="Catering Packages"
        desc="Create and manage catering packages, including pricing, details, and available package options."
        classname="flex max-w-xl"
      />
      {/* Header */}
      <div className="flex justify-between items-center">
        <Link href="/admin/packages/addpackage">
          <UniButton label="Add Package" />
        </Link>
      </div>

      {/* Packages Grid */}
      <PackageBrowser showFilters selectable={true} />
    </section>
  );
}
