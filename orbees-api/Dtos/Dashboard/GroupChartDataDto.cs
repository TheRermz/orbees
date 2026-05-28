namespace Api.Dtos.Dashboard
{
    public class GroupRevenueVsExpensesChartDto
    {
        public string Label { get; set; } = string.Empty;
        public decimal Income { get; set; }
        public decimal Expenses { get; set; }
    }

    public class GroupExpensesByCategoryChartDto
    {
        public Guid? CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public string? CategoryColor { get; set; }
        public decimal Amount { get; set; }
        public int TransactionCount { get; set; }
        public int Percentage { get; set; }
    }
}
