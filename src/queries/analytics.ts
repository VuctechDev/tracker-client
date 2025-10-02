import { useQuery } from "@tanstack/react-query";
import { request } from "../utils/api";

export type AnalyticsType = {
  rows: { day: string; totalDistance: number }[];
  monthlyAverage: number;
  last24h: number;
};

export const useGetAnalytics = (deviceId: string) => {
  const query = useQuery({
    queryKey: ["analytics", deviceId],
    queryFn: () =>
      request(`/analytics?deviceId=${deviceId}`) as Promise<{
        data: AnalyticsType;
      }>,
  });

  return {
    ...query,
    analytics: query.data?.data ?? ({} as AnalyticsType),
  };
};
