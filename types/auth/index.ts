import { LoginFormSchema } from "@/schemas/auth";
import { ApiResponse } from "@/types/api";
import { z } from "zod";

export interface SessionStore {
  token: null | string;
  uuid: null | string;
  authenticated: null | boolean;
  setAuthenticated: (authenticated: boolean) => void;
  setLoginData: (data: LoginResponseBody) => void;
  initialize: () => void;
  onLogout: () => void;
}

// LOGIN

export type LoginResponseBody = {
  uuid: string;
  token: string;
};

export type LoginResponse = ApiResponse<LoginResponseBody>;
export type LoginInputs = z.infer<typeof LoginFormSchema>;
export type LoginMutationInputs = { data: LoginInputs };
