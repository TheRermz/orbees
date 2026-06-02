import { ExportFormat } from "../../../interfaces/enums";

export interface ExportModalProps {
  loading: boolean;
  onClose: () => void;
  onExport: (format: ExportFormat) => void;
}

export interface FormatOption {
  format: ExportFormat;
  label: string;
  description: string;
  extension: string;
}

export const FORMAT_OPTIONS: FormatOption[] = [
  {
    format: ExportFormat.PDF,
    label: "PDF",
    description: "Relatório formatado para impressão",
    extension: ".pdf",
  },
  {
    format: ExportFormat.Excel,
    label: "Excel",
    description: "Planilha para análise no Excel",
    extension: ".xlsx",
  },
  {
    format: ExportFormat.CSV,
    label: "CSV",
    description: "Texto separado por ponto-e-vírgula",
    extension: ".csv",
  },
];
