"use client";

import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import Image from "next/image";
import GmailIcon from "@/app/(frontend)/assets/gmail-old-svgrepo-com.svg";
import FacebookIcon from "@/app/(frontend)/assets/facebook-svgrepo-com.svg";
import { useRegister } from "../hooks/useRegister";
import { useOAuth } from "../hooks/useOAuth";
import Link from "next/link";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { FieldValues } from "react-hook-form";
import image from "@/app/(frontend)/public/images/chef-plating-gourmet-food.jpg"
export default function RegisterPage() {
  const registerFields: FieldConfig[] = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "John Doe",
      className:"mt-5"
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
      className:"mt-5"
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
      className:"mt-5"
    },
  ];

  const registerMutation = useRegister();
  const oauthMutation = useOAuth();

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
        backgroundImage: "url('/images/chef-plating-gourmet-food.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
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
          py-6

          sm:px-6
          sm:py-8

          lg:px-10
          lg:py-10
        "
      >
        {/* Registration Card */}
        <div
          className="
            w-full
            max-w-[520px]
            overflow-hidden
            rounded-2xl
            bg-white/95
            shadow-2xl
            backdrop-blur-sm

            sm:rounded-3xl
          "
        >
          {/* Form */}
          <div className="px-5 py-6 sm:px-8 sm:py-7 lg:px-9 lg:py-8">
            <DynamicShadcnForm
              fields={registerFields}
              defaultvalues={{
                name: "",
                email: "",
                password: "",
              }}
              cardTitle="Create Account"
              cardDescription="Sign up with your email or use Google/Facebook"
              submitLabel={
                registerMutation.isPending
                  ? "Registering..."
                  : "Register"
              }
              reset="Reset"
              onSubmit={(data: FieldValues) =>
                registerMutation.mutate(data)
              }
            />

            {/* OAuth */}
            <div className="mt-4 flex flex-col gap-2.5 sm:mt-5">
              {/* Divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="whitespace-nowrap text-xs text-gray-500">
                  or continue with
                </span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Google */}
              <UniButton
                label="Continue with Google"
                icon={
                  <Image
                    src={GmailIcon}
                    alt="Google"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                }
                variant="outline"
                onClick={() => oauthMutation.mutate("google")}
                disabled={oauthMutation.isPending}
                className="
                  flex
                  min-h-10
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  text-sm
                  sm:min-h-11
                "
              />

              {/* Facebook */}
              <UniButton
                label="Continue with Facebook"
                icon={
                  <Image
                    src={FacebookIcon}
                    alt="Facebook"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                }
                variant="outline"
                onClick={() => oauthMutation.mutate("facebook")}
                disabled={oauthMutation.isPending}
                className="
                  flex
                  min-h-10
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border-blue-600
                  bg-blue-600
                  text-sm
                  text-white
                  hover:bg-blue-700
                  sm:min-h-11
                "
              />

              {/* Login */}
              <div className="pt-1 text-center text-xs text-gray-600 sm:text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}