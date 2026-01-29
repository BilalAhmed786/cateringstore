'use client';
import { useMutation } from '@tanstack/react-query';
import { sendPasswordResetEmail, fetchSignInMethodsForEmail, getAuth } from 'firebase/auth';
import { toast } from 'sonner'; // or your toast library

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      if (!email) throw new Error('Email is required');
       const auth = getAuth();
    // Check the sign-in methods for this email
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (!methods.includes('password')) {
        // OAuth-only user → disallow password reset
        throw new Error(
          'This email is registered via Google/Facebook. Please use that provider to log in.'
        );
      }

      // Email/password user → send reset email
      await sendPasswordResetEmail(auth, email);
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
