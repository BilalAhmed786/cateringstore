"use client";

import { useEffect, useState } from "react";
import {
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/(frontend)/components/ui/card";

import { FieldGroup } from "@/app/(frontend)/components/ui/field";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";

import { generateSchema } from "@/app/(frontend)/components/reusables/validation/valdiation";

import StoreBasicStep from "./steps/StoreBasicStep";
import StoreContactStep from "./steps/StoreContactStep";
import StoreConfigurationStep from "./steps/StoreConfigurationStep";

import { useGetStoreSettings } from "../hooks/useGetStoreSettings";
import { useUpdateStoreSettings } from "../hooks/useUpdateStoreSettings";

const fields = [
  {
    name: "name",
    label: "Store Name",
    type: "text" as const,
    required: true,
  },
  {
    name: "description",
    label: "Store Description",
    type: "textarea" as const,
    required: false,
  },
  {
    name: "logo",
    label: "Store Logo",
    type: "imagepreview" as const,
    required: false,
  },
  {
    name: "file",
    label: "Upload New Logo",
    type: "file" as const,
    required: false,
    multiple: false,
  },
  {
    name: "email",
    label: "Store Email",
    type: "email" as const,
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "text" as const,
    required: false,
  },
  {
    name: "address",
    label: "Address",
    type: "text" as const,
    required: false,
  },
  {
    name: "city",
    label: "City",
    type: "text" as const,
    required: false,
  },
  {
    name: "website",
    label: "Website",
    type: "text" as const,
    required: false,
  },
  {
    name: "currency",
    label: "Currency",
    type: "select" as const,
    required: true,
  },
  {
    name: "timezone",
    label: "Timezone",
    type: "select" as const,
    required: true,
  },
  {
    name: "storeStatus",
    label: "Store Status",
    type: "select" as const,
    required: true,
  },
  {
    name: "maintenanceMessage",
    label: "Maintenance Message",
    type: "textarea" as const,
    required: false,
  },
];

export default function StoreSettingsForm() {
  const [step, setStep] = useState(1);

  const { data, isLoading } = useGetStoreSettings();
  const updateStore = useUpdateStoreSettings();

  const methods = useForm({
    resolver: zodResolver(generateSchema(fields)),

    // IMPORTANT:
    // Keep values when step components unmount.
    shouldUnregister: false,

    defaultValues: {
      name: "",
      description: "",

      // Existing Cloudinary URL
      logo: "",

      // FileUploadInput stores File[]
      file: [] as File[],

      email: "",
      phone: "",
      address: "",
      city: "",
      website: "",

      currency: "PKR",
      timezone: "Asia/Karachi",
      storeStatus: "OPEN",

      maintenanceMessage: "",
    },
  });

  useEffect(() => {
    if (!data?.store) return;

    methods.reset({
      name: data.store.name ?? "",
      description: data.store.description ?? "",

      // Existing logo URL
      logo: data?.store.logo ?? "",

      // Never put existing URL into file
      file: [],

      email: data.store.email ?? "",
      phone: data.store.phone ?? "",
      address: data.store.address ?? "",
      city: data.store.city ?? "",
      website: data.store.website ?? "",

      currency: data.store.currency ?? "PKR",
      timezone: data.store.timezone ?? "Asia/Karachi",
      storeStatus: data.store.storeStatus ?? "OPEN",

      maintenanceMessage:
        data.store.maintenanceMessage ?? "",
    });
  }, [data, methods]);

  const nextStep = async () => {
    let fieldsToValidate: string[] = [];

    if (step === 1) {
      fieldsToValidate = [
        "name",
        "description",
        // Don't need to validate logo/file if optional
      ];
    }

    if (step === 2) {
      fieldsToValidate = [
        "email",
        "phone",
        "address",
        "city",
        "website",
      ];
    }

    const valid = await methods.trigger(fieldsToValidate);

    if (!valid) return;

    setStep((previous) => previous + 1);
  };

  const previousStep = () => {
    setStep((previous) => previous - 1);
  };

  const handleSubmit = async (values: FieldValues) => {
  

    await updateStore.mutateAsync({
      name: values.name?.trim(),

      description: values.description?.trim(),

      email: values.email?.trim(),

      phone: values.phone?.trim(),

      address: values.address?.trim(),

      city: values.city?.trim(),

      website: values.website?.trim(),

      currency: values.currency,

      timezone: values.timezone,

      storeStatus: values.storeStatus,

      maintenanceMessage:
        values.maintenanceMessage?.trim(),

      isActive: data?.store.isActive ?? true,

      // FileUploadInput returns File[]
      file: Array.isArray(values.file)
        ? values.file
        : [],
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          Loading store settings...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full p-5">
      <CardHeader>
        <CardTitle>Store Settings</CardTitle>

        <CardDescription>
          Manage your catering store information
          and configuration.
        </CardDescription>

        <div className="flex items-center gap-3 pt-4 text-sm">
          <span
            className={
              step === 1
                ? "font-semibold text-slate-900"
                : "text-slate-400"
            }
          >
            1. Basic
          </span>

          <span>→</span>

          <span
            className={
              step === 2
                ? "font-semibold text-slate-900"
                : "text-slate-400"
            }
          >
            2. Contact
          </span>

          <span>→</span>

          <span
            className={
              step === 3
                ? "font-semibold text-slate-900"
                : "text-slate-400"
            }
          >
            3. Configuration
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
          >
            <FieldGroup>
              {step === 1 && <StoreBasicStep logo={data?.store?.logo || ""} />}

              {step === 2 && <StoreContactStep />}

              {step === 3 && (
                <StoreConfigurationStep />
              )}
            </FieldGroup>

            <div className="mt-6 flex justify-end gap-2">
              {step > 1 && (
                <UniButton
                  type="button"
                  variant="outline"
                  label="Back"
                  onClick={previousStep}
                />
              )}

              {step < 3 ? (
                <UniButton
                  type="button"
                  label="Next"
                  onClick={nextStep}
                />
              ) : (
                <UniButton
                  type="submit"
                  label="Save Store Settings"
                  loading={
                    methods.formState.isSubmitting ||
                    updateStore.isPending
                  }
                />
              )}
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}