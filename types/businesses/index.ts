import { BusinessCreateFormSchema } from "@/schemas/businesses";
import { ApiResponse } from "@/types/api";
import { z } from "zod";

type Business = {
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