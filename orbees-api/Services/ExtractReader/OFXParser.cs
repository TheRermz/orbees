using Api.Dtos.Transaction;
using Api.Models.Enums;
using System.Text.RegularExpressions;
using System.Xml.Linq;

namespace Api.Services.ExtractReader
{
    public static class OFXParser
    {
        public static List<TransactionPreviewDto> Parse(string content)
        {
            var ofxStart = content.IndexOf("<OFX>", StringComparison.OrdinalIgnoreCase);
            if (ofxStart < 0)
                throw new InvalidOperationException("Arquivo OFX inválido — tag <OFX> não encontrada.");

            var xml = content[ofxStart..];
            var transactions = new List<TransactionPreviewDto>();

            IEnumerable<XElement> trnElements;
            try
            {
                trnElements = XDocument.Parse(xml).Descendants("STMTTRN");
            }
            catch (System.Xml.XmlException)
            {
                // SGML format (OFX 1.x) — sem closing tags nos containers
                trnElements = ParseSgmlTransactions(xml);
            }

            foreach (var trn in trnElements)
            {
                var amountStr = trn.Element("TRNAMT")?.Value?.Replace(",", ".") ?? "0";
                if (!decimal.TryParse(amountStr, System.Globalization.NumberStyles.Any,
                    System.Globalization.CultureInfo.InvariantCulture, out var amount))
                    continue;

                var dateStr = trn.Element("DTPOSTED")?.Value ?? "";
                var date = ParseOFXDate(dateStr);
                var memo = trn.Element("MEMO")?.Value ?? trn.Element("NAME")?.Value ?? "Transação";
                var trnType = trn.Element("TRNTYPE")?.Value?.Trim().ToUpperInvariant() ?? "";

                transactions.Add(new TransactionPreviewDto
                {
                    Title = memo,
                    OriginalDescription = memo,
                    Amount = Math.Abs(amount),
                    TransactionDate = date,
                    Type = DetermineType(amount, trnType)
                });
            }

            return transactions;
        }

        // Bancos que exportam TRNAMT sempre positivo usam TRNTYPE para indicar débito.
        // Bancos padrão OFX usam TRNAMT negativo para despesa.
        private static TransactionType DetermineType(decimal amount, string trnType) =>
            amount < 0
            || trnType is "DEBIT" or "ATM" or "FEE" or "SRVCHG" or "PAYMENT"
                        or "DIRECTDEBIT" or "POS" or "CHECK" or "CASH" or "REPEATPMT"
                ? TransactionType.Despesa
                : TransactionType.Receita;

        // Extrai blocos STMTTRN de arquivos SGML (OFX 1.x) via regex,
        // evitando a necessidade de fechar tags container manualmente.
        private static IEnumerable<XElement> ParseSgmlTransactions(string sgml)
        {
            var results = new List<XElement>();
            var matches = Regex.Matches(sgml, @"<STMTTRN>(.*?)(?=<STMTTRN>|$)",
                RegexOptions.Singleline | RegexOptions.IgnoreCase);

            foreach (Match m in matches)
            {
                var block = Regex.Replace(
                    m.Groups[1].Value,
                    @"<([A-Z0-9.]+)>([^\r\n<]+)",
                    match => $"<{match.Groups[1].Value}>{match.Groups[2].Value.Trim()}</{match.Groups[1].Value}>"
                );
                try
                {
                    results.Add(XElement.Parse($"<STMTTRN>{block}</STMTTRN>"));
                }
                catch { /* bloco malformado — ignorar */ }
            }

            return results;
        }

        private static DateTime ParseOFXDate(string dateStr)
        {
            if (dateStr.Length >= 8 &&
                  DateTime.TryParseExact(dateStr[..8], "yyyyMMdd",
                      System.Globalization.CultureInfo.InvariantCulture,
                      System.Globalization.DateTimeStyles.None, out var date))
                return date;

            return DateTime.UtcNow;
        }
    }
}
