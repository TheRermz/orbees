import { TransactionType } from "./enums";

export interface DashboardResponseDto {
  summary: DashboardSummaryDto;
  insights: string[];
  revenueVsExpensesChart: RevenueVsExpensesChartDto[];
  expensesByCategoryChart: ExpensesByCategoryChartDto[];
  availableMonths: string[];
  periodStart: string;
  periodEnd: string;
}

export interface DashboardSummaryDto {
  balance: number;
  balanceVariation?: string;
  totalIncome: number;
  incomeVariation?: string;
  totalExpenses: number;
  expensesVariation?: string;
  topCategory?: TopCategoryDto;
}

export interface TopCategoryDto {
  name: string;
  amount: number;
  percentage: number;
}

export interface RevenueVsExpensesChartDto {
  label: string;
  income: number;
  expenses: number;
}

export interface ExpensesByCategoryChartDto {
  categoryId?: string;
  categoryName: string;
  categoryColor: string;
  amount: number;
  transactionCount: number;
  percentage: number;
}

export interface LastTransactionDto {
  id: string;
  title: string;
  categoryName?: string;
  categoryColor?: string;
  transactionDate: string;
  amount: number;
  type: TransactionType;
}

export interface GroupDashboardResponseDto {
  summary: GroupDashboardSummaryDto;
  insights: string[];
  revenueVsExpensesChart: GroupRevenueVsExpensesChartDto[];
  expensesByCategoryChart: GroupExpensesByCategoryChartDto[];
  memberExpensesChart: MemberExpensesChartDto[];
  availableMonths: string[];
  periodStart: string;
  periodEnd: string;
}

export interface GroupDashboardSummaryDto {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  biggestExpenseTitle?: string;
  biggestExpenseAmount: number;
}

export interface GroupRevenueVsExpensesChartDto {
  label: string;
  income: number;
  expenses: number;
}

export interface GroupExpensesByCategoryChartDto {
  categoryId?: string;
  categoryName: string;
  categoryColor?: string;
  amount: number;
  transactionCount: number;
  percentage: number;
}

export interface MemberExpensesChartDto {
  memberId: string;
  memberName: string;
  memberColor: string;
  monthlyExpenses: { label: string; amount: number }[];
}

export interface GroupLastTransactionDto {
  id: string;
  title: string;
  categoryName?: string;
  categoryColor?: string;
  categoryIcon?: string;
  groupCategoryName?: string;
  groupCategoryColor?: string;
  memberName: string;
  transactionDate: string;
  amount: number;
  type: number;
}
