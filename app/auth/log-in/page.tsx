"use client";

import { LogInForm } from "@/components/LoginForm";
import useLogin from "@/hooks/auth/useLogin";

export default function LoginPage() {
  const { mutateLogin, isPendingLogin } = useLogin();

  return (
    <div className="flex flex-col items-center">
      {isPendingLogin && <div className="mb-4 text-blue-600">Cargando...</div>}
      <LogInForm onSubmit={mutateLogin} />
    </div>
  );
}
