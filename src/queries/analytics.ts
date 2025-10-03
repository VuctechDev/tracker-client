import { useQuery } from "@tanstack/react-query";
import { request } from "../utils/api";

export type AnalyticsType = {
  rows: { day: string; totalDistance: number }[];
  monthlyAverage: number;
  last24h: number;
  monthlyAverageDisplayValue: string;
  last24hDisplayValue: string;
  percentageDisplayValue: string;
  percentage: number;
  hourly: any;
};

export type AnalyticsTypeAPI = {
  rows: { day: string; totalDistance: number }[];
  monthlyAverage: number;
  last24h: number;
  hourly: any;
};

const parseData = (data?: AnalyticsTypeAPI): AnalyticsType => {
  if (!data) {
    return {} as AnalyticsType;
  }

  let last24hDisplayValue = "";
  let monthlyAverageDisplayValue = "";
  const last24h = data?.last24h ?? 0;
  const monthlyAverage = data?.monthlyAverage ?? 1;

  if (last24h > 1000) {
    last24hDisplayValue = `${(last24h / 1000).toFixed(2)}km`;
  } else {
    last24hDisplayValue = `${last24h}m`;
  }

  if (monthlyAverage > 1000) {
    monthlyAverageDisplayValue = `${(monthlyAverage / 1000).toFixed(2)}km`;
  } else {
    monthlyAverageDisplayValue = `${monthlyAverage}m`;
  }

  const percentage = (last24h / monthlyAverage) * 100;
  const percentageDisplayValue = `${percentage?.toFixed(1)}%`;

  return {
    percentage,
    percentageDisplayValue,
    last24hDisplayValue,
    last24h,
    monthlyAverageDisplayValue,
    monthlyAverage,
    rows: data.rows,
    hourly: data.hourly,
  };
};

export const useGetAnalytics = (deviceId: string) => {
  const query = useQuery({
    queryKey: ["analytics", deviceId],
    queryFn: () =>
      request(`/analytics?deviceId=${deviceId}`) as Promise<{
        data: AnalyticsTypeAPI;
      }>,
  });

  const parsedData = parseData(query.data?.data);

  return {
    ...query,
    analytics: parsedData,
  };
};
