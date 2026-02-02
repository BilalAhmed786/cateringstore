'use client';
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
// import { generateSchema } from "@/app/(frontend)/components/reusables/validation/valdiation";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import Image from "next/image";
import Link from "next/link";
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
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
    },
  ];

  // const schema = generateSchema(loginFields);

  return (
    <div className="space-y-6 max-w-md mx-auto mt-10">
      {/* ---------------- EMAIL / PASSWORD LOGIN ---------------- */}
      <DynamicShadcnForm
        fields={loginFields}
        defaultvalues={{ email: "", password: "" }}
        cardTitle="Login"
        cardDescription="Login with your email or use Google/Facebook"
        submitLabel={loginPending ? "Logging in..." : "Login"}
        reset="Reset"
        onSubmit={(data:FieldValues) => loginMutate(data)}
      />

      {/* ---------------- OAUTH BUTTONS ---------------- */}
      <div className="flex flex-col gap-2 mt-4">
        <UniButton
          label="Continue with Google"
          icon={<Image src={GmailIcon} alt="Gmail" width={24} height={24} />}
          onClick={() => oauthMutate("google")}
          disabled={oauthPending}
        />

        <UniButton
          label="Continue with Facebook"
          icon={<Image src={FacebookIcon} alt="Facebook" width={24} height={24} />}
          onClick={() => oauthMutate("facebook")}
          disabled={oauthPending}
          className="bg-blue-600 text-white hover:bg-blue-700"
        />

        {/* Links */}
        <div className="flex justify-between text-sm text-blue-600 mt-2">
          <Link href="/auth/register">Create Account</Link>
          <Link href="/auth/forgotpassword" className="underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
