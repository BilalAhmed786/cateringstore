"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
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
import { DynamicShadcnFormProps } from "../types/types";
import { generateSchema } from "../validation/valdiation";

export function DynamicShadcnForm({
  fields,
  defaultvalues,
  cardTitle,
  cardDescription,
  className,
  reset,
  showreset = true,
  submitLabel,
  onSubmit,
}: DynamicShadcnFormProps) {
  const schema = generateSchema(fields);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultvalues,
  });

  return (
    <Card className="py-6">
      <CardHeader className={className}>
        <CardTitle>{cardTitle}</CardTitle>
        {cardDescription && (
          <CardDescription>{cardDescription}</CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} id="dynamic-form">
            <FieldGroup>
              {fields.map((field) => (
                <FormField key={field.name} field={field} />
              ))}
            </FieldGroup>
            <CardFooter className="flex justify-end gap-2 mt-5">
              {showreset && (
                <UniButton
                  type="button"
                  variant="outline"
                  onClick={() => methods.reset()}
                  label={reset}
                />
              )}
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
