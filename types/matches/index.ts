import { ApiResponse } from "@/types/api";

// Matches list

export type Match = {
  public_id: string
  business_public_id: string;
  court_public_id: string;
  court_name: string;
  time: number;
  date: string;
  status: string;
};

export type MatchesListResponseBody = {
  data: [Match];
  count: number;
};

// Court Availability List

export type MatchesListResponse =
  ApiResponse<MatchesListResponseBody>;