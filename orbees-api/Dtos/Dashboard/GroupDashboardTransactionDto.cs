using Api.Models.Enums;

namespace Api.Dtos.Dashboard
{
    public class GroupDashboardTransactionDto
    {
        public Guid UserId { get; set; }
        public string? UserFullname { get; set; }
        public DateTime TransactionDate { get; set; }
        public decimal Amount { get; set; }
        public TransactionType Type { get; set; }
        public string Title { get; set; } = "";
        public Guid? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? CategoryColor { get; set; }
        public Guid? GroupCategoryId { get; set; }
        public string? GroupCategoryName { get; set; }
        public string? GroupCategoryColor { get; set; }
    }
}
