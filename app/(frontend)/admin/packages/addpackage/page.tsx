'use client';

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
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
import { GridSelectableItem } from "../../reusable/types/type";
import { DynamicFormFields } from "../../reusable/formfields/dynamicformfields";
import { MenuItemsBrowser } from "../../reusable/menuitem/menuitemsbrowser";
import { PackageCart } from "@/app/(frontend)/admin/packages/(components)/packagecart";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";

/* -------------------- FORM FIELDS -------------------- */
const fields: FieldConfig[] = [
  { name: "name", label: "Package Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "discount", label: "Discount", type: "number" },
];

const schema = generateSchema(fields);

/* -------------------- COMPONENT -------------------- */
export default function CreatePackagePage() {
  const form = useForm({ resolver: zodResolver(schema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [selectedItems, setSelectedItems] = useState<
    (GridSelectableItem & { quantity: number })[]
  >([]);
  const [activeTab, setActiveTab] = useState("details");
  const [submitting, setSubmitting] = useState(false);

  /* -------------------- MENU ITEM SELECT -------------------- */
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

  /* -------------------- SUBMIT -------------------- */
  const onSubmit = async (data:FieldValues) => {
    // Check if no items selected
    if (selectedItems.length === 0) {
      toast.error("Please select at least one menu item.");
      setActiveTab("items");
      return;
    }

    setSubmitting(true);

    const subtotal = selectedItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
    const discount = Number(data.discount ?? 0);
    const finalPrice = subtotal - (subtotal * discount) / 100;

    const payload = {
      ...data,
      price: finalPrice,
      items: selectedItems.map((i) => ({ menuItemId: i.id, quantity: i.quantity })),
    };

    console.log("PACKAGE PAYLOAD", payload);

    toast.success("Package created successfully!");
    setSubmitting(false);
  };

  const onError = (errors: FieldValues) => {
    console.log(errors)
    toast.error("Please fill all required fields.");
    setActiveTab("details");
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-6">
      <h1 className="text-2xl font-bold">Add Packages</h1>
      <form className="w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="details">Package Details</TabsTrigger>
            <TabsTrigger value="items">Menu Items</TabsTrigger>
          </TabsList>

          {/* ---------------- DETAILS TAB ---------------- */}
          <TabsContent value="details">
            <DynamicFormFields
              fields={fields}
              register={register}
              errors={errors}
            />
          </TabsContent>

          {/* ---------------- ITEMS TAB ---------------- */}
          <TabsContent value="items">
            <div
              className={`grid gap-6 transition-all duration-300 ${
                selectedItems.length > 0 ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              <div
                className={`${
                  selectedItems.length > 0 ? "lg:col-span-2" : "lg:col-span-3"
                }`}
              >
                <MenuItemsBrowser
                  selectable={false}
                  showFilters={true}
                  onSelectItem={handleSelectItem}
                />
              </div>

              {selectedItems.length > 0 && (
                <div className="lg:col-span-1">
                  <PackageCart
                    items={selectedItems}
                    onChange={setSelectedItems}
                  />
                </div>
              )}
            </div>

            {/* ---------------- SUBMIT BUTTON ONLY ON ITEMS TAB ---------------- */}
            <div className="pt-4 float-right">
              <UniButton
                type="button"
                loading={submitting}
                loadingLabel="Creating..."
                label="Create Package"
                onClick={handleSubmit(onSubmit, onError)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
