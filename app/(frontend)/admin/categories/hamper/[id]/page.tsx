"use client";

import { useParams } from "next/navigation";
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { FullScreenLoader } from "@/app/(frontend)/components/reusables/loader/loader";
import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";
import { useHamperCategory } from "../hooks/useHamperCategory";
import { useUpdateHamperCategoryImage } from "../hooks/useUpdateHamperCategoryImage";
import { useUpdateHamperCategory } from "../hooks/useUpdateHamperCategory";


export default function UpdateHamperCategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const { data: category, isLoading } = useHamperCategory(categoryId);
  const { mutate, isPending } = useUpdateHamperCategory();
  const { mutate: updateImage } = useUpdateHamperCategoryImage();

  if (isLoading) return <FullScreenLoader />;

  const fields: FieldConfig[] = [
    {
      name: "name",
      label: "Hamper Category Name",
      type: "text",
      placeholder: "Enter hamper category name",
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
      className: "relative",
      onUpload: (files) => {
        const file = files?.[0];
        if (!file) return;

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
        title="Update Hamper Category"
        desc="Update hamper category details"
        classname="ml-3"
      />

      <DynamicShadcnForm
        fields={fields}
        defaultvalues={{ name: category?.name || "" }}
        reset="Reset"
        showreset={false}
        cardTitle="Hamper Category Details"
        cardDescription="Update hamper category name"
        submitLabel={isPending ? "Updating..." : "Update Category"}
        onSubmit={(data) =>
          mutate({
            id: categoryId,
            name: data.name,
          })
        }
      />
    </div>
  );
}