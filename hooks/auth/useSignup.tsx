import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useCallback } from "react";

import { SignupAxiosConfig, SignupMutationConfig } from "@/config/auth";
import { useToast } from "@/hooks/use-toast";
import useAxios from "@/hooks/useAxios";
import { onError } from "@/hooks/utils";
import { hashPassword } from "@/lib/utils";
import { ApiResponseError } from "@/types/api";
import { SignupMutationInputs, SignupResponse } from "@/types/auth";

export default function useSignup() {
  const axios: AxiosInstance = useAxios({ needAuth: false });
  const { toast } = useToast();

  const onSuccess = useCallback(() => {
    toast({
      title: `Registro exitoso!`,
      variant: "success",
    });
  }, [toast]);

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
    isPending: isPendingSignup,
    mutate: mutateSignup,
    error: errorSignup,
    isError: isErrorSignup,
  } = useMutation<
    AxiosResponse<SignupResponse>,
    AxiosError<ApiResponseError>,
    SignupMutationInputs,
    unknown
  >({
    mutationKey: SignupMutationConfig.mutationKey,
    mutationFn: async ({ data }: SignupMutationInputs) => {
      const password = await hashPassword(data.password).then(
        (hashedPassword) => {
          return hashedPassword;
        }
      );

      const SignupJson = {
        email: data.email,
        password: password,
        name: data.name,
        phone: data.phone,
      };

      const response: AxiosResponse<SignupResponse> = await axios.request({
        ...SignupAxiosConfig,
        data: SignupJson,
      });

      return response;
    },
    onError: onHookError,
    onSuccess,
  });

  return {
    isPendingSignup,
    mutateSignup,
    errorSignup,
    isErrorSignup,
  };
}
