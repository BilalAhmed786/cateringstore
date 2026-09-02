"use client";

import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";

import PasswordSettings from "./components/PasswordSettings";
import ProfileInformation from "./components/ProfileInformation";

export default function AccountSettingsPage() {
  return (
    <>
      <Metadata
        title="Account Settings"
        desc="Manage your account information and password"
        classname="mb-5"
      />

      <div className="w-full space-y-8">
        <ProfileInformation />

        <PasswordSettings />
      </div>
    </>
  );
}
