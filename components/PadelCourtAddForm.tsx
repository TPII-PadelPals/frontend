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
import { Input } from "@/components/ui/input"

export const formSchema = z.object({
    name: z
        .string()
        .min(3, "El mínimo de caracteres es 3.")
        .max(100, "El máximo de caracteres para el nombre es 100."),
    price_per_hour: z
        .string({required_error: "El campo es requerido."})
        .regex(/^\d+$/, "El precio debe ser un número mayor a 0")
  });
  
export type PadelCourtFormValues = z.infer<typeof formSchema>;

export function PadelCourtAddForm(
  {
    onSubmit,
    onClose,
  }: {
    onSubmit: (data: { name: string; price_per_hour: string }) => void;
    onClose: () => void;
  }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  return (
    <div className="flex flex-col items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-80 w-1/3 space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                <Input type="text" placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price_per_hour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio alquiler por hora</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="20000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button type="button" variant="destructive" className="basis-2/5" onClick={onClose}>Cancelar</Button>
            <Button type="submit" className="basis-3/5">Crear Cancha</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
