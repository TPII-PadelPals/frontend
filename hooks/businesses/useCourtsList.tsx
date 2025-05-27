import { CourtsListAxiosConfig, CourtsListConfig } from "@/config/businesses";
import { CourtsListResponse, CourtsListResponseBody } from "@/types/businesses";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import useAxios from "../useAxios";

const useCourtsList = ({ businessPublicId }: { businessPublicId: string }) => {
  const axios: AxiosInstance = useAxios({ needAuth: true });

  const {
    isLoading: courtsIsLoading,
    isError: courtsIsError,
    data: courtsData,
    error: courtsError,
  } = useQuery<
    AxiosResponse<CourtsListResponse>,
    AxiosError<CourtsListResponse>
  >({
    queryKey: CourtsListConfig(businessPublicId).queryKey,
    queryFn: () => {
      return axios.request(CourtsListAxiosConfig(businessPublicId));
    },
  });

  return {
    courtsIsLoading,
    courtsIsError,
    courtsData: courtsData?.data ?? ({} as CourtsListResponseBody),
    courtsError: courtsError ?? "Se ha producido un error inesperado",
  };
};

export default useCourtsList;
