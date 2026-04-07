using Api.Models.Common;

namespace Api.Models
{
    public class Category : AuditableEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Name { get; set; }
        public string? Icon { get; set; }
        public string? Color { get; set; }
        public bool IsActive { get; set; } = true;

        // FK USER -- null se for categoria padrão
        public Guid? UserId { get; set; }
        public User? User { get; set; }

        // FK Grupo -- null se for individual
        public Guid? GroupId { get; set; }
        public Group? Group { get; set; }
    }
}
