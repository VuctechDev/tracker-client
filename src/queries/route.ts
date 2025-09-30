import { useQuery } from "@tanstack/react-query";
import { request } from "../utils/api";

export type RouteType = {
  speed: number;
  lat: number;
  long: number;
  createdAt: string;
};
const getInterval = () => localStorage.getItem("routePreviewInterval") ?? "3";

export const useGetRoute = (deviceId: string) => {
  return useQuery({
    queryKey: ["route", deviceId, getInterval()],
    queryFn: () =>
      request(`/data/${deviceId}?interval=${getInterval()}`) as Promise<{
        data: RouteType[];
      }>,
    placeholderData: (prev) => prev,
    refetchInterval: 10_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30_000,
    // placeholderData: { data: [] },
    enabled: !!deviceId,
  });
};
