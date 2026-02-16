import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { Category, images } from "../types/types";
export const getEditMenuItemFields = (
  categories: Category[],
  existingImages: images[],
  onDeleteImage: (id: string) => void,
  onUploadImage: (files: File[]) => void,
): FieldConfig[] => [
  {
    type: "text",
    name: "title",
    label: "Title",
    placeholder: "Menu item title",
  },
  {
    type: "textarea",
    name: "description",
    label: "Description",
    placeholder: "Menu item description",
  },
  {
    type: "number",
    name: "price",
    label: "Price",
    placeholder: "Price in USD",
  },
  {
    type: "select",
    name: "categoryId",
    label: "Category",
    options: categories.map((c) => ({ label: c.name, value: c.id })),
  },
  {
    type: "imagepreview",
    name: "images",
    label: "Existing Images",
    images: existingImages,
    onDelete: onDeleteImage,
  },
  {
    type: "file",
    name: "image",
    label: "Upload New Images",
    multiple: true,
    required:false,
    accept: "image/*",
    onUpload: onUploadImage,
    className: "w-[200] relative h-32 rounded",
    dragdrop: "border-4 border-blue-500 p-12 rounded-xl",
  },
];
