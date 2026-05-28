import { api } from "./api";
import type {
  DashboardResponseDto,
  GroupDashboardResponseDto,
  GroupLastTransactionDto,
  LastTransactionDto,
} from "../interfaces/dashboard";

export const dashboardService = {
  getSelfDashboard: async (
    from?: string,
    to?: string
  ): Promise<DashboardResponseDto> => {
    const { data } = await api.get<DashboardResponseDto>("/dashboard/self", {
      params: { from, to },
    });
    return data;
  },

  getLastTransactions: async (): Promise<LastTransactionDto[]> => {
    const { data } = await api.get<LastTransactionDto[]>(
      "/dashboard/self/last-transactions"
    );
    return data;
  },

  getGroupDashboard: async (
    groupId: string,
    from?: string,
    to?: string,
    memberId?: string
  ): Promise<GroupDashboardResponseDto> => {
    const { data } = await api.get(`/dashboard/group/${groupId}`, {
      params: { from, to, memberId },
    });
    return data;
  },

  getGroupLastTransactions: async (
    groupId: string
  ): Promise<GroupLastTransactionDto[]> => {
    const { data } = await api.get(
      `/dashboard/group/${groupId}/last-transactions`
    );
    return data;
  },
};
