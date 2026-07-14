"use client";

import { useState } from "react";
import { FormProvider, useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/(frontend)/components/ui/tabs";

import { FieldGroup } from "@/app/(frontend)/components/ui/field";
import { FormField } from "@/app/(frontend)/components/reusables/fields/fieldscase";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { generateSchema } from "@/app/(frontend)/components/reusables/validation/valdiation";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import MenuItemBrowser from "../../menu-items/(components)/menuitemsbrowser";
import PackageBrowser from "../../packages/(component)/packagebrowser";
import { EntityCart } from "../../../components/reusables/cart/entitycart";
import { useCreateEvent } from "../hooks/usecreateevent";
import { CartItem } from "../../reusable/types/type";
import { GridItem } from "../../reusable/grid/gridtypes";
import { useEventCategories } from "../../categories/event/hooks/useEventCategories";


export default function AddEventPage() {
  const [activeTab, setActiveTab] = useState("details");
  const [selectedMenuItems, setSelectedMenuItems] = useState<CartItem[]>([]);
  const [selectedPackages, setSelectedPackages] = useState<CartItem[]>([]);
  const { mutate: createEvent, isPending } = useCreateEvent();
  const {data} =  useEventCategories({page:1,limit:100})
  
  
  /* -------------------- EVENT FIELDS -------------------- */
const eventFields: FieldConfig[] = [
  { name: "name", label: "Event Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
    {
      name: "categoryId",
      label: "Category",
      type: "select",
      options: data?.categories.map((c) => ({
        label: c.name,
        value: c.id,
      })),
    
    },
    {
      name: "image",
      label: "Image",
      type: "file",
      className: "w-[200] relative h-32 rounded", // image preview classes
      dragdrop: "border-4 border-blue-500 p-12 rounded-xl",
      
    },
  
];
  
  
  
  const schema = generateSchema(eventFields);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { handleSubmit } = form;

  /* -------------------- MENU SELECT -------------------- */
  const handleSelectMenuItem = (item:GridItem) => {
    setSelectedMenuItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);

      if (exists) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  /* -------------------- PACKAGE SELECT -------------------- */
  const handleSelectPackage = (item: GridItem) => {
    setSelectedPackages((prev) => {
      const exists = prev.find((i) => i.id === item.id);

      if (exists) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  /* -------------------- SUBMIT -------------------- */
 const onSubmit = (data: FieldValues) => {
  if (!selectedMenuItems.length && !selectedPackages.length) {
    toast.error("Select at least one menu item or package");
    setActiveTab("menu-items");
    return;
  }

  createEvent({
    name: data.name,
    description: data.description,
    categoryId:data.categoryId,
    image:data.image,
    menuItems: selectedMenuItems.map((i) => ({
      menuItemId: i.id,
      quantity: i.quantity,
    })),
    packages: selectedPackages.map((p) => ({
      packageId: p.id,
      quantity: p.quantity,
    })),
  });
};

  const onError = () => {
    toast.error("Please fill all required fields");
    setActiveTab("details");
  };

  const hasCart = selectedMenuItems.length > 0 || selectedPackages.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Add Event</h1>

      <FormProvider {...form}>
        <form className="bg-white p-8 rounded-xl shadow-lg space-y-6">

          {/* ---------------- FLEX LAYOUT ---------------- */}
          <div className="flex gap-6">

            {/* ---------------- LEFT SIDE ---------------- */}
            <div
              className={`transition-all duration-300 ${
                hasCart ? "flex-3" : "flex-1"
              }`}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="details">Event Details</TabsTrigger>
                  <TabsTrigger value="menu-items">Menu Items</TabsTrigger>
                  <TabsTrigger value="packages">Packages</TabsTrigger>
                </TabsList>

                {/* DETAILS */}
                <TabsContent value="details">
                  <FieldGroup>
                    {eventFields.map((field) => (
                      <FormField key={field.name} field={field} />
                    ))}
                  </FieldGroup>
                </TabsContent>

                {/* MENU ITEMS */}
                <TabsContent value="menu-items">
                  <MenuItemBrowser
                    selectable={false}
                    showFilters
                    onSelectItem={handleSelectMenuItem}
                  />
                </TabsContent>

                {/* PACKAGES */}
                <TabsContent value="packages">
                  <PackageBrowser
                    selectable ={false}
                    onSelectItem={handleSelectPackage}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* ---------------- RIGHT CART ---------------- */}
            {hasCart && (
              <div className="w-full max-w-sm flex flex-col gap-4">
                
                {selectedMenuItems.length > 0 && (
                  <EntityCart
                    title="Selected Menu Items"
                    items={selectedMenuItems}
                    onChange={setSelectedMenuItems}
                  />
                )}

                {selectedPackages.length > 0 && (
                  <EntityCart
                    title="Selected Packages"
                    items={selectedPackages}
                    onChange={setSelectedPackages}
                  />
                )}

              </div>
            )}

          </div>

          {/* ---------------- SUBMIT ---------------- */}
          <div className="flex justify-end pt-4">
            <UniButton
              type="button"
              label="Create Event"
              loading={isPending}
              onClick={handleSubmit(onSubmit, onError)}
            />
          </div>

        </form>
      </FormProvider>
    </div>
  );
}