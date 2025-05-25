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
import { CourtAvailabilityCreateFormSchema } from "@/schemas/businesses";
import {
  CourtAvailabilityCreateInputs,
  CourtAvailabilityCreateMutationInputs,
} from "@/types/businesses";
import { useCallback } from "react";

export function PAdelCourtAvailabilityAddForm({
  onSubmit,
  onClose,
}: {
  onSubmit: (data: CourtAvailabilityCreateMutationInputs) => void;
  onClose: () => void;
}) {
  const form = useForm<CourtAvailabilityCreateInputs>({
    resolver: zodResolver(CourtAvailabilityCreateFormSchema),
    defaultValues: {
      date_from: new Date().toISOString().split("T")[0],
      date_to: new Date().toISOString().split("T")[0],
      initial_hour: 7,
      n_matches: 1,
    },
  });

  const { control, handleSubmit } = form;

  const handleOnSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await handleSubmit((data: CourtAvailabilityCreateInputs) =>
        onSubmit({ data })
      )();
    },
    [handleSubmit, onSubmit]
  );

  return (
    <div className="flex flex-col items-center">
      <Form {...form}>
        <form onSubmit={handleOnSubmit} className="min-w-80 w-1/3 space-y-6">
          <FormField
            control={control}
            name="date_from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desde</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="date_to"
            render={({
              field: { onChange, onBlur, value, disabled, name, ref },
            }) => (
              <FormItem>
                <FormLabel>Hasta</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    disabled={disabled}
                    name={name}
                    ref={ref}
                    placeholder="dd/mm/yyyy"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="initial_hour"
            render={({
              field: { onChange, onBlur, value, disabled, name, ref },
            }) => (
              <FormItem>
                <FormLabel>Horario inicial</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      onChange(value);
                    }}
                    onBlur={onBlur}
                    value={value}
                    disabled={disabled}
                    name={name}
                    ref={ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="n_matches"
            render={({
              field: { onChange, onBlur, value, disabled, name, ref },
            }) => (
              <FormItem>
                <FormLabel>Horas disponibles</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      onChange(value);
                    }}
                    onBlur={onBlur}
                    value={value}
                    disabled={disabled}
                    name={name}
                    ref={ref}
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
              Agregar Disponibilidad
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
