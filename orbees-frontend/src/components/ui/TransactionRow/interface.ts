import type { TransactionReadDto } from "../../../interfaces/transaction";

export interface TransactionRowProps {
  transaction: TransactionReadDto;
  onClick?: () => void;
}
