import { useCallback, useState } from "react";
import { dashboardService } from "../services/dashboardService";
import type {
  DashboardResponseDto,
  LastTransactionDto,
} from "../interfaces/dashboard";
import { getErrorMessage } from "../helpers/error";

export const useDashboard = () => {
  const [dashboard, setDashboard] = useState<DashboardResponseDto | null>(null);
  const [lastTransactions, setLastTransactions] = useState<
    LastTransactionDto[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async (from?: string, to?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.getSelfDashboard(from, to);
      setDashboard(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao buscar dashboard."));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLastTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.getLastTransactions();
      setLastTransactions(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao buscar últimas transações."));
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    dashboard,
    lastTransactions,
    loading,
    error,
    fetchDashboard,
    fetchLastTransactions,
  };
};
