import { useState, useEffect, useCallback } from "react";
import { Download, Plus } from "lucide-react";
import { useTransactions } from "../../../hooks/useTransaction";
import { useCategories } from "../../../hooks/useCategories";
import {
  SearchInput,
  TypeFilter,
  Pagination,
  TransactionRow,
  PeriodSelector,
  TransactionEditModal,
  AddTransactionModal,
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
} from "./TransactionsPage.styles";
import type { TransactionTypeFilter } from "../../../components/ui/TypeFilter/interface";
import type { TransactionReadDto } from "../../../interfaces/transaction";
import { useToast } from "../../../contexts/useToast";

const PAGE_SIZE = 10;

const now = new Date();
const defaultFrom = getFirstDayOfMonth(now.getFullYear(), now.getMonth() + 1);
const defaultTo = getLastDayOfMonth(now.getFullYear(), now.getMonth() + 1);

export const TransactionsPage = () => {
  const {
    transactions,
    loading,
    fetchMyTransactions,
    exportTransactions,
    update,
    create,
    createBulk,
  } = useTransactions();
  const { categories } = useCategories();

  const [editingTransaction, setEditingTransaction] =
    useState<TransactionReadDto | null>(null);
  const [page, setPage] = useState(1);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionTypeFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const { showToast } = useToast();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const fetchData = useCallback(
    (newFrom: string, newTo: string, newPage: number, newSearch?: string, newCategory?: string, newType?: TransactionTypeFilter) => {
      const typeNum = newType === "income" ? 0 : newType === "expense" ? 1 : undefined;
      const noCategory = newCategory === "__none__";
      fetchMyTransactions(newPage, PAGE_SIZE, newFrom, newTo, newSearch || undefined, noCategory ? undefined : (newCategory || undefined), typeNum, noCategory);
    },
    [fetchMyTransactions]
  );

  useEffect(() => {
    const init = async () => {
      const dashboard = await dashboardService.getSelfDashboard();
      if (dashboard.availableMonths.length) {
        setAvailableMonths(dashboard.availableMonths);
        const first = dashboard.availableMonths[0];
        const last = dashboard.availableMonths[dashboard.availableMonths.length - 1];
        const newFrom = getFirstDayOfMonth(...(Object.values(parseYearMonth(first)) as [number, number]));
        const newTo = getLastDayOfMonth(...(Object.values(parseYearMonth(last)) as [number, number]));
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
    fetchData(newFrom, newTo, 1, search, categoryFilter, typeFilter);
  };

  const handleExport = async (format: ExportFormat) => {
    await exportTransactions(format, from, to);
    setShowExportModal(false);
  };

  const filtered = transactions.items ?? [];

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <PageTitle>Transações</PageTitle>
          <PageSubtitle>Histórico completo de movimentações</PageSubtitle>
        </HeaderLeft>
        <div style={{ display: "flex", gap: 8 }}>
          <ExportButton onClick={() => setShowAddModal(true)}>
            <Plus size={16} />
            Nova Transação
          </ExportButton>
          <ExportButton onClick={() => setShowExportModal(true)} disabled={loading}>
            <Download size={16} />
            {loading ? "Exportando..." : "Exportar"}
          </ExportButton>
        </div>
      </Header>

      <PeriodSelector
        availableMonths={availableMonths}
        from={from}
        to={to}
        onApply={handleApply}
        defaultActiveMonth="all"
      />

      <FiltersBar>
        <SearchInput
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); fetchData(from, to, 1, v, categoryFilter, typeFilter); }}
          placeholder="Buscar transação..."
        />
        <TypeFilter
          value={typeFilter}
          onChange={(v) => { setTypeFilter(v); setPage(1); fetchData(from, to, 1, search, categoryFilter, v); }}
        />
        <CategorySelect
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); fetchData(from, to, 1, search, e.target.value, typeFilter); }}
        >
          <option value="">Todas as categorias</option>
          <option value="__none__">Sem categoria</option>
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
              onClick={() => setEditingTransaction(t)}
            />
          ))
        )}
      </ListCard>

      {showAddModal && (
        <AddTransactionModal
          onClose={() => setShowAddModal(false)}
          onCreate={async (dto) => {
            const errorMsg = await create(dto);
            if (!errorMsg) {
              window.location.reload();
            } else {
              showToast("error", errorMsg);
            }
            return errorMsg;
          }}
          onCreateBulk={async (dtos) => {
            const errorMsg = await createBulk({ transactions: dtos });
            if (!errorMsg) {
              window.location.reload();
            } else {
              showToast("error", errorMsg);
            }
            return errorMsg;
          }}
        />
      )}

      {editingTransaction && (
        <TransactionEditModal
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onSave={async (id, dto) => {
            const errorMsg = await update(id, dto);
            if (!errorMsg) {
              window.location.reload();
            } else {
              showToast("error", errorMsg);
            }
            return !errorMsg;
          }}
        />
      )}

      {transactions.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={transactions.totalPages}
          onPrev={() => {
            const newPage = page - 1;
            setPage(newPage);
            fetchData(from, to, newPage, search, categoryFilter, typeFilter);
          }}
          onNext={() => {
            const newPage = page + 1;
            setPage(newPage);
            fetchData(from, to, newPage, search, categoryFilter, typeFilter);
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
