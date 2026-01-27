"use client";
import { useAuthRedirect } from "@/components/reusables/hooks/useAuthRedirect";
import { FullScreenLoader } from "@/components/reusables/laoder/laoder";
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isPending } = useAuthRedirect();

  if (isPending) {
    return <FullScreenLoader/>
  }

  return children;
}
