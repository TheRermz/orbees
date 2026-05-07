using Api.Models.Enums;

namespace Api.Dtos.Dashboard
{
    public class LastTransactionDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? CategoryName { get; set; }
        public string? CategoryColor { get; set; }
        public DateTime TransactionDate { get; set; }
        public decimal Amount { get; set; }
        public TransactionType Type { get; set; }
    }
}
