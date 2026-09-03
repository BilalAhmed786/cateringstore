"use client";

import { useState } from "react";
import Link from "next/link";

import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { useForgotPassword } from "@/app/(frontend)/(pages)/auth/hooks/useForgotPassword";

import CateringBg from "@/app/(frontend)/public/images/chef-plating-gourmet-food.jpg";

export default function ForgotPasswordPage() {
const { mutate: forgotMutate, isPending } = useForgotPassword();

const [defaultValues] = useState({
email: "",
});

const fields: FieldConfig[] = [
{
name: "email",
label: "Email",
type: "email",
placeholder: "[you@example.com](mailto:you@example.com)",
className: "mt-5",
},
];

return (
<main
className="
relative
min-h-screen
w-full
overflow-x-hidden
bg-cover
bg-center
bg-no-repeat
mt-20
"
style={{
backgroundImage: `url(${CateringBg.src})`,
}}
>
{/* Background overlay */} <div className="absolute inset-0 bg-black/40" />

```
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/50" />

  {/* Main content */}
  <div
    className="
      relative
      z-10
      flex
      min-h-screen
      w-full
      items-center
      justify-center
      px-4
      py-8
      sm:px-6
      md:px-8
      lg:px-10
    "
  >
    {/* Forgot Password Card */}
    <div
      className="
        w-full
        max-w-md
        overflow-hidden
        rounded-2xl
        bg-white/95
        shadow-2xl
        backdrop-blur-sm
        sm:rounded-3xl
      "
    >
      <div className="px-5 py-6 sm:px-8 sm:py-8">
        {/* Form */}
        <DynamicShadcnForm
          fields={fields}
          defaultvalues={defaultValues}
          cardTitle="Forgot Password?"
          cardDescription="Enter your email and we'll send you a link to reset your password."
          submitLabel={isPending ? "Sending..." : "Send Reset Link"}
          reset="Reset"
          onSubmit={(data) => forgotMutate(data)}
        />

        {/* Navigation Links */}
        <div
          className="
            mt-5
            flex
            flex-col
            items-center
            justify-between
            gap-3
            pt-2
            text-xs
            sm:flex-row
            sm:text-sm
          "
        >
          <Link
            href="/auth/login"
            className="
              font-medium
              text-blue-600
              transition-colors
              hover:text-blue-800
              hover:underline
            "
          >
            ← Back to Login
          </Link>

          <Link
            href="/auth/register"
            className="
              font-medium
              text-blue-600
              transition-colors
              hover:text-blue-800
              hover:underline
            "
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  </div>
</main>

);
}
