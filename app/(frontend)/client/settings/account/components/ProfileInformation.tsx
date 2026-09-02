"use client";

import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  User,
} from "firebase/auth";
import { FieldValues } from "react-hook-form";

import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { app } from "@/app/(frontend)/lib/firebase/firebase";
import ContentSkeleton from "@/app/(frontend)/components/reusables/skeleton/ContentSkeleton";

export default function ProfileInformation() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const fields: FieldConfig[] = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      className:"mt-5"
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      className:"mt-5"
    },
    {
      name: "photoURL",
      label: "photourl",
      type: "text",
      placeholder: "Enter your phone number",
      className:"mt-5"
    },
  ];

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleSubmit = async (values: FieldValues) => {
    if (!user) return;

    try {
      await updateProfile(user, {
        displayName: values.name,
        photoURL:values.photoURL
      });

      // Update local Firebase user state
      setUser({
        ...user,
        displayName: values.name,
        photoURL:values.photoUrl

      });

      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };



  if(loading) return <ContentSkeleton/>

  return (
    <DynamicShadcnForm
      fields={fields}
      defaultvalues={{
        name: user?.displayName ?? "",
        email: user?.email ?? "",
        photoURL: user?.photoURL ?? "",
      }}
      cardTitle="Profile Information"
      cardDescription="Update your personal information."
      submitLabel="Save Changes"
      reset="Reset"
      showreset={true}
      onSubmit={handleSubmit}
    />
  );
}