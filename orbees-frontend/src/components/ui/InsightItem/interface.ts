type Variant = "info" | "warning" | "muted";

export interface InsightItemProps {
  text: string;
  variant?: Variant;
}
