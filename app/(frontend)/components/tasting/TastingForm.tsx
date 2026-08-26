"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import {
  Tabs,
  TabsContent,
} from "@/app/(frontend)/components/ui/tabs";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";

import {
  Step,
  steps,
  TastingFormValues,
} from "./type";

import DateStep from "./steps/DateStep";
import EventStep from "./steps/EventStep";
import FoodStep from "./steps/FoodStep";
import GuestsStep from "./steps/GuestsStep";
import ContactStep from "./steps/ContactStep";

import TastingSuccess from "./components/TastingSuccess";

import { useCurrentUser } from "@/app/(frontend)/components/header/hook/useCurrentUser";
import { useCreateTasting } from "./hooks/useCreateTasting";

export default function TastingForm() {
  const [activeStep, setActiveStep] = useState<Step>("event");
  const [submitted, setSubmitted] = useState(false);

  const { user } = useCurrentUser();

  const createTasting = useCreateTasting();

  const form = useForm<TastingFormValues>({
    defaultValues: {
      eventType: "",
      guests: "",
      date: "",
      time: "",
      foodPreferences: [],
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const {
    trigger,
    handleSubmit,
  } = form;

  const currentStepIndex = steps.indexOf(activeStep);

  // ---------------------------------------
  // Next
  // ---------------------------------------

  const handleNext = async () => {
    let fieldsToValidate: (keyof TastingFormValues)[] = [];

    switch (activeStep) {
      case "event":
        fieldsToValidate = ["eventType"];
        break;

      case "guests":
        fieldsToValidate = ["guests"];
        break;

      case "date":
        fieldsToValidate = ["date", "time"];
        break;

      case "food":
        fieldsToValidate = [];
        break;

      case "contact":
        fieldsToValidate = ["name", "email", "phone"];
        break;
    }

    const isValid =
      fieldsToValidate.length === 0
        ? true
        : await trigger(fieldsToValidate);

    if (!isValid) return;

    const nextIndex = currentStepIndex + 1;

    if (nextIndex < steps.length) {
      setActiveStep(steps[nextIndex]);
    }
  };

  // ---------------------------------------
  // Back
  // ---------------------------------------

  const handleBack = () => {
    const previousIndex = currentStepIndex - 1;

    if (previousIndex >= 0) {
      setActiveStep(steps[previousIndex]);
    }
  };

  // ---------------------------------------
  // Submit
  // ---------------------------------------

  const onSubmit = async (data: TastingFormValues) => {
    // ---------------------------------------
    // Authentication
    // ---------------------------------------

    if (!user) {
      toast.error("Please login to book a tasting.");
      return;
    }

    try {
      // ---------------------------------------
      // Create tasting request
      // ---------------------------------------

      await createTasting.mutateAsync(data);

      // ---------------------------------------
      // Success
      // ---------------------------------------

      setSubmitted(true);

      toast.success(
        "Tasting request submitted successfully.",
      );
    } catch (error) {
      console.error(
        "Tasting submission error:",
        error,
      );

      toast.error(
        "Unable to submit your tasting request. Please try again.",
      );
    }
  };

  // ---------------------------------------
  // Success screen
  // ---------------------------------------

  if (submitted) {
    return (
      <TastingSuccess
        name={form.getValues("name")}
        eventType={form.getValues("eventType")}
        guests={form.getValues("guests")}
        date={form.getValues("date")}
        time={form.getValues("time")}
      />
    );
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* -------------------------------- */}
        {/* HEADER */}
        {/* -------------------------------- */}

        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">
                Book Your Tasting
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Step {currentStepIndex + 1} of {steps.length}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              {activeStep === "guests" ? (
                <Users className="h-6 w-6" />
              ) : activeStep === "date" ? (
                <CalendarDays className="h-6 w-6" />
              ) : (
                <Check className="h-6 w-6" />
              )}
            </div>
          </div>

          {/* Progress */}

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{
                width: `${
                  ((currentStepIndex + 1) / steps.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        {/* -------------------------------- */}
        {/* STEPS */}
        {/* -------------------------------- */}

        <Tabs
          value={activeStep}
          onValueChange={(value) =>
            setActiveStep(value as Step)
          }
        >
          <TabsContent value="event">
            <EventStep />
          </TabsContent>

          <TabsContent value="guests">
            <GuestsStep />
          </TabsContent>

          <TabsContent value="date">
            <DateStep />
          </TabsContent>

          <TabsContent value="food">
            <FoodStep />
          </TabsContent>

          <TabsContent value="contact">
            <ContactStep />
          </TabsContent>
        </Tabs>

        {/* -------------------------------- */}
        {/* NAVIGATION */}
        {/* -------------------------------- */}

        <div className="flex items-center justify-between border-t pt-6">
          {currentStepIndex > 0 ? (
            <UniButton
              type="button"
              label="Back"
              variant="outline"
              icon={<ChevronLeft className="h-4 w-4" />}
              onClick={handleBack}
            />
          ) : (
            <div />
          )}

          {currentStepIndex < steps.length - 1 ? (
            <UniButton
              type="button"
              label="Continue"
              icon={<ChevronRight className="h-4 w-4" />}
              onClick={handleNext}
            />
          ) : (
            <UniButton
              type="submit"
              label="Book My Tasting"
              loading={createTasting.isPending}
              icon={<Check className="h-4 w-4" />}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
}