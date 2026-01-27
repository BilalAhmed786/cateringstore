"use client";
import { DynamicShadcnForm } from "@/components/reusables/dynamicform/dynamicform";
import { generateSchema } from "@/components/reusables/valdiation/valdiation";
import { FieldConfig } from "@/components/reusables/types/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GmailIcon from "@/assets/gmail-old-svgrepo-com.svg";
import FacebookIcon from "@/assets/facebook-svgrepo-com.svg";
import { useRegister } from "../hooks/useRegister";
import { useOAuth } from "../hooks/useOAuth";
// import { useAuthRedirect } from "@/components/reusables/hooks/useAuthRedirect";
// import { FullScreenLoader } from "@/components/reusables/laoder/laoder";
export default function RegisterPage() {
  /* ---------- FORM FIELDS ---------- */
  const registerFields: FieldConfig[] = [
    { name: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
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

  const schema = generateSchema(registerFields);

  /* ---------- MUTATIONS ---------- */
  const registerMutation = useRegister();
  const oauthMutation = useOAuth();
  

  return (
    <div className="space-y-6 max-w-md mx-auto mt-10">
      {/* ---------------- EMAIL / PASSWORD REGISTER ---------------- */}
      <DynamicShadcnForm
        schema={schema}
        fields={registerFields}
        defaultvalues={{ name: "", email: "", password: "" }}
        cardTitle="Create Account"
        cardDescription="Sign up with your email or use Google/Facebook"
        submitLabel={registerMutation.isPending ? "Registering..." : "Register"}
        reset="Reset"
        onSubmit={(data) => registerMutation.mutate(data)}
      />

      {/* ---------------- OAUTH BUTTONS ---------------- */}
      <div className="flex flex-col gap-2 mt-4">
        {/* Google */}
        <Button
          variant="outline"
          className="flex items-center gap-2 justify-center"
          disabled={oauthMutation.isPending}
          onClick={() => oauthMutation.mutate("google")}
        >
          <Image src={GmailIcon} alt="Gmail" width={24} height={24} />
          Sign up with Google
        </Button>

        {/* Facebook */}
        <Button
          variant="outline"
          className="flex items-center gap-2 justify-center bg-blue-600 text-white hover:bg-blue-700"
          disabled={oauthMutation.isPending}
          onClick={() => oauthMutation.mutate("facebook")}
        >
          <Image src={FacebookIcon} alt="Facebook" width={24} height={24} />
          Sign up with Facebook
        </Button>
      </div>
    </div>
  );
}
