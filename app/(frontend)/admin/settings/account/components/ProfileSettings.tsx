"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { FieldValues } from "react-hook-form";

export default function ProfileSettings() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const updateProfile = useUpdateProfile();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const fields: FieldConfig[] = [
    {
      name: "name",
      label: "Display Name",
      type: "text",
      required: true,
      className:"mt-5"
    },
    {
      name: "photoURL",
      label: "Profile Image URL",
      type: "text",
      required: false,
      className:"mt-5"
    },
  ];

  if (loading) {
    return (
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Loading profile...
        </p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-red-500">
          User is not authenticated.
        </p>
      </section>
    );
  }

  const defaultvalues = {
    name: user.displayName ?? "",
    photoURL: user.photoURL ?? "",
  };

  const handleSubmit = async (values:FieldValues) => {
    try {
      await updateProfile.mutateAsync({
        name: values.name.trim(),
        photoURL:values.photoURL

      });

      console.log("Profile updated successfully");
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error
      );
    }
  };

  return (
    <DynamicShadcnForm
      fields={fields}
      defaultvalues={defaultvalues}
      cardTitle="Profile"
      cardDescription="Manage your account profile information."
      submitLabel="Save Changes"
      reset="Reset"
      showreset={false}
      onSubmit={handleSubmit}
    />
  );
}