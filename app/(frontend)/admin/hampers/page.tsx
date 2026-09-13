"use client";

import Link from "next/link";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import HamperBrowser from "./(components)/hamperbrowser";
import Metadata from "../../components/reusables/metadata/metadata";


export default function HampersPage() {
  return (
    <section className="p-6 space-y-6">
      <Metadata
        title="Gift Hampers"
        desc="Manage gift hampers, update their details and pricing, and keep your hamper collection organized."
        classname="flex max-w-xl"
      />
      <div className="flex justify-between items-center">
          <Link href="/admin/hampers/addhamper">
          <UniButton label="Add Hamper" />
        </Link>
      </div>

      <HamperBrowser showFilters selectable />
    </section>
  );
}