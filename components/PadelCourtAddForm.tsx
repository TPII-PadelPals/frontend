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
import { CourtCreateFormSchema } from "@/schemas/businesses";
import {
  CourtCreateInputs,
  CourtCreateMutationInputs,
} from "@/types/businesses";
import { useCallback } from "react";

export function PadelCourtAddForm({
  onSubmit,
  onClose,
}: {
  onSubmit: (data: CourtCreateMutationInputs) => void;
  onClose: () => void;
}) {
  const form = useForm<CourtCreateInputs>({
    resolver: zodResolver(CourtCreateFormSchema),
    defaultValues: {
      name: "",
      price_per_hour: "",
    },
  });

  const { control, handleSubmit } = form;

  const handleOnSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await handleSubmit((data: CourtCreateInputs) => onSubmit({ data }))();
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
            <Button
              type="button"
              variant="destructive"
              className="basis-2/5"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button type="submit" className="basis-3/5">
              Crear Cancha
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
