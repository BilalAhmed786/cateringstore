'use client';
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import Image from "next/image";
import GmailIcon from "@/app/(frontend)/assets/gmail-old-svgrepo-com.svg";
import FacebookIcon from "@/app/(frontend)/assets/facebook-svgrepo-com.svg";
import { useRegister } from "../hooks/useRegister";
import { useOAuth } from "../hooks/useOAuth";
import Link from "next/link";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button"; // import your reusable button
import { FieldValues } from "react-hook-form";
export default function RegisterPage() {
  /* ---------- FORM FIELDS ---------- */
  const registerFields: FieldConfig[] = [
    { name: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
    { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
    { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
  ];



  /* ---------- MUTATIONS ---------- */
  const registerMutation = useRegister();
  const oauthMutation = useOAuth();

  return (
    <div className="space-y-6 max-w-md mx-auto mt-10">
      {/* ---------------- EMAIL / PASSWORD REGISTER ---------------- */}
      <DynamicShadcnForm
        fields={registerFields}
        defaultvalues={{ name: "", email: "", password: "" }}
        cardTitle="Create Account"
        cardDescription="Sign up with your email or use Google/Facebook"
        submitLabel={registerMutation.isPending ? "Registering..." : "Register"}
        reset="Reset"
        onSubmit={(data:FieldValues) => registerMutation.mutate(data)}
      />

      {/* ---------------- OAUTH BUTTONS ---------------- */}
      <div className="flex flex-col gap-2 mt-4">
        {/* Google */}
        <UniButton
          label="Continue with Google"
          icon={<Image src={GmailIcon} alt="Gmail" width={24} height={24} />}
          variant="outline"
          onClick={() => oauthMutation.mutate("google")}
          disabled={oauthMutation.isPending}
          className="flex items-center justify-center gap-2"
        />

        {/* Facebook */}
        <UniButton
          label="Continue with Facebook"
          icon={<Image src={FacebookIcon} alt="Facebook" width={24} height={24} />}
          variant="outline"
          onClick={() => oauthMutation.mutate("facebook")}
          disabled={oauthMutation.isPending}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
        />

        {/* Login link */}
        <div className="flex justify-end text-sm text-blue-600 mt-2">
          <Link href="/auth/login">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}
