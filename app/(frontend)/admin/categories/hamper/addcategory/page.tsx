"use client";

import { FieldValues } from "react-hook-form";
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";
import { useCreateHamperCategory } from "../hooks/useCreateHamperCategory";

export default function AddHamperCategoryPage() {
  const { mutate, isPending } = useCreateHamperCategory();

  const fields: FieldConfig[] = [
    {
      name: "name",
      label: "Hamper Category Name",
      type: "text",
      placeholder: "Enter hamper category name",
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
        title="Add Hamper Category"
        desc="Create a new hamper category"
      />

      <DynamicShadcnForm
        fields={fields}
        defaultvalues={{
          name: "",
          image: [],
        }}
        cardTitle="Hamper Category Details"
        cardDescription="Create a new hamper category"
        submitLabel={isPending ? "Creating..." : "Create Hamper Category"}
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