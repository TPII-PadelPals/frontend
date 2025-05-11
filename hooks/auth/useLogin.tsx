import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { LoginAxiosConfig, LoginMutationConfig } from "@/config/auth";
import useAxios from "@/hooks/useAxios";
import { onError } from "@/hooks/utils";
import { useSessionStore } from "@/store/sessionStore";
import { ApiResponseError } from "@/types/api";
import {
  LoginMutationInputs,
  LoginResponse,
  LoginResponseBody,
} from "@/types/auth";

export default function useLogin() {
  const axios: AxiosInstance = useAxios({ needAuth: false });
  const router = useRouter();
  const { setLoginData } = useSessionStore();

  const onSuccess = useCallback(
    (data: AxiosResponse<LoginResponse>) => {
      const responseData: LoginResponseBody = data.data;
      setLoginData({
        ...responseData,
      });
    },
    [setLoginData]
  );

  const {
    isPending: isPendingLogin,
    mutate: mutateLogin,
    error: errorLogin,
    isError: isErrorLogin,
  } = useMutation<
    AxiosResponse<LoginResponse>,
    AxiosError<ApiResponseError>,
    LoginMutationInputs,
    unknown
  >({
    mutationKey: LoginMutationConfig.mutationKey,
    mutationFn: async ({ data }: LoginMutationInputs) => {
      console.log("Login data internal:", data);
      const loginJson = {
        email: data.email,
        password: data.password,
      };

      const response: AxiosResponse<LoginResponse> = await axios.request({
        ...LoginAxiosConfig,
        data: loginJson,
      });

      return response;
    },
    onError,
    onSuccess,
  });

  return {
    isPendingLogin,
    mutateLogin,
    errorLogin,
    isErrorLogin,
  };
}
