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
    fetchMyTransactions,
    exportTransactions,
    update,
    create,
    createBulk,
    error,
  } = useTransactions();
  const { categories } = useCategories();

  const [editingTransaction, setEditingTransaction] =
    useState<TransactionReadDto | null>(null);
  const [page, setPage] = useState(1);
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionTypeFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const { showToast } = useToast();

  const [showAddModal, setShowAddModal] = useState(false);

  const fetchData = useCallback(
    (newFrom: string, newTo: string, newPage: number) => {
      fetchMyTransactions(newPage, PAGE_SIZE, newFrom, newTo);
    },
    [fetchMyTransactions]
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

  const handleExport = async () => {
    await exportTransactions(ExportFormat.PDF, from, to);
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
        <div style={{ display: "flex", gap: 8 }}>
          <ExportButton onClick={() => setShowAddModal(true)}>
            <Plus size={16} />
            Nova Transação
          </ExportButton>
          <ExportButton onClick={handleExport}>
            <Download size={16} />
            Exportar
          </ExportButton>
        </div>
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
              onClick={() => setEditingTransaction(t)}
            />
          ))
        )}
      </ListCard>

      {showAddModal && (
        <AddTransactionModal
          onClose={() => setShowAddModal(false)}
          onCreate={async (dto) => {
            const success = await create(dto);
            if (success) {
              showToast("success", "Transação criada.");
              fetchData(from, to, page);
            } else {
              showToast("error", error ?? "Erro ao criar transação.");
            }
            return success;
          }}
          onCreateBulk={async (dtos) => {
            const success = await createBulk({ transactions: dtos });
            if (success) {
              showToast("success", "Transações criadas.");
              fetchData(from, to, page);
            } else {
              showToast("error", error ?? "Erro ao criar transações.");
            }
            return success;
          }}
        />
      )}

      {editingTransaction && (
        <TransactionEditModal
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onSave={async (id, dto) => {
            const success = await update(id, dto);
            if (success) {
              showToast("success", "Transação atualizada.");
              fetchData(from, to, page);
            } else {
              showToast("error", error ?? "Erro ao atualizar transação.");
            }
            return success;
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
            fetchData(from, to, newPage);
          }}
          onNext={() => {
            const newPage = page + 1;
            setPage(newPage);
            fetchData(from, to, newPage);
          }}
        />
      )}
    </Container>
  );
};
