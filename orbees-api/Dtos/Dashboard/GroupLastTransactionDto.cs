using Api.Models.Enums;

namespace Api.Dtos.Dashboard
{
    public class GroupLastTransactionDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? CategoryName { get; set; }
        public string? CategoryColor { get; set; }
        public string? CategoryIcon { get; set; }
        public string? GroupCategoryName { get; set; }
        public string? GroupCategoryColor { get; set; }
        public string MemberName { get; set; } = string.Empty;
        public DateTime TransactionDate { get; set; }
        public decimal Amount { get; set; }
        public TransactionType Type { get; set; }
    }
}
