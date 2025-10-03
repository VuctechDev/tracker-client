import { useQuery } from "@tanstack/react-query";
import { request } from "../utils/api";

export type OrganizationType = {
  id: number;
  name: string;
  email: string;
  lang: string;
};

export const useGetOrganizationsBO = () => {
  return useQuery({
    queryKey: ["bo_organizations"],
    queryFn: () =>
      request(`/bo/organizations`) as Promise<{ data: OrganizationType[] }>,
  });
};

export const useGetOrganization = () => {
  return useQuery({
    queryKey: ["organization"],
    queryFn: () =>
      request(`/organizations`) as Promise<{ data: OrganizationType }>,
    retry: false,
  
  });
};
