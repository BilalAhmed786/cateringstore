"use client";

import { useParams } from "next/navigation";
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { FullScreenLoader } from "@/app/(frontend)/components/reusables/loader/loader";
import { useEvent } from "../hooks/usegetsingleevent";
import { useUpdateEvent } from "../hooks/useupdateevent";





const fields: FieldConfig[] = [
  {
    name: "title",
    label: "Event Title",
    type: "text",
    placeholder: "Enter event title",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter event description",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Pending", value: "PENDING" },
      { label: "Confirmed", value: "CONFIRMED" },
      { label: "Cancelled", value: "CANCELLED" },
      { label: "Completed", value: "COMPLETED" },
    ],
  },
];

export default function UpdateEventPage() {
  const params = useParams();
  const eventId = params.id as string;

  const { data: event, isLoading } = useEvent(eventId);
  const { mutate, isPending } = useUpdateEvent();

  if (isLoading) return <FullScreenLoader />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-6">
      <div className="w-full space-y-6">
        <h1 className="text-2xl font-bold mb-4">Update Event</h1>

        <DynamicShadcnForm
          fields={fields}
          defaultvalues={{
            title: event?.title || "",
            description: event?.description || "",
            status: event?.status || "PENDING",
          }}
          reset="Reset"
          showreset={false}
          cardTitle="Event Details"
          cardDescription="Update event information"
          submitLabel={isPending ? "Updating..." : "Update Event"}
          className="bg-white shadow-lg p-6"
          onSubmit={(data) =>
            mutate({
              id: eventId,
              title: data.title,
              description: data.description,
              status: data.status,
            })
          }
        />
      </div>
    </div>
  );
}

