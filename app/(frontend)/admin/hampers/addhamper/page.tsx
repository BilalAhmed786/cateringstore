"use client";

import { useState } from "react";
import { FieldValues, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/(frontend)/components/ui/tabs";
import { FieldGroup } from "@/app/(frontend)/components/ui/field";
import { FormField } from "@/app/(frontend)/components/reusables/fields/fieldscase";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";

import { generateSchema } from "@/app/(frontend)/components/reusables/validation/valdiation";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { GridSelectableItem } from "../../reusable/types/type";
import MenuItemBrowser from "../../menu-items/(components)/menuitemsbrowser";
import { EntityCart } from "../../../components/reusables/cart/entitycart";
import { useCreateHamper } from "../hooks/usecreatehampers";


/* -------------------- FORM FIELDS -------------------- */
const initialFields: FieldConfig[] = [
  { name: "name", label: "Hamper Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "discount", label: "Discount", type: "number" },
    {
    name: "image",
    label: "Image",
    type: "file",
    className: "w-[200] relative h-32 rounded", // image preview classes
    dragdrop: "border-4 border-blue-500 p-12 rounded-xl", // drag area classes
    
  },
];

export default function CreateHamperPage() {
  const [activeTab, setActiveTab] = useState("details");
  const [selectedItems, setSelectedItems] = useState<(GridSelectableItem & { quantity: number })[]>([]);
  const { mutate: createHamper, isPending } = useCreateHamper();

  // ---------------- Populate event dropdown dynamically ----------------
  const fields = initialFields.map((field) => field
  );

  // ---------------- Generate schema dynamically ----------------
  const schema = generateSchema(fields);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      eventId: "",
      discount: 0,
    },
  });

  const { handleSubmit } = form;

  // -------------------- MENU ITEM SELECT --------------------
  const handleSelectItem = (item: GridSelectableItem) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // -------------------- SUBMIT --------------------
  const onSubmit = (data: FieldValues) => {
    if (!selectedItems.length) {
      toast.error("Please select at least one menu item.");
      setActiveTab("items");
      return;
    }

    createHamper({
      ...data,
      items: selectedItems.map((i) => ({ menuItemId: i.id, quantity: i.quantity })),
    });
  };

  const onError = () => {
    toast.error("Please fill all required fields.");
    setActiveTab("details");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Add Hamper</h1>

      <FormProvider {...form}>
        <form className="w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)}>
            {/* ---------------- Tabs ---------------- */}
            <TabsList>
              <TabsTrigger value="details">Hamper Details</TabsTrigger>
              <TabsTrigger value="items">Menu Items</TabsTrigger>
            </TabsList>

            {/* ---------------- Details Tab ---------------- */}
            <TabsContent value="details">
              <FieldGroup>
                {fields.map((field) => (
                  <FormField key={field.name} field={field} />
                ))}
              </FieldGroup>
            </TabsContent>

            {/* ---------------- Items Tab ---------------- */}
            <TabsContent value="items">
              <div className={`grid gap-6 ${selectedItems.length ? "lg:grid-cols-3" : "lg:grid-cols-1"}`}>
                <div className={selectedItems.length ? "lg:col-span-2" : "lg:col-span-1"}>
                  <MenuItemBrowser
                    selectable={false}
                    showFilters
                    onSelectItem={handleSelectItem}
                  />
                </div>

                {selectedItems.length > 0 && (
                  <div className="lg:col-span-1">
                    <EntityCart
                      title="Hamper Items"
                      items={selectedItems}
                      onChange={setSelectedItems}
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 float-right">
                <UniButton
                  type="button"
                  loading={isPending}
                  label="Create Hamper"
                  onClick={handleSubmit(onSubmit, onError)}
                />
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </FormProvider>
    </div>
  );
}