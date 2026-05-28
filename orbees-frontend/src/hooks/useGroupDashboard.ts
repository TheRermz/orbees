import { useState, useCallback } from "react";
import { dashboardService } from "../services/dashboardService";
import type {
  GroupDashboardResponseDto,
  GroupLastTransactionDto,
} from "../interfaces/dashboard";
import { getErrorMessage } from "../helpers/error";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../helpers/date";

const now = new Date();
const defaultFrom = getFirstDayOfMonth(now.getFullYear(), now.getMonth() + 1);
const defaultTo = getLastDayOfMonth(now.getFullYear(), now.getMonth() + 1);

export const useGroupDashboard = (groupId: string) => {
  const [dashboard, setDashboard] = useState<GroupDashboardResponseDto | null>(
    null
  );
  const [lastTransactions, setLastTransactions] = useState<
    GroupLastTransactionDto[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(
    async (from: string, to: string, memberId?: string) => {
      try {
        setLoading(true);
        setError(null);
        const data = await dashboardService.getGroupDashboard(
          groupId,
          from,
          to,
          memberId
        );
        setDashboard(data);
      } catch (err: unknown) {
        setError(getErrorMessage(err, "Erro ao buscar dashboard do grupo."));
      } finally {
        setLoading(false);
      }
    },
    [groupId]
  );

  const fetchLastTransactions = useCallback(async () => {
    try {
      const data = await dashboardService.getGroupLastTransactions(groupId);
      setLastTransactions(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao buscar últimas transações."));
    }
  }, [groupId]);

  return {
    dashboard,
    lastTransactions,
    loading,
    error,
    fetchDashboard,
    fetchLastTransactions,
    defaultFrom,
    defaultTo,
  };
};
