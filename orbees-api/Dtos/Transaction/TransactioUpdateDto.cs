namespace Api.Dtos.Transaction
{
    public class TransactionUpdateDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? GroupCategoryId { get; set; }
        public Guid? GroupId { get; set; }
    }
}
