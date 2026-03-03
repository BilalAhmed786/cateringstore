"use client";

import Link from "next/link";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import HamperBrowser from "./(components)/hamperbrowser";


export default function HampersPage() {
  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hampers</h1>

        <Link href="/admin/hampers/addhamper">
          <UniButton label="Add Hamper" />
        </Link>
      </div>

      <HamperBrowser showFilters selectable />
    </section>
  );
}