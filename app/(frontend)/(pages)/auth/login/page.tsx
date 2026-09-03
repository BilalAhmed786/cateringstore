"use client";

import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import Image from "next/image";
import Link from "next/link";
import CateringBg from "@/app/(frontend)/public/images/chef-plating-gourmet-food.jpg";
import GmailIcon from "@/app/(frontend)/assets/gmail-old-svgrepo-com.svg";
import FacebookIcon from "@/app/(frontend)/assets/facebook-svgrepo-com.svg";

import { useLogin } from "../hooks/useLogin";
import { useOAuth } from "../hooks/useOAuth";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { FieldValues } from "react-hook-form";

export default function LoginPage() {
  const { mutate: loginMutate, isPending: loginPending } = useLogin();
  const { mutate: oauthMutate, isPending: oauthPending } = useOAuth();

  const loginFields: FieldConfig[] = [
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
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Optional gradient overlay */}
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
        {/* Login Card */}
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
            {/* Email / Password Login */}
            <DynamicShadcnForm
              fields={loginFields}
              defaultvalues={{
                email: "",
                password: "",
              }}
              cardTitle="Welcome Back"
              cardDescription="Login with your email or use Google/Facebook"
              submitLabel={
                loginPending
                  ? "Logging in..."
                  : "Login"
              }
              reset="Reset"
              onSubmit={(data: FieldValues) =>
                loginMutate(data)
              }
            />

            {/* OAuth */}
            <div className="mt-5 flex flex-col gap-3">
              {/* Divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="whitespace-nowrap text-xs text-gray-500 sm:text-sm">
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
                    width={22}
                    height={22}
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  />
                }
                onClick={() => oauthMutate("google")}
                disabled={oauthPending}
                className="
                  flex
                  min-h-11
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  text-sm
                  text-gray-700
                  transition-all
                  hover:bg-gray-50
                  sm:min-h-12
                  sm:text-base
                "
              />

              {/* Facebook */}
              <UniButton
                label="Continue with Facebook"
                icon={
                  <Image
                    src={FacebookIcon}
                    alt="Facebook"
                    width={22}
                    height={22}
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  />
                }
                onClick={() => oauthMutate("facebook")}
                disabled={oauthPending}
                className="
                  flex
                  min-h-11
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-blue-600
                  text-sm
                  text-white
                  transition-all
                  hover:bg-blue-700
                  sm:min-h-12
                  sm:text-base
                "
              />

              {/* Links */}
              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-between
                  gap-2
                  pt-2
                  text-xs
                  sm:flex-row
                  sm:text-sm
                "
              >
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

                <Link
                  href="/auth/forgotpassword"
                  className="
                    text-blue-600
                    transition-colors
                    hover:text-blue-800
                    hover:underline
                  "
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}