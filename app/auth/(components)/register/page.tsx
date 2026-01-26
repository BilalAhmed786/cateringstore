"use client";
import { useRouter } from "next/navigation";
import { DynamicShadcnForm } from "@/components/reusables/dynamicform/dynamicform";
import { generateSchema } from "@/components/reusables/valdiation/valdiation";
import { authMutations } from "../hooks/authhook";
import { FieldConfig } from "@/components/reusables/types/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GmailIcon from "@/assets/gmail-old-svgrepo-com.svg";
import FacebookIcon from "@/assets/facebook-svgrepo-com.svg";
export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = authMutations.useRegister();
  const oauthMutation = authMutations.useOAuth();

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

  return (
    <div className="space-y-6 max-w-md mx-auto mt-10">
      {/* ----------------- EMAIL / PASSWORD REGISTER ----------------- */}
      <DynamicShadcnForm
        schema={schema}
        fields={registerFields}
        defaultvalues={{ name: "", email: "", password: "" }}
        cardTitle="Create Account"
        cardDescription="Sign up with your email or use Google/Facebook"
        submitLabel={registerMutation.isPending ? "Registering..." : "Register"}
        reset="Reset"
        onSubmit={(data) =>
          registerMutation.mutate(data, {
            onSuccess: () => router.push("/login"),
          })
        }
      />

      {/* ----------------- OAUTH BUTTONS ----------------- */}
      <div className="flex flex-col gap-2 mt-4">
        {/* Google */}
        <Button
          variant="outline"
          className="flex items-center gap-2 justify-center"
          onClick={() => oauthMutation.mutate("google")}
        >
          <Image
            src={GmailIcon}
            alt="Gmail"
            width={24} 
            height={24} 
          />
           Sign up with Google
        </Button>

        {/* Facebook */}
        <Button
          variant="outline"
          className="flex items-center gap-2 justify-center bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => oauthMutation.mutate("facebook")}
        >
          <Image
            src={FacebookIcon}
            alt="Gmail"
            width={24} 
            height={24} 
          />
          Sign up with Facebook
        </Button>
      </div>
    </div>
  );
}
