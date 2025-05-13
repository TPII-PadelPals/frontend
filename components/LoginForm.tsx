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
import { LoginFormSchema } from "@/schemas/auth";
import { LoginInputs, LoginMutationInputs } from "@/types/auth";
import { useCallback } from "react";

export const LogInForm = ({
  onSubmit,
}: {
  onSubmit: (data: LoginMutationInputs) => void;
}) => {
  const form = useForm<LoginInputs>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit } = form;

  const handleOnSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await handleSubmit((data: LoginInputs) => onSubmit({ data }))();
    },
    [handleSubmit, onSubmit]
  );

  return (
    <div className="flex flex-col items-center">
      <Form {...form}>
        <form onSubmit={handleOnSubmit} className="min-w-80 w-1/3 space-y-5">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="contraseña" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Iniciar sesión
          </Button>
        </form>
      </Form>
    </div>
  );
};
