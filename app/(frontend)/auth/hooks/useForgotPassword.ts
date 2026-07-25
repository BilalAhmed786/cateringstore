'use client';
import { useMutation } from '@tanstack/react-query';
import { sendPasswordResetEmail, fetchSignInMethodsForEmail, getAuth } from 'firebase/auth';
import {FieldValues } from 'react-hook-form';
import { toast } from 'sonner'; // or your toast library

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (data: FieldValues) => {
      if (!data.email) throw new Error('Email is required');
       const auth = getAuth();
    // Check the sign-in methods for this email
      const methods = await fetchSignInMethodsForEmail(auth, data.email);

      if (!methods.includes('password')) {
        // OAuth-only user → disallow password reset
        throw new Error(
          'This email is registered via Google/Facebook. Please use that provider to log in.'
        );
      }

      // Email/password user → send reset email
      await sendPasswordResetEmail(auth, data.email);
      return true;
    },
    onSuccess: () => {
      toast.success('Password reset email sent!');
    },
    onError: (err) => {
      console.error(err);
      toast.error(err?.message || 'Failed to send reset email');
    },
  });
}
