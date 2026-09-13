"use client";

import Link from "next/link";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import EventBrowser from "./(component)/eventbrowser";
import Metadata from "../../components/reusables/metadata/metadata";

export default function EventsPage() {
  return (
    <section className="p-6 space-y-6">
      <Metadata
        title="Events"
        desc="Manage event offerings, update event details, and organize catering options for different occasions."
        classname="flex max-w-xl"
      />
      <div className="flex justify-between items-center">
        <Link href="/admin/events/addevent">
          <UniButton label="Add Event" />
        </Link>
      </div>

      <EventBrowser showFilters selectable />
    </section>
  );
}
