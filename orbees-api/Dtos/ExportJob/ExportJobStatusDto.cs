namespace Api.Dtos.Export
{
    public class ExportJobStatusDto
    {
        public Guid JobId { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? DownloadUrl { get; set; }
        public string? ErrorMessage { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
