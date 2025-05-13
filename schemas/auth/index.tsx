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
    .max(USER_PASSWORD_LENGTH),
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
    .max(USER_PASSWORD_LENGTH),
  phone: z
    .string({ required_error: REQUIRED_FIELD })
    .min(1, REQUIRED_FIELD)
    .max(USER_PHONE_LENGTH),
});
