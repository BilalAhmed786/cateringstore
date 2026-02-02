'use client'
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types"
import { Category } from "../types/menuitem"
export const getMenuItemFields = (categories: Category[]): FieldConfig[] => [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Menu item title",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Short description",
  },
  {
    name: "price",
    label: "Price",
    type: "number",
    placeholder: "0.00",
  },
  {
    name: "categoryId",
    label: "Category",
    type: "select",
    options: categories.map((c) => ({
      label: c.name,
      value: c.id,
    })),
  },
  {
    name: "image",
    label: "Image",
    type: "file",
    className:"w-[200] relative h-32 rounded" ,// image preview classes
    dragdrop:"border-4 border-blue-500 p-12 rounded-xl" // drag area classes
   },
]
