"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/(frontend)/components/ui/tabs";

import { DynamicFormFields } from "../../reusable/formfields/dynamicformfields";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import MenuItemBrowser from "../../menu-items/(components)/menuitemsbrowser";
import { EntityCart } from "../../reusable/cart/entitycart";

import { generateSchema } from "../../../components/reusables/validation/valdiation";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { GridSelectableItem } from "../../reusable/types/type";

import { useUpdatePackage } from "../hooks/useupdatepackage";
import { useGetPackageDetails } from "../hooks/usegetsinglepackage";

/* ---------------- FORM CONFIG ---------------- */
const fields: FieldConfig[] = [
  { name: "name", label: "Package Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "discount", label: "Discount", type: "number" },
];

const schema = generateSchema(fields);

/* ---------------- EDIT PAGE ---------------- */
export default function EditPackagePage() {
  const { id } = useParams<{ id: string }>();
  const { data, isPending } = useGetPackageDetails(id!);

  /* ---------------- FORM ---------------- */
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const { mutate: updatePackage, isPending: isUpdating } = useUpdatePackage();

  /* ---------------- DERIVED API ITEMS ---------------- */
  const apiItems = useMemo<(GridSelectableItem & { quantity: number })[]>(() => {
    if (!data) return [];
    return data.items.map((i) => ({
      id: i.menuItem.id,
      title: i.menuItem.title,
      price: i.menuItem.price,
      images: i.menuItem.images,
      quantity: i.quantity,
    }));
  }, [data]);

  /* ---------------- STATE ---------------- */
  const [selectedItems, setSelectedItems] = useState<(GridSelectableItem & { quantity: number })[]>([]);
  const [activeTab, setActiveTab] = useState("details");
  const initializedRef = useRef(false);
  /* ---------------- REF GUARD ---------------- */
 

  /* ---------------- PREFILL FORM ---------------- */
  useEffect(() => {
    if (!data) return;

    setValue("name", data.name);
    setValue("description", data.description);
    setValue("discount", data.discountValue);
  }, [data, setValue]);

  /* ---------------- SYNC ITEMS (ONCE) ---------------- */
  useEffect(() => {
    if (!apiItems.length || initializedRef.current) return;
     setTimeout(() => {
      setSelectedItems(apiItems);
      initializedRef.current = true;
    }, 0);

  }, [apiItems]);

  /* ---------------- HANDLE ITEM SELECT ---------------- */
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

      <form className="w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="details">Package Details</TabsTrigger>
            <TabsTrigger value="items">Menu Items</TabsTrigger>
          </TabsList>

          {/* DETAILS TAB */}
          <TabsContent value="details">
            <DynamicFormFields fields={fields} register={register} errors={errors} />
          </TabsContent>

          {/* ITEMS TAB */}
          <TabsContent value="items">
            <div className={`grid gap-6 ${selectedItems.length ? "lg:grid-cols-3" : "grid-cols-1"}`}>
              <div className={selectedItems.length ? "lg:col-span-2" : ""}>
                <MenuItemBrowser selectable={false} showFilters onSelectItem={handleSelectItem} />
              </div>

              {selectedItems.length > 0 && (
                <EntityCart title="Package Items" items={selectedItems} onChange={setSelectedItems} />
              )}
            </div>

            <div className="pt-4 flex justify-end">
              <UniButton
                type="button"
                loading={isUpdating}
                loadingLabel="Updating..."
                label="Update Package"
                onClick={handleSubmit(onSubmit, onError)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}