import { formatCurrency } from "../../helpers/formatters";
import type { PieTooltipProps } from "./interface";

export const PieTooltip = ({
  active,
  payload,
  metric,
}: PieTooltipProps & { metric: "value" | "qty" }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: "0.8rem",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{name}</div>
      <div>
        {metric === "value" ? formatCurrency(value) : `${value} transações`}
      </div>
    </div>
  );
};
