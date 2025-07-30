import { useQuery } from "@tanstack/react-query";
import { request } from "../utils/api";

export type OrganizationType = {
  id: number;
  name: string;
};

export const useGetOrganizationsBO = () => {
  return useQuery({
    queryKey: ["bo_organizations"],
    queryFn: () =>
      request(`/bo/organizations`) as Promise<{ data: OrganizationType[] }>,
  });
};
