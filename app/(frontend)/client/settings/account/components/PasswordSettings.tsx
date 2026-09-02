"use client";

import { useEffect, useState } from "react";
import {
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  updatePassword,
  User,
} from "firebase/auth";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { app } from "@/app/(frontend)/lib/firebase/firebase";
import ContentSkeleton from "@/app/(frontend)/components/reusables/skeleton/ContentSkeleton";
import { FirebaseError } from "firebase/app";

export default function PasswordSettings() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fields: FieldConfig[] = [
    {
      name: "currentPassword",
      label: "Current Password",
      type: "password",
      placeholder: "Enter your current password",
      className: "mt-5",
    },
    {
      name: "newPassword",
      label: "New Password",
      type: "password",
      placeholder: "Enter your new password",
      className: "mt-5",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your new password",
      className: "mt-5",
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
    if (!user) {
      toast.error("User not found.");
      return;
    }

    if (!user.email) {
      toast.error("Your account does not have an email address.");
      return;
    }

    if (values.newPassword !== values.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        values.currentPassword,
      );

      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, values.newPassword);

      toast.success("Password updated successfully.");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (
          error.code === "auth/invalid-credential" ||
          error.code === "auth/wrong-password"
        ) {
          toast.error("Current password is incorrect.");
          return;
        }

        if (error.code === "auth/weak-password") {
          toast.error("New password is too weak.");
          return;
        }

        if (error.code === "auth/requires-recent-login") {
          toast.error("Please sign in again before changing your password.");
          return;
        }
      }

      console.error("Password update error:", error);
      toast.error("Failed to update password. Please try again.");
    }
  };

  if (loading) {
    return <ContentSkeleton />;
  }

  return (
    <DynamicShadcnForm
      fields={fields}
      defaultvalues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      cardTitle="Password"
      cardDescription="Change your account password."
      submitLabel="Update Password"
      reset="Reset"
      showreset={true}
      onSubmit={handleSubmit}
    />
  );
}
