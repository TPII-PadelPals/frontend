import { AxiosRequestConfig } from "axios";

import { LoginResponse } from "@/types/auth";

// LOGIN

export const LoginMutationConfig = {
  mutationKey: ["auth", "login"],
};

export const LoginAxiosConfig: AxiosRequestConfig<LoginResponse> = {
  method: "POST",
  url: "/api/v1/auth/login",
};
