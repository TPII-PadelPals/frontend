"use client";

import { LogInForm } from "@/components/LoginForm";
import useLogin from "@/hooks/auth/useLogin";

export default function LoginPage() {
  const { mutateLogin } = useLogin();

  return <LogInForm onSubmit={mutateLogin} />;
}
