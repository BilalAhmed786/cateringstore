"use client";

import { FieldValues } from "react-hook-form";
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { useCreateEvent } from "../hooks/usecreateEvent";






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

export default function AddEventPage() {
  const { mutate, isPending } = useCreateEvent();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-6">
      <div className="w-full space-y-6">
        <h1 className="text-2xl font-bold mb-4">Add Event</h1>

        <DynamicShadcnForm
          fields={fields}
          defaultvalues={{
            title: "",
            description: "",
            status: "PENDING",
          }}
          cardTitle="Event Details"
          cardDescription="Create a new event"
          submitLabel={isPending ? "Creating..." : "Create Event"}
          reset="Reset"
          className="bg-white shadow-lg p-6"
          onSubmit={(data: FieldValues) =>
            mutate({
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

