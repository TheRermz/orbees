import { formatCurrency } from "../../helpers/formatters";
import type { CustomTooltipProps } from "./interface";

export const CustomTooltip = ({
  active,
  payload,
  label,
}: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
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
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
      <div style={{ color: "#22c55e" }}>
        Receitas: {formatCurrency(payload[0]?.value ?? 0)}
      </div>
      <div style={{ color: "#ef4444" }}>
        Despesas: {formatCurrency(payload[1]?.value ?? 0)}
      </div>
    </div>
  );
};
