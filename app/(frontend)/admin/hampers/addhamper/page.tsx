"use client";

import { useState } from "react";
import { FormProvider, useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/(frontend)/components/ui/tabs";


import { FormField } from "@/app/(frontend)/components/reusables/fields/fieldscase";
import { hamperFields } from "./fields";

// fake hooks – replace with real ones
import { useGetEvents } from "@/hooks/useGetEvents";

import { HamperItemsSelector } from "./HamperItemsSelector";
import { useCreateHamper } from "../hooks/usecreatehampers";

export default function CreateHamperPage() {
  const [activeTab, setActiveTab] = useState<"details" | "items">("details");
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const { data: events = [] } = useGetEvents();
  const { mutate: createHamper, isPending } = useCreateHamper();

  const form = useForm({
    resolver: zodResolver(hamperSchema),
    defaultValues: {
      name: "",
      description: "",
      eventId: "",
      discount: 0,
    },
  });

  const { handleSubmit } = form;

  /* ----------------------------------
     Populate dynamic event dropdown
  ----------------------------------- */
  const populatedFields = hamperFields.map((field) =>
    field.name === "eventId"
      ? {
          ...field,
          options: events.map((e: any) => ({
            label: e.title,
            value: e.id,
          })),
        }
      : field
  );

  /* ----------------------------------
     Submit handlers
  ----------------------------------- */
  const onSubmit = (data: FieldValues) => {
    if (!selectedItems.length) {
      toast.error("Please select at least one item.");
      return; // ❌ DO NOT switch tab
    }

    createHamper({
      ...data,
      items: selectedItems,
    });
  };

  const onError = () => {
    // ❗ validation error → go back to details tab
    setActiveTab("details");
  };

  /* ----------------------------------
     UI
  ----------------------------------- */
  return (
    <FormProvider {...form}>
      <form className="bg-white p-6 rounded-xl shadow space-y-6">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList>
            <TabsTrigger value="details">Hamper Details</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
          </TabsList>

          {/* ---------------- Details Tab ---------------- */}
          <TabsContent value="details">
            <div className="space-y-4 mt-4">
              {populatedFields.map((field) => (
                <FormField key={field.name} field={field} />
              ))}
            </div>
          </TabsContent>

          {/* ---------------- Items Tab ---------------- */}
          <TabsContent value="items">
            <HamperItemsSelector
              selectedItems={selectedItems}
              onChange={setSelectedItems}
            />
          </TabsContent>
        </Tabs>

        {/* ---------------- Submit Button ---------------- */}
        <div className="pt-4">
          <UniButton
            type="button"
            loading={isPending}
            label="Create Hamper"
            onClick={handleSubmit(onSubmit, onError)}
          />
        </div>
      </form>
    </FormProvider>
  );
}