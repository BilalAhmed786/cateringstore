"use client";

import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export default function ChangePassword() {
  const fields: FieldConfig[] = [
    {
      name: "currentPassword",
      label: "Current Password",
      type: "password",
       className:"mt-5"
    },
    {
      name: "newPassword",
      label: "New Password",
      type: "password",
      className:"mt-5"
    },
    {
      name: "confirmPassword",
      label: "Confirm New Password",
      type: "password",
      className:"mt-5"
    },
  ];

  const defaultvalues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values:FieldValues) => {
    if (values.newPassword !== values.confirmPassword) {
      throw new Error("New passwords do not match.");
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User is not authenticated.");
      }

      if (!user.email) {
        throw new Error(
          "This account does not use email/password authentication.",
        );
      }

      // Re-authenticate using current password
      const credential = EmailAuthProvider.credential(
        user.email,
        values.currentPassword,
      );

      await reauthenticateWithCredential(
        user,
        credential,
      );

      // Update Firebase password
      await updatePassword(
        user,
        values.newPassword,
      );

      toast.success('password change successfully')
    } catch (error) {
      console.error(
        "Password change failed:",
        error,
      );

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":toast.error("invalid creadentials")
          case "auth/wrong-password":toast.error("current password is incorrect")

          case "auth/weak-password":toast.error('weak password');

          case "auth/requires-recent-login":
            throw new Error(
              "Please sign in again before changing your password.",
            );

          default:
            throw new Error(
              error.message ||
                "Failed to change password.",
            );
        }
      }

      throw error;
    }
  };

  return (
    <DynamicShadcnForm
      fields={fields}
      defaultvalues={defaultvalues}
      cardTitle="Change Password"
      cardDescription="Update your Firebase account password."
      submitLabel="Change Password"
      reset="Reset"
      showreset={true}
      onSubmit={handleSubmit}
    />
  );
}