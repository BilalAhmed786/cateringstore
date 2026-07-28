"use client";

import { useParams } from "next/navigation";
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";

import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";
import { useEventCategory } from "../hooks/useEventCategory";
import { useUpdateEventCategoryImage } from "../hooks/useUpdateEventCategoryImage";
import { useUpdateEventCategory } from "../hooks/useUpdateEventCategory";
import { Loader } from "@/app/(frontend)/components/reusables/loader/loader";


export default function UpdateEventCategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const { data: category, isLoading } = useEventCategory(categoryId);
  const { mutate, isPending } = useUpdateEventCategory();
  const { mutate: updateImage } = useUpdateEventCategoryImage();

  if (isLoading) return <Loader variant="inline" />;

  const fields: FieldConfig[] = [
    {
      name: "name",
      label: "Event Category Name",
      type: "text",
      placeholder: "Enter Event category name",
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
        title="Update Event Category"
        desc="Update Event category details"
        classname="ml-3"
      />

      <DynamicShadcnForm
        fields={fields}
        defaultvalues={{ name: category?.name || "" }}
        reset="Reset"
        showreset={false}
        cardTitle="Event Category Details"
        cardDescription="Update event category name"
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