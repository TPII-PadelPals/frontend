import { z } from "zod";

const REQUIRED_FIELD: string = "Este campo es requerido";
const INVALID_EMAIL_FIELD: string = "Email inválido";

const USER_NAME_LENGTH: number = 50;
const USER_EMAIL_LENGTH: number = 100;
const USER_PASSWORD_LENGTH: number = 8;
const USER_PHONE_LENGTH: number = 15;

export const LoginFormSchema = z.object({
  email: z
    .string({ required_error: REQUIRED_FIELD })
    .min(1, REQUIRED_FIELD)
    .max(USER_EMAIL_LENGTH)
    .email(INVALID_EMAIL_FIELD),
  password: z
    .string({ required_error: REQUIRED_FIELD })
    .min(1, REQUIRED_FIELD)
    .min(USER_PASSWORD_LENGTH, "Debe contener al menos 8 caracteres"),
});

export const SignupFormSchema = z.object({
  name: z
    .string({ required_error: REQUIRED_FIELD })
    .min(1, REQUIRED_FIELD)
    .max(USER_NAME_LENGTH),
  email: z
    .string({ required_error: REQUIRED_FIELD })
    .min(1, REQUIRED_FIELD)
    .max(USER_EMAIL_LENGTH)
    .email(INVALID_EMAIL_FIELD),
  password: z
    .string({ required_error: REQUIRED_FIELD })
    .min(1, REQUIRED_FIELD)
    .min(USER_PASSWORD_LENGTH, "Debe contener al menos 8 caracteres"),
  phone: z
    .string({ required_error: REQUIRED_FIELD })
    .min(1, REQUIRED_FIELD)
    .max(USER_PHONE_LENGTH),
});

// Schema de contraseña con validaciones completas
const passwordSchema = z
  .string({ required_error: REQUIRED_FIELD })
  .min(1, REQUIRED_FIELD)
  .min(USER_PASSWORD_LENGTH, "Debe contener al menos 8 caracteres")
  .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
  .regex(/[0-9]/, "Debe contener al menos un número")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      "La contraseña debe contener al menos: 8 caracteres, 1 mayúscula y 1 número",
  });

// Alternativa más específica con múltiples validaciones
const passwordSchemaDetailed = z
  .string({ required_error: REQUIRED_FIELD })
  .min(1, REQUIRED_FIELD)
  .superRefine((password, ctx) => {
    // Validar longitud mínima
    if (password.length < USER_PASSWORD_LENGTH) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: USER_PASSWORD_LENGTH,
        type: "string",
        inclusive: true,
        message: "Debe contener al menos 8 caracteres",
      });
    }

    // Validar al menos una mayúscula
    if (!/[A-Z]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Debe contener al menos una letra mayúscula",
      });
    }

    // Validar al menos un número
    if (!/[0-9]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Debe contener al menos un número",
      });
    }

    // Validar al menos una minúscula (opcional)
    if (!/[a-z]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Debe contener al menos una letra minúscula",
      });
    }
  });

// Schema con validaciones opcionales adicionales (caracteres especiales)
const passwordSchemaAdvanced = z
  .string({ required_error: REQUIRED_FIELD })
  .min(1, REQUIRED_FIELD)
  .min(USER_PASSWORD_LENGTH, "Debe contener al menos 8 caracteres")
  .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
  .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
  .regex(/[0-9]/, "Debe contener al menos un número")
  // Opcional: caracteres especiales
  // .regex(/[!@#$%^&*(),.?":{}|<>]/, "Debe contener al menos un carácter especial")
  .max(128, "La contraseña no puede exceder 128 caracteres");

// Función helper para validar contraseña programáticamente
export const validatePasswordStrength = (password: string) => {
  const checks = {
    length: password.length >= USER_PASSWORD_LENGTH,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  return {
    checks,
    score,
    strength: score < 3 ? "weak" : score < 4 ? "medium" : "strong",
    isValid: checks.length && checks.uppercase && checks.number,
  };
};

// Exportar el schema principal
export { passwordSchema, passwordSchemaAdvanced, passwordSchemaDetailed };
