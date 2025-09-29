import { useQuery } from "@tanstack/react-query";
import { request } from "../utils/api";
import type { OrganizationType } from "./organizations";

export type DeviceType = {
  id: number;
  imei: string;
  code: string;
  battery: number;
  signal: number;
  version: number;
  status: "static" | "dynamic" | "offline";
  interval: string;
  name: string;
  organizationId: number;
  createdAt: string;
  updatedAt: string;
  organization: OrganizationType;
  analytics: {
    lastKilometer: string;
    lastKilometerReachedAt: number;
    lastHour: string;
    last24h: string;
  };
};

export const useDevicesPooling = () => {
  const query = useQuery({
    queryKey: ["devices"],
    queryFn: () => request(`/devices`) as Promise<{ data: DeviceType[] }>,
    refetchInterval: 30_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 60_000,
    placeholderData: { data: [] },
  });

  return {
    ...query,
    devices: query.data?.data ?? ([] as DeviceType[]),
  };
};

export const useGetDevices = () => {
  return useQuery({
    queryKey: ["bo_devices"],
    queryFn: () => request(`/bo/devices`) as Promise<{ data: DeviceType[] }>,
  });
};
