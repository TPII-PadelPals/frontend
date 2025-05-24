import {
  BusinessCreateFormSchema,
  CourtCreateFormSchema,
} from "@/schemas/businesses";
import { ApiResponse } from "@/types/api";
import { z } from "zod";

export type Business = {
  business_public_id: string;
  owner_id: string;
  latitude: number;
  longitude: number;
  name: string;
  location: string;
};

// Businesses List

export type BusinessesListResponseBody = {
  data: [Business];
  count: number;
};

export type BusinessesListResponse = ApiResponse<BusinessesListResponseBody>;

// Businesses create

export type BusinessCreateResponseBody = Business;

export type BusinessCreateResponse = ApiResponse<BusinessCreateResponseBody>;
export type BusinessCreateInputs = z.infer<typeof BusinessCreateFormSchema>;
export type BusinessCreateMutationInputs = { data: BusinessCreateInputs };

// Courts List

export type Court = {
  business_public_id: string;
  owner_id: string;
  latitude: number;
  longitude: number;
  court_public_id: string;
  name: string;
  price_per_hour: string;
  business_name: string;
  business_location: string;
};

export type CourtsListResponseBody = {
  data: [Court];
  count: number;
};

export type CourtsListResponse = ApiResponse<CourtsListResponseBody>;

// Court create

export type CourtCreateResponseBody = Court;

export type CourtCreateResponse = ApiResponse<CourtCreateResponseBody>;
export type CourtCreateInputs = z.infer<typeof CourtCreateFormSchema>;
export type CourtCreateMutationInputs = { data: CourtCreateInputs };
