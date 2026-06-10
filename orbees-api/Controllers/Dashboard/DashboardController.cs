using Api.Services.Interfaces.Dashboard;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Api.Controllers.Dashboard
{
    [ApiController]
    [Route("api/dashboard")]
    [Authorize]
    public class DashboardController(IDashboardService dashboardService) : ControllerBase
    {
        private Guid GetUserId() =>
            Guid.Parse(User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                ?? User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? throw new UnauthorizedAccessException("Usuário não autenticado."));

        // GET /api/dashboard/self?from=2026-01-01&to=2026-01-31
        [HttpGet("self")]
        public async Task<IActionResult> GetSelfDashboard(
            [FromQuery] DateTime? from,
            [FromQuery] DateTime? to)
        {
            var userId = GetUserId();

            var dateTo = to ?? new DateTime(DateTime.UtcNow.Year + 1, 12, 31, 23, 59, 59, DateTimeKind.Utc);
            var dateFrom = from ?? new DateTime(2000, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            var dashboard = await dashboardService.GetSelfDashboardAsync(userId, dateFrom, dateTo);
            return Ok(dashboard);
        }

        // GET /api/dashboard/self/last-transactions
        [HttpGet("self/last-transactions")]
        public async Task<IActionResult> GetLastTransactions()
        {
            var transactions = await dashboardService.GetLastTransactionsAsync(GetUserId());
            return Ok(transactions);
        }

        // GET /api/dashboard/group/{groupId}
        [HttpGet("group/{groupId}")]
        public async Task<IActionResult> GetGroupDashboard(
              Guid groupId,
              [FromQuery] DateTime? from = null,
              [FromQuery] DateTime? to = null,
              [FromQuery] Guid? memberId = null)
        {
            var now = DateTime.UtcNow;
            var resolvedFrom = from ?? new DateTime(2000, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            var resolvedTo = to ?? new DateTime(now.Year + 1, 12, 31, 23, 59, 59, DateTimeKind.Utc);

            var result = await dashboardService.GetGroupDashboardAsync(GetUserId(), groupId, resolvedFrom, resolvedTo, memberId);
            return Ok(result);
        }

        // GET /api/dashboard/group/{groupId}/last-transactions
        [HttpGet("group/{groupId}/last-transactions")]
        public async Task<IActionResult> GetGroupLastTransactions(Guid groupId)
        {
            var result = await dashboardService.GetGroupLastTransactionsAsync(GetUserId(), groupId);
            return Ok(result);
        }
    }
}
