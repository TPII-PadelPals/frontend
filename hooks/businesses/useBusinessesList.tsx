import {
  BusinessesListAxiosConfig,
  BusinessesListConfig,
} from "@/config/businesses";
import {
  BusinessesListResponse,
  BusinessesListResponseBody,
} from "@/types/businesses";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import useAxios from "../useAxios";

const useBusinessesList = () => {
  const axios: AxiosInstance = useAxios({ needAuth: true });

  const {
    isLoading: businessesIsLoading,
    isError: businessesIsError,
    data: businessesData,
    error: businessesError,
  } = useQuery<
    AxiosResponse<BusinessesListResponse>,
    AxiosError<BusinessesListResponse>
  >({
    queryKey: BusinessesListConfig.queryKey,
    queryFn: () => {
      return axios.request(BusinessesListAxiosConfig);
    },
  });

  return {
    businessesIsLoading,
    businessesIsError,
    businessesData: businessesData?.data ?? ({} as BusinessesListResponseBody),
    businessesError: businessesError ?? "Se ha producido un error inesperado",
  };
};

export default useBusinessesList;
