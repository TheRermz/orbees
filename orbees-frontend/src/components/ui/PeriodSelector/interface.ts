export interface PeriodSelectorProps {
  availableMonths: string[];
  from: string;
  to: string;
  onApply: (from: string, to: string) => void;
  defaultActiveMonth?: string | null;
}
