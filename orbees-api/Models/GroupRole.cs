using Api.Models.Common;

namespace Api.Models
{
    public class GroupRole : AuditableEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Name { get; set; }
        public bool IsActive { get; set; } = true;

        // Navegação
        public ICollection<GroupMember> GroupMembers { get; set; } = [];
    }
}
