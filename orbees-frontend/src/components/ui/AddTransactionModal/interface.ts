import { TransactionType } from "../../../interfaces/enums";
import type { TransactionCreateDto } from "../../../interfaces/transaction";

export interface AddTransactionModalProps {
  onClose: () => void;
  onCreate: (dto: TransactionCreateDto) => Promise<boolean>;
  onCreateBulk: (transactions: TransactionCreateDto[]) => Promise<boolean>;
}

export const emptyForm = (): TransactionFormState => ({
  title: "",
  description: "",
  amount: 0,
  transactionDate: new Date().toISOString().split("T")[0],
  type: TransactionType.Despesa,
});

export interface TransactionFormState {
  title: string;
  description: string;
  amount: number;
  transactionDate: string;
  type: TransactionType;
  categoryId?: string;
  groupId?: string;
  groupCategoryId?: string;
}
