"use client";
import { FieldValues } from "react-hook-form";
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { useCreateCategory } from "../hooks/useCreateCategory";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";

export default function AddCategoryPage() {
  const { mutate, isPending } = useCreateCategory();

  const fields: FieldConfig[] = [
    {
      name: "name",
      label: "Category Name",
      type: "text",
      placeholder: "Enter category name",
    },
    {
      name: "image",
      label: "Image",
      type: "file",
      className: "w-[200] relative h-32 rounded", // image preview classes
      dragdrop: "border-4 border-blue-500 p-12 rounded-xl", // drag area classes
    },
  ];

  return (
    <div className="space-y-6 m-6">
      <h1 className="text-2xl font-bold">Add Category</h1>

      <DynamicShadcnForm
        fields={fields}
        defaultvalues={{ name: "",images:[]}}
        cardTitle="Category Details"
        cardDescription="Create a new category"
        submitLabel={isPending ? "Creating..." : "Create Category"}
        reset="Reset"
        onSubmit={(data: FieldValues) => mutate(data)}
      />
    </div>
  );
}
