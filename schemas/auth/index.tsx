import { z } from "zod";

const REQUIRED_FIELD: string = "Este campo es requerido";
const INVALID_EMAIL_FIELD: string = "Email inválido";

const USER_PASSWORD_LENGTH: number = 8;
const USER_EMAIL_LENGTH: number = 100;

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
