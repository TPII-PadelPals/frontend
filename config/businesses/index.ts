import {
  BusinessCreateResponse,
  BusinessesListResponse,
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
