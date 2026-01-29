'use client';
import { useState } from 'react';
import { DynamicShadcnForm } from '@/components/reusables/dynamicform/dynamicform';
import { generateSchema } from '@/components/reusables/valdiation/valdiation';
import { FieldConfig } from '@/components/reusables/types/types';
import { useForgotPassword } from '../hooks/useForgotPassword';
import Link from 'next/link';

export default function ForgotPasswordPage() {

  const { mutate: forgotMutate, isPending } = useForgotPassword();

  const [defaultValues, setDefaultValues] = useState({ email: '' });

  const fields: FieldConfig[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'you@example.com',
    },
  ];

  const schema = generateSchema(fields);

  const handleSubmit = (data: { email: string }) => {
    forgotMutate(data.email, {
      onSuccess: () => {
        setDefaultValues({ email: '' });
      },
    });
  };

  return (
    <div className="space-y-6 max-w-md mx-auto mt-10">
      <DynamicShadcnForm
        schema={schema}
        fields={fields}
        defaultvalues={defaultValues}
        cardTitle="Forgot Password"
        cardDescription="Enter your email to reset your password"
        submitLabel={isPending ? 'Sending...' : 'Send Reset Link'}
        reset="Reset"
        onSubmit={handleSubmit}
      />

      <div className="flex justify-between text-sm text-blue-600 mt-2">
        <Link href="/auth/login">Back to Login</Link>
        <Link href="/auth/register">Create Account</Link>
      </div>
    </div>
  );
}
