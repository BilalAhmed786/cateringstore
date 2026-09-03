  'use client'
  import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types"
  import { Category } from "../types/types"
  export const getMenuItemFields = (categories: Category[]): FieldConfig[] => [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Menu item title",
      className:"mt-5"
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Short description",
       className:"mt-5"
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "0.00",
       className:"mt-5"
    },
    {
      name: "categoryId",
      label: "Category",
      type: "select",
      options: categories.map((c) => ({
        label: c.name,
        value: c.id,
      })),
      className:"mt-5"
    },
    {
      name: "image",
      label: "Image",
      type: "file",
      className:"w-[200] relative h-32 rounded mt-5" ,// image preview classes
      dragdrop:"border-4 border-blue-500 p-12 rounded-xl", // drag area classes 
    },
  ]
