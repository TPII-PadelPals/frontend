import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useCallback } from "react";

import {
  CourtCreateAxiosConfig,
  CourtCreateMutationConfig,
} from "@/config/businesses";
import useAxios from "@/hooks/useAxios";
import { onError } from "@/hooks/utils";
import { ApiResponseError } from "@/types/api";
import {
  CourtCreateMutationInputs,
  CourtCreateResponse,
} from "@/types/businesses";
import { useToast } from "../use-toast";

export default function useCourtCreate({
  onSuccess,
  businessPublicId,
}: {
  onSuccess?: () => void;
  businessPublicId: string;
}) {
  const axios: AxiosInstance = useAxios({ needAuth: true });
  const { toast } = useToast();

  const onHookSuccess = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: AxiosResponse<CourtCreateResponse>) => {
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
    AxiosResponse<CourtCreateResponse>,
    AxiosError<ApiResponseError>,
    CourtCreateMutationInputs,
    unknown
  >({
    mutationKey: CourtCreateMutationConfig.mutationKey,
    mutationFn: async ({ data }: CourtCreateMutationInputs) => {
      const CreateJson = {
        name: data.name,
        price_per_hour: data.price_per_hour,
      };

      const response: AxiosResponse<CourtCreateResponse> = await axios.request({
        ...CourtCreateAxiosConfig(businessPublicId),
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
