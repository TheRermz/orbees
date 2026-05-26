import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, TrendingUp, TrendingDown, Tag } from "lucide-react";
import { useDashboard } from "../../../hooks/useDashboard";
import {
  SummaryCard,
  InsightItem,
  TransactionItem,
  PeriodSelector,
} from "../../../components/ui";
import { formatCurrency } from "../../../helpers/formatters";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../../../helpers/date";
import {
  Container,
  SummaryGrid,
  Section,
  SectionHeader,
  SectionTitle,
  SectionLink,
  InsightList,
  ChartsRow,
  ChartCard,
  ChartTitle,
  CategoryList,
  CategoryItem,
  CategoryDot,
  CategoryName,
  CategoryBar,
  CategoryBarFill,
  CategoryValue,
  ChartToggleGroup,
  ToggleButton,
  TransactionList,
} from "./DashboardPage.styles";
import { CategoryPieChart } from "../../../components/Dashboard/CategoryPieChart";
import { RevenueExpensesChart } from "../../../components/Dashboard/RevenueExpenseChart";

type Metric = "value" | "qty";
type ChartType = "bar" | "pie";

const now = new Date();
const defaultFrom = getFirstDayOfMonth(now.getFullYear(), now.getMonth() + 1);
const defaultTo = getLastDayOfMonth(now.getFullYear(), now.getMonth() + 1);

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { dashboard, lastTransactions, fetchDashboard, fetchLastTransactions } =
    useDashboard();

  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [metric, setMetric] = useState<Metric>("value");
  const [chartType, setChartType] = useState<ChartType>("bar");

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    fetchDashboard(defaultFrom, defaultTo);
    fetchLastTransactions();
  }, [fetchDashboard, fetchLastTransactions]);

  const handleApply = (newFrom: string, newTo: string) => {
    setFrom(newFrom);
    setTo(newTo);
    fetchDashboard(newFrom, newTo);
  };

  const { summary, insights, revenueVsExpensesChart, expensesByCategoryChart } =
    dashboard ?? {};

  const balancePositive = (summary?.balance ?? 0) >= 0;
  const maxCategoryAmount = Math.max(
    ...(expensesByCategoryChart?.map((c) =>
      metric === "value" ? c.amount : c.transactionCount
    ) ?? [1])
  );

  return (
    <Container>
      {dashboard && (
        <PeriodSelector
          key={`${from}-${to}`}
          availableMonths={dashboard?.availableMonths ?? []}
          from={from}
          to={to}
          onApply={handleApply}
        />
      )}

      <Section style={{ padding: "24px 32px 0" }}>
        <SummaryGrid>
          <SummaryCard
            label="Saldo do Mês"
            value={formatCurrency(summary?.balance ?? 0)}
            icon={<Wallet size={20} />}
            iconColor="#F5A623"
            borderColor="#F5A623"
            valueColor={balancePositive ? "#22c55e" : "#ef4444"}
            variation={summary?.balanceVariation}
            variationPositive={balancePositive}
          />
          <SummaryCard
            label="Receitas"
            value={formatCurrency(summary?.totalIncome ?? 0)}
            icon={<TrendingUp size={20} />}
            iconColor="#22c55e"
            borderColor="#22c55e"
            variation={summary?.incomeVariation}
            variationPositive={(summary?.totalIncome ?? 0) >= 0}
          />
          <SummaryCard
            label="Despesas"
            value={formatCurrency(summary?.totalExpenses ?? 0)}
            icon={<TrendingDown size={20} />}
            iconColor="#ef4444"
            borderColor="#ef4444"
            variation={summary?.expensesVariation}
            variationPositive={false}
          />
          <SummaryCard
            label="Maior Categoria"
            value={summary?.topCategory?.name ?? "-"}
            icon={<Tag size={20} />}
            iconColor="#a855f7"
            borderColor="#a855f7"
            subText={
              summary?.topCategory
                ? `${formatCurrency(summary.topCategory.amount)} · ${summary.topCategory.percentage}% das despesas`
                : "0%"
            }
          />
        </SummaryGrid>
      </Section>

      {insights && insights.length > 0 && (
        <Section style={{ padding: "24px 32px 0" }}>
          <SectionTitle>Insights</SectionTitle>
          <InsightList>
            {insights.map((insight, i) => (
              <InsightItem
                key={i}
                text={insight}
                variant={
                  insight.includes("Nenhuma transação registrada")
                    ? "muted"
                    : insight.includes("acima")
                      ? "warning"
                      : "info"
                }
              />
            ))}
          </InsightList>
        </Section>
      )}

      <ChartsRow>
        <ChartCard>
          <ChartTitle>Receitas vs Despesas</ChartTitle>
          <RevenueExpensesChart data={revenueVsExpensesChart ?? []} />
        </ChartCard>

        <ChartCard>
          <SectionHeader>
            <ChartTitle>Gastos por Categoria</ChartTitle>
            <ChartToggleGroup>
              <ToggleButton
                $active={metric === "value"}
                onClick={() => setMetric("value")}
              >
                Valor
              </ToggleButton>
              <ToggleButton
                $active={metric === "qty"}
                onClick={() => setMetric("qty")}
              >
                Qtd
              </ToggleButton>
              <ToggleButton
                $active={chartType === "bar"}
                onClick={() => setChartType("bar")}
              >
                Barra
              </ToggleButton>
              <ToggleButton
                $active={chartType === "pie"}
                onClick={() => setChartType("pie")}
              >
                Pizza
              </ToggleButton>
            </ChartToggleGroup>
          </SectionHeader>

          {chartType === "bar" ? (
            <CategoryList>
              {expensesByCategoryChart?.map((cat) => {
                const catValue =
                  metric === "value" ? cat.amount : cat.transactionCount;
                const pct =
                  maxCategoryAmount > 0
                    ? (catValue / maxCategoryAmount) * 100
                    : 0;
                return (
                  <CategoryItem key={cat.categoryId}>
                    <CategoryDot $color={cat.categoryName} />
                    <CategoryName>{cat.categoryName}</CategoryName>
                    <CategoryBar>
                      <CategoryBarFill $pct={pct} $color={cat.categoryName} />
                    </CategoryBar>
                    <CategoryValue $isTop={cat === expensesByCategoryChart[0]}>
                      {metric === "value"
                        ? formatCurrency(cat.amount)
                        : `${cat.transactionCount}`}
                    </CategoryValue>
                  </CategoryItem>
                );
              })}
            </CategoryList>
          ) : (
            <CategoryPieChart
              data={expensesByCategoryChart ?? []}
              metric={metric}
            />
          )}
        </ChartCard>
      </ChartsRow>

      <Section style={{ padding: "24px 32px" }}>
        <SectionHeader>
          <div>
            <SectionTitle>Transações (5 últimas)</SectionTitle>
            <span style={{ fontSize: "0.75rem", color: "#aaa" }}>
              independente do período selecionado
            </span>
          </div>
          <SectionLink onClick={() => navigate("/individual/transactions")}>
            Ver todas
          </SectionLink>
        </SectionHeader>
        <TransactionList>
          {lastTransactions.map((t) => (
            <TransactionItem key={t.id} transaction={t} />
          ))}
        </TransactionList>
      </Section>
    </Container>
  );
};
