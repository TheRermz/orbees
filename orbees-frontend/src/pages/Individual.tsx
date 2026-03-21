import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, Wallet,
  AlertTriangle, CheckCircle, Info, RefreshCw, Bell, ArrowUpRight, ArrowDownRight,
  FileText, Table, ArrowLeft, ArrowRight,
  Search, Download, Tag, FolderOpen, Users,
  UtensilsCrossed, Car, Home, Pill, BookOpen, Gamepad2, Banknote, Package,
  ShoppingCart, ShoppingBag, Coffee, Apple, Milk, Sandwich, Wine, Building,
  Building2, Lightbulb, Wrench, Hammer, Bed, Sofa, Lamp, Bus, Plane, Train,
  Bike, Fuel, Truck, Ship, Heart, Activity, Stethoscope, Dumbbell, Baby, Eye,
  DollarSign, CreditCard, PiggyBank, Receipt, Coins,
  GraduationCap, Pencil, School, Backpack, Music, Film, Headphones, Camera,
  Tv, Star, Smartphone, Laptop, Monitor, Wifi, Briefcase, BarChart2,
  Globe, Gift, Scissors, Shirt, Palette, TreePine, Sun, Zap, Cat, Dog,
  Flower2, Pizza,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { transactions, categories } from '../data/mockData';
import CategoriesPage from './CategoriesPage';
import './Individual.css';

const ICON_MAP: Record<string, React.ElementType> = {
  ShoppingCart, ShoppingBag, UtensilsCrossed, Coffee, Pizza, Apple,
  Milk, Sandwich, Wine, Home, Building, Building2, Lightbulb, Wrench,
  Hammer, Bed, Sofa, Lamp, Car, Bus, Plane, Train, Bike, Fuel, Truck,
  Ship, Heart, Activity, Pill, Stethoscope, Dumbbell, Baby, Eye,
  DollarSign, CreditCard, Banknote, PiggyBank, Wallet, TrendingUp,
  Receipt, Coins, BookOpen, GraduationCap, Pencil, School, Backpack,
  Music, Film, Gamepad2, Headphones, Camera, Tv, Star,
  Smartphone, Laptop, Monitor, Wifi, Briefcase, Users, BarChart2,
  Globe, Package, Gift, Scissors, Shirt, Palette, TreePine, Sun,
  Zap, Cat, Dog, Flower2, Tag,
};

const NAME_TO_ICON: Record<string, string> = {
  'Alimentação': 'UtensilsCrossed',
  'Transporte': 'Car',
  'Moradia': 'Home',
  'Saúde': 'Pill',
  'Educação': 'BookOpen',
  'Lazer': 'Gamepad2',
  'Salário': 'Banknote',
  'Outros': 'Package',
};

type UploadStep = 'select' | 'preview' | 'categorize' | 'done';

const uploadCategories = ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 'Lazer', 'Salário', 'Outros'];

// Categorias do grupo criadas pelo administrador (mock)
const groupCategories = ['Aluguel Compartilhado', 'Mercado do Mês', 'Conta de Luz', 'Internet', 'Streaming Compartilhado', 'Outros do Grupo'];

// Mock: usuário atual pertence ao grupo "Família / Grupo"
const userGroupName = 'Família / Grupo';

const previewData = [
  { date: '2026-03-01', desc: 'PIX RECEBIDO MARIA SILVA', amount: 500.00, category: null as string | null },
  { date: '2026-03-02', desc: 'COMPRA SUPERMERCADO BH', amount: -210.50, category: 'Alimentação' as string | null },
  { date: '2026-03-03', desc: 'DEB AUT ENERGIA CEMIG', amount: -145.00, category: 'Moradia' as string | null },
  { date: '2026-03-04', desc: 'TED ENVIADO', amount: -300.00, category: null as string | null },
  { date: '2026-03-05', desc: 'CREDITO SALARIO', amount: 4500.00, category: 'Salário' as string | null },
];

const budgets: Record<string, number> = {
  Alimentação: 400, Moradia: 1400, Transporte: 250, Saúde: 200, Lazer: 150, Educação: 120, Outros: 200,
};

export default function Individual() {
  return (
    <div className="individual-page">
      <Outlet />
    </div>
  );
}

export function IndividualDashboard() { return <DashboardTab />; }
export function IndividualTransactions() { return <TransactionsTab />; }
export function IndividualCategories() { return <CategoriesPage />; }
export function IndividualUpload() { return <UploadTab />; }

/* ─── DASHBOARD TAB ─── */
function DashboardTab() {
  const [catView, setCatView] = useState<'value' | 'qty'>('value');
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  // ─── Period filter ───
  const availableMonths = [...new Set(transactions.map(t => t.date.slice(0, 7)))].sort();

  const lastDayOf = (ym: string) => {
    const [y, mo] = ym.split('-').map(Number);
    return new Date(y, mo, 0).toISOString().slice(0, 10);
  };

  const defaultMonth = availableMonths.at(-1) ?? new Date().toISOString().slice(0, 7);
  const [dateFrom, setDateFrom] = useState(defaultMonth + '-01');
  const [dateTo, setDateTo] = useState(lastDayOf(defaultMonth));

  const selectMonth = (m: string) => { setDateFrom(m + '-01'); setDateTo(lastDayOf(m)); };
  const selectAll = () => {
    setDateFrom(availableMonths[0] + '-01');
    setDateTo(lastDayOf(availableMonths.at(-1)!));
  };
  const isMonthActive = (m: string) => dateFrom === m + '-01' && dateTo === lastDayOf(m);
  const isAllActive = availableMonths.length > 1
    && dateFrom === availableMonths[0] + '-01'
    && dateTo === lastDayOf(availableMonths.at(-1)!);

  const monthLabel = (m: string) => {
    const [y, mo] = m.split('-').map(Number);
    const s = new Date(y, mo - 1).toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
    return s.charAt(0).toUpperCase() + s.slice(1) + ' ' + String(y).slice(2);
  };

  // ─── Filtered transactions ───
  const filtered = transactions.filter(t => t.date >= dateFrom && t.date <= dateTo + 'T23:59:59');

  // ─── KPI metrics ───
  const totalIncome  = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = Math.abs(filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0));
  const balance = totalIncome - totalExpense;

  // ─── Previous period ───
  const fromMs    = new Date(dateFrom).getTime();
  const periodMs  = new Date(dateTo).getTime() - fromMs + 86400000;
  const prevToStr = new Date(fromMs - 86400000).toISOString().slice(0, 10);
  const prevFromStr = new Date(fromMs - periodMs).toISOString().slice(0, 10);
  const prevFiltered = transactions.filter(t => t.date >= prevFromStr && t.date <= prevToStr + 'T23:59:59');
  const prevIncome  = prevFiltered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const prevExpense = Math.abs(prevFiltered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0));
  const prevBalance = prevIncome - prevExpense;

  const pctChange = (curr: number, prev: number) => prev !== 0 ? ((curr - prev) / Math.abs(prev)) * 100 : 0;
  const incomeChange  = pctChange(totalIncome,  prevIncome);
  const expenseChange = pctChange(totalExpense, prevExpense);
  const balanceChange = pctChange(balance,      prevBalance);

  // ─── Category data from filtered ───
  const catMapFiltered: Record<string, number> = {};
  filtered.filter(t => t.type === 'expense').forEach(t => {
    catMapFiltered[t.category] = (catMapFiltered[t.category] ?? 0) + Math.abs(t.amount);
  });
  const filteredCatExpenses = Object.entries(catMapFiltered)
    .map(([name, value]) => ({ name, value, color: categories.find(c => c.name === name)?.color ?? '#888' }))
    .sort((a, b) => b.value - a.value);

  const topCategory    = filteredCatExpenses[0] ?? { name: '—', value: 0, color: '#888' };
  const topCategoryPct = totalExpense > 0 ? Math.round((topCategory.value / totalExpense) * 100) : 0;

  // ─── Bar chart data from filtered ───
  const filteredMonths = [...new Set(filtered.map(t => t.date.slice(0, 7)))].sort();
  const barData = filteredMonths.length > 1
    ? filteredMonths.map(m => {
        const mTx = filtered.filter(t => t.date.startsWith(m));
        return {
          month: monthLabel(m),
          receitas: mTx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),
          despesas: Math.abs(mTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)),
        };
      })
    : (() => {
        const monthEnd = new Date(dateTo).getDate();
        const weeks = [
          { label: 'Dias 1–7',            start: 1,  end: 7         },
          { label: 'Dias 8–14',           start: 8,  end: 14        },
          { label: 'Dias 15–21',          start: 15, end: 21        },
          { label: `Dias 22–${monthEnd}`, start: 22, end: monthEnd  },
        ];
        return weeks.map(({ label, start, end }) => {
          const wTx = filtered.filter(t => { const d = new Date(t.date).getDate(); return d >= start && d <= end; });
          return {
            month: label,
            receitas: wTx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),
            despesas: Math.abs(wTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)),
          };
        });
      })();

  // ─── Category chart ───
  const catQty = categories.map(cat => ({
    name: cat.name,
    value: filtered.filter(t => t.category === cat.name).length,
    color: cat.color,
  })).filter(c => c.value > 0);
  const catData = catView === 'value' ? filteredCatExpenses : catQty;

  // ─── Insights — sempre dos últimos 3 meses, não afetados pelo filtro ───
  const txMonths = [...new Set(transactions.map(t => t.date.slice(0, 7)))].sort();
  const insightCurrent = txMonths.at(-1)!;
  const insightPrev    = txMonths.slice(-3, -1);

  const catAvgInsight: Record<string, number> = {};
  for (const m of insightPrev) {
    transactions.filter(t => t.date.startsWith(m) && t.type === 'expense')
      .forEach(t => { catAvgInsight[t.category] = (catAvgInsight[t.category] ?? 0) + Math.abs(t.amount); });
  }
  for (const cat of Object.keys(catAvgInsight)) catAvgInsight[cat] /= insightPrev.length || 1;

  const currentCatTotals: Record<string, number> = {};
  transactions.filter(t => t.date.startsWith(insightCurrent) && t.type === 'expense')
    .forEach(t => { currentCatTotals[t.category] = (currentCatTotals[t.category] ?? 0) + Math.abs(t.amount); });

  let topVarCat = '', topVarPct = 0;
  for (const [cat, val] of Object.entries(currentCatTotals)) {
    const avg = catAvgInsight[cat] ?? 0;
    if (avg > 0) { const pct = ((val - avg) / avg) * 100; if (pct > topVarPct) { topVarPct = pct; topVarCat = cat; } }
  }

  const descsByMonth: Record<string, Set<string>> = {};
  for (const m of txMonths.slice(-3)) {
    descsByMonth[m] = new Set(transactions.filter(t => t.date.startsWith(m)).map(t => t.description));
  }
  const recurring = [...new Set(transactions.map(t => t.description))].filter(desc =>
    txMonths.slice(-3).filter(m => descsByMonth[m]?.has(desc)).length >= 2
  );
  const recNames = recurring.slice(0, 3);
  const recExtra  = recurring.length > 3 ? ` e mais ${recurring.length - 3}` : '';
  const recStr    = recNames.length === 1 ? recNames[0]
    : recNames.length === 2 ? `${recNames[0]} e ${recNames[1]}`
    : `${recNames[0]}, ${recNames[1]} e ${recNames[2]}`;

  const latestTxDate   = new Date(Math.max(...transactions.map(t => new Date(t.date).getTime())));
  const daysSinceLastTx = Math.floor((Date.now() - latestTxDate.getTime()) / (1000 * 60 * 60 * 24));

  const insights: { type: string; icon: React.ElementType; text: string }[] = [];
  if (topVarPct > 10)    insights.push({ type: 'warning', icon: AlertTriangle, text: `Gastos com ${topVarCat} ${topVarPct.toFixed(0)}% acima da sua média dos últimos 3 meses.` });
  if (recurring.length)  insights.push({ type: 'info',    icon: RefreshCw,    text: `${recurring.length} transaç${recurring.length === 1 ? 'ão recorrente identificada' : 'ões recorrentes identificadas'} este mês: ${recStr}${recExtra}.` });
  if (daysSinceLastTx > 7) insights.push({ type: 'neutral', icon: Bell, text: 'Nenhuma transação registrada nos últimos 7 dias. Seu extrato está atualizado?' });

  const fmt    = (v: number) => Math.abs(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const fmtPct = (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(1)}%`;

  return (
    <div className="ind-dashboard">

      {/* ── Filtro de Período ── */}
      <div className="period-filter">
        <span className="period-label">Período</span>
        <div className="period-months">
          {availableMonths.map(m => (
            <button key={m} className={`period-month-btn${isMonthActive(m) ? ' active' : ''}`} onClick={() => selectMonth(m)}>
              {monthLabel(m)}
            </button>
          ))}
          {availableMonths.length > 1 && (
            <button className={`period-month-btn${isAllActive ? ' active' : ''}`} onClick={selectAll}>Todos</button>
          )}
        </div>
        <div className="period-divider" />
        <div className="period-dates">
          <span className="period-date-label">De</span>
          <input type="date" className="period-date-input" value={dateFrom} max={dateTo} onChange={e => setDateFrom(e.target.value)} />
          <span className="period-date-label">até</span>
          <input type="date" className="period-date-input" value={dateTo}   min={dateFrom} onChange={e => setDateTo(e.target.value)} />
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="cards-grid ind-cards-grid">
        <KpiCard label="Saldo do Mês"    value={fmt(balance)}      change={fmtPct(balanceChange)}  positive={balanceChange >= 0}  icon={<Wallet size={20} />}      accent="#F5A623" valueColor={balance >= 0 ? '#27AE60' : '#E74C3C'} />
        <KpiCard label="Receitas"        value={fmt(totalIncome)}  change={fmtPct(incomeChange)}   positive={incomeChange >= 0}   icon={<TrendingUp size={20} />}   accent="#27AE60" />
        <KpiCard label="Despesas"        value={fmt(totalExpense)} change={fmtPct(expenseChange)}  positive={expenseChange <= 0}  icon={<TrendingDown size={20} />} accent="#E74C3C" />
        <KpiCard label="Maior Categoria" value={topCategory.name} change={`${fmt(topCategory.value)} · ${topCategoryPct}% das despesas`} positive={false} icon={<Tag size={20} />} accent={topCategory.color} noChangeArrow noChangeSuffix />
      </div>

      {/* ── Insights ── */}
      <div className="insights-section">
        <h3 className="section-title">Insights do Mês</h3>
        <div className="insights-list">
          {insights.map((ins, i) => (
            <div key={i} className={`insight-card insight-${ins.type}`}>
              <ins.icon size={16} />
              <span>{ins.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Charts Row ── */}
      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-header"><h3>Receitas vs Despesas</h3></div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} barGap={4} margin={{ bottom: filteredMonths.length <= 1 ? 20 : 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: '#666' }}
                angle={filteredMonths.length <= 1 ? -25 : 0}
                textAnchor={filteredMonths.length <= 1 ? 'end' : 'middle'}
                height={filteredMonths.length <= 1 ? 50 : 30}
                interval={0}
              />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [fmt(Number(v ?? 0)), '']} />
              <Bar dataKey="receitas" fill="#27AE60" radius={[4, 4, 0, 0]} name="Receitas" />
              <Bar dataKey="despesas" fill="#E74C3C" radius={[4, 4, 0, 0]} name="Despesas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Gastos por Categoria</h3>
            <div className="chart-controls">
              <div className="toggle-group">
                <button className={`toggle-btn ${catView === 'value' ? 'active' : ''}`} onClick={() => setCatView('value')}>Valor</button>
                <button className={`toggle-btn ${catView === 'qty'   ? 'active' : ''}`} onClick={() => setCatView('qty')}>Qtd</button>
              </div>
              <div className="toggle-group">
                <button className={`toggle-btn ${chartType === 'bar' ? 'active' : ''}`} onClick={() => setChartType('bar')}>Barra</button>
                <button className={`toggle-btn ${chartType === 'pie' ? 'active' : ''}`} onClick={() => setChartType('pie')}>Pizza</button>
              </div>
            </div>
          </div>

          {chartType === 'bar' ? (
            <div className="category-bars">
              {catData.map(c => {
                const budget = budgets[c.name] || 300;
                const pct = catView === 'value' ? Math.min(100, (c.value / budget) * 100) : Math.min(100, (c.value / 5) * 100);
                const over = catView === 'value' && pct >= 90;
                return (
                  <div key={c.name} className="cat-bar-row">
                    <div className="cat-bar-label"><span className="cat-dot" style={{ background: c.color }} /><span>{c.name}</span></div>
                    <div className="cat-bar-track"><div className="cat-bar-fill" style={{ width: `${pct}%`, background: over ? '#E74C3C' : c.color }} /></div>
                    <div className="cat-bar-values">
                      <span className={over ? 'over' : ''}>{catView === 'value' ? fmt(c.value) : `${c.value} transaç${c.value !== 1 ? 'ões' : 'ão'}`}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="pie-wrapper">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={catData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={2}>
                    {catData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const e = payload[0];
                    return (
                      <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 6, padding: '8px 12px', fontSize: 13 }}>
                        <div style={{ fontWeight: 600, marginBottom: 2 }}>{e.name as string}</div>
                        <div>{catView === 'value' ? fmt(Number(e.value ?? 0)) : `${e.value} ${Number(e.value) === 1 ? 'transação' : 'transações'}`}</div>
                      </div>
                    );
                  }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend">
                {catData.map(c => (
                  <div key={c.name} className="legend-item">
                    <span className="legend-dot" style={{ background: c.color }} />
                    <span className="legend-name">{c.name}</span>
                    <span className="legend-value">{catView === 'value' ? fmt(c.value) : c.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Transações Recentes (do período filtrado) ── */}
      <div className="chart-card">
        <div className="chart-header">
          <h3>Transações Recentes</h3>
          <span className="see-all" style={{ cursor: 'pointer' }}>Ver todas</span>
        </div>
        <div className="tx-list">
          {filtered.slice(0, 5).map(tx => (
            <div key={tx.id} className="tx-item">
              <div className="tx-left">
                <div className="tx-category-dot" style={{ background: tx.amount > 0 ? '#27AE60' : '#E74C3C' }} />
                <div>
                  <div className="tx-desc">{tx.description}</div>
                  <div className="tx-meta">{tx.category} · {new Date(tx.date).toLocaleDateString('pt-BR')}</div>
                </div>
              </div>
              <span className={`tx-amount ${tx.amount > 0 ? 'positive' : 'negative'}`}>{fmt(tx.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, change, positive, icon, accent, valueColor, noChangeArrow, noChangeSuffix }: {
  label: string; value: string; change: string; positive: boolean; icon: React.ReactNode; accent: string;
  valueColor?: string; noChangeArrow?: boolean; noChangeSuffix?: boolean;
}) {
  return (
    <div className="kpi-card" style={{ borderTopColor: accent }}>
      <div className="kpi-top">
        <span className="kpi-label">{label}</span>
        <span className="kpi-icon" style={{ background: accent + '18', color: accent }}>{icon}</span>
      </div>
      <div className="kpi-value" style={valueColor ? { color: valueColor } : undefined}>{value}</div>
      <div className={`kpi-change ${noChangeArrow ? 'neutral' : positive ? 'positive' : 'negative'}`}>
        {!noChangeArrow && (positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />)}
        {change}{!noChangeSuffix && ' vs mês anterior'}
      </div>
    </div>
  );
}

/* ─── TRANSACTIONS TAB ─── */
function TransactionsTab() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCat, setFilterCat] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // ─── Period filter ───
  const availableMonths = [...new Set(transactions.map(t => t.date.slice(0, 7)))].sort();
  const lastDayOf = (ym: string) => { const [y, m] = ym.split('-').map(Number); return new Date(y, m, 0).toISOString().slice(0, 10); };
  const selectMonth = (m: string) => { setDateFrom(m + '-01'); setDateTo(lastDayOf(m)); };
  const selectAll = () => { setDateFrom(''); setDateTo(''); };
  const isMonthActive = (m: string) => dateFrom === m + '-01' && dateTo === lastDayOf(m);
  const isAllActive = dateFrom === '' && dateTo === '';
  const monthLabel = (m: string) => {
    const [y, mo] = m.split('-').map(Number);
    const s = new Date(y, mo - 1).toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
    return s.charAt(0).toUpperCase() + s.slice(1) + ' ' + String(y).slice(2);
  };

  const fmt = (v: number) => Math.abs(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const filtered = transactions.filter(t => {
    const matchSearch = t.description.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || t.type === filterType;
    const matchCat = filterCat === 'all' || t.category === filterCat;
    const matchFrom = !dateFrom || t.date >= dateFrom;
    const matchTo = !dateTo || t.date <= dateTo + 'T23:59:59';
    return matchSearch && matchType && matchCat && matchFrom && matchTo;
  });

  const [showExportModal, setShowExportModal] = useState(false);

  const doExport = (format: 'csv' | 'xlsx') => {
    const header = ['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor'];
    const rows = filtered.map(t => [
      new Date(t.date).toLocaleDateString('pt-BR'),
      t.description,
      t.category,
      t.type === 'income' ? 'Receita' : 'Despesa',
      t.amount.toFixed(2).replace('.', ','),
    ]);

    if (format === 'csv') {
      const csv = [header, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
      const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'transacoes.csv';
      a.click();
      URL.revokeObjectURL(a.href);
    } else {
      // XLSX via tab-separated (opens correctly in Excel)
      const tsv = [header, ...rows].map(r => r.join('\t')).join('\n');
      const blob = new Blob([tsv], { type: 'application/vnd.ms-excel;charset=utf-8;' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'transacoes.xlsx';
      a.click();
      URL.revokeObjectURL(a.href);
    }
    setShowExportModal(false);
  };

  return (
    <div className="ind-transactions">
      <div className="ind-tx-header">
        <div>
          <h2>Transações</h2>
          <p>Histórico completo de movimentações</p>
        </div>
        <button className="export-btn" onClick={() => setShowExportModal(true)}>
          <Download size={14} /> Exportar
        </button>
      </div>

      {/* Export modal */}
      {showExportModal && (
        <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
          <div className="export-modal" onClick={e => e.stopPropagation()}>
            <div className="export-modal-header">
              <span>Exportar transações</span>
              <button className="export-modal-close" onClick={() => setShowExportModal(false)}>✕</button>
            </div>
            <p className="export-modal-desc">Escolha o formato para exportar <strong>{filtered.length}</strong> transaç{filtered.length === 1 ? 'ão' : 'ões'}:</p>
            <div className="export-modal-options">
              <button className="export-option-btn" onClick={() => doExport('csv')}>
                <div className="export-option-icon csv">CSV</div>
                <div>
                  <div className="export-option-label">CSV</div>
                  <div className="export-option-sub">Compatível com Excel, Google Sheets</div>
                </div>
              </button>
              <button className="export-option-btn" onClick={() => doExport('xlsx')}>
                <div className="export-option-icon xlsx">XLS</div>
                <div>
                  <div className="export-option-label">Excel (XLSX)</div>
                  <div className="export-option-sub">Abre direto no Microsoft Excel</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Period filter */}
      <div className="period-filter">
        <span className="period-label">Período</span>
        <div className="period-months">
          <button className={`period-month-btn${isAllActive ? ' active' : ''}`} onClick={selectAll}>Todos</button>
          {availableMonths.map(m => (
            <button key={m} className={`period-month-btn${isMonthActive(m) ? ' active' : ''}`} onClick={() => selectMonth(m)}>
              {monthLabel(m)}
            </button>
          ))}
        </div>
        <div className="period-divider" />
        <div className="period-dates">
          <span className="period-date-label">De</span>
          <input type="date" className="period-date-input" value={dateFrom} max={dateTo || undefined} onChange={e => setDateFrom(e.target.value)} />
          <span className="period-date-label">até</span>
          <input type="date" className="period-date-input" value={dateTo} min={dateFrom || undefined} onChange={e => setDateTo(e.target.value)} />
        </div>
      </div>

      {/* Search + Type + Category */}
      <div className="tx-filter-row">
        <div className="search-input-wrap tx-search">
          <Search size={14} />
          <input type="text" placeholder="Buscar transação..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="tx-type-pills">
          <button className={`tx-type-pill${filterType === 'all' ? ' active' : ''}`} onClick={() => setFilterType('all')}>Todos</button>
          <button className={`tx-type-pill${filterType === 'income' ? ' active income' : ''}`} onClick={() => setFilterType('income')}>
            <TrendingUp size={12} /> Receitas
          </button>
          <button className={`tx-type-pill${filterType === 'expense' ? ' active expense' : ''}`} onClick={() => setFilterType('expense')}>
            <TrendingDown size={12} /> Despesas
          </button>
        </div>
        <select className="filter-select tx-cat-select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          <option value="all">Todas as categorias</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </div>

      {/* List */}
      <div className="table-card">
        {filtered.length === 0 ? (
          <div className="empty-state">Nenhuma transação encontrada.</div>
        ) : (
          <div className="ind-tx-list">
            {filtered.map((tx, i) => {
              const cat = categories.find(c => c.name === tx.category);
              const iconKey = NAME_TO_ICON[tx.category] ?? 'Tag';
              const CatIcon = ICON_MAP[iconKey] ?? Tag;
              const color = cat?.color ?? '#888';
              const isIncome = tx.amount > 0;
              return (
                <div key={tx.id} className={`ind-tx-row ${i < filtered.length - 1 ? 'bordered' : ''}`}>
                  <div className="ind-tx-row-icon" style={{ background: color + '18', color }}>
                    <CatIcon size={17} />
                  </div>
                  <div className="ind-tx-row-main">
                    <span className="ind-tx-row-desc">{tx.description}</span>
                    <span className="ind-cat-badge" style={{ background: color + '18', color }}>
                      <span className="ind-cat-badge-icon" style={{ background: color }}>
                        <CatIcon size={10} color="white" />
                      </span>
                      {tx.category}
                    </span>
                  </div>
                  <div className="ind-tx-row-right">
                    <span className={`ind-tx-amount ${isIncome ? 'positive' : 'negative'}`}>
                      {isIncome ? '+' : '-'}{fmt(tx.amount)}
                    </span>
                    <span className="ind-tx-date">
                      {new Date(tx.date).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* CategoriesTab replaced by CategoriesPage component */

/* ─── UPLOAD TAB ─── */
function UploadTab() {
  const [step, setStep] = useState<UploadStep>('select');
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [cats, setCats] = useState<Record<number, string>>({});
  const [showNewCat, setShowNewCat] = useState<Record<number, boolean>>({});
  const [newCatName, setNewCatName] = useState<Record<number, string>>({});
  const [newCatColor, setNewCatColor] = useState<Record<number, string>>({});
  const [extraCats, setExtraCats] = useState<string[]>([]);
  // Compartilhamento com grupo
  const [sharedWithGroup, setSharedWithGroup] = useState<Record<number, boolean>>({});
  const [groupCat, setGroupCat] = useState<Record<number, string>>({});

  const fmt = (v: number) => Math.abs(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const allUploadCats = [...uploadCategories, ...extraCats];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) { setFileName(file.name); setStep('preview'); }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setFileName(file.name); setStep('preview'); }
  };

  const needsCat = previewData.filter(r => !r.category);

  const handleCatChange = (i: number, val: string) => {
    if (val === '__new__') {
      setShowNewCat(prev => ({ ...prev, [i]: true }));
      setNewCatName(prev => ({ ...prev, [i]: '' }));
      setNewCatColor(prev => ({ ...prev, [i]: '#F5A623' }));
    } else {
      setShowNewCat(prev => ({ ...prev, [i]: false }));
      setCats(prev => ({ ...prev, [i]: val }));
    }
  };

  const handleCreateInline = (i: number) => {
    const name = (newCatName[i] || '').trim();
    if (!name) return;
    setExtraCats(prev => [...prev, name]);
    setCats(prev => ({ ...prev, [i]: name }));
    setShowNewCat(prev => ({ ...prev, [i]: false }));
  };

  const steps = ['select', 'preview', 'categorize', 'done'];

  return (
    <div className="ind-upload">
      <div className="page-header">
        <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Importar Extrato</h2>
        <p>Faça upload do seu extrato bancário nos formatos OFX ou CSV</p>
      </div>

      {/* Steps indicator */}
      <div className="steps-bar">
        {['Selecionar Arquivo', 'Pré-visualizar', 'Categorizar', 'Concluído'].map((s, i) => {
          const stepKey = steps[i] as UploadStep;
          const current = steps.indexOf(step);
          const idx = steps.indexOf(stepKey);
          return (
            <div key={s} className={`step ${idx <= current ? 'active' : ''} ${idx < current ? 'done' : ''}`}>
              <div className="step-circle">{idx < current ? <CheckCircle size={14} /> : i + 1}</div>
              <span>{s}</span>
            </div>
          );
        })}
      </div>

      {/* STEP 1: Select */}
      {step === 'select' && (
        <div
          className={`drop-zone ${dragging ? 'dragging' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <div><FolderOpen size={56} /></div>
          <h3>Arraste seu extrato aqui</h3>
          <p>Suporta arquivos <strong>OFX</strong> e <strong>CSV</strong> exportados pelo seu banco</p>
          <label className="upload-btn">
            Selecionar Arquivo
            <input type="file" accept=".ofx,.csv" hidden onChange={handleFile} />
          </label>
          <div className="format-info">
            <div className="format-badge"><FileText size={14} /> OFX — Padrão bancário universal</div>
            <div className="format-badge"><Table size={14} /> CSV — Planilha de transações</div>
          </div>
        </div>
      )}

      {/* STEP 2: Preview */}
      {step === 'preview' && (
        <div className="preview-section">
          <div className="file-info-bar">
            <span><FileText size={14} /> {fileName}</span>
            <span className="badge-green">{previewData.length} transações encontradas</span>
          </div>
          <div className="table-card">
            <table className="tx-table">
              <thead>
                <tr><th>Data</th><th>Descrição</th><th>Valor</th><th>Categoria</th></tr>
              </thead>
              <tbody>
                {previewData.map((r, i) => (
                  <tr key={i}>
                    <td>{new Date(r.date).toLocaleDateString('pt-BR')}</td>
                    <td>{r.desc}</td>
                    <td className={r.amount > 0 ? 'amount-cell positive' : 'amount-cell negative'}>
                      {r.amount > 0 ? '+' : '-'}{fmt(r.amount)}
                    </td>
                    <td>
                      {r.category
                        ? <span className="upload-cat-auto"><CheckCircle size={12} /> {r.category}</span>
                        : <span className="upload-cat-pending"><Tag size={12} /> A categorizar</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="action-bar">
            <button className="btn-secondary" onClick={() => setStep('select')}><ArrowLeft size={16} /> Voltar</button>
            <button className="btn-primary" onClick={() => setStep('categorize')}>
              Categorizar {needsCat.length} transações <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Categorize */}
      {step === 'categorize' && (
        <div className="categorize-section">
          <div className="info-banner">
            <Info size={16} />
            <p>Estas transações são novas. Ao categorizá-las agora, o sistema aprenderá a reconhecê-las automaticamente nas próximas importações.</p>
          </div>
          <div className="cat-list">
            {needsCat.map((r, i) => (
              <div key={i} className="cat-item-full">
                {/* Linha principal: descrição + categoria individual */}
                <div className="cat-item-row">
                  <div className="cat-item-info">
                    <div className="cat-desc">{r.desc}</div>
                    <div className="cat-amount">{fmt(r.amount)}</div>
                  </div>
                  <select
                    className="cat-select"
                    value={showNewCat[i] ? '__new__' : (cats[i] || '')}
                    onChange={e => handleCatChange(i, e.target.value)}
                  >
                    <option value="">Selecione a categoria individual...</option>
                    {allUploadCats.map(c => <option key={c} value={c}>{c}</option>)}
                    <option value="__new__">+ Criar nova categoria...</option>
                  </select>
                </div>

                {/* Criar categoria inline */}
                {showNewCat[i] && (
                  <div className="inline-new-cat">
                    <input
                      type="text"
                      placeholder="Nome da categoria..."
                      value={newCatName[i] || ''}
                      onChange={e => setNewCatName(prev => ({ ...prev, [i]: e.target.value }))}
                    />
                    <input
                      type="color"
                      value={newCatColor[i] || '#F5A623'}
                      onChange={e => setNewCatColor(prev => ({ ...prev, [i]: e.target.value }))}
                    />
                    <button className="btn-create-mini" onClick={() => handleCreateInline(i)}>Criar</button>
                  </div>
                )}

                {/* Toggle: compartilhar com grupo */}
                <div className="group-share-row">
                  <label className="group-share-toggle">
                    <input
                      type="checkbox"
                      checked={!!sharedWithGroup[i]}
                      onChange={e => setSharedWithGroup(prev => ({ ...prev, [i]: e.target.checked }))}
                    />
                    <span className="toggle-track">
                      <span className="toggle-thumb" />
                    </span>
                    <span className="group-share-label">
                      <Users size={13} />
                      Compartilhar com <strong>{userGroupName}</strong>
                    </span>
                  </label>

                  {sharedWithGroup[i] && (
                    <select
                      className="cat-select group-cat-select"
                      value={groupCat[i] || ''}
                      onChange={e => setGroupCat(prev => ({ ...prev, [i]: e.target.value }))}
                    >
                      <option value="">Categoria do grupo...</option>
                      {groupCategories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="action-bar">
            <button className="btn-secondary" onClick={() => setStep('preview')}><ArrowLeft size={16} /> Voltar</button>
            <button className="btn-primary" onClick={() => setStep('done')}>
              Importar Extrato <CheckCircle size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Done */}
      {step === 'done' && (() => {
        const sharedCount = Object.values(sharedWithGroup).filter(Boolean).length;
        return (
          <div className="done-section">
            <div><CheckCircle size={64} color="#27AE60" /></div>
            <h2>Extrato importado com sucesso!</h2>
            <p>{previewData.length} transações foram adicionadas à sua conta.</p>
            <div className="done-stats">
              <div className="done-stat">
                <span className="stat-num green">{previewData.filter(r => r.amount > 0).length}</span>
                <span className="stat-label">Receitas</span>
              </div>
              <div className="done-stat">
                <span className="stat-num red">{previewData.filter(r => r.amount < 0).length}</span>
                <span className="stat-label">Despesas</span>
              </div>
              <div className="done-stat">
                <span className="stat-num">{previewData.length}</span>
                <span className="stat-label">Total</span>
              </div>
            </div>
            {sharedCount > 0 && (
              <div className="group-share-summary">
                <Users size={16} />
                <span>
                  <strong>{sharedCount} transaç{sharedCount === 1 ? 'ão foi compartilhada' : 'ões foram compartilhadas'}</strong> com o grupo <strong>{userGroupName}</strong> e já aparecem em Controle em Grupo &gt; Transações.
                </span>
              </div>
            )}
            <div className="action-bar center">
              <button className="btn-secondary" onClick={() => setStep('select')}>Importar Outro</button>
              <button className="btn-primary" onClick={() => setStep('select')}>
                Ver Dashboard <ArrowRight size={16} />
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
