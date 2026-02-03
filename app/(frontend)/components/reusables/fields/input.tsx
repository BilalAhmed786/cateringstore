"use client"

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { TextInputProps } from "../types/types";



const Inputtext: React.FC<TextInputProps> = ({ name, label,className, placeholder,type }) => {
  const { control } = useFormContext();

  return (
    <div>
      <Label className="mb-2" htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <>
              <Input {...field}  id={name} className={className} type={type} placeholder={placeholder}  />
              {fieldState.error && (
                <p className="text-red-500 mt-2">{fieldState.error.message}</p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default Inputtext;