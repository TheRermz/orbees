using Api.Dtos.ExportJob;
using Api.Models;
using Api.Models.Enums;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces.ExportJobs;
using CsvHelper;
using CsvHelper.Configuration;
using ClosedXML.Excel;
using System.Globalization;
using QuestPDF.Fluent;

namespace Api.Services.ExportJobs
{
    public class ExportService(
        ITransactionRepository transactionRepository,
        IExportJobRepository exportJobRepository) : IExportService
    {
        private const int BackgroundThreshold = 25;

        public async Task<(byte[] file, string contentType, string fileName)?> ExportDirectAsync(
               Guid userId, ExportFormat format, DateTime? from, DateTime? to, Guid? groupId = null)
        {
            var utcFrom = from.HasValue ? DateTime.SpecifyKind(from.Value, DateTimeKind.Utc) : (DateTime?)null;
            var utcTo = to.HasValue ? DateTime.SpecifyKind(to.Value, DateTimeKind.Utc) : (DateTime?)null;

            List<Transaction> transactions;

            if (groupId.HasValue)
                transactions = (await transactionRepository.GetByGroupIdAsync(groupId.Value, utcFrom, utcTo)).ToList();
            else
                transactions = (await transactionRepository.GetByUserIdAsync(userId, utcFrom, utcTo)).ToList();

            if (transactions.Count > BackgroundThreshold)
                return null;

            return format switch
            {
                ExportFormat.CSV => GenerateCSV(transactions),
                ExportFormat.Excel => GenerateExcel(transactions),
                ExportFormat.PDF => GeneratePDF(transactions),
                _ => throw new InvalidOperationException("Formato inválido.")
            };
        }

        public async Task<Guid> EnqueueExportAsync(
               Guid userId, ExportFormat format, DateTime? from, DateTime? to, Guid? groupId = null)
        {
            var job = new ExportJob
            {
                UserId = userId,
                Format = format,
                From = from.HasValue ? DateTime.SpecifyKind(from.Value, DateTimeKind.Utc) : null,
                To = to.HasValue ? DateTime.SpecifyKind(to.Value, DateTimeKind.Utc) : null,
                GroupId = groupId,
                Status = ExportJobStatus.Pending
            };

            await exportJobRepository.AddAsync(job);
            await exportJobRepository.SaveChangesAsync();
            return job.Id;
        }

        public async Task<ExportJobStatusDto> GetJobStatusAsync(Guid userId, Guid jobId)
        {
            var job = await exportJobRepository.GetByIdAndUserIdAsync(jobId, userId)
                ?? throw new KeyNotFoundException("Job não encontrado.");

            return new ExportJobStatusDto
            {
                JobId = job.Id,
                Status = job.Status.ToString(),
                DownloadUrl = job.Status == ExportJobStatus.Completed
                    ? $"/api/transactions/export/{job.Id}/download"
                    : null,
                ErrorMessage = job.ErrorMessage,
                CreatedAt = job.CreatedAt
            };
        }

        public async Task<ExportJob?> GetJobFileAsync(Guid userId, Guid jobId)
        {
            return await exportJobRepository.GetByIdAndUserIdAsync(jobId, userId);
        }

        // ── Geradores ──────────────────────────────────────────────────────────
        internal static (byte[], string, string) GenerateCSV(List<Transaction> transactions)
        {
            using var ms = new MemoryStream();
            using var writer = new StreamWriter(ms);
            using var csv = new CsvWriter(writer, new CsvConfiguration(new CultureInfo("pt-BR"))
            {
                Delimiter = ";"
            });

            csv.WriteHeader<TransactionExportRow>();
            csv.NextRecord();
            foreach (var t in transactions)
            {
                csv.WriteRecord(new TransactionExportRow(t));
                csv.NextRecord();
            }
            writer.Flush();

            return (ms.ToArray(), "text/csv", "transacoes.csv");
        }

        internal static (byte[], string, string) GenerateExcel(List<Transaction> transactions)
        {
            using var wb = new XLWorkbook();
            var ws = wb.Worksheets.Add("Transações");

            ws.Cell(1, 1).Value = "Data";
            ws.Cell(1, 2).Value = "Título";
            ws.Cell(1, 3).Value = "Tipo";
            ws.Cell(1, 4).Value = "Valor";
            ws.Cell(1, 5).Value = "Categoria";
            ws.Cell(1, 6).Value = "Membro";
            ws.Cell(1, 7).Value = "Conta";
            ws.Cell(1, 8).Value = "Origem";

            for (int i = 0; i < transactions.Count; i++)
            {
                var t = transactions[i];
                var row = i + 2;
                ws.Cell(row, 1).Value = t.TransactionDate.ToString("dd/MM/yyyy");
                ws.Cell(row, 2).Value = t.Title;
                ws.Cell(row, 3).Value = t.Type.ToString();
                ws.Cell(row, 4).Value = t.Type == TransactionType.Despesa ? -t.Amount : t.Amount;
                ws.Cell(row, 5).Value = t.GroupCategory?.Name ?? t.Category?.Name ?? "Sem categoria";
                ws.Cell(row, 6).Value = t.User?.Fullname ?? "-";
                ws.Cell(row, 7).Value = t.BankAccount?.Name ?? "-";
                ws.Cell(row, 8).Value = t.Origin.ToString();
            }

            ws.Columns().AdjustToContents();

            using var ms = new MemoryStream();
            wb.SaveAs(ms);
            return (ms.ToArray(),
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "transacoes.xlsx");
        }

        internal static (byte[], string, string) GeneratePDF(List<Transaction> transactions)
        {
            var document = QuestPDF.Fluent.Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(QuestPDF.Helpers.PageSizes.A4);
                    page.Margin(30);

                    page.Header().Text("Relatório de Transações")
                        .FontSize(16).Bold().AlignCenter();

                    page.Content().Table(table =>
                    {
                        table.ColumnsDefinition(cols =>
                        {
                            cols.RelativeColumn(2);
                            cols.RelativeColumn(4);
                            cols.RelativeColumn(2);
                            cols.RelativeColumn(2);
                            cols.RelativeColumn(2);
                        });

                        table.Header(header =>
                        {
                            header.Cell().Text("Data").Bold();
                            header.Cell().Text("Título").Bold();
                            header.Cell().Text("Tipo").Bold();
                            header.Cell().Text("Valor").Bold();
                            header.Cell().Text("Categoria").Bold();
                        });

                        foreach (var t in transactions)
                        {
                            table.Cell().Text(t.TransactionDate.ToString("dd/MM/yyyy"));
                            table.Cell().Text(t.Title);
                            table.Cell().Text(t.Type.ToString());
                            var amount = t.Type == TransactionType.Despesa ? -t.Amount : t.Amount;
                            table.Cell().Text(amount.ToString("C", new CultureInfo("pt-BR")));
                            table.Cell().Text(t.Category?.Name ?? "Sem categoria");
                        }
                    });

                    page.Footer().AlignCenter()
                        .Text(x =>
                        {
                            x.Span("Página ");
                            x.CurrentPageNumber();
                            x.Span(" de ");
                            x.TotalPages();
                        });
                });
            });

            using var ms = new MemoryStream();
            document.GeneratePdf(ms);
            ms.Position = 0;
            return (ms.ToArray(), "application/pdf", "transacoes.pdf");
        }
    }

    // ── Row helper ─────────────────────────────────────────────────────────────
    public class TransactionExportRow
    {
        public string Data { get; set; }
        public string Título { get; set; }
        public string Tipo { get; set; }
        public decimal Valor { get; set; }
        public string Categoria { get; set; }
        public string? Membro { get; set; }
        public string Conta { get; set; }
        public string Origem { get; set; }

        public TransactionExportRow(Transaction t)
        {
            Data = t.TransactionDate.ToString("dd/MM/yyyy");
            Título = t.Title;
            Tipo = t.Type.ToString();
            Valor = t.Type == TransactionType.Despesa ? -t.Amount : t.Amount;
            Categoria = t.GroupCategory?.Name ?? t.Category?.Name ?? "Sem categoria";
            Membro = t.User?.Fullname;
            Conta = t.BankAccount?.Name ?? "-";
            Origem = t.Origin.ToString();
        }
    }
}
