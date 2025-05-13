"use client";

import { SignupForm } from "@/components/SignupForm";
import useSignup from "@/hooks/auth/useSignup";

export default function SignupPage() {
  const { mutateSignup, isPendingSignup } = useSignup();

  return (
    <div className="flex flex-col items-center">
      {isPendingSignup && <div className="mb-4 text-blue-600">Cargando...</div>}
      <SignupForm onSubmit={mutateSignup} />
    </div>
  );
}
