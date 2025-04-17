'use client'

import { AuthForm } from '@/components/AuthForm'
import { useToast } from '@/hooks/use-toast';

export default function SignupPage() {
  const { toast } = useToast();

  const handleSignup = (data: { email: string; password: string; username: string }) => {
    console.log(data)
    // TODO: pegarle al endpoint de registro
    toast({
      title: `Registro exitoso!`,
      variant: "success",
    })
  }

  return <AuthForm type="signup" onSubmit={handleSignup} />
}
