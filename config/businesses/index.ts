import {
  BusinessCreateResponse,
  BusinessesListResponse,
  CourtCreateResponse,
  CourtsAvailabilityListResponse,
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

// Businesses edit

export const BusinessEditMutationConfig = {
  mutationKey: ["edit"],
};

export const BusinessEditAxiosConfig = (business_public_id: string) => ({
  url: `/api/v1/businesses/${business_public_id}`,
  method: "PATCH",
});

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

// Courts Availability list

export const CourtsAvailabilityListConfig = (
  business_public_id: string,
  court_public_id: string,
  dates: string[] = []
) => {
  return {
    queryKey: [
      "courts",
      "availability",
      "list",
      business_public_id,
      court_public_id,
      ...dates,
    ],
  };
};

export const CourtsAvailabilityListAxiosConfig = (
  business_public_id: string,
  court_public_id: string,
  date: string
): AxiosRequestConfig<CourtsAvailabilityListResponse> => ({
  method: "GET",
  url: `/api/v1/businesses/${business_public_id}/padel-courts/${court_public_id}/available-matches/`,
  params: {
    date,
  },
});

// Courts Availability create

export const CourtAvailabilityCreateMutationConfig = (
  business_public_id: string,
  court_public_id: string
) => ({
  mutationKey: [
    "courts",
    "availability",
    "create",
    business_public_id,
    court_public_id,
  ],
});

export const CourtAvailabilityCreateAxiosConfig = (
  business_public_id: string,
  court_public_id: string
): AxiosRequestConfig<CourtCreateResponse> => ({
  method: "POST",
  url: `/api/v1/businesses/${business_public_id}/padel-courts/${court_public_id}/available-matches/`,
});
