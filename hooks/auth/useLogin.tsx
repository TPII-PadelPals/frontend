import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useCallback } from "react";

import { LoginAxiosConfig, LoginMutationConfig } from "@/config/auth";
import useAxios from "@/hooks/useAxios";
import { onError } from "@/hooks/utils";
import { hashPassword } from "@/lib/utils";
import { useSessionStore } from "@/store/sessionStore";
import { ApiResponseError } from "@/types/api";
import {
  LoginMutationInputs,
  LoginResponse,
  LoginResponseBody,
} from "@/types/auth";
import { useToast } from "../use-toast";

export default function useLogin() {
  const axios: AxiosInstance = useAxios({ needAuth: false });
  const { setLoginData } = useSessionStore();
  const { toast } = useToast();

  const onSuccess = useCallback(
    (data: AxiosResponse<LoginResponse>) => {
      const responseData: LoginResponseBody = data.data;
      setLoginData({
        ...responseData,
      });
    },
    [setLoginData]
  );

  const onHookError = useCallback(
    (error: AxiosError<ApiResponseError>) => {
      const message = onError(error);
      toast({
        title: `Error`,
        description: message,
        variant: "destructive",
      });
    },
    [toast]
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
      const password = await hashPassword(data.password).then(
        (hashedPassword) => {
          return hashedPassword;
        }
      );

      const loginJson = {
        email: data.email,
        password: password,
      };

      const response: AxiosResponse<LoginResponse> = await axios.request({
        ...LoginAxiosConfig,
        data: loginJson,
      });

      return response;
    },
    onError: onHookError,
    onSuccess,
  });

  return {
    isPendingLogin,
    mutateLogin,
    errorLogin,
    isErrorLogin,
  };
}
