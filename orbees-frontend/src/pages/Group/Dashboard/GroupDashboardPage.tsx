import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGroupDashboard } from "../../../hooks/useGroupDashboard";
import { useGroups } from "../../../hooks/useGroups";
import {
  SummaryCard,
  InsightItem,
  PeriodSelector,
} from "../../../components/ui";
import { MemberExpensesLineChart } from "../../../components/Dashboard/MemberExpensesLineChart";
import { CategoryPieChart } from "../../../components/Dashboard/CategoryPieChart";
import { formatCurrency } from "../../../helpers/formatters";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../../../helpers/date";
import { TrendingUp, TrendingDown, Wallet, AlertCircle } from "lucide-react";
import {
  Container,
  Header,
  HeaderLeft,
  PageTitle,
  PageSubtitle,
  MemberFilter,
  CardsGrid,
  ChartsRow,
  ChartCard,
  ChartTitle,
  BottomRow,
  InsightsCard,
  InsightsTitle,
  LastTransactionsCard,
  LastTransactionsTitle,
  TransactionItem,
  TxDot,
  TxInfo,
  TxTitle,
  TxMeta,
  TxAmount,
} from "./GroupDashboardPage.styles";

const now = new Date();
const defaultFrom = getFirstDayOfMonth(now.getFullYear(), now.getMonth() + 1);
const defaultTo = getLastDayOfMonth(now.getFullYear(), now.getMonth() + 1);

export const GroupDashboardPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { dashboard, lastTransactions, fetchDashboard, fetchLastTransactions } =
    useGroupDashboard(groupId!);
  const { members, fetchMembers } = useGroups();

  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [memberId, setMemberId] = useState("");
  const availableMonths = dashboard?.availableMonths ?? [];

  useEffect(() => {
    if (!groupId) return;
    fetchMembers(groupId);
    fetchLastTransactions();
    fetchDashboard(defaultFrom, defaultTo);
  }, [fetchDashboard, fetchLastTransactions, fetchMembers, groupId]);

  const handleApply = (newFrom: string, newTo: string) => {
    setFrom(newFrom);
    setTo(newTo);
    fetchDashboard(newFrom, newTo, memberId || undefined);
    fetchLastTransactions();
  };

  const handleMemberChange = (newMemberId: string) => {
    setMemberId(newMemberId);
    fetchDashboard(from, to, newMemberId || undefined);
  };

  const s = dashboard?.summary;

  const pieData = (dashboard?.expensesByCategoryChart ?? []).map((c) => ({
    categoryName: c.categoryName,
    categoryColor: c.categoryColor ?? "#9ca3af",
    amount: c.amount,
    transactionCount: c.transactionCount,
    percentage: c.percentage,
  }));

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <PageTitle>Dashboard do Grupo</PageTitle>
          <PageSubtitle>Visão financeira coletiva</PageSubtitle>
        </HeaderLeft>
        <MemberFilter
          value={memberId}
          onChange={(e) => handleMemberChange(e.target.value)}
        >
          <option value="">Todos os membros</option>
          {members.map((m) => (
            <option key={m.id} value={m.userId}>
              {m.fullname}
            </option>
          ))}
        </MemberFilter>
      </Header>

      <PeriodSelector
        key={`${from}-${to}`}
        availableMonths={availableMonths}
        from={from}
        to={to}
        onApply={handleApply}
      />

      <CardsGrid>
        <SummaryCard
          label="Receitas do Grupo"
          value={formatCurrency(s?.totalIncome ?? 0)}
          icon={<TrendingUp size={20} />}
          iconColor="#22c55e"
          borderColor="#22c55e"
        />
        <SummaryCard
          label="Despesas do Grupo"
          value={formatCurrency(s?.totalExpenses ?? 0)}
          icon={<TrendingDown size={20} />}
          iconColor="#ef4444"
          borderColor="#ef4444"
        />
        <SummaryCard
          label="Saldo do Grupo"
          value={formatCurrency(s?.balance ?? 0)}
          icon={<Wallet size={20} />}
          iconColor="#3b82f6"
          borderColor="#3b82f6"
          valueColor={(s?.balance ?? 0) >= 0 ? "#22c55e" : "#ef4444"}
        />
        <SummaryCard
          label="Maior Gasto"
          value={s?.biggestExpenseTitle ?? "—"}
          subText={
            s?.biggestExpenseAmount
              ? formatCurrency(s.biggestExpenseAmount)
              : undefined
          }
          icon={<AlertCircle size={20} />}
          iconColor="#f59e0b"
          borderColor="#f59e0b"
        />
      </CardsGrid>

      <ChartsRow>
        <ChartCard>
          <ChartTitle>Evolução por Membro</ChartTitle>
          <MemberExpensesLineChart
            data={dashboard?.memberExpensesChart ?? []}
          />
        </ChartCard>
        <ChartCard>
          <ChartTitle>Despesas por Categoria</ChartTitle>
          <CategoryPieChart data={pieData} metric="value" />
        </ChartCard>
      </ChartsRow>

      <BottomRow>
        <InsightsCard>
          <InsightsTitle>Insights do Grupo</InsightsTitle>
          {(dashboard?.insights ?? []).length === 0 ? (
            <InsightItem
              text="Nenhum insight disponível para o período."
              variant="muted"
            />
          ) : (
            (dashboard?.insights ?? []).map((insight, i) => (
              <InsightItem key={i} text={insight} variant="info" />
            ))
          )}
        </InsightsCard>

        <LastTransactionsCard>
          <LastTransactionsTitle>Últimas Transações</LastTransactionsTitle>
          {lastTransactions.map((t) => (
            <TransactionItem key={t.id}>
              <TxDot
                $color={t.groupCategoryColor ?? t.categoryColor ?? "#9ca3af"}
              />
              <TxInfo>
                <TxTitle>{t.title}</TxTitle>
                <TxMeta>
                  {t.memberName} ·{" "}
                  {new Date(t.transactionDate).toLocaleDateString("pt-BR")}
                </TxMeta>
              </TxInfo>
              <TxAmount $positive={t.amount > 0}>
                {t.amount > 0 ? "+" : ""}
                {formatCurrency(Math.abs(t.amount))}
              </TxAmount>
            </TransactionItem>
          ))}
        </LastTransactionsCard>
      </BottomRow>
    </Container>
  );
};
