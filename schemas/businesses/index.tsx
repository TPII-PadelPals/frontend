import { z } from "zod";

const REQUIRED_FIELD: string = "Este campo es requerido";

export const BusinessCreateFormSchema = z.object({
  name: z
    .string({ required_error: REQUIRED_FIELD })
    .min(3, "El mínimo de caracteres es 3.")
    .max(100, "El máximo de caracteres para el nombre es 100."),
  location: z.string({ required_error: REQUIRED_FIELD }).min(1, REQUIRED_FIELD),
});

export const CourtCreateFormSchema = z.object({
  name: z
    .string({ required_error: REQUIRED_FIELD })
    .min(3, "El mínimo de caracteres es 3.")
    .max(100, "El máximo de caracteres para el nombre es 100."),
  price_per_hour: z
    .string({ required_error: REQUIRED_FIELD })
    .min(1, REQUIRED_FIELD)
    .regex(/^\d+$/, "El precio debe ser un número mayor a 0"),
});
