import { useQuery } from "@tanstack/react-query";
import { request } from "../utils/api";

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
  createdAt: string;
  updatedAt: string;
};

export const useGetDevices = () => {
  return useQuery({
    queryKey: ["devices"],
    queryFn: () => request(`/devices`) as Promise<{ data: DeviceType[] }>,
    refetchInterval: 30_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 60_000,
    placeholderData: { data: [] }, 
  });
};
