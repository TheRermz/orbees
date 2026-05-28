using Api.Dtos.Dashboard;

namespace Api.Services.Interfaces.Dashboard
{
    public interface IDashboardService
    {
        Task<DashboardResponseDto> GetSelfDashboardAsync(Guid userId, DateTime from, DateTime to);
        Task<IEnumerable<LastTransactionDto>> GetLastTransactionsAsync(Guid userId);
        Task<GroupDashboardResponseDto> GetGroupDashboardAsync(Guid userId, Guid groupId, DateTime from, DateTime to, Guid? memberId = null);
        Task<IEnumerable<GroupLastTransactionDto>> GetGroupLastTransactionsAsync(Guid userId, Guid groupId);
    }
}
