import type { BankDto } from "../interfaces/bank";
import { api } from "./api";

export const bankService = {
  getAll: async (): Promise<BankDto[]> => {
    const { data } = await api.get<BankDto[]>("/banks");
    return data;
  },
};
