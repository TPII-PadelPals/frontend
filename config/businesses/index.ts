import {
  BusinessCreateResponse,
  BusinessesListResponse,
  CourtCreateResponse,
  CourtsListResponse,
} from "@/types/businesses";
import { AxiosRequestConfig } from "axios";

// Businesses list

export const BusinessesListConfig = {
  queryKey: ["businesses", "list"],
};

export const BusinessesListAxiosConfig: AxiosRequestConfig<BusinessesListResponse> =
  {
    method: "GET",
    url: "/api/v1/businesses/",
  };

// Businesses create

export const BusinessCreateMutationConfig = {
  mutationKey: ["businesses", "create"],
};

export const BusinessCreateAxiosConfig: AxiosRequestConfig<BusinessCreateResponse> =
  {
    method: "POST",
    url: "/api/v1/businesses/",
  };

// Courts list

export const CourtsListConfig = (business_public_id: string) => {
  return {
    queryKey: ["courts", "list", business_public_id],
  };
};

export const CourtsListAxiosConfig = (
  business_public_id: string
): AxiosRequestConfig<CourtsListResponse> => ({
  method: "GET",
  url: `/api/v1/padel-courts/`,
  params: {
    business_public_id,
  },
});

// Courts create

export const CourtCreateMutationConfig = {
  mutationKey: ["courts", "create"],
};

export const CourtCreateAxiosConfig = (
  business_public_id: string
): AxiosRequestConfig<CourtCreateResponse> => ({
  method: "POST",
  url: "/api/v1/padel-courts/",
  params: {
    business_public_id,
  },
});
