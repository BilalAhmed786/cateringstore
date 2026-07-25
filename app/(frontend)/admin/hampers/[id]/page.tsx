"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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
import { CartItem, FieldConfig, GridSelectableItem } from "@/app/(frontend)/components/reusables/types/types";
import { useUpdateHamper } from "../hooks/useupdatehamper";
import { FieldGroup } from "@/app/(frontend)/components/ui/field";
import { FormField } from "@/app/(frontend)/components/reusables/fields/fieldscase";
import { useGetSingleHamperDetails } from "../hooks/usegetsinglehamper";
import { useHamperCategories } from "../../categories/hamper/hooks/useHamperCategories";
import { useUploadHamperImage } from "../hooks/useuploadhamperimage";
/* ---------------- COMPONENT ---------------- */

export default function EditHamperPage() {
  const { id } = useParams<{ id: string }>();
  const {data:singleHamper,isPending} = useGetSingleHamperDetails(id)
  const {data:categories} = useHamperCategories({page:1,limit:100})
  const {mutate:updateImage}  =useUploadHamperImage()
  const isReady = singleHamper && categories?.categories?.length !== 0;
  const { mutate: updateHamper, isPending: isUpdating } = useUpdateHamper();
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]); 
  const [activeTab, setActiveTab] = useState("details");
  const initializedRef = useRef(false);

 /* ---------------- FORM CONFIG ---------------- */

const fields: FieldConfig[] = [
  { name: "name", label: "Hamper Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "discount", label: "Discount", type: "number" },
  {
    type: "select",
    name: "categoryId",
    label: "Category",
    options: categories?.categories?.map((c) => ({ label: c.name, value: c.id })),
  },
  {
    type: "imagepreview",
    name: "images",
    label: "Existing Images",
    image: singleHamper?.image,
  },
  {
    type: "file",
    name: "image",
    label: "Upload New Images",
    multiple: true,
    required:false,
    accept: "image/*",
    onUpload: (files) => {
        const file = files?.[0];
        updateImage({
          hamperId: id,
          image: file,
        });
      },
    className: "w-[200] relative h-32 rounded",
    dragdrop: "border-4 border-blue-500 p-12 rounded-xl",
  },
];

const schema = generateSchema(fields);
const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
    name: "",
    description: "",
    discount: 0,
    categoryId: "",
  },
  });

  useEffect(() => {
    if (!isReady) return;

    form.reset({
    name: singleHamper.name ?? "",
    description: singleHamper.description ?? "",
    discount: singleHamper.discountValue ?? 0,
    categoryId:singleHamper.categoryId??"",
  });
  }, [isReady,form,singleHamper]);

   

  /* ---------------- API ITEMS ---------------- */

  const apiItems = useMemo<CartItem[]>(() => {
    if (!singleHamper) return [];

    return singleHamper.items.map((i) => ({
      id: i.menuItem.id,
      title: i.menuItem.title,
      price: i.menuItem.price,
      images: i.menuItem.images,
      quantity: i.quantity,
    }));
  }, [singleHamper]);



  /* ---------------- INIT ITEMS ---------------- */

  useEffect(() => {
    if (!apiItems.length || initializedRef.current) return;

    setTimeout(() => {
      setSelectedItems(apiItems);
      initializedRef.current = true;
    }, 0);
  }, [apiItems]);



  /* ---------------- SELECT ITEM ---------------- */

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

  /* ---------------- SUBMIT ---------------- */

  const onSubmit = (formData: FieldValues) => {
    if (!selectedItems.length) {
      toast.error("Please select at least one menu item.");
      setActiveTab("items");
      return;
    }

    updateHamper({
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

  if (isPending || !categories) {
  return <div className="p-6">Loading...</div>;
}

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-6">
      <h1 className="text-2xl font-bold">Edit Hamper</h1>

      <FormProvider {...form}>
        <form className="w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="details">Hamper Details</TabsTrigger>
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
                  selectedItems.length ? "lg:grid-cols-3" : ""
                }`}
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
                    title="Hamper Items"
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
                  label="Update Hamper"
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