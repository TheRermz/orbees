export type Step = 1 | 2 | 3 | 4;

export const ALLOWED_MIME: Record<string, string[]> = {
  ofx: ["application/x-ofx", "application/ofx", "text/plain", ""],
  csv: ["text/csv", "text/plain", "application/vnd.ms-excel", ""],
};

export interface CategorizeState {
  categoryId: string;
  shareWithGroup: boolean;
  groupId: string;
  groupCategoryId: string;
}

export const STEPS = [
  "Selecionar Arquivo",
  "Pré-visualizar",
  "Categorizar",
  "Concluído",
];

export interface ImportResult {
  total: number;
  income: number;
  expenses: number;
  shared: number;
  groupName: string;
}

export const getStepStatus = (
  n: number,
  current: Step
): "done" | "active" | "pending" => {
  if (n < current) return "done";
  if (n === current) return "active";
  return "pending";
};
