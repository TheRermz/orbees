using Api.Dtos.Transaction;
using Api.Models.Enums;
using System.Xml.Linq;
using System.Text.RegularExpressions;

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
            var doc = XDocument.Parse(xml);
            var transactions = new List<TransactionPreviewDto>();

            foreach (var trn in doc.Descendants("STMTTRN"))
            {
                var amountStr = trn.Element("TRNAMT")?.Value?.Replace(",", ".") ?? "0";
                if (!decimal.TryParse(amountStr, System.Globalization.NumberStyles.Any,
                    System.Globalization.CultureInfo.InvariantCulture, out var amount))
                    continue;

                var dateStr = trn.Element("DTPOSTED")?.Value ?? "";
                var date = ParseOFXDate(dateStr);
                var memo = trn.Element("MEMO")?.Value ?? trn.Element("NAME")?.Value ?? "Transação";

                transactions.Add(new TransactionPreviewDto
                {
                    Title = memo,
                    OriginalDescription = memo,
                    Amount = Math.Abs(amount),
                    TransactionDate = date,
                    Type = amount < 0 ? TransactionType.Despesa : TransactionType.Receita
                });
            }

            return transactions;
        }

        private static string ConvertToXml(string content)
        {
            var headerEnd = content.IndexOf("<OFX>", StringComparison.OrdinalIgnoreCase);
            if (headerEnd < 0)
                throw new InvalidOperationException("Arquivo OFX inválido — tag <OFX> não encontrada.");

            var body = content[headerEnd..];

            body = Regex.Replace(body, @"<([A-Z0-9.]+)>([^<]+)", m =>
            {
                var tag = m.Groups[1].Value;
                var val = m.Groups[2].Value.Trim();
                return $"<{tag}>{val}</{tag}>";
            });

            return body;
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

