namespace Api.Dtos.Dashboard
{
    public class GroupDashboardSummaryDto
    {
        public decimal TotalIncome { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal Balance { get; set; }
        public string? BiggestExpenseTitle { get; set; }
        public decimal BiggestExpenseAmount { get; set; }
    }
}
