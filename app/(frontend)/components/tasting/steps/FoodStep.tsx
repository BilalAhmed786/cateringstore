"use client";

import { useFormContext } from "react-hook-form";
import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";
import { foodOptions } from "../constants";
import { TastingFormValues } from "../type";

export default function FoodStep() {
  const { watch, setValue } =
    useFormContext<TastingFormValues>();

  const selectedFood = watch("foodPreferences");

  const toggleFood = (food: string) => {
    if (selectedFood.includes(food)) {
      setValue(
        "foodPreferences",
        selectedFood.filter((item) => item !== food),
        {
          shouldDirty: true,
        }
      );
    } else {
      setValue(
        "foodPreferences",
        [...selectedFood, food],
        {
          shouldDirty: true,
        }
      );
    }
  };

  return (
    <div>
      <Metadata
        title="What would you like to taste?"
        desc="Select the dishes you're interested in trying."
        classname=""
      />

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {foodOptions.map((food) => {
          const selected = selectedFood.includes(food);

          return (
            <button
              key={food}
              type="button"
              onClick={() => toggleFood(food)}
              className={`rounded-xl border p-4 text-left text-sm font-medium transition-all ${
                selected
                  ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                  : "hover:border-primary/50 hover:bg-muted"
              }`}
            >
              {food}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        You can select multiple options.
      </p>
    </div>
  );
}