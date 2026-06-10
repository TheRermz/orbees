import { TransactionType, TransactionOrigin } from "./enums";

export interface TransactionReadDto {
  id: string;
  title: string;
  originalDescription?: string;
  description?: string;
  amount: number;
  transactionDate: string;
  type: TransactionType;
  transactionOrigin: TransactionOrigin;
  merchantDocument?: string;
  categoryId?: string;
  categoryName?: string;
  categoryColor?: string;
  categoryIcon?: string;
  groupCategoryId?: string;
  groupCategoryName?: string;
  groupCategoryColor?: string;
  groupCategoryIcon?: string;
  groupId?: string;
  groupName?: string;
  memberName?: string;
  groupLinkActive: boolean;
  bankAccountId?: string;
  bankAccountName?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TransactionCreateDto {
  title: string;
  description?: string;
  amount: number;
  transactionDate: string;
  type: TransactionType;
  merchantDocument?: string;
  bankAccountId?: string;
  categoryId?: string;
  groupId?: string;
  groupCategoryId?: string;
}

export interface TransactionUpdateDto {
  title?: string;
  description?: string;
  categoryId?: string;
  removeCategoryId?: boolean;
  groupCategoryId?: string;
  removeGroupCategoryId?: boolean;
  groupId?: string;
  removeGroupId?: boolean;
}

export interface TransactionPreviewDto {
  title: string;
  originalDescription?: string;
  amount: number;
  transactionDate: string;
  type: TransactionType;
  merchantDocument?: string;
  suggestedCategoryId?: string;
  suggestedCategoryName?: string;
  categoryId?: string;
  groupId?: string;
  groupCategoryId?: string;
}

export interface TransactionImportDto {
  bankAccountId?: string;
  transactions: TransactionPreviewDto[];
}

export interface TransactionBulkCreateDto {
  transactions: TransactionCreateDto[];
}

export interface PagedResultDto<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}
