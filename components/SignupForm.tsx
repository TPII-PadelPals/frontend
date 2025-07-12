"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Phone, Check, X } from "lucide-react";
import { useState, useCallback, useMemo } from "react";

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
import { SignupFormSchema } from "@/schemas/auth";
import { SignupInputs, SignupMutationInputs } from "@/types/auth";

export const SignupForm = ({
  onSubmit,
}: {
  onSubmit: (data: SignupMutationInputs) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  const form = useForm<SignupInputs>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
    },
  });

  const { control, handleSubmit, formState: { isSubmitting }, watch } = form;
  
  // Watch password value for real-time validation
  const passwordValue = watch("password") || "";
  
  // Password strength validation
  const passwordStrength = useMemo(() => {
    const checks = {
      length: passwordValue.length >= 8, // Using schema constant
      uppercase: /[A-Z]/.test(passwordValue),
      lowercase: /[a-z]/.test(passwordValue),
      number: /[0-9]/.test(passwordValue),
    };

    const score = Object.values(checks).filter(Boolean).length;
    
    return {
      checks,
      score,
      strength: score < 2 ? 'weak' : score < 3 ? 'medium' : score === 4 ? 'strong' : 'medium',
      isValid: checks.length && checks.uppercase && checks.lowercase && checks.number
    };
  }, [passwordValue]);

  const handleOnSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await handleSubmit((data: SignupInputs) => onSubmit({ data }))();
    },
    [handleSubmit, onSubmit]
  );

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">
          Unite a PadelPals
        </h2>
        <p className="text-sm text-gray-600">
          Crea tu cuenta y comienza a administrar tus canchas.
        </p>
      </div>

      {/* Formulario */}
      <Form {...form}>
        <form onSubmit={handleOnSubmit} className="space-y-6">
          {/* Primera fila - Nombre y Teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Nombre completo
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Tu nombre"
                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage style={{ height: "5px"}} />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Teléfono
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="tel"
                        placeholder="+54 9 11 1234-5678"
                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Segunda fila - Email y Contraseña */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Correo electrónico
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Contraseña
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                        onFocus={() => setShowPasswordModal(true)}
                        {...field}
                        onBlur={(e) => {
                          // Keep modal open if clicking inside it
                          const relatedTarget = e.relatedTarget as HTMLElement;
                          if (!relatedTarget || !relatedTarget.closest('[data-password-modal]')) {
                            setTimeout(() => setShowPasswordModal(false), 150);
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                  
                  {/* Validation Modal positioned below input */}
                  {showPasswordModal && passwordValue.length > 0 && (
                    <div 
                      data-password-modal
                      className="absolute top-full left-0 right-0 z-50 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Lock className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-gray-700">
                              Requisitos de contraseña
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowPasswordModal(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Barra de fortaleza */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-gray-700">
                              Fortaleza
                            </span>
                            <span className={`text-xs font-medium capitalize ${
                              passwordStrength.strength === 'weak' ? 'text-red-600' :
                              passwordStrength.strength === 'medium' ? 'text-yellow-600' :
                              'text-blue-600'
                            }`}>
                              {passwordStrength.strength === 'weak' ? 'Débil' :
                               passwordStrength.strength === 'medium' ? 'Media' : 'Fuerte'}
                            </span>
                          </div>
                          
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                passwordStrength.strength === 'weak' ? 'bg-red-500 w-1/4' :
                                passwordStrength.strength === 'medium' ? 'bg-yellow-500 w-2/4' :
                                'bg-blue-500 w-full'
                              }`}
                            />
                          </div>
                        </div>

                        {/* Checklist compacto */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className={`flex items-center space-x-2 text-xs ${
                            passwordStrength.checks.length ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                            {passwordStrength.checks.length ? (
                              <Check className="h-3 w-3 flex-shrink-0" />
                            ) : (
                              <X className="h-3 w-3 flex-shrink-0" />
                            )}
                            <span>8+ caracteres</span>
                          </div>
                          
                          <div className={`flex items-center space-x-2 text-xs ${
                            passwordStrength.checks.uppercase ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                            {passwordStrength.checks.uppercase ? (
                              <Check className="h-3 w-3 flex-shrink-0" />
                            ) : (
                              <X className="h-3 w-3 flex-shrink-0" />
                            )}
                            <span>Mayúscula</span>
                          </div>
                          
                          <div className={`flex items-center space-x-2 text-xs ${
                            passwordStrength.checks.lowercase ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                            {passwordStrength.checks.lowercase ? (
                              <Check className="h-3 w-3 flex-shrink-0" />
                            ) : (
                              <X className="h-3 w-3 flex-shrink-0" />
                            )}
                            <span>Minúscula</span>
                          </div>
                          
                          <div className={`flex items-center space-x-2 text-xs ${
                            passwordStrength.checks.number ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                            {passwordStrength.checks.number ? (
                              <Check className="h-3 w-3 flex-shrink-0" />
                            ) : (
                              <X className="h-3 w-3 flex-shrink-0" />
                            )}
                            <span>Número</span>
                          </div>
                        </div>
                        
                        {/* Score indicator compacto */}
                        <div className="flex items-center justify-between text-xs bg-gray-50 rounded-lg p-2">
                          <span className="text-gray-600">
                            Puntuación: {passwordStrength.score}/4
                          </span>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            passwordStrength.isValid ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {passwordStrength.isValid ? 'Válida' : 'Inválida'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:translateY-[-1px] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>Creando cuenta...</span>
              </div>
            ) : (
              "Crear mi cuenta"
            )}
          </Button>
        </form>
      </Form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-slate-50 text-gray-500">o</span>
        </div>
      </div>

      {/* Toggle hacia Login */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?
        </p>
        <Link
          href="/auth/log-in"
          className="mt-2 inline-flex items-center justify-center w-full h-12 px-4 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
};
