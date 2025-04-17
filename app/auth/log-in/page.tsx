'use client'
import { useRouter } from 'next/navigation'

import { AuthForm } from '@/components/AuthForm'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (data: { email: string; password: string }) => {
    console.log(data)
    // TODO: lógica de login.
    router.push('/my-businesses')
  }

  return <AuthForm type="login" onSubmit={handleLogin} />
}
