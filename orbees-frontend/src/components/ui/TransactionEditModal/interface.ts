import type {
  TransactionReadDto,
  TransactionUpdateDto,
} from "../../../interfaces/transaction";

export interface TransactionEditModalProps {
  transaction: TransactionReadDto;
  onClose: () => void;
  onSave: (id: string, dto: TransactionUpdateDto) => Promise<boolean>;
}
