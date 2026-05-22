using Api.Dtos.ExportJob;
using Api.Models.Enums;

namespace Api.Services.Interfaces.ExportJob
{
    public interface IExportService
    {
        Task<(byte[] file, string contentType, string fileName)?> ExportDirectAsync(
            Guid userId, ExportFormat format, DateTime? from, DateTime? to);
        Task<Guid> EnqueueExportAsync(
            Guid userId, ExportFormat format, DateTime? from, DateTime? to);
        Task<ExportJobStatusDto> GetJobStatusAsync(Guid userId, Guid jobId);
    }
}
