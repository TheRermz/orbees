import type { BankDto } from "../../../../interfaces/bank";
import type { CategoryReadDto } from "../../../../interfaces/category";
import type { GroupReadDto } from "../../../../interfaces/group";
import type { TransactionPreviewDto } from "../../../../interfaces/transaction";
import type { CategorizeState, ImportResult } from "../interface";

export interface UploadProps {
  loading: boolean;
  onFile: (file: File) => void;
}

export interface PreviewProps {
  file: File | null;
  preview: TransactionPreviewDto[];
  categories: CategoryReadDto[];
  banks: BankDto[];
  selectedBank: number | null;
  loading: boolean;
  needsBankSelector: boolean;
  onBankChange: (id: number) => void;
  onProcessFile: () => void;
  onBack: () => void;
  onContinue: () => void;
}

export interface CategorizeProps {
  preview: TransactionPreviewDto[];
  categories: CategoryReadDto[];
  groups: GroupReadDto[];
  categorizeState: Record<string, CategorizeState>;
  loading: boolean;
  onStateChange: (key: string, state: CategorizeState) => void;
  onBack: () => void;
  onImport: () => void;
}

export interface ImportProps {
  result: ImportResult;
  onReset: () => void;
}

export interface SuccessProps {
  result: ImportResult;
  onReset: () => void;
}
