"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { FieldValues, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/(frontend)/components/ui/tabs";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { FieldGroup } from "@/app/(frontend)/components/ui/field";
import { FormField } from "@/app/(frontend)/components/reusables/fields/fieldscase";

import MenuItemBrowser from "../../menu-items/(components)/menuitemsbrowser";
import PackageBrowser from "../../packages/(component)/packagebrowser";
import { EntityCart } from "../../../components/reusables/cart/entitycart";

import { generateSchema } from "../../../components/reusables/validation/valdiation";
import { CartItem, FieldConfig } from "@/app/(frontend)/components/reusables/types/types";

import { useGetSingleEvent } from "../hooks/usegetsingleevent";
import { useUpdateEvent } from "../hooks/useupdateevent";

import { useEventCategories } from "../../categories/event/hooks/useEventCategories";


import { useUploadEventImage } from "../hooks/useuploadeventimage";
import { GridItem } from "../../../components/reusables/grid/gridtypes";

/* ---------------- COMPONENT ---------------- */

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();

  const { data: singleEvent, isPending } = useGetSingleEvent(id);
  const { data: categories } = useEventCategories({ page: 1, limit: 100 });
  const { mutate: updateEvent, isPending: isUpdating } = useUpdateEvent();
  const { mutate: updateImage } = useUploadEventImage();
  const isReady = singleEvent && categories?.categories?.length !== 0;
  const [selectedMenuItems, setSelectedMenuItems] = useState<CartItem[]>([]);
  const [selectedPackages, setSelectedPackages] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState("details");
  const initializedRef = useRef(false);

  /* ---------------- FIELDS ---------------- */

  const fields: FieldConfig[] = [
    { name: "name", label: "Event Name", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },

    {
      name: "categoryId",
      label: "Category",
      type: "select",
      options: categories?.categories?.map((c) => ({
        label: c.name,
        value: c.id,
      })),
    },

    {
      type: "imagepreview",
      name: "images",
      label: "Existing Image",
      image: singleEvent?.image,
    },

    {
      type: "file",
      name: "image",
      label: "Upload Image",
      accept: "image/*",
      required: false,

      onUpload: (files) => {
        const file = files?.[0];
        if (!file) return;

        updateImage({
          eventId: id,
          image: file,
        });
      },
    },
  ];

  const schema = generateSchema(fields);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
    },
  });

  const { handleSubmit, reset } = form;

  /* ---------------- RESET FORM ---------------- */

  useEffect(() => {
    if (!isReady) return;

    reset({
      name: singleEvent.name ?? "",
      description: singleEvent.description ?? "",
      categoryId: singleEvent.categoryId ?? "",
    });
  }, [isReady, singleEvent, reset]);

  /* ---------------- INIT ITEMS ---------------- */

  const apiMenuItems = useMemo(() => {
    if (!singleEvent?.menuItems) return [];

    return singleEvent.menuItems.map((i) => ({
      id: i.menuItem.id,
      title: i.menuItem.title,
      price: i.menuItem.price,
      images: i.menuItem.images,
      quantity: i.quantity,
    }));
  }, [singleEvent]);

  const apiPackages = useMemo(() => {
    if (!singleEvent?.packages) return [];
    return singleEvent.packages.map((p) => ({
      id: p.package.id,
      title: p.package.name,
      price: p.package.finalPrice,
      image: p.package.image,
      quantity: p.quantity,
    }));
  }, [singleEvent])

  useEffect(() => {
    if (initializedRef.current) return;
    if (apiMenuItems.length || apiPackages.length) {
      setTimeout(() => {
        setSelectedMenuItems(apiMenuItems);
        setSelectedPackages(apiPackages);
        initializedRef.current = true;
      }, 0);
    }
  }, [apiMenuItems, apiPackages]);

  /* ---------------- SELECT ITEMS ---------------- */

  const handleSelectMenuItem = (item: GridItem) => {
    setSelectedMenuItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);

      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleSelectPackage = (item: GridItem) => {
    setSelectedPackages((prev) => {
      const exists = prev.find((i) => i.id === item.id);

      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  /* ---------------- SUBMIT ---------------- */

  const onSubmit = (formData: FieldValues) => {
    if (!selectedMenuItems.length && !selectedPackages.length) {
      toast.error("Select at least one item");
      setActiveTab("items");
      return;
    }

    updateEvent({
      id,
      name: formData.name,
      description: formData.description,
      categoryId: formData.categoryId,
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
    toast.error("Please fill required fields");
    setActiveTab("details");
  };

  /* ---------------- LOADING ---------------- */

  if (isPending || !categories) {
    return <div className="p-6">Loading...</div>;
  }

  // const _hasCart =
  //   selectedMenuItems.length > 0 || selectedPackages.length > 0;

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold">Edit Event</h1>

      <FormProvider {...form}>
        <form className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="menu-items">Menu Items</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
            </TabsList>

            {/* DETAILS */}
            <TabsContent value="details">
              <FieldGroup>
                {fields.map((field) => (
                  <FormField key={field.name} field={field} />
                ))}
              </FieldGroup>
            </TabsContent>

            {/* MENU ITEMS */}
            <TabsContent value="menu-items">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <MenuItemBrowser
                    selectable={false}
                    showFilters
                    onSelectItem={handleSelectMenuItem}
                  />
                </div>

                {selectedMenuItems.length > 0 && (
                  <EntityCart
                    title="Event Menu Items"
                    items={selectedMenuItems}
                    onChange={setSelectedMenuItems}
                  />
                )}
              </div>
            </TabsContent>

            {/* PACKAGES */}
            <TabsContent value="packages">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <PackageBrowser
                    selectable={false}
                    onSelectItem={handleSelectPackage}
                  />
                </div>

                {selectedPackages.length > 0 && (
                  <EntityCart
                    title="Event Packages"
                    items={selectedPackages}
                    onChange={setSelectedPackages}
                  />
                )}
              </div>

              <div className="flex justify-end pt-4">
                <UniButton
                  type="button"
                  label="Update Event"
                  loading={isUpdating}
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
