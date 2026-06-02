import type { CategoryReadDto } from "../../interfaces/category";
import type { GroupReadDto } from "../../interfaces/group";
import type { TransactionPreviewDto } from "../../interfaces/transaction";
import type { CategorizeState } from "../../pages/Individual/Import/interface";

export type { CategorizeState };

export interface CategorizeRowsItemProps {
  preview: TransactionPreviewDto;
  state: CategorizeState;
  categories: CategoryReadDto[];
  groups: GroupReadDto[];
  onChange: (key: string, state: CategorizeState) => void;
}
