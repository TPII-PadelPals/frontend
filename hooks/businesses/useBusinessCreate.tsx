import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useCallback } from "react";

import {
  BusinessCreateAxiosConfig,
  BusinessCreateMutationConfig,
} from "@/config/businesses";
import useAxios from "@/hooks/useAxios";
import { onError } from "@/hooks/utils";
import { ApiResponseError } from "@/types/api";
import {
  BusinessCreateMutationInputs,
  BusinessCreateResponse,
} from "@/types/businesses";
import { useToast } from "../use-toast";

export default function useBusinessCreate({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const axios: AxiosInstance = useAxios({ needAuth: true });
  const { toast } = useToast();

  const onHookSuccess = useCallback(
    (_: AxiosResponse<BusinessCreateResponse>) => {
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
    isPending: isPendingCreate,
    mutate: mutateCreate,
    error: errorCreate,
    isError: isErrorCreate,
  } = useMutation<
    AxiosResponse<BusinessCreateResponse>,
    AxiosError<ApiResponseError>,
    BusinessCreateMutationInputs,
    unknown
  >({
    mutationKey: BusinessCreateMutationConfig.mutationKey,
    mutationFn: async ({ data }: BusinessCreateMutationInputs) => {
      const CreateJson = {
        name: data.name,
        location: data.location,
      };

      const response: AxiosResponse<BusinessCreateResponse> =
        await axios.request({
          ...BusinessCreateAxiosConfig,
          data: CreateJson,
        });

      return response;
    },
    onError: onHookError,
    onSuccess: onHookSuccess,
  });

  return {
    isPendingCreate,
    mutateCreate,
    errorCreate,
    isErrorCreate,
  };
}
