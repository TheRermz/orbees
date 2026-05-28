import type {
  ExpensesByCategoryChartDto,
  GroupExpensesByCategoryChartDto,
  MemberExpensesChartDto,
  RevenueVsExpensesChartDto,
} from "../../interfaces/dashboard";

export interface RevenueVsExpensesProps {
  data: RevenueVsExpensesChartDto[];
}

interface TooltipPayloadItem {
  value: number;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

export interface RevenueByCategoryProps {
  data: ExpensesByCategoryChartDto[];
  metric: "value" | "qty";
}

export interface PieTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}

export interface MemberExpensesLineChartProps {
  data: MemberExpensesChartDto[];
}

export interface MemberExpensesBarChartProps {
  members: MemberExpensesChartDto[];
  categories: GroupExpensesByCategoryChartDto[];
}
