"use client";
import { useAuthRedirect } from "@/components/reusables/hooks/useAuthRedirect";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isPending } = useAuthRedirect();

  if (isPending) {
    return <p>...parent</p>
  }

  return children;
}
