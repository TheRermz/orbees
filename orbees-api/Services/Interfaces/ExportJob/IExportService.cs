using Api.Dtos.ExportJob;
using Api.Models;
using Api.Models.Enums;

namespace Api.Services.Interfaces.ExportJobs
{
    public interface IExportService
    {
        Task<(byte[] file, string contentType, string fileName)?> ExportDirectAsync(
            Guid userId, ExportFormat format, DateTime? from, DateTime? to);
        Task<Guid> EnqueueExportAsync(
            Guid userId, ExportFormat format, DateTime? from, DateTime? to);
        Task<ExportJobStatusDto> GetJobStatusAsync(Guid userId, Guid jobId);
        Task<ExportJob?> GetJobFileAsync(Guid userId, Guid jobId);
    }
}
