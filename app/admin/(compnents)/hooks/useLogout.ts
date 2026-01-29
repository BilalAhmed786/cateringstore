'use client';
import { useMutation } from '@tanstack/react-query';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { toast } from 'sonner'; // or your toast library
import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      // 1️⃣ Sign out from Firebase
      await signOut(auth);

      // 2️⃣ Call backend to destroy JWT cookie
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to logout from server');
      }

      return true;
    },

    onSuccess: () => {
      toast.success('Logged out successfully!');
      router.replace('/auth/login'); // redirect to login
    },

    onError: (err: unknown) => {
      console.error(err);
      toast.error('Logout failed');
    },
  });
}
