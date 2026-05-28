namespace Api.Dtos.Dashboard
{
    public class MemberExpensesChartDto
    {
        public Guid MemberId { get; set; }
        public string MemberName { get; set; } = string.Empty;
        public string MemberColor { get; set; } = string.Empty;
        public List<MemberMonthlyExpenseDto> MonthlyExpenses { get; set; } = [];
    }

    public class MemberMonthlyExpenseDto
    {
        public string Label { get; set; } = string.Empty;
        public decimal Amount { get; set; }
    }
}
