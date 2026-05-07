using Api.Dtos.Transaction;
using Api.Models.Enums;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces.ExtractReader;
using CsvHelper;
using CsvHelper.Configuration;
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
            using var reader = new StreamReader(stream);

            var transactions = new List<TransactionPreviewDto>();

            // cada banco tem um formato diferente de CSV
            transactions = bank.BankCode switch
            {
                "260" => await ReadNubankCSVAsync(reader),   // Nubank
                // "341" => await ReadItauCSVAsync(reader),     // Itaú
                "237" => await ReadBradescoCSVAsync(reader), // Bradesco
                "001" => await ReadBBCSVAsync(reader),       // Banco do Brasil
                // "104" => await ReadCaixaCSVAsync(reader),    // Caixa
                "033" => await ReadSantanderCSVAsync(reader),// Santander
                "077" => await ReadInterCSVAsync(reader),    // Inter
                _ => throw new InvalidOperationException($"Leitura de CSV não suportada para o banco {bank.BankName}.")
            };

            return transactions;
        }

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
                if (!decimal.TryParse(amountStr, System.Globalization.NumberStyles.Any,
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

        private static async Task<List<TransactionPreviewDto>> ReadItauCSVAsync(StreamReader reader)
        {
            var config = new CsvConfiguration(new CultureInfo("pt-BR"))
            {
                HasHeaderRecord = true,
                Delimiter = ";",
                BadDataFound = null
            };

            using var csv = new CsvReader(reader, config);
            var transactions = new List<TransactionPreviewDto>();

            await csv.ReadAsync();
            csv.ReadHeader();

            while (await csv.ReadAsync())
            {
                var credito = csv.GetField<string>("Crédito(R$)")?.Replace(".", "").Replace(",", ".");
                var debito = csv.GetField<string>("Débito(R$)")?.Replace(".", "").Replace(",", ".");

                decimal amount = 0;
                TransactionType type;

                if (!string.IsNullOrEmpty(credito) && decimal.TryParse(credito, NumberStyles.Any, CultureInfo.InvariantCulture, out var c))
                {
                    amount = c;
                    type = TransactionType.Receita;
                }
                else if (!string.IsNullOrEmpty(debito) && decimal.TryParse(debito, NumberStyles.Any, CultureInfo.InvariantCulture, out var d))
                {
                    amount = d;
                    type = TransactionType.Despesa;
                }
                else continue;

                var dateStr = csv.GetField<string>("Data");
                if (!DateTime.TryParseExact(dateStr, "dd/MM/yyyy", new CultureInfo("pt-BR"), DateTimeStyles.None, out var date))
                    continue;

                transactions.Add(new TransactionPreviewDto
                {
                    Title = csv.GetField<string>("Histórico") ?? "Transação",
                    OriginalDescription = csv.GetField<string>("Histórico"),
                    Amount = amount,
                    TransactionDate = date,
                    Type = type
                });
            }

            return transactions;
        }

        private static Task<List<TransactionPreviewDto>> ReadBradescoCSVAsync(StreamReader reader) =>
            throw new NotImplementedException("Formato Bradesco CSV a implementar.");

        private static Task<List<TransactionPreviewDto>> ReadBBCSVAsync(StreamReader reader) =>
            throw new NotImplementedException("Formato Banco do Brasil CSV a implementar.");

        private static Task<List<TransactionPreviewDto>> ReadCaixaCSVAsync(StreamReader reader) =>
            throw new NotImplementedException("Formato Caixa CSV a implementar.");

        private static Task<List<TransactionPreviewDto>> ReadSantanderCSVAsync(StreamReader reader) =>
            throw new NotImplementedException("Formato Santander CSV a implementar.");

        private static Task<List<TransactionPreviewDto>> ReadInterCSVAsync(StreamReader reader) =>
            throw new NotImplementedException("Formato Inter CSV a implementar.");
    }
}
