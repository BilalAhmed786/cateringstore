import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";
import ChangePassword from "./components/ChangePassword";
import ProfileSettings from "./components/ProfileSettings";

export default function AccountSettingsPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <Metadata
      
      title="Account Settings"
      desc="Manage your account information and security."

      />

      <ProfileSettings />

      <ChangePassword />

      
    </div>
  );
}