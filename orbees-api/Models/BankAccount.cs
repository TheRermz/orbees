using Api.Models.Common;

namespace Api.Models
{
    public class BankAccount : AuditableEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Name { get; set; }
        public string? Agency { get; set; }
        public string? AccountNumber { get; set; }
        public bool IsActive { get; set; } = true;

        // FK User

        public Guid UserId { get; set; }
        public User User { get; set; } = null!;

        // FK Bank

        public int BankId { get; set; }
        public Bank Bank { get; set; } = null!;
    }
}
