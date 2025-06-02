import {
  CourtsAvailabilityListAxiosConfig,
  CourtsAvailabilityListConfig,
} from "@/config/businesses";
import {
  CourtAvailability,
  CourtsAvailabilityListResponse,
} from "@/types/businesses";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosInstance } from "axios";
import useAxios from "../useAxios";

const useCourtsAvailabilityList = ({
  business_public_id,
  court_public_id,
  dates,
  court_name,
}: {
  business_public_id: string;
  court_public_id: string;
  dates: string[];
  court_name: string;
}) => {
  const axios: AxiosInstance = useAxios({ needAuth: true });

  const requestPerDate = (date: string) => {
    return axios.request(
      CourtsAvailabilityListAxiosConfig(business_public_id, court_name, date)
    );
  };

  const {
    isLoading: courtsAvailabilityIsLoading,
    isError: courtsAvailabilityIsError,
    data: courtsAvailabilityData,
    error: courtsAvailabilityError,
  } = useQuery<
    CourtsAvailabilityListResponse,
    AxiosError<CourtsAvailabilityListResponse>
  >({
    queryKey: CourtsAvailabilityListConfig(
      business_public_id,
      court_public_id,
      dates
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
    courtsAvailabilityIsLoading,
    courtsAvailabilityIsError,
    courtsAvailabilityData:
      courtsAvailabilityData ??
      ({
        data: [{} as CourtAvailability],
        count: 0,
      } as CourtsAvailabilityListResponse),
    courtsAvailabilityError:
      courtsAvailabilityError ?? "Se ha producido un error inesperado",
  };
};

export default useCourtsAvailabilityList;
