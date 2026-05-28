namespace Api.Dtos.Dashboard
{
    public class GroupDashboardResponseDto
    {
        public GroupDashboardSummaryDto Summary { get; set; } = new();
        public List<string> Insights { get; set; } = [];
        public List<GroupRevenueVsExpensesChartDto> RevenueVsExpensesChart { get; set; } = [];
        public List<GroupExpensesByCategoryChartDto> ExpensesByCategoryChart { get; set; } = [];
        public List<MemberExpensesChartDto> MemberExpensesChart { get; set; } = [];
        public List<string> AvailableMonths { get; set; } = [];
        public DateTime PeriodStart { get; set; }
        public DateTime PeriodEnd { get; set; }
    }
}
