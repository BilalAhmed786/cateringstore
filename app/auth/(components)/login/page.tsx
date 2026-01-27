"use client";
import { DynamicShadcnForm } from "@/components/reusables/dynamicform/dynamicform";
import { generateSchema } from "@/components/reusables/valdiation/valdiation";
import { FieldConfig } from "@/components/reusables/types/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GmailIcon from "@/assets/gmail-old-svgrepo-com.svg";
import FacebookIcon from "@/assets/facebook-svgrepo-com.svg";
import { useLogin } from "../hooks/useLogin";
import { useOAuth } from "../hooks/useOAuth";
import { useAuthRedirect } from "@/components/reusables/hooks/useAuthRedirect";
import { FullScreenLoader } from "@/components/reusables/laoder/laoder";
export default function LoginPage() {
  // ---------- HOOKS ----------
  const { isPending } = useAuthRedirect();
  const { mutate: loginMutate, isPending: loginPending } = useLogin();
  const { mutate: oauthMutate, isPending: oauthPending } = useOAuth();
  // ---------- FORM FIELDS ----------
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

  const schema = generateSchema(loginFields);

  if (isPending) {
    return <FullScreenLoader />;
  }
  return (
    <div className="space-y-6 max-w-md mx-auto mt-10">
      {/* ----------------- EMAIL / PASSWORD LOGIN ----------------- */}
      <DynamicShadcnForm
        schema={schema}
        fields={loginFields}
        defaultvalues={{ email: "", password: "" }}
        cardTitle="Login"
        cardDescription="Login with your email or use Google/Facebook"
        submitLabel={loginPending ? "Logging in..." : "Login"}
        reset="Reset"
        onSubmit={(data) => loginMutate(data)}
      />

      {/* ----------------- OAUTH BUTTONS ----------------- */}
      <div className="flex flex-col gap-2 mt-4">
        {/* Google */}
        <Button
          variant="outline"
          className="flex items-center gap-2 justify-center"
          disabled={oauthPending}
          onClick={() => oauthMutate("google")}
        >
          <Image src={GmailIcon} alt="Gmail" width={24} height={24} />
          Sign in with Google
        </Button>

        {/* Facebook */}
        <Button
          className="flex items-center gap-2 justify-center bg-blue-600 text-white hover:bg-blue-700"
          disabled={oauthPending}
          onClick={() => oauthMutate("facebook")}
        >
          <Image src={FacebookIcon} alt="Facebook" width={24} height={24} />
          Sign in with Facebook
        </Button>
      </div>
    </div>
  );
}
