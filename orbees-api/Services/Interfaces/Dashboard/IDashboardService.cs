using Api.Dtos.Dashboard;

namespace Api.Services.Interfaces.Dashboard
{
    public interface IDashboardService
    {
        Task<DashboardResponseDto> GetSelfDashboardAsync(Guid userId, DateTime from, DateTime to);
        Task<IEnumerable<LastTransactionDto>> GetLastTransactionsAsync(Guid userId);
    }
}
