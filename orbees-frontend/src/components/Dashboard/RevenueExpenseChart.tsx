import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { RevenueVsExpensesProps } from "./interface";
import { CustomTooltip } from "./CustomTooltip";

export const RevenueExpensesChart = ({ data }: RevenueVsExpensesProps) => (
  <ResponsiveContainer width="100%" height={280}>
    <BarChart data={data} barGap={4}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
      <XAxis
        dataKey="label"
        tick={{ fontSize: 11, fill: "#aaa" }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`}
        tick={{ fontSize: 11, fill: "#aaa" }}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip content={<CustomTooltip />} />
      <Bar
        dataKey="income"
        fill="#22c55e"
        radius={[4, 4, 0, 0]}
        name="Receitas"
      />
      <Bar
        dataKey="expenses"
        fill="#ef4444"
        radius={[4, 4, 0, 0]}
        name="Despesas"
      />
    </BarChart>
  </ResponsiveContainer>
);
