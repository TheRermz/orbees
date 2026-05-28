using Api.Models;
using Api.Dtos.Dashboard;
using Api.Models.Enums;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces.Dashboard;
using Serilog;

namespace Api.Services.Dashboard
{
    public class DashboardService(ITransactionRepository transactionRepository) : IDashboardService
    {
        public async Task<DashboardResponseDto> GetSelfDashboardAsync(Guid userId, DateTime from, DateTime to)
        {
            from = DateTime.SpecifyKind(from.Date, DateTimeKind.Utc);
            to = DateTime.SpecifyKind(to.Date.AddDays(1).AddSeconds(-1), DateTimeKind.Utc);

            var transactions = (await transactionRepository.GetByUserIdAsync(userId, from, to)).ToList();

            var duration = to - from;
            var prevTo = from.AddDays(-1);
            var prevFrom = prevTo - duration;
            var prevTransactions = (await transactionRepository.GetByUserIdAsync(userId, prevFrom, prevTo)).ToList();

            var totalIncome = transactions.Where(t => t.Type == TransactionType.Receita).Sum(t => t.Amount);
            var totalExpenses = transactions.Where(t => t.Type == TransactionType.Despesa).Sum(t => t.Amount);
            var balance = totalIncome - totalExpenses;

            var prevIncome = prevTransactions.Where(t => t.Type == TransactionType.Receita).Sum(t => t.Amount);
            var prevExpenses = prevTransactions.Where(t => t.Type == TransactionType.Despesa).Sum(t => t.Amount);
            var prevBalance = prevIncome - prevExpenses;

            var expensesByCategory = transactions
                .Where(t => t.Type == TransactionType.Despesa && t.CategoryId != null)
                .GroupBy(t => new { t.CategoryId, t.Category?.Name, t.Category?.Color })
                .Select(g => new
                {
                    g.Key.CategoryId,
                    Name = g.Key.Name ?? "Sem categoria",
                    Color = g.Key.Color,
                    Amount = g.Sum(t => t.Amount),
                    Count = g.Count()
                })
                .OrderByDescending(g => g.Amount)
                .ThenByDescending(g => g.Count)
                .ToList();

            TopCategoryDto? topCategory = null;
            if (expensesByCategory.Any() && totalExpenses > 0)
            {
                var top = expensesByCategory.First();
                topCategory = new TopCategoryDto
                {
                    Name = top.Name,
                    Amount = top.Amount,
                    Percentage = (int)Math.Round(top.Amount / totalExpenses * 100)
                };
            }

            var insights = new List<string>();

            var days = Math.Max(1, (int)((to - from).TotalDays) + 1);
            var dailyAvg = totalExpenses / days;
            var culture = new System.Globalization.CultureInfo("pt-BR");
            insights.Add($"Você está gastando em média {dailyAvg.ToString("C", culture)}/dia no período selecionado.");

            var topCategories = transactions
                .Where(t => t.Type == TransactionType.Despesa)
                .GroupBy(t => t.Category?.Name ?? "Sem categoria")
                .Select(g => new { Name = g.Key, Count = g.Count() })
                .OrderByDescending(g => g.Count)
                .ThenBy(g => g.Name)
                .Take(3)
                .ToList();

            var despesas = transactions.Where(t => t.Type == TransactionType.Despesa).ToList();

            if (!topCategories.Any())
            {
                insights.Add("Nenhuma transação no período.");
            }
            else
            {
                var parts = topCategories.Select(c =>
                    $"{c.Name} com {c.Count} {(c.Count == 1 ? "transação" : "transações")}").ToList();

                var insightText = parts.Count switch
                {
                    1 => $"Seus gastos mais frequentes: {parts[0]}.",
                    2 => $"Seus gastos mais frequentes: {parts[0]} e {parts[1]}.",
                    _ => $"Seus gastos mais frequentes: {parts[0]}, {parts[1]} e {parts[2]}."
                };
                insights.Add(insightText);
            }

            var allTransactions = await transactionRepository.GetByUserIdAsync(userId);
            var lastTransaction = allTransactions.OrderByDescending(t => t.TransactionDate).FirstOrDefault();
            if (lastTransaction == null || (DateTime.UtcNow - lastTransaction.TransactionDate).TotalDays > 7)
                insights.Add("Nenhuma transação registrada nos últimos 7 dias. Seu extrato está atualizado?");

            var revenueVsExpensesChart = BuildRevenueVsExpensesChart(transactions, from, to);

            var expensesByCategoryChart = expensesByCategory
                .Take(10)
                .Select(c => new ExpensesByCategoryChartDto
                {
                    CategoryId = c.CategoryId,
                    CategoryName = c.Name,
                    CategoryColor = c.Color,
                    Amount = c.Amount,
                    TransactionCount = c.Count,
                    Percentage = totalExpenses > 0 ? (int)Math.Round(c.Amount / totalExpenses * 100) : 0
                })
                .ToList();

            var availableMonths = allTransactions
                .Select(t => t.TransactionDate.ToString("yyyy-MM"))
                .Distinct()
                .OrderBy(m => m)
                .ToList();

            return new DashboardResponseDto
            {
                Summary = new DashboardSummaryDto
                {
                    Balance = balance,
                    BalanceVariation = FormatVariation(balance, prevBalance),
                    TotalIncome = totalIncome,
                    IncomeVariation = FormatVariation(totalIncome, prevIncome),
                    TotalExpenses = totalExpenses,
                    ExpensesVariation = FormatVariation(totalExpenses, prevExpenses),
                    TopCategory = topCategory
                },
                Insights = insights,
                RevenueVsExpensesChart = revenueVsExpensesChart,
                ExpensesByCategoryChart = expensesByCategoryChart,
                AvailableMonths = availableMonths,
                PeriodStart = from,
                PeriodEnd = to
            };
        }

        public async Task<IEnumerable<LastTransactionDto>> GetLastTransactionsAsync(Guid userId)
        {
            var transactions = await transactionRepository.GetByUserIdAsync(userId);
            return transactions
                .OrderByDescending(t => t.TransactionDate)
                .Take(5)
                .Select(t => new LastTransactionDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    CategoryName = t.Category?.Name,
                    CategoryColor = t.Category?.Color,
                    TransactionDate = t.TransactionDate,
                    Amount = t.Type == TransactionType.Despesa ? -t.Amount : t.Amount,
                    Type = t.Type
                });
        }

        private static List<RevenueVsExpensesChartDto> BuildRevenueVsExpensesChart(
            List<Api.Models.Transaction> transactions, DateTime from, DateTime to)
        {
            var isMultiMonth = from.Month != to.Month || from.Year != to.Year;

            if (isMultiMonth)
            {
                return transactions
                    .GroupBy(t => new { t.TransactionDate.Year, t.TransactionDate.Month })
                    .OrderBy(g => g.Key.Year).ThenBy(g => g.Key.Month)
                    .Select(g => new RevenueVsExpensesChartDto
                    {
                        Label = new DateTime(g.Key.Year, g.Key.Month, 1).ToString("MMM yy",
                            new System.Globalization.CultureInfo("pt-BR")),
                        Income = g.Where(t => t.Type == TransactionType.Receita).Sum(t => t.Amount),
                        Expenses = g.Where(t => t.Type == TransactionType.Despesa).Sum(t => t.Amount)
                    })
                    .ToList();
            }

            var result = new List<RevenueVsExpensesChartDto>();
            var weekStart = from.Date;

            while (weekStart <= to.Date)
            {
                var weekEnd = new DateTime(weekStart.Year, weekStart.Month,
                    Math.Min(weekStart.Day + 6, DateTime.DaysInMonth(weekStart.Year, weekStart.Month)));
                weekEnd = DateTime.SpecifyKind(weekEnd, DateTimeKind.Utc);

                var weekTransactions = transactions.Where(t =>
                    t.TransactionDate.Date >= weekStart.Date &&
                    t.TransactionDate.Date <= weekEnd.Date).ToList();

                result.Add(new RevenueVsExpensesChartDto
                {
                    Label = $"Dias {weekStart.Day}-{weekEnd.Day}",
                    Income = weekTransactions.Where(t => t.Type == TransactionType.Receita).Sum(t => t.Amount),
                    Expenses = weekTransactions.Where(t => t.Type == TransactionType.Despesa).Sum(t => t.Amount)
                });

                weekStart = weekEnd.AddDays(1);
            }

            return result;
        }

        public async Task<GroupDashboardResponseDto> GetGroupDashboardAsync(
                Guid userId, Guid groupId, DateTime from, DateTime to, Guid? memberId = null)
        {
            from = DateTime.SpecifyKind(from.Date, DateTimeKind.Utc);
            to = DateTime.SpecifyKind(to.Date.AddDays(1).AddSeconds(-1), DateTimeKind.Utc);

            var allGroupTransactions = (await transactionRepository.GetByGroupIdAsync(groupId, from, to)).ToList();

            var transactions = memberId.HasValue
                ? allGroupTransactions.Where(t => t.UserId == memberId.Value).ToList()
                : allGroupTransactions;

            var totalIncome = transactions.Where(t => t.Type == TransactionType.Receita).Sum(t => t.Amount);
            var totalExpenses = transactions.Where(t => t.Type == TransactionType.Despesa).Sum(t => t.Amount);
            var balance = totalIncome - totalExpenses;

            var biggestExpense = transactions
                .Where(t => t.Type == TransactionType.Despesa)
                .OrderByDescending(t => t.Amount)
                .FirstOrDefault();

            var insights = BuildGroupInsights(allGroupTransactions, from, to);


            var expensesByCategory = transactions
                .Where(t => t.Type == TransactionType.Despesa)
                .GroupBy(t => new
                {
                    CategoryId = t.GroupCategoryId ?? t.CategoryId,
                    Name = t.GroupCategory != null ? t.GroupCategory.Name : t.Category?.Name,
                    Color = t.GroupCategory != null ? t.GroupCategory.Color : t.Category?.Color
                })
                .Select(g => new GroupExpensesByCategoryChartDto
                {
                    CategoryId = g.Key.CategoryId,
                    CategoryName = g.Key.Name ?? "Sem categoria",
                    CategoryColor = g.Key.Color,
                    Amount = g.Sum(t => t.Amount),
                    TransactionCount = g.Count(),
                    Percentage = totalExpenses > 0 ? (int)Math.Round(g.Sum(t => t.Amount) / totalExpenses * 100) : 0
                })
                .OrderByDescending(c => c.Amount)
                .Take(10)
                .ToList();

            var memberExpensesChart = BuildMemberExpensesChart(allGroupTransactions, from, to);

            var allTransactions = await transactionRepository.GetByGroupIdAsync(groupId);
            var availableMonths = allTransactions
                .Select(t => t.TransactionDate.ToString("yyyy-MM"))
                .Distinct()
                .OrderBy(m => m)
                .ToList();

            var revenueVsExpenses = BuildRevenueVsExpensesChart(transactions, from, to);
            var revenueVsExpensesChart = revenueVsExpenses.Select(r => new GroupRevenueVsExpensesChartDto
            {
                Label = r.Label,
                Income = r.Income,
                Expenses = r.Expenses
            }).ToList();

            return new GroupDashboardResponseDto
            {
                Summary = new GroupDashboardSummaryDto
                {
                    TotalIncome = totalIncome,
                    TotalExpenses = totalExpenses,
                    Balance = balance,
                    BiggestExpenseTitle = biggestExpense?.Title,
                    BiggestExpenseAmount = biggestExpense?.Amount ?? 0
                },
                Insights = insights,
                RevenueVsExpensesChart = revenueVsExpensesChart,
                ExpensesByCategoryChart = expensesByCategory,
                MemberExpensesChart = memberExpensesChart,
                AvailableMonths = availableMonths,
                PeriodStart = from,
                PeriodEnd = to
            };
        }

        public async Task<IEnumerable<GroupLastTransactionDto>> GetGroupLastTransactionsAsync(Guid userId, Guid groupId)
        {
            var transactions = await transactionRepository.GetByGroupIdAsync(groupId);
            return transactions
                .OrderByDescending(t => t.TransactionDate)
                .Take(5)
                .Select(t => new GroupLastTransactionDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    CategoryName = t.Category?.Name,
                    CategoryColor = t.Category?.Color,
                    CategoryIcon = t.Category?.Icon,
                    GroupCategoryName = t.GroupCategory?.Name,
                    GroupCategoryColor = t.GroupCategory?.Color,
                    MemberName = t.User?.Fullname ?? "Desconhecido",
                    TransactionDate = t.TransactionDate,
                    Amount = t.Type == TransactionType.Despesa ? -t.Amount : t.Amount,
                    Type = t.Type
                });
        }

        private static List<string> BuildGroupInsights(List<Transaction> transactions, DateTime from, DateTime to)
        {
            var insights = new List<string>();
            var culture = new System.Globalization.CultureInfo("pt-BR");

            var totalExpenses = transactions.Where(t => t.Type == TransactionType.Despesa).Sum(t => t.Amount);

            if (totalExpenses > 0)
            {
                var byMember = transactions
                    .Where(t => t.Type == TransactionType.Despesa)
                    .GroupBy(t => new { t.UserId, t.User?.Fullname })
                    .Select(g => new { g.Key.Fullname, Amount = g.Sum(t => t.Amount) })
                    .OrderByDescending(m => m.Amount)
                    .FirstOrDefault();

                if (byMember != null)
                {
                    var pct = (int)Math.Round(byMember.Amount / totalExpenses * 100);
                    if (pct > 50)
                        insights.Add($"{byMember.Fullname} concentra {pct}% das despesas do grupo no período.");
                }
            }

            if (totalExpenses > 0)
            {
                var topCategory = transactions
                    .Where(t => t.Type == TransactionType.Despesa)
                    .GroupBy(t => t.GroupCategory?.Name ?? t.Category?.Name ?? "Sem categoria")
                    .Select(g => new { Name = g.Key, Amount = g.Sum(t => t.Amount) })
                    .OrderByDescending(c => c.Amount)
                    .FirstOrDefault();

                if (topCategory != null)
                {
                    var pct = (int)Math.Round(topCategory.Amount / totalExpenses * 100);
                    insights.Add($"Categoria predominante: {topCategory.Name} com {topCategory.Amount.ToString("C", culture)} ({pct}% das despesas).");
                }
            }

            var membersWithExpenses = transactions
                .Where(t => t.Type == TransactionType.Despesa)
                .Select(t => t.UserId)
                .Distinct()
                .ToHashSet();

            var allMembers = transactions
                .Select(t => new { t.UserId, t.User?.Fullname })
                .DistinctBy(m => m.UserId)
                .ToList();

            foreach (var member in allMembers)
            {
                if (!membersWithExpenses.Contains(member.UserId))
                    insights.Add($"{member.Fullname} não registrou despesas no período.");
            }

            var recurrent = transactions
                .GroupBy(t => t.Title)
                .Where(g => g.Count() > 1)
                .Count();

            if (recurrent > 0)
                insights.Add($"{recurrent} transação{(recurrent > 1 ? "ões recorrentes identificadas" : " recorrente identificada")} no período.");

            return insights;
        }

        private static List<MemberExpensesChartDto> BuildMemberExpensesChart(
            List<Transaction> transactions, DateTime from, DateTime to)
        {
            var memberColors = new[] { "#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#a855f7", "#14b8a6" };
            var colorIndex = 0;

            return transactions
                .Where(t => t.Type == TransactionType.Despesa)
                .GroupBy(t => new { t.UserId, t.User?.Fullname })
                .Select(memberGroup =>
                {
                    var color = memberColors[colorIndex++ % memberColors.Length];
                    var isMultiMonth = from.Month != to.Month || from.Year != to.Year;

                    List<MemberMonthlyExpenseDto> monthly;

                    if (isMultiMonth)
                    {
                        monthly = memberGroup
                            .GroupBy(t => new { t.TransactionDate.Year, t.TransactionDate.Month })
                            .OrderBy(g => g.Key.Year).ThenBy(g => g.Key.Month)
                            .Select(g => new MemberMonthlyExpenseDto
                            {
                                Label = new DateTime(g.Key.Year, g.Key.Month, 1)
                                    .ToString("MMM yy", new System.Globalization.CultureInfo("pt-BR")),
                                Amount = g.Sum(t => t.Amount)
                            }).ToList();
                    }
                    else
                    {
                        var weekStart = from.Date;
                        monthly = [];
                        while (weekStart <= to.Date)
                        {
                            var weekEnd = new DateTime(weekStart.Year, weekStart.Month,
                                Math.Min(weekStart.Day + 6, DateTime.DaysInMonth(weekStart.Year, weekStart.Month)));
                            weekEnd = DateTime.SpecifyKind(weekEnd, DateTimeKind.Utc);

                            monthly.Add(new MemberMonthlyExpenseDto
                            {
                                Label = $"Dias {weekStart.Day}-{weekEnd.Day}",
                                Amount = memberGroup.Where(t =>
                                    t.TransactionDate.Date >= weekStart.Date &&
                                    t.TransactionDate.Date <= weekEnd.Date).Sum(t => t.Amount)
                            });
                            weekStart = weekEnd.AddDays(1);
                        }
                    }

                    return new MemberExpensesChartDto
                    {
                        MemberId = memberGroup.Key.UserId,
                        MemberName = memberGroup.Key.Fullname ?? "Desconhecido",
                        MemberColor = color,
                        MonthlyExpenses = monthly
                    };
                })
                .ToList();
        }

        private static string FormatVariation(decimal current, decimal previous)
        {
            if (previous == 0) return "0.0%";
            var variation = (current - previous) / Math.Abs(previous) * 100;
            return variation >= 0 ? $"+{variation:F1}%" : $"{variation:F1}%";
        }
    }
}
