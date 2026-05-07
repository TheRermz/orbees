namespace Api.Dtos.Category
{
    public class CategoryReadDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Icon { get; set; }
        public string? Color { get; set; }
        public bool IsSystemCategory { get; set; }
        public Guid? GroupId { get; set; }
        public string? GroupName { get; set; }
    }
}
