export type ApiResponseGatewayError = {
  message: string;
};

export type ApiResponseServicesError = {
  detail: string;
};

export type ApiResponseError =
  | ApiResponseGatewayError
  | ApiResponseServicesError;

export type ApiResponse<T> = T;
