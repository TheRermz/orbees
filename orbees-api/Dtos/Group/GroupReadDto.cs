namespace Api.Dtos.Group
{
    public class GroupReadDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int MemberCount { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
