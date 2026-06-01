"use client";

import Link from "next/link";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import EventBrowser from "./(component)/eventbrowser";


export default function EventsPage() {
  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>

        <Link href="/admin/events/addevent">
          <UniButton label="Add Event" />
        </Link>
      </div>

      <EventBrowser showFilters selectable />
    </section>
  );
}