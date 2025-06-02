import { z } from "zod";

const REQUIRED_FIELD: string = "Este campo es requerido";
const MAX_N_MATCHES = 24

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

export const CourtAvailabilityCreateFormSchema = z
  .object({
    date_from: z
      .string({ required_error: REQUIRED_FIELD })
      .min(1, REQUIRED_FIELD)
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido"),
    date_to: z
      .string({ required_error: REQUIRED_FIELD })
      .min(1, REQUIRED_FIELD)
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido"),
    initial_hour: z
      .number({ required_error: REQUIRED_FIELD, invalid_type_error: REQUIRED_FIELD})
      .min(0, "La hora inicial debe ser mayor o igual a 0hs")
      .max(23, "La hora inicial debe ser menor o igual a 23hs"),
    n_matches: z
      .number({ required_error: REQUIRED_FIELD, invalid_type_error: REQUIRED_FIELD})
      .min(1, "El número de partidos debe ser mayor a 0")
  })
  .superRefine((data, ctx) => {
    const dateFrom = new Date(data.date_from);
    const dateTo = new Date(data.date_to);
    if (dateTo < dateFrom) {
      ctx.addIssue({
        path: ["date_to"],
        message: "La fecha 'Hasta' debe ser posterior a la fecha 'Desde'.",
        code: z.ZodIssueCode.custom,
      });
    }

    const maxMatches = MAX_N_MATCHES - data.initial_hour;
    if (data.n_matches > maxMatches) {
      ctx.addIssue({
        path: ["n_matches"],
        message: `Desde las ${data.initial_hour}:00 hs solo hay disponibles ${maxMatches} hora(s) para partidos.`,
        code: z.ZodIssueCode.custom,
      });
    }
  });
