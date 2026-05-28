import { api } from "./api";
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

export const transactionService = {
  getMyTransactions: async (
    page = 1,
    pageSize = 10,
    from?: string,
    to?: string
  ): Promise<PagedResultDto<TransactionReadDto>> => {
    const { data } = await api.get<PagedResultDto<TransactionReadDto>>(
      "/transactions",
      {
        params: { page, pageSize, from, to },
      }
    );
    return data;
  },

  getGroupTransactions: async (
    groupId: string,
    page = 1,
    pageSize = 10,
    from?: string,
    to?: string
  ): Promise<PagedResultDto<TransactionReadDto>> => {
    const { data } = await api.get<PagedResultDto<TransactionReadDto>>(
      `/transactions/group/${groupId}`,
      {
        params: { page, pageSize, from, to },
      }
    );
    return data;
  },

  getById: async (id: string): Promise<TransactionReadDto> => {
    const { data } = await api.get<TransactionReadDto>(`/transactions/${id}`);
    return data;
  },

  create: async (dto: TransactionCreateDto): Promise<TransactionReadDto> => {
    const { data } = await api.post<TransactionReadDto>("/transactions", dto);
    return data;
  },

  createBulk: async (
    dto: TransactionBulkCreateDto
  ): Promise<TransactionReadDto[]> => {
    const { data } = await api.post<TransactionReadDto[]>(
      "/transactions/bulk",
      dto
    );
    return data;
  },

  previewOFX: async (file: File): Promise<TransactionPreviewDto[]> => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post<TransactionPreviewDto[]>(
      "/transactions/preview/ofx",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data;
  },

  previewCSV: async (
    file: File,
    bankId: number
  ): Promise<TransactionPreviewDto[]> => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post<TransactionPreviewDto[]>(
      `/transactions/preview/csv/${bankId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data;
  },

  import: async (dto: TransactionImportDto): Promise<TransactionReadDto[]> => {
    const { data } = await api.post<TransactionReadDto[]>(
      "/transactions/import",
      dto
    );
    return data;
  },

  update: async (
    id: string,
    dto: TransactionUpdateDto
  ): Promise<TransactionReadDto> => {
    const { data } = await api.put<TransactionReadDto>(
      `/transactions/${id}`,
      dto
    );
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/transactions/${id}`);
  },

  export: async (
    format: ExportFormat,
    from?: string,
    to?: string,
    groupId?: string
  ) => {
    const response = await api.get("/transactions/export", {
      params: { format, from, to, groupId },
      responseType: "blob",
      validateStatus: (status) => status === 200 || status === 202,
    });

    if (response.status === 202) {
      const text = await response.data.text();
      return JSON.parse(text) as { jobId: string };
    }

    return response.data as Blob;
  },

  getExportJobStatus: async (jobId: string) => {
    const { data } = await api.get(`/transactions/export/${jobId}/status`);
    return data;
  },

  downloadExportJob: async (jobId: string): Promise<Blob> => {
    const { data } = await api.get(`/transactions/export/${jobId}/download`, {
      responseType: "blob",
    });
    return data;
  },
};
