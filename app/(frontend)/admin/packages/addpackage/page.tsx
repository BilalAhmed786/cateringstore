"use client";

import { useState } from "react";
import { FieldValues, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/(frontend)/components/ui/tabs";

import { generateSchema } from "../../../components/reusables/validation/valdiation";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { CartItem } from "../../reusable/types/type";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { useCreatePackage } from "../hooks/usecreatepackage";
import MenuItemBrowser from "../../menu-items/(components)/menuitemsbrowser";
import { EntityCart } from "../../reusable/cart/entitycart";
import { FieldGroup } from "@/app/(frontend)/components/ui/field";
import { FormField } from "@/app/(frontend)/components/reusables/fields/fieldscase";

/* -------------------- FORM FIELDS -------------------- */
const fields: FieldConfig[] = [
  { name: "name", label: "Package Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "discount", label: "Discount", type: "number" },
];

const schema = generateSchema(fields);

/* -------------------- COMPONENT -------------------- */
export default function CreatePackagePage() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      discount: 0,
    },
  });

  const [selectedItems, setSelectedItems] = useState< CartItem[]>([]);
  const [activeTab, setActiveTab] = useState("details");

  const { mutate: createPackage, isPending } = useCreatePackage();

  /* -------------------- MENU ITEM SELECT -------------------- */
  const handleSelectItem = (item: CartItem) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  /* -------------------- SUBMIT -------------------- */
  const onSubmit = (data: FieldValues) => {
    if (!selectedItems.length) {
      toast.error("Please select at least one menu item.");
      setActiveTab("items");
      return;
    }

    createPackage({
      name: data.name,
      description: data.description,
      discount: Number(data.discount ?? 0),
      items: selectedItems.map((i) => ({
        menuItemId: i.id,
        quantity: i.quantity,
      })),
    });
  };

  const onError = () => {
    toast.error("Please fill all required fields.");
    setActiveTab("details");
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-6">
      <h1 className="text-2xl font-bold">Add Packages</h1>

      <FormProvider {...form}>
        <form className="w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="details">Package Details</TabsTrigger>
              <TabsTrigger value="items">Menu Items</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <FieldGroup>
                {fields.map((field) => (
                  <FormField key={field.name} field={field} />
                ))}
              </FieldGroup>
            </TabsContent>

            <TabsContent value="items">
              <div
                className={`grid gap-6 ${selectedItems.length ? "lg:grid-cols-3" : ""}`}
              >
                <div className={selectedItems.length ? "lg:col-span-2" : ""}>
                  <MenuItemBrowser
                    selectable={false}
                    showFilters
                    onSelectItem={handleSelectItem}
                  />
                </div>

                {selectedItems.length > 0 && (
                  <EntityCart
                    title="Package Items"
                    items={selectedItems}
                    onChange={setSelectedItems}
                  />
                )}
              </div>

              <div className="pt-4 float-right">
                <UniButton
                  type="button"
                  loading={isPending}
                  label="Create Package"
                  onClick={form.handleSubmit(onSubmit, onError)}
                />
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </FormProvider>
    </div>
  );
}
