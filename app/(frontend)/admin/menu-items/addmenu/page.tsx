"use client"
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform"
import { useAllCategories } from "../hooks/usegetallcategories"
import { getMenuItemFields } from "./fields"
import { useCreateMenuItemWithImages } from "../hooks/usecreatemenuitems"
import { FieldValues } from "react-hook-form"
import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata"

export default function AddMenuItemPage() {
  const { data: categories = [] } = useAllCategories()
  const { mutate, isPending } = useCreateMenuItemWithImages()

  const fields = getMenuItemFields(categories)

  return (
    <div className="space-y-6 m-6">
      <Metadata
       title="Add Menu items"
       desc="Add food item"
      />

      <DynamicShadcnForm
        fields={fields}
         defaultvalues={{
          title: "",
          description: "",
          price: "",
          categoryId: "",
          status: "true",
          images: [],
          
        }}
        cardTitle="Menu Item Details"
        cardDescription="Create a new menu item"
        submitLabel={isPending ? "Saving..." : "Create Item"}
        reset="Reset"
        onSubmit={(data:FieldValues) => mutate(data)}
      />
    </div>
  )
}
