import { useState, useEffect, useCallback } from "react";
import { Download } from "lucide-react";
import { useTransactions } from "../../../hooks/useTransaction";
import { useCategories } from "../../../hooks/useCategories";
import {
  SearchInput,
  TypeFilter,
  Pagination,
  TransactionRow,
  PeriodSelector,
  ExportModal,
} from "../../../components/ui";
import { ExportFormat } from "../../../interfaces/enums";
import { dashboardService } from "../../../services/dashboardService";
import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  parseYearMonth,
} from "../../../helpers/date";
import {
  Container,
  Header,
  HeaderLeft,
  PageTitle,
  PageSubtitle,
  ExportButton,
  FiltersBar,
  CategorySelect,
  ListCard,
  EmptyState,
} from "../../Individual/Transactions/TransactionsPage.styles";
import type { TransactionTypeFilter } from "../../../components/ui/TypeFilter/interface";
import type { TransactionReadDto } from "../../../interfaces/transaction";
import { useParams } from "react-router-dom";
import { useToast } from "../../../contexts/useToast";

const PAGE_SIZE = 10;

const now = new Date();
const defaultFrom = getFirstDayOfMonth(now.getFullYear(), now.getMonth() + 1);
const defaultTo = getLastDayOfMonth(now.getFullYear(), now.getMonth() + 1);

export const GroupTransactionsPage = () => {
  const {
    transactions,
    loading,
    fetchGroupTransactions,
    exportTransactions,
  } = useTransactions();
  const { categories } = useCategories();
  const { groupId } = useParams<{ groupId: string }>();

  const [showExportModal, setShowExportModal] = useState(false);
  const [page, setPage] = useState(1);
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionTypeFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const { showToast } = useToast();

  const fetchData = useCallback(
    (newFrom: string, newTo: string, newPage: number) => {
      if (!groupId) return;
      fetchGroupTransactions(groupId, newPage, PAGE_SIZE, newFrom, newTo);
    },
    [fetchGroupTransactions, groupId]
  );

  useEffect(() => {
    const init = async () => {
      const dashboard = await dashboardService.getSelfDashboard();
      if (dashboard.availableMonths.length) {
        setAvailableMonths(dashboard.availableMonths);
        const lastMonth =
          dashboard.availableMonths[dashboard.availableMonths.length - 1];
        const { year, month } = parseYearMonth(lastMonth);
        const newFrom = getFirstDayOfMonth(year, month);
        const newTo = getLastDayOfMonth(year, month);
        setFrom(newFrom);
        setTo(newTo);
        fetchData(newFrom, newTo, 1);
      } else {
        fetchData(defaultFrom, defaultTo, 1);
      }
    };
    init();
  }, [fetchData]);

  const handleApply = (newFrom: string, newTo: string) => {
    setFrom(newFrom);
    setTo(newTo);
    setPage(1);
    fetchData(newFrom, newTo, 1);
  };

  const handleExport = async (format: ExportFormat) => {
    await exportTransactions(format, from, to, groupId);
    setShowExportModal(false);
  };

  // filtros locais
  const filtered = (transactions.items ?? []).filter(
    (t: TransactionReadDto) => {
      const matchSearch =
        !search || t.title.toLowerCase().includes(search.toLowerCase());
      const matchType =
        typeFilter === "all" ||
        (typeFilter === "income" && t.type === 0) ||
        (typeFilter === "expense" && t.type === 1);
      const matchCategory = !categoryFilter || t.categoryId === categoryFilter;
      return matchSearch && matchType && matchCategory;
    }
  );

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <PageTitle>Transações</PageTitle>
          <PageSubtitle>Histórico completo de movimentações</PageSubtitle>
        </HeaderLeft>
        <ExportButton onClick={() => setShowExportModal(true)} disabled={loading}>
          <Download size={16} />
          {loading ? "Exportando..." : "Exportar"}
        </ExportButton>
      </Header>

      <PeriodSelector
        key={`${from}-${to}`}
        availableMonths={availableMonths}
        from={from}
        to={to}
        onApply={handleApply}
      />

      <FiltersBar>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Buscar transação..."
        />
        <TypeFilter value={typeFilter} onChange={setTypeFilter} />
        <CategorySelect
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Todas as categorias</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </CategorySelect>
      </FiltersBar>

      <ListCard>
        {filtered.length === 0 ? (
          <EmptyState>Nenhuma transação encontrada.</EmptyState>
        ) : (
          filtered.map((t) => (
            <TransactionRow
              key={t.id}
              transaction={t}
              isGroupView
            />
          ))
        )}
      </ListCard>

      {transactions.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={transactions.totalPages}
          onPrev={() => {
            const newPage = page - 1;
            setPage(newPage);
            fetchData(from, to, newPage);
          }}
          onNext={() => {
            const newPage = page + 1;
            setPage(newPage);
            fetchData(from, to, newPage);
          }}
        />
      )}

      {showExportModal && (
        <ExportModal
          loading={loading}
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
        />
      )}
    </Container>
  );
};
