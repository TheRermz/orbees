using Api.Data;
using Api.Models;
using Api.Models.Enums;
using Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class ExportJobRepository(ApiDbContext context) : IExportJobRepository
    {
        public async Task<ExportJob?> GetByIdAsync(Guid id) =>
            await context.ExportJobs.FirstOrDefaultAsync(e => e.Id == id);

        public async Task<ExportJob?> GetByIdAndUserIdAsync(Guid id, Guid userId) =>
            await context.ExportJobs.FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);

        public async Task<IEnumerable<ExportJob>> GetPendingJobsAsync() =>
            await context.ExportJobs
                .Where(e => e.Status == ExportJobStatus.Pending)
                .ToListAsync();

        public async Task AddAsync(ExportJob job) =>
            await context.ExportJobs.AddAsync(job);

        public async Task UpdateAsync(ExportJob job) =>
            context.ExportJobs.Update(job);

        public async Task SaveChangesAsync() =>
            await context.SaveChangesAsync();
    }
}
