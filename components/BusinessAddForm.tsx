"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BusinessCreateFormSchema } from "@/schemas/businesses";
import {
  BusinessCreateInputs,
  BusinessCreateMutationInputs,
} from "@/types/businesses";
import { useCallback } from "react";

export function BusinessAddForm({
  onSubmit,
  onClose,
}: {
  onSubmit: (data: BusinessCreateMutationInputs) => void;
  onClose: () => void;
}) {
  const form = useForm<BusinessCreateInputs>({
    resolver: zodResolver(BusinessCreateFormSchema),
    defaultValues: {
      name: "",
      location: "",
    },
  });

  const { control, handleSubmit } = form;

  const handleOnSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await handleSubmit((data: BusinessCreateInputs) => onSubmit({ data }))();
    },
    [handleSubmit, onSubmit]
  );

  return (
    <div className="flex flex-col items-center">
      <Form {...form}>
        <form onSubmit={handleOnSubmit} className="min-w-80 w-1/3 space-y-6">
          <FormField
            control={control}
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
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Av Paseo Colon 850, CABA"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="destructive"
              className="basis-2/5"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button type="submit" className="basis-3/5">
              Crear Establecimiento
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
