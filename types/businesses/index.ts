import {
  BusinessCreateFormSchema,
  CourtAvailabilityCreateFormSchema,
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

// Businesses edit
export type BusinessEditResponseBody = Business;

export type BusinessEditResponse = ApiResponse<BusinessEditResponseBody>;
export type BusinessEditInputs = z.infer<typeof BusinessCreateFormSchema>;

export type BusinessEditMutationInputs = {
  business_public_id: string;
  data: BusinessEditInputs;
};

// Court

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

// Courts List

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

// Court availability

export type CourtAvailability = {
  court_name: string;
  court_public_id: string;
  business_public_id: string;
  date: string;
  initial_hour: number;
  reserve: false;
  latitude: number;
  longitude: number;
};

export type CourtAvailabilityCreate = {
  court_name: string;
  court_public_id: string;
  business_public_id: string;
  date: string;
  initial_hour: number;
  n_matches: number;
};

export type CourtsAvailabilityListResponseBody = {
  data: [CourtAvailability];
  count: number;
};

// Court Availability List

export type CourtsAvailabilityListResponse =
  ApiResponse<CourtsAvailabilityListResponseBody>;

// Court Availability create

export type CourtAvailabilityCreateResponseBody =
  CourtsAvailabilityListResponse;

export type CourtAvailabilityCreateResponse =
  ApiResponse<CourtAvailabilityCreateResponseBody>;
export type CourtAvailabilityCreateInputs = z.infer<
  typeof CourtAvailabilityCreateFormSchema
>;
export type CourtAvailabilityCreateMutationInputs = {
  data: CourtAvailabilityCreateInputs;
};
