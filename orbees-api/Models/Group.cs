using Api.Models.Common;

namespace Api.Models
{
    public class Group : AuditableEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Name { get; set; }
        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;

        // Navegação
        public ICollection<GroupMember> Members { get; set; } = [];
        public ICollection<Category> Categories { get; set; } = [];
    }
}
