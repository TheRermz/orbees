using Api.Models.Enums;

namespace Api.Dtos.Transaction
{
    public class TransactionPreviewDto
    {
        public string Title { get; set; } = string.Empty;
        public string? OriginalDescription { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public TransactionType Type { get; set; }
        public string? MerchantDocument { get; set; }

        public Guid? SuggestedCategoryId { get; set; }
        public string? SuggestedCategoryName { get; set; }

        public Guid? CategoryId { get; set; }
        public Guid? GroupId { get; set; }
        public Guid? GroupCategoryId { get; set; }
    }
}
