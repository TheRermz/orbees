using Api.Dtos.Transaction;
using Api.Models.Enums;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces.ExtractReader;
using CsvHelper;
using CsvHelper.Configuration;
using ExcelDataReader;
using System.Data;
using System.Globalization;

namespace Api.Services.ExtractReader
{
    public class ExtractReaderService(
        IBankRepository bankRepository,
        ITransactionRepository transactionRepository
        ) : IExtractReaderService
    {
        public async Task<IEnumerable<TransactionPreviewDto>> ReadOFXAsync(IFormFile file)
        {
            using var reader = new StreamReader(file.OpenReadStream());
            var content = await reader.ReadToEndAsync();

            try
            {
                return OFXParser.Parse(content);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Erro ao processar arquivo OFX: {ex.Message}");
            }
        }

        public async Task<IEnumerable<TransactionPreviewDto>> ReadCSVAsync(IFormFile file, int bankId)
        {
            var bank = await bankRepository.GetByIdAsync(bankId)
                ?? throw new KeyNotFoundException("Banco não encontrado.");

            using var stream = file.OpenReadStream();

            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            var encoding = bank.BankCode == "001"
                ? System.Text.Encoding.GetEncoding("iso-8859-1")
                : System.Text.Encoding.UTF8;

            using var reader = new StreamReader(stream, encoding);

            return bank.BankCode switch
            {
                "260" => await ReadNubankCSVAsync(reader),
                "237" => await ReadBradescoCSVAsync(reader),
                "001" => await ReadBBCSVAsync(reader),
                "077" => await ReadInterCSVAsync(reader),
                _ => throw new InvalidOperationException($"Leitura de CSV não suportada para o banco {bank.BankName}.")
            };
        }

        public async Task<IEnumerable<TransactionPreviewDto>> ReadXLSAsync(IFormFile file, int bankId)
        {
            var bank = await bankRepository.GetByIdAsync(bankId)
                ?? throw new KeyNotFoundException("Banco não encontrado.");

            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            using var stream = file.OpenReadStream();
            using var reader = ExcelReaderFactory.CreateReader(stream);
            var dataSet = reader.AsDataSet(new ExcelDataSetConfiguration
            {
                ConfigureDataTable = _ => new ExcelDataTableConfiguration { UseHeaderRow = false }
            });

            var table = dataSet.Tables[0];

            return bank.BankCode switch
            {
                "033" => ParseSantanderXLS(table),
                _ => throw new InvalidOperationException($"Leitura de XLS não suportada para o banco {bank.BankName}.")
            };
        }

        // ── Santander XLS ─────────────────────────────────────────────────────────
        // Estrutura: cabeçalho na linha 5, transações a partir da linha 6.
        // Parar em "TOTAL" (col 0) ou "SALDO ANTERIOR" (col 1).
        // Crédito: col 4 | Débito: col 5
        private static IEnumerable<TransactionPreviewDto> ParseSantanderXLS(DataTable table)
        {
            var transactions = new List<TransactionPreviewDto>();
            const int dataStartRow = 6;

            for (int i = dataStartRow; i < table.Rows.Count; i++)
            {
                var row = table.Rows[i];
                var col0 = row[0]?.ToString()?.Trim() ?? "";
                var col1 = row[1]?.ToString()?.Trim() ?? "";

                if (col0.StartsWith("TOTAL") || col1 == "SALDO ANTERIOR")
                    break;

                if (string.IsNullOrWhiteSpace(col0))
                    continue;

                if (!DateTime.TryParseExact(col0, "dd/MM/yyyy",
                    new CultureInfo("pt-BR"), DateTimeStyles.None, out var date))
                    continue;

                var creditRaw = row[4]?.ToString()?.Trim() ?? "";
                var debitRaw = row[5]?.ToString()?.Trim() ?? "";

                decimal amount;
                TransactionType type;

                if (!string.IsNullOrEmpty(creditRaw))
                {
                    if (!TryParseBrazilianDecimal(creditRaw, out amount)) continue;
                    type = TransactionType.Receita;
                }
                else if (!string.IsNullOrEmpty(debitRaw))
                {
                    if (!TryParseBrazilianDecimal(debitRaw, out amount)) continue;
                    type = TransactionType.Despesa;
                }
                else continue;

                transactions.Add(new TransactionPreviewDto
                {
                    Title = col1,
                    OriginalDescription = col1,
                    Amount = Math.Abs(amount),
                    TransactionDate = date,
                    Type = type
                });
            }

            return transactions;
        }

        private static bool TryParseBrazilianDecimal(string value, out decimal result)
        {
            // Suporta "936,42", "-528,54" e valores numéricos do Excel
            var normalized = value.Replace(".", "").Replace(",", ".");
            return decimal.TryParse(normalized, NumberStyles.Any,
                CultureInfo.InvariantCulture, out result);
        }

        // ── CSV Parsers ───────────────────────────────────────────────────────────

        private static async Task<List<TransactionPreviewDto>> ReadNubankCSVAsync(StreamReader reader)
        {
            var config = new CsvConfiguration(new CultureInfo("pt-BR"))
            {
                HasHeaderRecord = true,
                Delimiter = ",",
                BadDataFound = null
            };

            using var csv = new CsvReader(reader, config);
            var transactions = new List<TransactionPreviewDto>();

            await csv.ReadAsync();
            csv.ReadHeader();

            while (await csv.ReadAsync())
            {
                var amountStr = csv.GetField<string>("Valor")?.Replace(",", ".") ?? "0";
                if (!decimal.TryParse(amountStr, NumberStyles.Any,
                    CultureInfo.InvariantCulture, out var amount))
                    continue;

                var dateStr = csv.GetField<string>("Data") ?? "";
                if (!DateTime.TryParseExact(dateStr, "dd/MM/yyyy",
                    new CultureInfo("pt-BR"), DateTimeStyles.None, out var date))
                    continue;

                var description = csv.GetField<string>("Descrição") ?? "Transação";

                transactions.Add(new TransactionPreviewDto
                {
                    Title = description,
                    OriginalDescription = description,
                    Amount = Math.Abs(amount),
                    TransactionDate = date,
                    Type = amount < 0 ? TransactionType.Despesa : TransactionType.Receita
                });
            }

            return transactions;
        }

        private static Task<List<TransactionPreviewDto>> ReadBradescoCSVAsync(StreamReader reader) =>
            throw new NotImplementedException("Formato Bradesco CSV a implementar.");

        // ── Banco do Brasil CSV ───────────────────────────────────────────────────
        // Encoding: ISO-8859-1 | Delimiter: "," | Quoted fields
        // Colunas: Data | Lançamento | Detalhes | Nº documento | Valor | Tipo Lançamento
        // Pular linhas sem valor ou com Tipo vazio (saldo anterior / saldo final)
        private static async Task<List<TransactionPreviewDto>> ReadBBCSVAsync(StreamReader reader)
        {
            var config = new CsvConfiguration(new CultureInfo("pt-BR"))
            {
                HasHeaderRecord = true,
                Delimiter = ",",
                BadDataFound = null,
                MissingFieldFound = null,
            };

            using var csv = new CsvReader(reader, config);
            var transactions = new List<TransactionPreviewDto>();

            await csv.ReadAsync();
            csv.ReadHeader();

            while (await csv.ReadAsync())
            {
                var tipo = csv.GetField(5)?.Trim() ?? "";
                if (string.IsNullOrEmpty(tipo)) continue;

                var dateStr = csv.GetField(0)?.Trim().Trim('"') ?? "";
                if (!DateTime.TryParseExact(dateStr, "dd/MM/yyyy",
                    new CultureInfo("pt-BR"), DateTimeStyles.None, out var date))
                    continue;

                var amountStr = csv.GetField(4)?.Trim().Trim('"') ?? "";
                if (!TryParseBrazilianDecimal(amountStr, out var amount) || amount == 0)
                    continue;

                var descricao = csv.GetField(1)?.Trim().Trim('"') ?? "Transação";
                var detalhes = csv.GetField(2)?.Trim().Trim('"') ?? "";
                var title = string.IsNullOrWhiteSpace(detalhes) ? descricao : detalhes;
                var type = tipo.Equals("Entrada", StringComparison.OrdinalIgnoreCase)
                    ? TransactionType.Receita
                    : TransactionType.Despesa;

                transactions.Add(new TransactionPreviewDto
                {
                    Title = title,
                    OriginalDescription = title,
                    Amount = Math.Abs(amount),
                    TransactionDate = date,
                    Type = type
                });
            }

            return transactions;
        }

        // ── Banco Inter CSV ───────────────────────────────────────────────────────
        // 5 linhas de metadados antes do cabeçalho real
        // Colunas (índice): 0=Data | 1=Histórico | 2=Descrição | 3=Valor | 4=Saldo
        // Valor negativo = Despesa, positivo = Receita
        private static async Task<List<TransactionPreviewDto>> ReadInterCSVAsync(StreamReader reader)
        {
            for (int i = 0; i < 5; i++)
                await reader.ReadLineAsync();

            var config = new CsvConfiguration(new CultureInfo("pt-BR"))
            {
                HasHeaderRecord = true,
                Delimiter = ",",
                BadDataFound = null,
                MissingFieldFound = null,
            };

            using var csv = new CsvReader(reader, config);
            var transactions = new List<TransactionPreviewDto>();

            await csv.ReadAsync();
            csv.ReadHeader();

            while (await csv.ReadAsync())
            {
                var dateStr = csv.GetField(0)?.Trim() ?? "";
                if (!DateTime.TryParseExact(dateStr, "dd/MM/yyyy",
                    new CultureInfo("pt-BR"), DateTimeStyles.None, out var date))
                    continue;

                var amountStr = csv.GetField(3)?.Trim().Trim('"') ?? "";
                if (!TryParseBrazilianDecimal(amountStr, out var amount))
                    continue;

                var historico = csv.GetField(1)?.Trim() ?? "Transação";
                var descricao = csv.GetField(2)?.Trim() ?? "";
                var title = string.IsNullOrWhiteSpace(descricao) ? historico : descricao;
                var type = amount < 0 ? TransactionType.Despesa : TransactionType.Receita;

                transactions.Add(new TransactionPreviewDto
                {
                    Title = title,
                    OriginalDescription = title,
                    Amount = Math.Abs(amount),
                    TransactionDate = date,
                    Type = type
                });
            }

            return transactions;
        }
    }
}
