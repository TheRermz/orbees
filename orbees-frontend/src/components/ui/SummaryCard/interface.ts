import type { ReactNode } from "react";

export interface SummaryCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  iconColor: string;
  borderColor: string;
  variation?: string;
  variationPositive?: boolean;
  subText?: string;
  valueColor?: string;
}
