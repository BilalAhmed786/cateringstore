'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { UniButton } from "@/components/reusables/button/button";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      router.replace("/auth/login");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <UniButton
        label="Logout"
        loading={loading}
        loadingLabel="Logging out..."
        variant="destructive"
        onClick={handleLogout}
      />

      <h1 className="mt-4 text-xl font-bold">Admin Dashboard</h1>
    </div>
  );
}
