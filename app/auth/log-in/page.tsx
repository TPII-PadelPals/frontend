'use client'

import { AuthForm } from '@/components/AuthForm'

export default function LoginPage() {
  const handleLogin = (data: { email: string; password: string }) => {
    console.log(data)
    // TODO: lógica de login.
    window.location.href = "/"
  }

  return <AuthForm type="login" onSubmit={handleLogin} />
}
