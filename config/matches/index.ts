// Matches list

import { MatchesListResponse } from "@/types/matches";
import { AxiosRequestConfig } from "axios";

export const MatchesListConfig = (
  court_public_id: string,
  date: string = ""
) => {
  const qk = [
    "matches",
    "list",
    court_public_id,
  ];
  if (date !== "") qk.push(date);
  return {
    queryKey: qk,
  };
};

export const MatchesListAxiosConfig = (
  court_public_id: string,
  date: string
): AxiosRequestConfig<MatchesListResponse> => ({
  method: "GET",
  url: `/api/v1/matches/`,
  params: {
    court_public_id,
    date,
  },
});