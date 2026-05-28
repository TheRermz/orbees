using Api.Models.Enums;
using Api.Services.Interfaces.ExportJobs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Api.Controllers.Export
{
    [ApiController]
    [Route("api/transactions/export")]
    [Authorize]
    public class ExportController(IExportService exportService) : ControllerBase
    {
        private Guid GetUserId() =>
            Guid.Parse(User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                ?? User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? throw new UnauthorizedAccessException("Usuário não autenticado."));

        // GET /api/transactions/export?format=CSV&from=...&to=...
        [HttpGet]
        public async Task<IActionResult> Export(
              [FromQuery] ExportFormat format,
              [FromQuery] DateTime? from,
              [FromQuery] DateTime? to,
              [FromQuery] Guid? groupId = null)
        {
            var userId = GetUserId();
            var result = await exportService.ExportDirectAsync(userId, format, from, to, groupId);
            if (result == null)
            {
                var jobId = await exportService.EnqueueExportAsync(userId, format, from, to, groupId);
                return Accepted(new
                {
                    message = "Muitos dados para exportar. Você será notificado quando o arquivo estiver pronto.",
                    jobId
                });
            }
            var (file, contentType, fileName) = result.Value;
            return File(file, contentType, fileName);
        }

        // GET /api/transactions/export/{jobId}/status
        [HttpGet("{jobId}/status")]
        public async Task<IActionResult> GetJobStatus(Guid jobId)
        {
            var status = await exportService.GetJobStatusAsync(GetUserId(), jobId);
            return Ok(status);
        }

        // GET /api/transactions/export/{jobId}/download
        [HttpGet("{jobId}/download")]
        public async Task<IActionResult> Download(Guid jobId)
        {
            var userId = GetUserId();
            var status = await exportService.GetJobStatusAsync(userId, jobId);

            if (status.Status != "Completed" || status.DownloadUrl == null)
                return BadRequest(new { message = "Arquivo ainda não está pronto." });

            // busca o job para pegar o filePath
            var job = await exportService.GetJobFileAsync(userId, jobId);
            if (job == null || !System.IO.File.Exists(job.FilePath))
                return NotFound(new { message = "Arquivo não encontrado." });

            var bytes = await System.IO.File.ReadAllBytesAsync(job.FilePath!);
            var contentType = job.Format switch
            {
                ExportFormat.CSV => "text/csv",
                ExportFormat.Excel => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                ExportFormat.PDF => "application/pdf",
                _ => "application/octet-stream"
            };

            return File(bytes, contentType, Path.GetFileName(job.FilePath));
        }
    }
}
