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
    location: z.string(),
  });
  
export type BusinessFormValues = z.infer<typeof formSchema>;

export function BusinessAddForm(
  {
    onSubmit,
    onClose,
    ownerId,
  }: {
    onSubmit: (data: { name: string; location: string }, ownerId: string | undefined) => void;
    onClose: () => void;
    ownerId: string | undefined; 
  }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
    },
  })
  const handleFormSubmit = (data: { name: string; location: string }) => {
    onSubmit(data, ownerId);
  };

  return (
    <div className="flex flex-col items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="min-w-80 w-1/3 space-y-6">
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Av Paseo Colon 850, CABA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button type="button" variant="destructive" className="basis-2/5" onClick={onClose}>Cancelar</Button>
            <Button type="submit" className="basis-3/5">Crear Establecimiento</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
