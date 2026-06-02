import { useCallback, useState } from "react";
import { transactionService } from "../services/transactionService";
import type {
  TransactionReadDto,
  TransactionCreateDto,
  TransactionUpdateDto,
  TransactionPreviewDto,
  TransactionImportDto,
  TransactionBulkCreateDto,
  PagedResultDto,
} from "../interfaces/transaction";
import { ExportFormat } from "../interfaces/enums";
import { downloadBlob } from "../helpers/download";
import { getErrorMessage } from "../helpers/error";
import { useNotifications } from "../contexts/useNotifications";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<
    PagedResultDto<TransactionReadDto>
  >({
    items: [],
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 10,
  });
  const [preview, setPreview] = useState<TransactionPreviewDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addNotification } = useNotifications();

  const fetchMyTransactions = useCallback(
    async (page: number, pageSize: number, from?: string, to?: string) => {
      try {
        setLoading(true);
        setError(null);
        const data = await transactionService.getMyTransactions(
          page,
          pageSize,
          from,
          to
        );
        setTransactions(data);
      } catch (err: unknown) {
        setError(getErrorMessage(err, "Erro ao buscar transações."));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchGroupTransactions = useCallback(
    async (
      groupId: string,
      page: number,
      pageSize: number,
      from?: string,
      to?: string
    ) => {
      try {
        setLoading(true);
        setError(null);
        const data = await transactionService.getGroupTransactions(
          groupId,
          page,
          pageSize,
          from,
          to
        );
        setTransactions(data);
      } catch (err: unknown) {
        setError(getErrorMessage(err, "Erro ao buscar transações do grupo."));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const create = useCallback(
    async (dto: TransactionCreateDto): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);
        await transactionService.create(dto);
        return true;
      } catch (err: unknown) {
        setError(getErrorMessage(err, "Erro ao criar transação."));
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createBulk = useCallback(
    async (dto: TransactionBulkCreateDto): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);
        await transactionService.createBulk(dto);
        return true;
      } catch (err: unknown) {
        setError(getErrorMessage(err, "Erro ao criar transações."));
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const previewOFX = async (file: File): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.previewOFX(file);
      setPreview(data);
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao processar arquivo OFX."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const previewCSV = async (file: File, bankId: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.previewCSV(file, bankId);
      setPreview(data);
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao processar arquivo CSV."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const importTransactions = async (
    dto: TransactionImportDto
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.import(dto);
      setTransactions((prev) => ({ ...prev, items: [...data, ...prev.items] }));
      setPreview([]);
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao importar transações."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const update = async (
    id: string,
    dto: TransactionUpdateDto
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.update(id, dto);
      setTransactions((prev) => ({
        ...prev,
        items: prev.items.map((t) => (t.id === id ? data : t)),
      }));
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao atualizar transação."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await transactionService.delete(id);
      setTransactions((prev) => ({
        ...prev,
        items: prev.items.filter((t) => t.id !== id),
      }));
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao deletar transação."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const exportTransactions = async (
    format: ExportFormat,
    from?: string,
    to?: string,
    groupId?: string
  ): Promise<{ queued: boolean; jobId?: string }> => {
    try {
      setLoading(true);
      setError(null);
      const result = await transactionService.export(format, from, to, groupId);

      if (result instanceof Blob) {
        const extensions = {
          [ExportFormat.CSV]: "csv",
          [ExportFormat.Excel]: "xlsx",
          [ExportFormat.PDF]: "pdf",
        };
        downloadBlob(result, `transacoes.${extensions[format]}`);
        return { queued: false };
      }

      const { jobId } = result;
      await pollExportJob(jobId, format);
      return { queued: true, jobId };
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao exportar transações."));
      return { queued: false };
    } finally {
      setLoading(false);
    }
  };

  const pollExportJob = async (jobId: string, format: ExportFormat) => {
    const extensions = {
      [ExportFormat.CSV]: "csv",
      [ExportFormat.Excel]: "xlsx",
      [ExportFormat.PDF]: "pdf",
    };

    addNotification({
      type: "info",
      message: "Exportação em andamento. Você será notificado ao concluir.",
    });

    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 2000));
      const status = await transactionService.getExportJobStatus(jobId);

      if (status.status === "Completed") {
        if (!status.downloadUrl) {
          setError("Exportação concluída mas URL de download indisponível.");
          addNotification({
            type: "warning",
            message: "Arquivo gerado mas download falhou. Tente novamente.",
          });
          return;
        }

        const blob = await transactionService.downloadExportJob(jobId);
        const url = URL.createObjectURL(blob);
        const filename = `transacoes.${extensions[format]}`;

        addNotification({
          type: "download",
          message: "Sua exportação está pronta para download.",
          downloadUrl: url,
          downloadLabel: filename,
        });

        downloadBlob(blob, filename);
        return;
      }

      if (status.status === "Failed") {
        setError("Erro ao gerar arquivo de exportação.");
        addNotification({
          type: "warning",
          message: "Falha ao gerar o arquivo de exportação. Tente novamente.",
        });
        return;
      }
    }

    setError("Tempo esgotado ao aguardar exportação.");
    addNotification({
      type: "warning",
      message: "Tempo esgotado ao aguardar a exportação.",
    });
  };

  return {
    transactions,
    preview,
    loading,
    error,
    fetchMyTransactions,
    fetchGroupTransactions,
    create,
    createBulk,
    previewOFX,
    previewCSV,
    importTransactions,
    update,
    remove,
    exportTransactions,
  };
};
