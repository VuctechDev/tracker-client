import { useQuery } from "@tanstack/react-query";
import { request } from "../utils/api";
import type { OrganizationType } from "./organizations";

export type UserType = {
  id: number;
  name: string;
  code: string;
  organizationId: number;
  organization: OrganizationType;
};

export const useGetUsersBO = () => {
  return useQuery({
    queryKey: ["bo_users"],
    queryFn: () => request(`/bo/users`) as Promise<{ data: UserType[] }>,
  });
};
