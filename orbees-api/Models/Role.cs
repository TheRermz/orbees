using Api.Models.Common;

namespace Api.Models
{
    public class Role : AuditableEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string RoleName { get; set; }
        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;


        // ------- NAVEGAÇÃO --------
        public ICollection<UserRole> UserRoles { get; set; } = [];

    }
}
