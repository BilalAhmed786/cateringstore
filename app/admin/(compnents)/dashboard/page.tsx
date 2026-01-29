'use client';
import { UniButton } from "@/components/reusables/button/button";
import { useLogout } from "../hooks/useLogout";

export default function LogoutButton() {
  const logoutMutation = useLogout();

  return (
    <UniButton
      label="Logout"
      loading={logoutMutation.isPending}
      loadingLabel="Logging out..."
      variant="destructive"
      onClick={() => logoutMutation.mutate()}
    />
  );
}
