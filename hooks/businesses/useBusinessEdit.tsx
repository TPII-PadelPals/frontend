import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useCallback } from "react";

import {
  BusinessEditAxiosConfig,
  BusinessEditMutationConfig,
} from "@/config/businesses";
import useAxios from "@/hooks/useAxios";
import { onError } from "@/hooks/utils";
import { ApiResponseError } from "@/types/api";
import {
  BusinessEditMutationInputs,
  BusinessEditResponse,
} from "@/types/businesses";
import { useToast } from "@/hooks/use-toast";

export default function useBusinessEdit({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const axios: AxiosInstance = useAxios({ needAuth: true });
  const { toast } = useToast();

  const onHookSuccess = useCallback(
    (_: AxiosResponse<BusinessEditResponse>) => {
      if (onSuccess) {
        onSuccess();
      }
    },
    [onSuccess]
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
    isPending: isPendingEdit,
    mutate: mutateEdit,
    error: errorEdit,
    isError: isErrorEdit,
  } = useMutation<
    AxiosResponse<BusinessEditResponse>,
    AxiosError<ApiResponseError>,
    BusinessEditMutationInputs,
    unknown
  >({
    mutationKey: BusinessEditMutationConfig.mutationKey,
    mutationFn: async ({ business_public_id, data }: BusinessEditMutationInputs) => {
      const response = await axios.request({
        ...BusinessEditAxiosConfig(business_public_id),
        data,
      });

      return response;
    },
    onError: onHookError,
    onSuccess: onHookSuccess,
  });

  return {
    isPendingEdit,
    mutateEdit,
    errorEdit,
    isErrorEdit,
  };
}
