using Api.Models.Enums;

namespace Api.Dtos.Transaction
{
    public class TransactionCreateDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public TransactionType Type { get; set; }
        public string? MerchantDocument { get; set; }
        public Guid? BankAccountId { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? GroupId { get; set; }
        public Guid? GroupCategoryId { get; set; }
    }
}
