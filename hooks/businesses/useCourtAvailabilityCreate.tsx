import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosInstance } from "axios";
import { useCallback } from "react";

import {
  CourtAvailabilityCreateAxiosConfig,
  CourtAvailabilityCreateMutationConfig,
} from "@/config/businesses";
import useAxios from "@/hooks/useAxios";
import { onError } from "@/hooks/utils";
import { ApiResponseError } from "@/types/api";
import { CourtAvailabilityCreateMutationInputs } from "@/types/businesses";
import { useToast } from "../use-toast";

export default function useCourtAvailabilityCreate({
  onSuccess,
  business_public_id,
  court_public_id,
  court_name,
}: {
  onSuccess?: () => void;
  business_public_id: string;
  court_public_id: string;
  court_name: string;
}) {
  const axios: AxiosInstance = useAxios({ needAuth: true });
  const { toast } = useToast();

  const onHookSuccess = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: void) => {
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

  const requestPerDate = async (
    CreateJson: {
      initial_hour: number;
      n_matches: number;
      business_public_id: string;
      court_public_id: string;
      court_name: string;
    },
    date: string
  ) => {
    await axios.request({
      ...CourtAvailabilityCreateAxiosConfig(business_public_id, court_name),
      data: { ...CreateJson, date: date },
    });
  };

  const {
    isPending: isPendingCreate,
    mutate: mutateCreate,
    error: errorCreate,
    isError: isErrorCreate,
  } = useMutation<
    void,
    AxiosError<ApiResponseError>,
    CourtAvailabilityCreateMutationInputs,
    unknown
  >({
    mutationKey: CourtAvailabilityCreateMutationConfig(
      business_public_id,
      court_public_id
    ).mutationKey,
    mutationFn: async ({ data }: CourtAvailabilityCreateMutationInputs) => {
      const CreateJson = {
        initial_hour: data.initial_hour,
        n_matches: data.n_matches,
        business_public_id,
        court_public_id,
        court_name,
      };

      const dates = () => {
        const startDate = new Date(data.date_from);
        const endDate = new Date(data.date_to);
        const dateArray: string[] = [];
        while (startDate <= endDate) {
          const dateString = startDate.toISOString().split("T")[0];
          dateArray.push(dateString);
          startDate.setDate(startDate.getDate() + 1);
        }
        return dateArray;
      };

      const responses = await Promise.all(
        dates().map((date) => requestPerDate(CreateJson, date))
      );

      return responses[0];
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
