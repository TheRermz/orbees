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
