export type TransactionTypeFilter = "all" | "income" | "expense";

export interface TypeFilterProps {
  value: TransactionTypeFilter;
  onChange: (value: TransactionTypeFilter) => void;
}
