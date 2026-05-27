import type { CategoryReadDto } from "../../interfaces/category";
import type { GroupReadDto } from "../../interfaces/group";
import type { TransactionPreviewDto } from "../../interfaces/transaction";

export interface CategorizeState {
  categoryId: string;
  shareWithGroup: boolean;
  groupId: string;
  groupCategoryId: string;
}

export interface CategorizeRowsItemProps {
  preview: TransactionPreviewDto;
  state: CategorizeState;
  categories: CategoryReadDto[];
  groups: GroupReadDto[];
  onChange: (key: string, state: CategorizeState) => void;
}
