"use client";
import { useAuthRedirect } from "@/components/reusables/hooks/useAuthRedirect";
import { FullScreenLoader } from "@/components/reusables/laoder/laoder";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPending } = useAuthRedirect();

  return (
    <>
      {isPending && <FullScreenLoader />}
      {!isPending && children}
    </>
  );
}
