import {
  ApiResponseError,
  ApiResponseGatewayError,
  ApiResponseServicesError,
} from "@/types/api";
import { AxiosError } from "axios";

function isGatewayError(data: any): data is ApiResponseGatewayError {
  return typeof data?.message === "string";
}

function isServicesError(data: any): data is ApiResponseServicesError {
  return typeof data?.detail === "string";
}

export const onError = (error: AxiosError<ApiResponseError>) => {
  if (error.response) {
    // Server responded with a status other than 200 range
    console.log("Response error:", JSON.stringify(error.response));
  } else if (error.request) {
    // Request was made but no response received
    console.log("Request error:", JSON.stringify(error.request));
  } else {
    // Something else happened
    console.log("Error:", JSON.stringify(error.message));
  }
  const data = error.response?.data;
  let message = "Hubo un problema, por favor intente más tarde";
  if (isGatewayError(data)) {
    message = data.message;
  } else if (isServicesError(data)) {
    message = data.detail;
  }

  return message;
};
