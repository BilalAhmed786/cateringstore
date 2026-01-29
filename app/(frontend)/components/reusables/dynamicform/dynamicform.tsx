"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { UniButton } from "../button/button";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/(frontend)/components/ui/card";
import { FieldGroup } from "@/app/(frontend)/components/ui/field";
import { FormField } from "../fields/fieldscase";
import { FieldConfig } from "../types/types";

type ZodFormSchema = z.ZodObject<Record<string, z.ZodTypeAny>>;

interface DynamicShadcnFormProps<T> {
  schema: ZodFormSchema;
  fields: FieldConfig[];
  cardTitle: string;
  cardDescription?: string;
  className?: string;
  reset: string;
  submitLabel: string;
  defaultvalues: T;
  onSubmit: (data: T) => void;
}

export function DynamicShadcnForm<T>({
  schema,
  fields,
  defaultvalues,
  cardTitle,
  cardDescription,
  className,
  reset,
  submitLabel,
  onSubmit,
}: DynamicShadcnFormProps<T>) {
  type FormValues = z.infer<typeof schema>;

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultvalues as FormValues,
  });

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
      await onSubmit(data as T);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        {cardDescription && (
          <CardDescription>{cardDescription}</CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)} 
          id="dynamic-form">
            <FieldGroup>
              {fields.map((field) => (
                <FormField key={field.name} field={field} />
              ))}
            </FieldGroup>
            <CardFooter className="flex justify-end gap-2 mt-5">
              <UniButton
                type="button"
                variant="outline"
                onClick={() => methods.reset()}
                label={reset}
              />

              <UniButton
                type="submit"
                form="dynamic-form"
                loading={methods.formState.isSubmitting}
                label={submitLabel}
              />
            </CardFooter>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}