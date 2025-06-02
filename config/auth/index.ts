import { AxiosRequestConfig } from "axios";

import { LoginResponse, SignupResponse } from "@/types/auth";

// LOGIN

export const LoginMutationConfig = {
  mutationKey: ["auth", "login"],
};

export const LoginAxiosConfig: AxiosRequestConfig<LoginResponse> = {
  method: "POST",
  url: "/api/v1/auth/login",
};

// SIGNUP

export const SignupMutationConfig = {
  mutationKey: ["auth", "signup"],
};

export const SignupAxiosConfig: AxiosRequestConfig<SignupResponse> = {
  method: "POST",
  url: "/api/v1/auth/signup",
};
