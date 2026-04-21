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
  Flower2, Pizza, Plus, Trash2, Edit3, ArrowUp, ArrowDown, BanknoteIcon,
  AlertCircle,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { transactions, categories } from '../data/mockData';
import { addNotification } from '../utils/notifications';
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

const groupCategories = ['Aluguel Compartilhado', 'Mercado do Mês', 'Conta de Luz', 'Internet', 'Streaming Compartilhado', 'Outros do Grupo'];

const userGroupName = 'Família / Grupo';

interface PreviewRow {
  date: string;
  desc: string;
  title: string;
  amount: number;
  category: string | null;
  removed?: boolean;
}

const initialPreviewData: PreviewRow[] = [
  { date: '2026-03-01', desc: 'PIX RECEBIDO MARIA SILVA', title: 'PIX RECEBIDO MARIA SILVA', amount: 500.00, category: null },
  { date: '2026-03-02', desc: 'COMPRA SUPERMERCADO BH', title: 'COMPRA SUPERMERCADO BH', amount: -210.50, category: 'Alimentação' },
  { date: '2026-03-03', desc: 'DEB AUT ENERGIA CEMIG', title: 'DEB AUT ENERGIA CEMIG', amount: -145.00, category: 'Moradia' },
  { date: '2026-03-04', desc: 'TED ENVIADO', title: 'TED ENVIADO', amount: -300.00, category: null },
  { date: '2026-03-05', desc: 'CREDITO SALARIO', title: 'CREDITO SALARIO', amount: 4500.00, category: 'Salário' },
];

const budgets: Record<string, number> = {
  Alimentação: 400, Moradia: 1400, Transporte: 250, Saúde: 200, Lazer: 150, Educação: 120, Outros: 200,
};

// Mock: usuário não tem conta bancária cadastrada (false = sem conta)
const userHasBankAccount = false;

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

  const filtered = transactions.filter(t => t.date >= dateFrom && t.date <= dateTo + 'T23:59:59');

  const totalIncome  = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = Math.abs(filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0));
  const balance = totalIncome - totalExpense;

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

  const catMapFiltered: Record<string, number> = {};
  filtered.filter(t => t.type === 'expense').forEach(t => {
    catMapFiltered[t.category] = (catMapFiltered[t.category] ?? 0) + Math.abs(t.amount);
  });
  const filteredCatExpenses = Object.entries(catMapFiltered)
    .map(([name, value]) => ({ name, value, color: categories.find(c => c.name === name)?.color ?? '#888' }))
    .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name, 'pt-BR'));

  // Maior categoria com desempate alfabético
  const topCategory    = filteredCatExpenses[0] ?? { name: '—', value: 0, color: '#888' };
  const topCategoryPct = totalExpense > 0 ? Math.round((topCategory.value / totalExpense) * 100) : 0;
  // Se há empate (segunda categoria com mesmo valor), indica no KPI
  const secondCategory = filteredCatExpenses[1];
  const hasTie = secondCategory && secondCategory.value === topCategory.value;

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

  const catQty = categories.map(cat => ({
    name: cat.name,
    value: filtered.filter(t => t.category === cat.name).length,
    color: cat.color,
  })).filter(c => c.value > 0);
  const catData = catView === 'value' ? filteredCatExpenses : catQty;

  const fmt    = (v: number) => Math.abs(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const fmtPct = (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(1)}%`;

  const periodDays = Math.max(1, Math.round((new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 60 * 60 * 24)) + 1);
  const dailyAvg = totalExpense / periodDays;

  const expenseFiltered = filtered.filter(t => t.type === 'expense');
  const frequencyMap = expenseFiltered.reduce<Record<string, number>>((acc, t) => {
    acc[t.title] = (acc[t.title] || 0) + 1;
    return acc;
  }, {});
  const top3 = Object.entries(frequencyMap)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'pt-BR'))
    .slice(0, 3);

  const fmtFreq = (name: string, count: number) =>
    `${name} com ${count} ${count === 1 ? 'transação' : 'transações'}`;

  const formatTop3 = (entries: [string, number][]) => {
    if (entries.length === 0) return 'Nenhuma transação no período.';
    if (entries.length === 1) return `${fmtFreq(entries[0][0], entries[0][1])}.`;
    const last = entries[entries.length - 1];
    const rest = entries.slice(0, -1);
    return `${rest.map(([name, count]) => fmtFreq(name, count)).join(', ')} e ${fmtFreq(last[0], last[1])}.`;
  };

  const latestTxDate = new Date(Math.max(...transactions.map(t => new Date(t.date).getTime())));
  const daysSinceLastTx = Math.floor((Date.now() - latestTxDate.getTime()) / (1000 * 60 * 60 * 24));

  const insights: { type: string; icon: React.ElementType; text: string }[] = [
    { type: 'info', icon: Info, text: `Você está gastando em média ${fmt(dailyAvg)}/dia no período selecionado.` },
    { type: 'info', icon: Info, text: `Seus gastos mais frequentes: ${formatTop3(top3)}` },
  ];
  if (daysSinceLastTx > 7) insights.push({ type: 'neutral', icon: Bell, text: 'Nenhuma transação registrada nos últimos 7 dias. Seu extrato está atualizado?' });

  const topCatKpiValue = hasTie
    ? `${topCategory.name} e ${secondCategory.name}`
    : topCategory.name;
  const topCatKpiChange = hasTie
    ? `Empate: ambas com ${fmt(topCategory.value)} · ${topCategoryPct}% das despesas`
    : `${fmt(topCategory.value)} · ${topCategoryPct}% das despesas`;

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
        <KpiCard label="Saldo do Mês"    value={fmt(balance)}         change={fmtPct(balanceChange)}  positive={balanceChange >= 0}  icon={<Wallet size={20} />}      accent="#F5A623" valueColor={balance >= 0 ? '#27AE60' : '#E74C3C'} />
        <KpiCard label="Receitas"        value={fmt(totalIncome)}     change={fmtPct(incomeChange)}   positive={incomeChange >= 0}   icon={<TrendingUp size={20} />}   accent="#27AE60" />
        <KpiCard label="Despesas"        value={fmt(totalExpense)}    change={fmtPct(expenseChange)}  positive={expenseChange <= 0}  icon={<TrendingDown size={20} />} accent="#E74C3C" />
        <KpiCard label="Maior Categoria" value={topCatKpiValue}       change={topCatKpiChange}        positive={false} icon={<Tag size={20} />} accent={topCategory.color} noChangeArrow noChangeSuffix />
      </div>

      {/* ── Insights ── */}
      <div className="insights-section">
        <h3 className="section-title">Insights</h3>
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
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 })} />
              <Tooltip content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const receitas = payload.find(p => p.dataKey === 'receitas');
                const despesas = payload.find(p => p.dataKey === 'despesas');
                return (
                  <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: '10px 14px', fontSize: 13, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <div style={{ fontWeight: 700, marginBottom: 6, color: '#111' }}>{label as string}</div>
                    <div style={{ color: '#27AE60', marginBottom: 3 }}>Receitas: {fmt(Number(receitas?.value ?? 0))}</div>
                    <div style={{ color: '#E74C3C' }}>Despesas: {fmt(Number(despesas?.value ?? 0))}</div>
                  </div>
                );
              }} />
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

      {/* ── Transações (5 últimas) ── */}
      <div className="chart-card">
        <div className="chart-header">
          <div>
            <h3>Transações (5 últimas)</h3>
            <p className="chart-subtitle">independente do período selecionado</p>
          </div>
          <span className="see-all" style={{ cursor: 'pointer' }}>Ver todas</span>
        </div>
        <div className="tx-list">
          {[...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5).map(tx => (
            <div key={tx.id} className="tx-item">
              <div className="tx-left">
                <div className="tx-category-dot" style={{ background: tx.amount > 0 ? '#27AE60' : '#E74C3C' }} />
                <div>
                  <div className="tx-desc">{tx.title}</div>
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
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Manual transaction modal
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualTitle, setManualTitle] = useState('');
  const [manualDesc, setManualDesc] = useState('');
  const [manualAmount, setManualAmount] = useState('');
  const [manualType, setManualType] = useState<'income' | 'expense'>('expense');
  const [manualCat, setManualCat] = useState('');
  const [manualDate, setManualDate] = useState(new Date().toISOString().slice(0, 10));
  const [manualGroup, setManualGroup] = useState(false);
  const [manualGroupCat, setManualGroupCat] = useState('');
  const [manualTxs, setManualTxs] = useState<typeof transactions>([]);

  const allTransactions = [...transactions, ...manualTxs];

  const availableMonths = [...new Set(allTransactions.map(t => t.date.slice(0, 7)))].sort();
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

  const filtered = allTransactions
    .filter(t => {
      const matchSearch = t.title.toLowerCase().includes(search.toLowerCase())
        || (t.description ?? '').toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === 'all' || t.type === filterType;
      const matchCat = filterCat === 'all' || t.category === filterCat;
      const matchFrom = !dateFrom || t.date >= dateFrom;
      const matchTo = !dateTo || t.date <= dateTo + 'T23:59:59';
      return matchSearch && matchType && matchCat && matchFrom && matchTo;
    })
    .sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortOrder === 'desc' ? -diff : diff;
    });

  const [showExportModal, setShowExportModal] = useState(false);

  const doExport = (format: 'csv' | 'xlsx') => {
    const header = ['Data', 'Título', 'Descrição', 'Categoria', 'Tipo', 'Valor'];
    const rows = filtered.map(t => [
      new Date(t.date).toLocaleDateString('pt-BR'),
      t.title,
      t.description ?? '',
      t.category,
      t.type === 'income' ? 'Receita' : 'Despesa',
      t.amount.toFixed(2).replace('.', ','),
    ]);

    const filename = `transacoes.${format}`;
    const isLarge = rows.length > 30;
    let blob: Blob;
    if (format === 'csv') {
      const csv = [header, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
      blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    } else {
      const tsv = [header, ...rows].map(r => r.join('\t')).join('\n');
      blob = new Blob([tsv], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    }
    if (isLarge) {
      addNotification({
        type: 'download',
        title: 'Relatório pronto para download',
        message: `${rows.length} transações exportadas (${format.toUpperCase()}). Clique no link para baixar.`,
        href: URL.createObjectURL(blob),
        filename,
      });
    } else {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.click();
      URL.revokeObjectURL(a.href);
    }
    setShowExportModal(false);
  };

  const handleSaveManual = () => {
    if (!manualTitle.trim() || !manualAmount || !manualCat) return;
    const amt = parseFloat(manualAmount.replace(',', '.'));
    if (isNaN(amt)) return;
    const finalAmount = manualType === 'expense' ? -Math.abs(amt) : Math.abs(amt);
    const newTx = {
      id: `manual-${Date.now()}`,
      title: manualTitle.trim(),
      description: manualDesc.trim() || undefined,
      date: `${manualDate}T12:00:00`,
      amount: finalAmount,
      category: manualCat,
      type: manualType,
      isManual: true,
      groupId: manualGroup ? 'group-1' : undefined,
      groupCategoryId: manualGroup && manualGroupCat ? manualGroupCat : undefined,
    };
    setManualTxs(prev => [...prev, newTx]);
    setShowManualModal(false);
    setManualTitle(''); setManualDesc(''); setManualAmount('');
    setManualType('expense'); setManualCat(''); setManualDate(new Date().toISOString().slice(0, 10));
    setManualGroup(false); setManualGroupCat('');
  };

  return (
    <div className="ind-transactions">
      <div className="ind-tx-header">
        <div>
          <h2>Transações</h2>
          <p>Histórico completo de movimentações</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary small" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: '1px solid #e0e0e0', background: '#fff', cursor: 'pointer', fontSize: 13 }} onClick={() => setShowManualModal(true)}>
            <Plus size={14} /> Nova transação
          </button>
          <button className="export-btn" onClick={() => setShowExportModal(true)}>
            <Download size={14} /> Exportar
          </button>
        </div>
      </div>

      {/* Manual transaction modal */}
      {showManualModal && (
        <div className="modal-overlay" onClick={() => setShowManualModal(false)}>
          <div className="export-modal" style={{ maxWidth: 480, width: '100%' }} onClick={e => e.stopPropagation()}>
            <div className="export-modal-header">
              <span>Nova transação manual</span>
              <button className="export-modal-close" onClick={() => setShowManualModal(false)}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '4px 0' }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>Título <span style={{ color: '#E74C3C' }}>*</span></label>
                <input
                  className="invite-input"
                  placeholder="Ex: Compra feira do bairro"
                  value={manualTitle}
                  onChange={e => setManualTitle(e.target.value)}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>Descrição <span style={{ color: '#999', fontWeight: 400 }}>(opcional)</span></label>
                <input
                  className="invite-input"
                  placeholder="Ex: Banana, tomate e verduras para a semana"
                  value={manualDesc}
                  onChange={e => setManualDesc(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>Tipo <span style={{ color: '#E74C3C' }}>*</span></label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => setManualType('expense')}
                      style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: `2px solid ${manualType === 'expense' ? '#E74C3C' : '#e0e0e0'}`, background: manualType === 'expense' ? '#fef2f2' : '#fff', color: manualType === 'expense' ? '#E74C3C' : '#555', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}
                    >
                      Despesa
                    </button>
                    <button
                      onClick={() => setManualType('income')}
                      style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: `2px solid ${manualType === 'income' ? '#27AE60' : '#e0e0e0'}`, background: manualType === 'income' ? '#f0fdf4' : '#fff', color: manualType === 'income' ? '#27AE60' : '#555', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}
                    >
                      Receita
                    </button>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>Valor (R$) <span style={{ color: '#E74C3C' }}>*</span></label>
                  <input
                    className="invite-input"
                    placeholder="0,00"
                    value={manualAmount}
                    onChange={e => setManualAmount(e.target.value)}
                    style={{ textAlign: 'right' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>Data <span style={{ color: '#E74C3C' }}>*</span></label>
                  <input type="date" className="invite-input" value={manualDate} onChange={e => setManualDate(e.target.value)} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>Categoria <span style={{ color: '#E74C3C' }}>*</span></label>
                  <select className="filter-select" style={{ width: '100%', padding: '8px 10px', height: 38 }} value={manualCat} onChange={e => setManualCat(e.target.value)}>
                    <option value="">Selecione...</option>
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input type="checkbox" checked={manualGroup} onChange={e => setManualGroup(e.target.checked)} />
                  <span style={{ fontSize: 13, color: '#555' }}>
                    <Users size={13} style={{ display: 'inline', marginRight: 4 }} />
                    Compartilhar com <strong>{userGroupName}</strong>
                  </span>
                </label>
                {manualGroup && (
                  <select className="filter-select" style={{ width: '100%', marginTop: 8, padding: '8px 10px', height: 38 }} value={manualGroupCat} onChange={e => setManualGroupCat(e.target.value)}>
                    <option value="">Categoria do grupo...</option>
                    {groupCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                )}
              </div>
            </div>
            <div className="invite-actions" style={{ marginTop: 16 }}>
              <button className="invite-cancel" onClick={() => setShowManualModal(false)}>Cancelar</button>
              <button
                className="btn-primary small"
                onClick={handleSaveManual}
                disabled={!manualTitle.trim() || !manualAmount || !manualCat}
              >
                Salvar transação
              </button>
            </div>
          </div>
        </div>
      )}

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

      {/* Search + Type + Category + Sort */}
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
        {/* Sort order */}
        <button
          className="tx-type-pill"
          style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', whiteSpace: 'nowrap' }}
          onClick={() => setSortOrder(o => o === 'desc' ? 'asc' : 'desc')}
          title={sortOrder === 'desc' ? 'Mais recentes primeiro' : 'Mais antigos primeiro'}
        >
          {sortOrder === 'desc' ? <ArrowDown size={13} /> : <ArrowUp size={13} />}
          {sortOrder === 'desc' ? 'Mais recentes' : 'Mais antigos'}
        </button>
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
                    <span className="ind-tx-row-desc">{tx.title}</span>
                    {tx.description && <span style={{ fontSize: 11, color: '#888', display: 'block', marginTop: 2 }}>{tx.description}</span>}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 2 }}>
                      <span className="ind-cat-badge" style={{ background: color + '18', color }}>
                        <span className="ind-cat-badge-icon" style={{ background: color }}>
                          <CatIcon size={10} color="white" />
                        </span>
                        {tx.category}
                      </span>
                      {tx.isManual && (
                        <span style={{ fontSize: 11, color: '#8E44AD', background: '#8E44AD18', borderRadius: 4, padding: '1px 6px' }}>Manual</span>
                      )}
                    </div>
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
  const [sharedWithGroup, setSharedWithGroup] = useState<Record<number, boolean>>({});
  const [groupCat, setGroupCat] = useState<Record<number, string>>({});

  // Staging: preview data editável
  const [previewRows, setPreviewRows] = useState<PreviewRow[]>(initialPreviewData.map(r => ({ ...r })));
  const [editingTitle, setEditingTitle] = useState<number | null>(null);
  const [editTitleValue, setEditTitleValue] = useState('');
  const [removeWarning, setRemoveWarning] = useState<number | null>(null);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  const fmt = (v: number) => Math.abs(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const allUploadCats = [...uploadCategories, ...extraCats];

  const activeRows = previewRows.filter(r => !r.removed);
  const activeTotal = activeRows.reduce((s, r) => s + r.amount, 0);
  const originalTotal = previewRows.reduce((s, r) => s + r.amount, 0);

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

  const handleDiscard = () => {
    setStep('select');
    setFileName('');
    setPreviewRows(initialPreviewData.map(r => ({ ...r })));
    setCats({});
    setSharedWithGroup({});
    setGroupCat({});
    setExtraCats([]);
    setEditingTitle(null);
    setRemoveWarning(null);
    setShowDiscardConfirm(false);
  };

  const startEditTitle = (i: number) => {
    setEditingTitle(i);
    setEditTitleValue(previewRows[i].title);
  };

  const saveTitle = (i: number) => {
    const val = editTitleValue.trim();
    if (!val) return;
    setPreviewRows(prev => prev.map((r, idx) => idx === i ? { ...r, title: val } : r));
    setEditingTitle(null);
  };

  const requestRemove = (i: number) => setRemoveWarning(i);

  const confirmRemove = (i: number) => {
    setPreviewRows(prev => prev.map((r, idx) => idx === i ? { ...r, removed: true } : r));
    setRemoveWarning(null);
  };

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

  const needsCat = activeRows.filter(r => !r.category);
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
        <>
          {/* Banner: sem conta bancária */}
          {!userHasBankAccount && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13 }}>
              <AlertCircle size={16} style={{ color: '#d97706', flexShrink: 0, marginTop: 1 }} />
              <div>
                <strong style={{ color: '#92400e' }}>Nenhuma conta bancária cadastrada.</strong>
                <span style={{ color: '#78350f', marginLeft: 6 }}>
                  Para vincular automaticamente o extrato ao banco correto,{' '}
                  <span style={{ color: '#d97706', cursor: 'pointer', textDecoration: 'underline' }}>cadastre uma conta bancária</span>.
                  Você pode continuar sem isso.
                </span>
              </div>
            </div>
          )}
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
        </>
      )}

      {/* STEP 2: Preview */}
      {step === 'preview' && (
        <div className="preview-section">
          {/* Discard confirm modal */}
          {showDiscardConfirm && (
            <div className="modal-overlay" onClick={() => setShowDiscardConfirm(false)}>
              <div className="export-modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
                <div className="export-modal-header">
                  <span>Descartar rascunho?</span>
                  <button className="export-modal-close" onClick={() => setShowDiscardConfirm(false)}>✕</button>
                </div>
                <p style={{ fontSize: 13, color: '#555', margin: '8px 0 16px' }}>
                  O extrato em revisão será descartado e nenhuma transação será salva. Esta ação não pode ser desfeita.
                </p>
                <div className="invite-actions">
                  <button className="invite-cancel" onClick={() => setShowDiscardConfirm(false)}>Cancelar</button>
                  <button style={{ padding: '8px 18px', background: '#E74C3C', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 13 }} onClick={handleDiscard}>
                    Sim, descartar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Remove warning modal */}
          {removeWarning !== null && (
            <div className="modal-overlay" onClick={() => setRemoveWarning(null)}>
              <div className="export-modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
                <div className="export-modal-header">
                  <span>Remover transação?</span>
                  <button className="export-modal-close" onClick={() => setRemoveWarning(null)}>✕</button>
                </div>
                <div style={{ fontSize: 13, color: '#555', margin: '8px 0 4px' }}>
                  <p style={{ marginBottom: 8 }}>
                    Você está prestes a remover <strong>"{previewRows[removeWarning]?.title}"</strong> do extrato.
                  </p>
                  <div style={{ background: '#fff7ed', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 12px', color: '#92400e', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span>
                      Isso vai <strong>alterar o saldo final</strong> do extrato. O valor de <strong>{fmt(previewRows[removeWarning]?.amount ?? 0)}</strong> não será importado.
                      O saldo passará de <strong>{fmt(originalTotal)}</strong> para <strong>{fmt(activeTotal - (previewRows[removeWarning]?.amount ?? 0))}</strong>.
                    </span>
                  </div>
                  <p style={{ marginTop: 10, color: '#888' }}>
                    Considere <strong>renomear</strong> em vez de remover para manter o histórico correto.
                  </p>
                </div>
                <div className="invite-actions" style={{ marginTop: 12 }}>
                  <button className="invite-cancel" onClick={() => setRemoveWarning(null)}>Cancelar</button>
                  <button style={{ padding: '8px 18px', background: '#E74C3C', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 13 }} onClick={() => confirmRemove(removeWarning)}>
                    Remover mesmo assim
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="file-info-bar">
            <span><FileText size={14} /> {fileName}</span>
            <span className="badge-green">{activeRows.length} transações ativas</span>
            {previewRows.some(r => r.removed) && (
              <span style={{ fontSize: 12, color: '#E74C3C' }}>{previewRows.filter(r => r.removed).length} removida(s)</span>
            )}
          </div>
          <div className="table-card">
            <table className="tx-table">
              <thead>
                <tr><th>Data</th><th>Título</th><th>Valor</th><th>Categoria</th><th style={{ width: 80 }}>Ações</th></tr>
              </thead>
              <tbody>
                {previewRows.map((r, i) => (
                  <tr key={i} style={r.removed ? { opacity: 0.4, textDecoration: 'line-through' } : {}}>
                    <td>{new Date(r.date).toLocaleDateString('pt-BR')}</td>
                    <td>
                      {editingTitle === i ? (
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <input
                            autoFocus
                            style={{ flex: 1, padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13 }}
                            value={editTitleValue}
                            onChange={e => setEditTitleValue(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') saveTitle(i); if (e.key === 'Escape') setEditingTitle(null); }}
                          />
                          <button onClick={() => saveTitle(i)} style={{ background: '#27AE60', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12 }}>OK</button>
                          <button onClick={() => setEditingTitle(null)} style={{ background: '#f3f4f6', color: '#555', border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', fontSize: 12 }}>✕</button>
                        </div>
                      ) : (
                        r.title
                      )}
                    </td>
                    <td className={r.amount > 0 ? 'amount-cell positive' : 'amount-cell negative'}>
                      {r.amount > 0 ? '+' : '-'}{fmt(r.amount)}
                    </td>
                    <td>
                      {r.category
                        ? <span className="upload-cat-auto"><CheckCircle size={12} /> {r.category}</span>
                        : <span className="upload-cat-pending"><Tag size={12} /> A categorizar</span>}
                    </td>
                    <td>
                      {!r.removed && (
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            onClick={() => startEditTitle(i)}
                            title="Renomear"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2980B9', padding: 4 }}
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => requestRemove(i)}
                            title="Remover"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E74C3C', padding: 4 }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {activeRows.length > 0 && (
              <div style={{ padding: '10px 16px', borderTop: '1px solid #f3f4f6', fontSize: 13, color: '#555', display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
                <span>Saldo do extrato:</span>
                <strong style={{ color: activeTotal >= 0 ? '#27AE60' : '#E74C3C' }}>{activeTotal >= 0 ? '+' : ''}{fmt(activeTotal)}</strong>
              </div>
            )}
          </div>
          <div className="action-bar">
            <button className="btn-secondary" style={{ color: '#E74C3C', borderColor: '#fca5a5' }} onClick={() => setShowDiscardConfirm(true)}>
              Descartar rascunho
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-secondary" onClick={() => setStep('select')}><ArrowLeft size={16} /> Voltar</button>
              <button className="btn-primary" onClick={() => setStep('categorize')} disabled={activeRows.length === 0}>
                Categorizar {needsCat.length > 0 ? `${needsCat.length} transações` : ''} <ArrowRight size={16} />
              </button>
            </div>
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
            {activeRows.filter(r => !r.category).map((r, i) => (
              <div key={i} className="cat-item-full">
                <div className="cat-item-row">
                  <div className="cat-item-info">
                    <div className="cat-desc">{r.title}</div>
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
            <p>{activeRows.length} transações foram adicionadas à sua conta.</p>
            <div className="done-stats">
              <div className="done-stat">
                <span className="stat-num green">{activeRows.filter(r => r.amount > 0).length}</span>
                <span className="stat-label">Receitas</span>
              </div>
              <div className="done-stat">
                <span className="stat-num red">{activeRows.filter(r => r.amount < 0).length}</span>
                <span className="stat-label">Despesas</span>
              </div>
              <div className="done-stat">
                <span className="stat-num">{activeRows.length}</span>
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
              <button className="btn-secondary" onClick={handleDiscard}>Importar Outro</button>
              <button className="btn-primary" onClick={handleDiscard}>
                Ver Dashboard <ArrowRight size={16} />
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
