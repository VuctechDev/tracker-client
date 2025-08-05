import { useQuery } from "@tanstack/react-query";
import { request } from "../utils/api";
import type { LatLngExpression } from "leaflet";

export type OrganizationType = {
  id: number;
  name: string;
};

export const useGetGeofence = (deviceId: string) => {
  return useQuery({
    queryKey: ["geofence", deviceId],
    queryFn: () =>
      request(`/geofence?deviceId=${deviceId}`) as Promise<{
        data: { coordinates: LatLngExpression[] };
      }>,
    enabled: !!deviceId,
  });
};
