"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Email debe contener al menos 2 caracteres.",
  }),
  password: z.string().min(8, {
    message: "Password debe contener al menos 8 caracteres."
  })
})

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { toast } = useToast();
  
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    toast({
      title: "Registro Exitoso!",
      variant: "success",
    })
  }

  return (
    <div className="flex flex-col items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-80 w-1/3 space-y-6">
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                </FormControl>

                <FormMessage />
                </FormItem>
                
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                    <Input placeholder="contraseña" {...field} />
                </FormControl>

                <FormMessage />
                </FormItem>
                
            )}
            />
            <Button type="submit" className="w-full">Registrate</Button>
          </form>
        </Form>
    </div>
  )
}
