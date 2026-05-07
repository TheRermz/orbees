namespace Api.Dtos.Dashboard
{
    public class DashboardResponseDto
    {
        public DashboardSummaryDto Summary { get; set; } = new();
        public List<string> Insights { get; set; } = [];
        public List<RevenueVsExpensesChartDto> RevenueVsExpensesChart { get; set; } = [];
        public List<ExpensesByCategoryChartDto> ExpensesByCategoryChart { get; set; } = [];
        public List<string> AvailableMonths { get; set; } = [];
        public DateTime PeriodStart { get; set; }
        public DateTime PeriodEnd { get; set; }
    }
}
