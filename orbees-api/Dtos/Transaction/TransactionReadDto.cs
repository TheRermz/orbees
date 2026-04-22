using Api.Models.Enums;

namespace Api.Dtos.Transaction
{
    public class TransactionReadDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? OriginalDescription { get; set; }
        public string? Description { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public TransactionType Type { get; set; }
        public TransactionOrigin TransactionOrigin { get; set; }
        public string? MerchantDocument { get; set; }

        public Guid? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? CategoryColor { get; set; }
        public string? CategoryIcon { get; set; }

        public Guid? GroupCategoryId { get; set; }
        public string? GroupCategoryName { get; set; }

        public Guid? GroupId { get; set; }
        public string? GroupName { get; set; }
        public bool GroupLinkActive { get; set; }

        public Guid? BankAccountId { get; set; }
        public string? BankAccountName { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
