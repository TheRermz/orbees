namespace Api.Dtos.Category
{
    public class CategoryCreateDto
    {
        public required string Name { get; set; }
        public string? Icon { get; set; }
        public string? Color { get; set; }
        public Guid? GroupId { get; set; } // null = categoria individual
    }
}
