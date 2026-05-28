using Api.Models.Common;
using Api.Models.Enums;

namespace Api.Models
{
    public class ExportJob : AuditableEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid UserId { get; set; }
        public Guid? GroupId { get; set; }
        public ExportFormat Format { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public ExportJobStatus Status { get; set; } = ExportJobStatus.Pending;
        public string? FilePath { get; set; }
        public string? ErrorMessage { get; set; }
        public User User { get; set; } = null!;
        public Group? Group { get; set; }
    }
}
