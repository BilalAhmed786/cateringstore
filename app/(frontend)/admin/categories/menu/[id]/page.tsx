"use client";
import { useParams } from "next/navigation";
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import { useCategory } from "../hooks/usegetcategory";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { FullScreenLoader } from "@/app/(frontend)/components/reusables/loader/loader";
import { useUpdateCategoryImage } from "../hooks/useUpdateCategoryImage";
import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";

export default function UpdateCategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const { data: category, isLoading } = useCategory(categoryId);
  const { mutate, isPending } = useUpdateCategory();
  const { mutate:updateImage } = useUpdateCategoryImage();
  
  if (isLoading) return <FullScreenLoader />;

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
      type: "imagepreview",
      image: category?.image,
    },

    {
      name: "newImage",
      label: "Replace Image",
      type: "file",
      required: false,
      className:"relative",
      onUpload: (files) => {

        console.log(files)
        const file = files?.[0];

        updateImage({
          id: categoryId,
          image: file,
        });
      },
    },
  ];
  return (
    <div className="space-y-6 m-6">
      <Metadata
        title="Update Category"
        desc="update menu-item category"
        classname="ml-3"
      />

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
