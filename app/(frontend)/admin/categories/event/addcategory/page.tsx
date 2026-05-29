"use client";

import { FieldValues } from "react-hook-form";
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";
import { useCreateEventCategory } from "../hooks/useCreateEventCategory";

export default function AddEventCategoryPage() {
  const { mutate, isPending } = useCreateEventCategory();

  const fields: FieldConfig[] = [
    {
      name: "name",
      label: "Event Category Name",
      type: "text",
      placeholder: "Enter Event category name",
      required: true,
    },
    {
      name: "image",
      label: "Image",
      type: "file",
      className: "relative h-32 w-[550px] rounded",
      dragdrop: "border-4 p-12 rounded-xl",
      required: false,
    },
  ];

  return (
    <div className="space-y-6 m-6">
      <Metadata
        title="Add Event Category"
        desc="Create a new Event category"
      />

      <DynamicShadcnForm
        fields={fields}
        defaultvalues={{
          name: "",
          image: [],
        }}
        cardTitle="Event Category Details"
        cardDescription="Create a new Event category"
        submitLabel={isPending ? "Creating..." : "Create Event Category"}
        reset="Reset"
        onSubmit={(data: FieldValues) => {
          const formData = new FormData();

          formData.append("name", data.name);

          if (data.image?.length) {
            formData.append("image", data.image[0]);
          }

          mutate(formData);
        }}
      />
    </div>
  );
}