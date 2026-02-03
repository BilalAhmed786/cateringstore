'use client'
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox as ShadCheckbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import { CheckboxProps } from "../types/types";


const Checkbox: React.FC<CheckboxProps> = ({ name, label }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center space-x-2">
          <ShadCheckbox checked={field.value} onCheckedChange={field.onChange} />
          <Label>{label}</Label>
        </div>
      )}
    />
  );
};

export default Checkbox;