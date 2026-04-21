using Api.Models.Common;
using Api.Models.Enums;

namespace Api.Models
{
    public class Transaction : AuditableEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public required string Title { get; set; }

        public string? OriginalDescription { get; set; }

        public string? Description { get; set; }

        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }

        public TransactionType Type { get; set; }

        public TransactionOrigin Origin { get; set; }

        public string? MerchantDocument { get; set; }

        public bool IsActive { get; set; } = true;

        public Guid UserId { get; set; }
        public User User { get; set; } = null!;

        public Guid? BankAccountId { get; set; }
        public BankAccount? BankAccount { get; set; }

        public Guid? CategoryId { get; set; }
        public Category? Category { get; set; }

        public Guid? GroupCategoryId { get; set; }
        public Category? GroupCategory { get; set; }

        public Guid? GroupId { get; set; }
        public Group? Group { get; set; }

        public bool GroupLinkActive { get; set; } = true;
    }
}
