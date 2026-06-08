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
import { EXPORT_EXTENSIONS } from "./useTransaction.constants";

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
    async (page: number, pageSize: number, from?: string, to?: string, search?: string, categoryId?: string, type?: number, noCategory?: boolean) => {
      try {
        setLoading(true);
        setError(null);
        const data = await transactionService.getMyTransactions(
          page,
          pageSize,
          from,
          to,
          search,
          categoryId,
          type,
          noCategory
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
      to?: string,
      search?: string,
      categoryId?: string,
      type?: number
    ) => {
      try {
        setLoading(true);
        setError(null);
        const data = await transactionService.getGroupTransactions(
          groupId,
          page,
          pageSize,
          from,
          to,
          search,
          categoryId,
          type
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
    async (dto: TransactionCreateDto): Promise<string | null> => {
      try {
        setLoading(true);
        setError(null);
        await transactionService.create(dto);
        return null;
      } catch (err: unknown) {
        const msg = getErrorMessage(err, "Erro ao criar transação.");
        setError(msg);
        return msg;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createBulk = useCallback(
    async (dto: TransactionBulkCreateDto): Promise<string | null> => {
      try {
        setLoading(true);
        setError(null);
        await transactionService.createBulk(dto);
        return null;
      } catch (err: unknown) {
        const msg = getErrorMessage(err, "Erro ao criar transações.");
        setError(msg);
        return msg;
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

  const previewXLS = async (file: File, bankId: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.previewXLS(file, bankId);
      setPreview(data);
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao processar arquivo XLS."));
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
  ): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.update(id, dto);
      setTransactions((prev) => ({
        ...prev,
        items: prev.items.map((t) => (t.id === id ? data : t)),
      }));
      return null;
    } catch (err: unknown) {
      const msg = getErrorMessage(err, "Erro ao atualizar transação.");
      setError(msg);
      return msg;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      await transactionService.delete(id);
      setTransactions((prev) => ({
        ...prev,
        items: prev.items.filter((t) => t.id !== id),
      }));
      return null;
    } catch (err: unknown) {
      const msg = getErrorMessage(err, "Erro ao deletar transação.");
      setError(msg);
      return msg;
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
        downloadBlob(result, `transacoes.${EXPORT_EXTENSIONS[format]}`);
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
        const filename = `transacoes.${EXPORT_EXTENSIONS[format]}`;

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
    previewXLS,
    importTransactions,
    update,
    remove,
    exportTransactions,
  };
};
