import { request } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import { type DeviceType } from "./devices";

export interface HealthType {
  id: number;
  deviceId: string;
  temp: number;
  heartRate: number;
  steps: number;
  activity: number;
  createdAt: string;
  device?: DeviceType[];
}

export const useGetHealth = (deviceId: string) => {
  const query = useQuery({
    queryKey: ["analytics", deviceId],
    queryFn: () =>
      request(`/health?deviceId=${deviceId}`) as Promise<{
        data: HealthType[];
      }>,
  });

  return {
    ...query,
    health: query?.data?.data ?? [],
  };
};
