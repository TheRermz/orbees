import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { formatCurrency } from "../../helpers/formatters";
import type { MemberExpensesLineChartProps } from "./interface";

export const MemberExpensesLineChart = ({
  data,
}: MemberExpensesLineChartProps) => {
  if (!data.length) return null;

  const labels = data[0].monthlyExpenses.map((m) => m.label);
  const chartData = labels.map((label) => {
    const point: Record<string, string | number> = { label };
    data.forEach((member) => {
      const found = member.monthlyExpenses.find((m) => m.label === label);
      point[member.memberName] = found?.amount ?? 0;
    });
    return point;
  });

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
        <YAxis
          tickFormatter={(v) => `R$ ${Number(v).toLocaleString("pt-BR")}`}
          tick={{ fontSize: 11 }}
        />
        <Tooltip formatter={(v: unknown) => formatCurrency(Number(v))} />
        <Legend />
        {data.map((member) => (
          <Line
            key={member.memberId}
            type="monotone"
            dataKey={member.memberName}
            stroke={member.memberColor}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
