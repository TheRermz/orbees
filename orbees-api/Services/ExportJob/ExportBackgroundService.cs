using Api.Models.Enums;
using Api.Repositories.Interfaces;
using Serilog;

namespace Api.Services.ExportJobs
{
    public class ExportBackgroundService(IServiceScopeFactory scopeFactory) : BackgroundService
    {
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await ProcessPendingJobsAsync();
                await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
            }
        }

        private async Task ProcessPendingJobsAsync()
        {
            using var scope = scopeFactory.CreateScope();
            var exportJobRepository = scope.ServiceProvider.GetRequiredService<IExportJobRepository>();
            var transactionRepository = scope.ServiceProvider.GetRequiredService<ITransactionRepository>();

            var pendingJobs = await exportJobRepository.GetPendingJobsAsync();

            foreach (var job in pendingJobs)
            {
                try
                {
                    job.Status = ExportJobStatus.Processing;
                    await exportJobRepository.UpdateAsync(job);
                    await exportJobRepository.SaveChangesAsync();

                    var transactions = job.GroupId.HasValue
                      ? (await transactionRepository.GetByGroupIdAsync(
                          job.GroupId.Value,
                          job.From.HasValue ? DateTime.SpecifyKind(job.From.Value, DateTimeKind.Utc) : null,
                          job.To.HasValue ? DateTime.SpecifyKind(job.To.Value, DateTimeKind.Utc) : null)).ToList()
                      : (await transactionRepository.GetByUserIdAsync(
                          job.UserId,
                          job.From.HasValue ? DateTime.SpecifyKind(job.From.Value, DateTimeKind.Utc) : null,
                          job.To.HasValue ? DateTime.SpecifyKind(job.To.Value, DateTimeKind.Utc) : null)).ToList();

                    var (file, _, fileName) = job.Format switch
                    {
                        ExportFormat.CSV => ExportService.GenerateCSV(transactions),
                        ExportFormat.Excel => ExportService.GenerateExcel(transactions),
                        ExportFormat.PDF => ExportService.GeneratePDF(transactions),
                        _ => throw new InvalidOperationException("Formato inválido.")
                    };

                    var outputDir = Path.Combine("exports", job.UserId.ToString());
                    Directory.CreateDirectory(outputDir);
                    var filePath = Path.Combine(outputDir, $"{job.Id}_{fileName}");
                    await File.WriteAllBytesAsync(filePath, file);

                    job.FilePath = filePath;
                    job.Status = ExportJobStatus.Completed;
                }
                catch (Exception ex)
                {
                    Log.Error(ex, "Erro ao processar job de exportação {JobId}", job.Id);
                    job.Status = ExportJobStatus.Failed;
                    job.ErrorMessage = ex.Message;
                }

                await exportJobRepository.UpdateAsync(job);
                await exportJobRepository.SaveChangesAsync();
            }
        }
    }
}
