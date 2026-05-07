using Api.Models.Common;

namespace Api.Models
{
    public class GroupMember : AuditableEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public bool IsActive { get; set; } = true;

        // FK Group
        public Guid GroupId { get; set; }
        public Group Group { get; set; } = null!;

        // FK User
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;

        // FK GroupRole
        public Guid GroupRoleId { get; set; }
        public GroupRole GroupRole { get; set; } = null!;

        public DateTime? LeftAt { get; set; }
        public DateTime? PromotedAt { get; set; }
    }
}
