import { ResponsiveContainer } from "recharts/types/component/ResponsiveContainer";
import { formatCurrency } from "../../helpers/formatters";
import type { MemberExpensesBarChartProps } from "./interface";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

export const MemberExpensesBarChart = ({
  members,
  categories,
}: MemberExpensesBarChartProps) => {
  if (!members.length || !categories.length) return null;

  const chartData = members.map((m) => ({
    name: m.memberName,
    total: m.monthlyExpenses.reduce((sum, e) => sum + e.amount, 0),
    color: m.memberColor,
  }));
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis
          tickFormatter={(v) => `R$ ${Number(v).toLocaleString("pt-BR")}`}
          tick={{ fontSize: 11 }}
        />
        <Tooltip formatter={(v: unknown) => formatCurrency(Number(v))} />
        {members.map((m) => (
          <Bar
            key={m.memberId}
            dataKey="total"
            name={m.memberName}
            fill={m.memberColor}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};
