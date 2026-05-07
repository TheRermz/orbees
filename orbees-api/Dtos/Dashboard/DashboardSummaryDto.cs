namespace Api.Dtos.Dashboard
{
    public class DashboardSummaryDto
    {
        public decimal Balance { get; set; }
        public string BalanceVariation { get; set; } = string.Empty;
        public decimal TotalIncome { get; set; }
        public string IncomeVariation { get; set; } = string.Empty;
        public decimal TotalExpenses { get; set; }
        public string ExpensesVariation { get; set; } = string.Empty;
        public TopCategoryDto? TopCategory { get; set; }
    }

    public class TopCategoryDto
    {
        public string Name { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public int Percentage { get; set; }
    }
}
