import { useQuery } from "@tanstack/react-query";
import { request } from "../utils/api";

export type RouteType = {
  speed: number;
  lat: number;
  long: number;
  createdAt: string;
};


export const useGetRoute = (deviceId: string) => {
  return useQuery({
    queryKey: ["route", deviceId],
    queryFn: () =>
      request(`/data/${deviceId}`) as Promise<{ data: RouteType[] }>,
    refetchInterval: 10_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30_000,
    placeholderData: { data: [] },
    enabled: !!deviceId,
  });
};
