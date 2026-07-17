"use client";

import { useState, useEffect, useRef } from "react";
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
import MenuItemBrowser from "../../menu-items/(components)/menuitemsbrowser";
import { EntityCart } from "../../../components/reusables/cart/entitycart";

import { generateSchema } from "../../../components/reusables/validation/valdiation";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";

import { CartItem } from "../../reusable/types/type";

import { useUpdatePackage } from "../hooks/useupdatepackage";
import { useGetPackageDetails } from "../hooks/usegetsinglepackage";
import { useUploadPackageImage } from "../hooks/useuploadpackageimage";

import { FieldGroup } from "@/app/(frontend)/components/ui/field";
import { FormField } from "@/app/(frontend)/components/reusables/fields/fieldscase";
import { GridItem } from "../../../components/reusables/grid/gridtypes";

export default function EditPackagePage() {
  const { id } = useParams<{ id: string }>();

  const { data, isPending } = useGetPackageDetails(id!);
  const { mutate: updateImage } = useUploadPackageImage();
  const { mutate: updatePackage, isPending: isUpdating } = useUpdatePackage();

  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState("details");

  const initializedRef = useRef(false);

  /* ---------------- FORM FIELDS ---------------- */
  const fields: FieldConfig[] = [
    { name: "name", label: "Package Name", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "discount", label: "Discount", type: "number" },
    {
      name: "image",
      label: "Image",
      type: "imagepreview",
      image: data?.image,
    },
    {
      name: "newImage",
      label: "Replace Image",
      type: "file",
      required:false,
      className: "relative",
      onUpload: (files) => {
        const file = files[0]
        updateImage({
          packageId: data?.id as string,
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
      discount: 0,
      
    },
  });

  /* ---------------- FORM PREFILL ---------------- */
  useEffect(() => {
    if (!data) return;

    form.reset({
      name: data.name,
      description: data.description,
      discount: data.discountValue ?? 0,
    });
  }, [data, form]);

  /* ---------------- MENU ITEMS PREFILL ---------------- */
  useEffect(() => {
    if (!data) return;
    if (initializedRef.current) return;
  
     const items = data?.items;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedItems(
      items?.map((i) => ({
        id: i.menuItem.id,
        name: i.menuItem.title,
        price: i.menuItem.price,
        images: i.menuItem.images,
        quantity: i.quantity,
      })),
    );

    initializedRef.current = true;
  }, [data]);

  /* ---------------- SELECT ITEM ---------------- */
  const handleSelectItem = (item: GridItem) => {
    setSelectedItems((prev) => {
      const exists = prev?.find((i) => i.id === item.id);

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
    if (!selectedItems.length) {
      toast.error("Please select at least one menu item.");
      setActiveTab("items");
      return;
    }

    updatePackage({
      id: id!,
      payload: {
        name: formData.name,
        description: formData.description,
        discount: Number(formData.discount ?? 0),
        items: selectedItems.map((i) => ({
          menuItemId: i.id,
          quantity: i.quantity,
        })),
      },
    });
  };

  const onError = () => {
    toast.error("Please fill all required fields.");
    setActiveTab("details");
  };

  /* ---------------- UI ---------------- */
  if (isPending) return <div className="p-6">Loading package data...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-6">
      <h1 className="text-2xl font-bold">Edit Package</h1>

      <FormProvider {...form}>
        <form className="w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="details">Package Details</TabsTrigger>
              <TabsTrigger value="items">Menu Items</TabsTrigger>
            </TabsList>

            {/* DETAILS */}
            <TabsContent value="details">
              <FieldGroup>
                {fields.map((field) => (
                  <FormField key={field.name} field={field} />
                ))}
              </FieldGroup>
            </TabsContent>

            {/* ITEMS */}
            <TabsContent value="items">
              <div
                className={`grid gap-6 ${
                  selectedItems?.length ? "lg:grid-cols-3" : ""
                }`}
              >
                <div className={selectedItems?.length ? "lg:col-span-2" : ""}>
                  <MenuItemBrowser
                    selectable={false}
                    showFilters
                    onSelectItem={handleSelectItem}
                  />
                </div>

                {selectedItems?.length > 0 && (
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
                  loading={isUpdating}
                  loadingLabel="Updating..."
                  label="Update Package"
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
