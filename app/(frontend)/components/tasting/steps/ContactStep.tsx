"use client";

import { useFormContext } from "react-hook-form";

import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";

import type { TastingFormValues } from "../type";

export default function ContactStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TastingFormValues>();

  return (
    <div>
      <Metadata
        title="How can we contact you?"
        desc="We'll use these details to confirm your tasting appointment."
        classname=""
      />

      <div className="mt-7 space-y-5">
        {/* Name */}

        <div>
          <label className="text-sm font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Your name"
            {...register("name", {
              required: "Name is required.",
            })}
            className="mt-2 h-11 w-full rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-primary"
          />

          {errors.name && (
            <p className="mt-2 text-sm text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <label className="text-sm font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
            className="mt-2 h-11 w-full rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-primary"
          />

          {errors.email && (
            <p className="mt-2 text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}

        <div>
          <label className="text-sm font-medium">
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="03XX XXXXXXX"
            {...register("phone", {
              required: "Phone number is required.",
            })}
            className="mt-2 h-11 w-full rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-primary"
          />

          {errors.phone && (
            <p className="mt-2 text-sm text-destructive">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Message */}

        <div>
          <label className="text-sm font-medium">
            Additional Message
          </label>

          <textarea
            rows={4}
            placeholder="Anything else you'd like us to know?"
            {...register("message")}
            className="mt-2 w-full resize-none rounded-md border bg-background p-3 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
}