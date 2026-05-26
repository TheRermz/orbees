import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getCategoryColor } from "../../pages/Individual/Dashboard/DashboardPage.styles";
import type { RevenueByCategoryProps } from "./interface";
import { PieTooltip } from "./PieTooltip";

export const CategoryPieChart = ({ data, metric }: RevenueByCategoryProps) => {
  const chartData = data.map((c) => ({
    name: c.categoryName,
    value: metric === "value" ? c.amount : c.transactionCount,
    fill: getCategoryColor(c.categoryName),
  }));

  const renderLabel = ({
    name,
    percent,
  }: {
    name?: string;
    percent?: number;
  }) => `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={renderLabel}
        >
          {chartData.map((entry, i) => (
            <path key={i} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip content={<PieTooltip metric={metric} />} />
      </PieChart>
    </ResponsiveContainer>
  );
};
