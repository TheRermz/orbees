using Api.Models;

namespace Api.Repositories.Interfaces
{
    public interface IExportJobRepository
    {
        Task<ExportJob?> GetByIdAsync(Guid id);
        Task<ExportJob?> GetByIdAndUserIdAsync(Guid id, Guid userId);
        Task<IEnumerable<ExportJob>> GetPendingJobsAsync();
        Task AddAsync(ExportJob job);
        Task UpdateAsync(ExportJob job);
        Task SaveChangesAsync();
    }
}
