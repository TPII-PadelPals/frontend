import {
  MatchesListAxiosConfig,
  MatchesListConfig,
} from "@/config/matches";
import { Match, MatchesListResponse } from "@/types/matches";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosInstance } from "axios";
import useAxios from "../useAxios";

const useMatchesList = ({
  court_public_id,
  dates,
}: {
  court_public_id: string;
  dates: string[];
}) => {
  const axios: AxiosInstance = useAxios({ needAuth: true });

  const requestPerDate = (date: string) => {
    return axios.request(
      MatchesListAxiosConfig(court_public_id, date)
    );
  };

  const {
    isLoading: matchesIsLoading,
    isError: matchesIsError,
    data: matchesData,
    error: matchesError,
  } = useQuery<
    MatchesListResponse,
    AxiosError<MatchesListResponse>
  >({
    queryKey: MatchesListConfig(
      court_public_id,
      dates.join(",")
    ).queryKey,
    queryFn: async () => {
      const responses = await Promise.all(dates.map(requestPerDate));
      const data = responses.map((response) => response.data);
      const mergedData = data.reduce(
        (acc, curr) => ({
          ...acc,
          data: [...acc.data, ...curr.data],
          count: acc.count + curr.count,
        }),
        { data: [], count: 0 }
      );
      return mergedData;
    },
  });

  return {
    matchesIsLoading,
    matchesIsError,
    matchesData:
      matchesData ??
      ({
        data: [{} as Match],
        count: 0,
      } as MatchesListResponse),
    matchesError:
      matchesError ?? "Se ha producido un error inesperado",
  };
};

export default useMatchesList;
