import { ExportFormat } from "../interfaces/enums";

export const EXPORT_EXTENSIONS: Record<ExportFormat, string> = {
  [ExportFormat.CSV]: "csv",
  [ExportFormat.Excel]: "xlsx",
  [ExportFormat.PDF]: "pdf",
};
