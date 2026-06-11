namespace Api.Dtos.Transaction
{
    public class TransactionUpdateDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? TransactionDate { get; set; }
        public int? Type { get; set; }
        public Guid? CategoryId { get; set; }
        public bool RemoveCategoryId { get; set; }
        public Guid? GroupCategoryId { get; set; }
        public bool RemoveGroupCategoryId { get; set; }
        public Guid? GroupId { get; set; }
        public bool RemoveGroupId { get; set; }
    }
}
