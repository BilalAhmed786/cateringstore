"use client";
import { useParams } from "next/navigation";
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import { useCategory } from "../hooks/usegetcategory";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { FullScreenLoader } from "@/app/(frontend)/components/reusables/loader/loader";

export default function UpdateCategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const { data: category, isLoading } = useCategory(categoryId);
  const { mutate, isPending } = useUpdateCategory();

  if (isLoading) return <FullScreenLoader/>;

const fields:FieldConfig[]= [
  {
    name: "name",
    label: "Category Name",
    type: "text",
    placeholder: "Enter category name",
  },
];
  return (
    <div className="space-y-6 m-6">
      <h1 className="text-2xl font-bold">Update Category</h1>

      <DynamicShadcnForm
        fields={fields}
        defaultvalues={{ name: category?.name || "" }}
        reset="Reset"
        showreset={false}
        cardTitle="Category Details"
        cardDescription="Update category name"
        submitLabel={isPending ? "Updating..." : "Update Category"}
        onSubmit={(data) => mutate({ id: categoryId, name: data.name })}
      />
    </div>
  );
}
