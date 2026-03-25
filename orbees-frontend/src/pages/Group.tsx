import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Users, Upload, Crown, Eye, Plus, Lock, Search, Download, TrendingUp, TrendingDown } from 'lucide-react';
import CategoriesPage from './CategoriesPage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import '../data/mockData';
import { addNotification } from '../utils/notifications';
import './Group.css';
import './Individual.css';

const currentUserRole: 'admin' | 'viewer' = 'admin';

const members = [
  { id: '1', name: 'Gabriella', initials: 'G', color: '#F5A623', role: 'admin' },
  { id: '2', name: 'Murilo',    initials: 'M', color: '#2980B9', role: 'viewer' },
  { id: '3', name: 'Ana',       initials: 'A', color: '#27AE60', role: 'viewer' },
];

const groupTransactions = [
  { id: '1',  date: '2026-03-10', description: 'Aluguel compartilhado',  amount: -2400, category: 'Moradia',    member: 'Gabriella' },
  { id: '2',  date: '2026-03-09', description: 'Supermercado',            amount:  -600, category: 'Alimentação', member: 'Gabriella' },
  { id: '3',  date: '2026-03-08', description: 'Internet',                amount:  -120, category: 'Moradia',    member: 'Murilo' },
  { id: '4',  date: '2026-03-07', description: 'Conta de luz',            amount:  -240, category: 'Moradia',    member: 'Ana' },
  { id: '5',  date: '2026-03-06', description: 'Streaming compartilhado', amount:   -60, category: 'Lazer',      member: 'Gabriella' },
  { id: '6',  date: '2026-03-05', description: 'Transporte',              amount:  -180, category: 'Transporte', member: 'Murilo' },
  { id: '7',  date: '2026-03-04', description: 'Farmácia',                amount:  -150, category: 'Saúde',      member: 'Ana' },
  { id: '8',  date: '2026-03-03', description: 'Restaurante',             amount:  -210, category: 'Alimentação', member: 'Ana' },
  { id: '9',  date: '2026-03-02', description: 'Curso online',            amount:  -199, category: 'Educação',   member: 'Murilo' },
  { id: '10', date: '2026-03-01', description: 'Academia',                amount:   -80, category: 'Saúde',      member: 'Gabriella' },
  { id: '11', date: '2026-03-01', description: 'Salário Gabriella',       amount:  4500, category: 'Receita',    member: 'Gabriella' },
  { id: '12', date: '2026-03-01', description: 'Salário Murilo',          amount:  3800, category: 'Receita',    member: 'Murilo' },
  { id: '13', date: '2026-03-01', description: 'Salário Ana',             amount:  5200, category: 'Receita',    member: 'Ana' },
  { id: '14', date: '2026-03-15', description: 'Freelance Ana',           amount:  1200, category: 'Receita',    member: 'Ana' },
  { id: '15', date: '2026-03-20', description: 'Reembolso Murilo',        amount:   350, category: 'Receita',    member: 'Murilo' },
];

const fmt = (v: number) => Math.abs(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/* Compute per-member stats from transactions */
function computeMemberStats() {
  return members.map(m => {
    const txs = groupTransactions.filter(t => t.member === m.name);
    const income  = txs.filter(t => t.amount > 0).reduce((s, t) => s + t.amount,  0);
    const expense = txs.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
    return { ...m, income, expense };
  });
}
const memberStats = computeMemberStats();
const totalIncome  = memberStats.reduce((s, m) => s + m.income,  0);
const totalExpense = memberStats.reduce((s, m) => s + m.expense, 0);
const memberData   = memberStats.map(m => ({ name: m.name, receitas: m.income, despesas: m.expense }));
const pieData      = memberStats.map(m => ({ name: m.name, value: m.expense, color: m.color }));

function GroupHeader() {
  return (
    <div className="group-page-header">
      <div>
        <h1>Controle em Grupo</h1>
        <p>Conta compartilhada — {members.length} membros</p>
      </div>
      <div className="group-badge">
        <div className="member-stack">
          {members.map(m => (
            <div key={m.id} className="stack-avatar" style={{ background: m.color }}>{m.initials}</div>
          ))}
        </div>
        <span>Família / Grupo</span>
      </div>
    </div>
  );
}

/* ─── DEFAULT (layout wrapper) ─── */
export default function Group() {
  return (
    <div className="group-page">
      <Outlet />
    </div>
  );
}

/* ─── DASHBOARD ─── */
export function GroupDashboard() {
  const [dateFrom, setDateFrom]       = useState('');
  const [dateTo, setDateTo]           = useState('');
  const [filterMember, setFilterMember] = useState('all');

  // ─── Period helpers ───
  const availableMonths = [...new Set(groupTransactions.map(t => t.date.slice(0, 7)))].sort();
  const lastDayOf = (ym: string) => { const [y, m] = ym.split('-').map(Number); return new Date(y, m, 0).toISOString().slice(0, 10); };
  const selectMonth = (mo: string) => { setDateFrom(mo + '-01'); setDateTo(lastDayOf(mo)); };
  const isMonthActive = (mo: string) => dateFrom === mo + '-01' && dateTo === lastDayOf(mo);
  const isAllActive = dateFrom === '' && dateTo === '';
  const monthLabel = (mo: string) => {
    const [y, m] = mo.split('-').map(Number);
    const s = new Date(y, m - 1).toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
    return s.charAt(0).toUpperCase() + s.slice(1) + ' ' + String(y).slice(2);
  };

  // ─── Filtered (period + member) ───
  const filtered = groupTransactions.filter(t => {
    const matchMember = filterMember === 'all' || t.member === filterMember;
    const matchFrom   = !dateFrom || t.date >= dateFrom;
    const matchTo     = !dateTo   || t.date <= dateTo + 'T23:59:59';
    return matchMember && matchFrom && matchTo;
  });

  // ─── Period-only filtered (for member table — always shows all members) ───
  const filteredPeriod = groupTransactions.filter(t => {
    const matchFrom = !dateFrom || t.date >= dateFrom;
    const matchTo   = !dateTo   || t.date <= dateTo + 'T23:59:59';
    return matchFrom && matchTo;
  });

  // ─── KPI cards ───
  const totalIncomeFilt  = filtered.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalExpenseFilt = filtered.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  // ─── Member table stats (period only) ───
  const memberTableStats = members.map(m => {
    const txs     = filteredPeriod.filter(t => t.member === m.name);
    const income  = txs.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const expense = txs.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
    return { ...m, income, expense };
  });
  const tableTotalExpense = memberTableStats.reduce((s, m) => s + m.expense, 0);

  // ─── Insights ───
  const insights: { text: string; color: string }[] = [];
  const expenses      = filtered.filter(t => t.amount < 0);
  const groupTotalExp = expenses.reduce((s, t) => s + Math.abs(t.amount), 0);
  const periodLabel   = dateFrom ? monthLabel(dateFrom.slice(0, 7)) : 'este período';

  // Insight 1 — membro com maior concentração de despesas
  if (groupTotalExp > 0) {
    const byMember = members.map(m => ({
      name:  m.name,
      total: expenses.filter(t => t.member === m.name).reduce((s, t) => s + Math.abs(t.amount), 0),
    })).sort((a, b) => b.total - a.total);
    const top = byMember[0];
    if (top.total > 0) {
      const pct = Math.round((top.total / groupTotalExp) * 100);
      insights.push({ text: `${top.name} concentra ${pct}% das despesas do grupo em ${periodLabel}.`, color: 'blue' });
    }
  }

  // Insight 2 — categoria que mais pesou
  if (groupTotalExp > 0) {
    const byCat: Record<string, number> = {};
    expenses.forEach(t => { byCat[t.category] = (byCat[t.category] || 0) + Math.abs(t.amount); });
    const topCat = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0];
    if (topCat) {
      const pct = Math.round((topCat[1] / groupTotalExp) * 100);
      insights.push({ text: `${topCat[0]} foi a maior despesa coletiva: ${fmt(topCat[1])} — ${pct}% do total do grupo.`, color: 'orange' });
    }
  }

  // Insight 3 — membro sem transações nos últimos 7 dias
  if (insights.length < 3) {
    const sevenAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
    const relevant = filterMember === 'all' ? members : members.filter(m => m.name === filterMember);
    const inactive = relevant.find(m => {
      const last = groupTransactions.filter(t => t.member === m.name).sort((a, b) => b.date.localeCompare(a.date))[0];
      return !last || last.date < sevenAgo;
    });
    if (inactive) insights.push({ text: `${inactive.name} não registrou transações nos últimos 7 dias. Extrato desatualizado?`, color: 'gray' });
  }

  // Insight 4 — recorrência compartilhada
  if (insights.length < 3) {
    const months = [...new Set(groupTransactions.map(t => t.date.slice(0, 7)))].sort();
    const recurring = groupTransactions.find(t => {
      if (t.amount >= 0) return false;
      return months.filter(mo => groupTransactions.some(tx => tx.description === t.description && tx.date.startsWith(mo))).length >= 2;
    });
    if (recurring) {
      const cnt = members.filter(m => groupTransactions.some(t => t.description === recurring.description && t.member === m.name)).length;
      insights.push({ text: `"${recurring.description}" aparece todo mês para ${cnt} ${cnt === 1 ? 'membro' : 'membros'}.`, color: 'green' });
    }
  }

  const insightStyle: Record<string, { bg: string; border: string; color: string }> = {
    blue:   { bg: '#eff6ff', border: '#93c5fd', color: '#1d4ed8' },
    orange: { bg: '#fff7ed', border: '#fdba74', color: '#c2410c' },
    gray:   { bg: '#f9fafb', border: '#d1d5db', color: '#6b7280' },
    green:  { bg: '#f0fdf4', border: '#86efac', color: '#166534' },
  };

  // ─── Active members for charts ───
  const activeMembers = filterMember === 'all' ? members : members.filter(m => m.name === filterMember);

  // ─── Chart 1: Line — evolução de despesas por membro ───
  const expDays = [...new Set(filtered.filter(t => t.amount < 0).map(t => t.date.slice(0, 10)))].sort();
  const lineData = expDays.map(day => {
    const point: Record<string, string | number> = { day: day.slice(5).replace('-', '/') };
    activeMembers.forEach(m => {
      point[m.name] = filtered.filter(t => t.date.slice(0, 10) === day && t.member === m.name && t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
    });
    return point;
  });

  // ─── Chart 2: Stacked bar — categorias por membro ───
  const expCats = [...new Set(filtered.filter(t => t.amount < 0).map(t => t.category))].sort();
  const stackData = expCats.map(cat => {
    const point: Record<string, string | number> = { category: cat };
    activeMembers.forEach(m => {
      point[m.name] = filtered.filter(t => t.category === cat && t.member === m.name && t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
    });
    return point;
  });

  const tooltipStyle = { background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: '10px 14px', fontSize: 13, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' };

  return (
    <div className="group-page">
      <GroupHeader />
      <div className="group-content">

        {/* ── Filtros ── */}
        <div className="period-filter">
          <span className="period-label">PERÍODO</span>
          <div className="period-months">
            <button className={`period-month-btn ${isAllActive ? 'active' : ''}`} onClick={() => { setDateFrom(''); setDateTo(''); }}>Todos</button>
            {availableMonths.map(mo => (
              <button key={mo} className={`period-month-btn ${isMonthActive(mo) ? 'active' : ''}`} onClick={() => selectMonth(mo)}>{monthLabel(mo)}</button>
            ))}
          </div>
          <div className="period-divider" />
          <div className="period-dates">
            <span className="period-date-label">De</span>
            <input type="date" className="period-date-input" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
            <span className="period-date-label">até</span>
            <input type="date" className="period-date-input" value={dateTo} onChange={e => setDateTo(e.target.value)} />
          </div>
          <div className="period-divider" />
          <div className="period-dates">
            <span className="period-date-label">Membro</span>
            <select className="tx-cat-select" value={filterMember} onChange={e => setFilterMember(e.target.value)}>
              <option value="all">Todos os membros</option>
              {members.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
            </select>
          </div>
        </div>

        {/* ── KPI cards ── */}
        <div className="group-summary">
          <div className="group-kpi"><span className="gkpi-label">Receita Total</span><span className="gkpi-value green">{fmt(totalIncomeFilt)}</span></div>
          <div className="group-kpi"><span className="gkpi-label">Despesa Total</span><span className="gkpi-value red">{fmt(totalExpenseFilt)}</span></div>
          <div className="group-kpi"><span className="gkpi-label">Saldo do Grupo</span><span className="gkpi-value">{fmt(totalIncomeFilt - totalExpenseFilt)}</span></div>
          <div className="group-kpi"><span className="gkpi-label">Membros Ativos</span><span className="gkpi-value">{members.length}</span></div>
        </div>

        {/* ── Insights ── */}
        {insights.length > 0 && (
          <div className="insights-section">
            {insights.slice(0, 3).map((ins, i) => {
              const s = insightStyle[ins.color];
              return (
                <div key={i} className="insight-item" style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
                  {ins.text}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Gráficos ── */}
        <div className="group-charts-row">

          {/* Gráfico 1 — Evolução do Grupo (linha) */}
          <div className="gchart-card">
            <div className="chart-header"><h3>Evolução do Grupo</h3></div>
            {lineData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={lineData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 })} />
                  <Tooltip content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div style={tooltipStyle}>
                        <div style={{ fontWeight: 700, marginBottom: 6, color: '#111' }}>{label as string}</div>
                        {payload.map(p => (
                          <div key={p.dataKey as string} style={{ color: p.color, marginBottom: 2 }}>
                            {p.dataKey as string}: {fmt(Number(p.value ?? 0))}
                          </div>
                        ))}
                      </div>
                    );
                  }} />
                  {activeMembers.map(m => (
                    <Line key={m.name} type="monotone" dataKey={m.name} stroke={m.color} strokeWidth={2} dot={{ r: 3, fill: m.color }} activeDot={{ r: 5 }} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 13 }}>Nenhuma despesa no período</div>
            )}
          </div>

          {/* Gráfico 2 — Gastos por Categoria (barras empilhadas) */}
          <div className="gchart-card">
            <div className="chart-header"><h3>Gastos por Categoria</h3></div>
            {stackData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={stackData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 })} />
                  <Tooltip content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const total = payload.reduce((s, p) => s + Number(p.value ?? 0), 0);
                    return (
                      <div style={tooltipStyle}>
                        <div style={{ fontWeight: 700, marginBottom: 6, color: '#111' }}>{label as string}</div>
                        {payload.filter(p => Number(p.value) > 0).map(p => (
                          <div key={p.dataKey as string} style={{ color: p.fill as string, marginBottom: 2 }}>
                            {p.dataKey as string}: {fmt(Number(p.value ?? 0))}
                          </div>
                        ))}
                        <div style={{ borderTop: '1px solid #e0e0e0', marginTop: 4, paddingTop: 4, fontWeight: 700, color: '#111' }}>Total: {fmt(total)}</div>
                      </div>
                    );
                  }} />
                  {activeMembers.map((m, i) => (
                    <Bar key={m.name} dataKey={m.name} stackId="a" fill={m.color} radius={i === activeMembers.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 13 }}>Nenhuma despesa no período</div>
            )}
          </div>
        </div>

        {/* ── Tabela de membros ── */}
        <div className="member-table-card">
          <div className="member-table-head">
            <span>Membro</span><span>Papel</span><span>Receitas</span><span>Despesas</span><span>Saldo</span><span>Comprometido</span>
          </div>
          {memberTableStats.map(m => {
            const pct   = m.income > 0 ? Math.min(100, (m.expense / m.income) * 100) : 0;
            const share = tableTotalExpense > 0 ? (m.expense / tableTotalExpense) * 100 : 0;
            return (
              <div key={m.id} className="member-table-row">
                <div className="mt-name-col">
                  <div className="mt-avatar" style={{ background: m.color }}>{m.initials}</div>
                  <span>{m.name}</span>
                </div>
                <div>
                  <span className={`member-role-badge ${m.role}`}>
                    {m.role === 'admin' ? <><Crown size={10} /> Admin</> : <><Eye size={10} /> Visualizador</>}
                  </span>
                </div>
                <div className="mt-val green">{fmt(m.income)}</div>
                <div className="mt-val red">{fmt(m.expense)}</div>
                <div className="mt-val">{fmt(m.income - m.expense)}</div>
                <div className="mt-bar-col">
                  <div className="member-bar-wrap">
                    <div className="member-bar" style={{ width: `${pct}%`, background: m.color }} />
                  </div>
                  <span className="mt-bar-label">{pct.toFixed(0)}% · {share.toFixed(0)}% do grupo</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

/* ─── TRANSAÇÕES ─── */
export function GroupTransactions() {
  const [search, setSearch]         = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterMember, setFilterMember] = useState('all');
  const [filterCat, setFilterCat]   = useState('all');
  const [dateFrom, setDateFrom]     = useState('');
  const [dateTo, setDateTo]         = useState('');
  const [showExportModal, setShowExportModal] = useState(false);

  // ─── Period filter ───
  const availableMonths = [...new Set(groupTransactions.map(t => t.date.slice(0, 7)))].sort();
  const lastDayOf = (ym: string) => { const [y, m] = ym.split('-').map(Number); return new Date(y, m, 0).toISOString().slice(0, 10); };
  const selectMonth = (m: string) => { setDateFrom(m + '-01'); setDateTo(lastDayOf(m)); };
  const selectAll   = () => { setDateFrom(''); setDateTo(''); };
  const isMonthActive = (m: string) => dateFrom === m + '-01' && dateTo === lastDayOf(m);
  const isAllActive   = dateFrom === '' && dateTo === '';
  const monthLabel = (m: string) => {
    const [y, mo] = m.split('-').map(Number);
    const s = new Date(y, mo - 1).toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
    return s.charAt(0).toUpperCase() + s.slice(1) + ' ' + String(y).slice(2);
  };

  // ─── Filtered ───
  const filtered = groupTransactions.filter(t => {
    const matchSearch  = t.description.toLowerCase().includes(search.toLowerCase());
    const matchType    = filterType   === 'all' || (filterType === 'income' ? t.amount > 0 : t.amount < 0);
    const matchMember  = filterMember === 'all' || t.member === filterMember;
    const matchCat     = filterCat    === 'all' || t.category === filterCat;
    const matchFrom    = !dateFrom || t.date >= dateFrom;
    const matchTo      = !dateTo   || t.date <= dateTo + 'T23:59:59';
    return matchSearch && matchType && matchMember && matchCat && matchFrom && matchTo;
  });

  const cats = [...new Set(groupTransactions.map(t => t.category))].sort();

  // ─── Export ───
  const doExport = (format: 'csv' | 'xlsx') => {
    const header = ['Data', 'Descrição', 'Categoria', 'Membro', 'Tipo', 'Valor'];
    const rows = filtered.map(t => [
      new Date(t.date).toLocaleDateString('pt-BR'),
      t.description, t.category, t.member,
      t.amount > 0 ? 'Receita' : 'Despesa',
      Math.abs(t.amount).toFixed(2).replace('.', ','),
    ]);
    const filename = `transacoes-grupo.${format}`;
    const sep = format === 'csv' ? ',' : '\t';
    const mime = format === 'csv' ? 'text/csv;charset=utf-8;' : 'application/vnd.ms-excel;charset=utf-8;';
    const prefix = format === 'csv' ? '\uFEFF' : '';
    const content = [header, ...rows].map(r => format === 'csv' ? r.map(c => `"${c}"`).join(sep) : r.join(sep)).join('\n');
    const blob = new Blob([prefix + content], { type: mime });
    if (rows.length > 30) {
      addNotification({
        type: 'download',
        title: 'Relatório do grupo pronto',
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

  return (
    <div className="group-page">
      <GroupHeader />
      <div className="group-content">

        {/* Header row */}
        <div className="gtx-page-header">
          <div>
            <h2 className="gtx-title">Transações</h2>
            <p className="gtx-subtitle">Histórico compartilhado do grupo</p>
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

        {/* Search + filters */}
        <div className="tx-filter-row">
          <div className="search-input-wrap tx-search">
            <Search size={14} />
            <input type="text" placeholder="Buscar transação..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="tx-type-pills">
            <button className={`tx-type-pill${filterType === 'all'     ? ' active' : ''}`} onClick={() => setFilterType('all')}>Todos</button>
            <button className={`tx-type-pill${filterType === 'income'  ? ' active income'  : ''}`} onClick={() => setFilterType('income')}>
              <TrendingUp size={12} /> Receitas
            </button>
            <button className={`tx-type-pill${filterType === 'expense' ? ' active expense' : ''}`} onClick={() => setFilterType('expense')}>
              <TrendingDown size={12} /> Despesas
            </button>
          </div>
          <select className="filter-select tx-cat-select" value={filterMember} onChange={e => setFilterMember(e.target.value)}>
            <option value="all">Todos os membros</option>
            {members.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
          </select>
          <select className="filter-select tx-cat-select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
            <option value="all">Todas as categorias</option>
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Transaction list */}
        <div className="table-card">
          {filtered.length === 0 ? (
            <div className="empty-state">Nenhuma transação encontrada.</div>
          ) : (
            <div className="ind-tx-list">
              {filtered.map((tx, i) => {
                const m = members.find(mb => mb.name === tx.member);
                const isIncome = tx.amount > 0;
                return (
                  <div key={tx.id} className={`ind-tx-row${i < filtered.length - 1 ? ' bordered' : ''}`}>
                    <div className="gtx-avatar" style={{ background: (m?.color ?? '#888') + '20', color: m?.color ?? '#888' }}>
                      {m?.initials ?? '?'}
                    </div>
                    <div className="ind-tx-row-main">
                      <span className="ind-tx-row-desc">{tx.description}</span>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <span className="cat-chip">{tx.category}</span>
                        <span className="member-chip" style={{ fontSize: 11 }}>
                          <span className="chip-dot" style={{ background: m?.color }}></span>
                          {tx.member}
                        </span>
                      </div>
                    </div>
                    <div className="ind-tx-row-right">
                      <span className={`ind-tx-amount ${isIncome ? 'positive' : 'negative'}`}>
                        {isIncome ? '+' : '-'}{fmt(tx.amount)}
                      </span>
                      <span className="ind-tx-date">
                        {new Date(tx.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

/* ─── CATEGORIAS ─── */
export function GroupCategories() {
  return (
    <div className="group-page">
      <GroupHeader />
      {currentUserRole === 'viewer' ? (
        <div className="group-content">
          <div className="group-no-perm">
            <Lock size={20} />
            <span>Somente administradores podem criar categorias. Abaixo estão as categorias do grupo.</span>
          </div>
          <CategoriesPage />
        </div>
      ) : (
        <div className="group-content">
          <CategoriesPage />
        </div>
      )}
    </div>
  );
}

/* ─── IMPORTAR EXTRATO ─── */
/* ─── MEMBROS ─── */
export function GroupMembers() {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'viewer'>('viewer');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!inviteName.trim() || !inviteEmail.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setShowInvite(false);
      setInviteName('');
      setInviteEmail('');
      setInviteRole('viewer');
    }, 2000);
  };

  const closeModal = () => {
    setShowInvite(false);
    setInviteName('');
    setInviteEmail('');
    setInviteRole('viewer');
    setSent(false);
  };

  return (
    <div className="group-page">
      <GroupHeader />
      <div className="group-content">
        <div className="members-header">
          <h3>Membros do Grupo</h3>
          <button className="btn-primary small" onClick={() => setShowInvite(true)}>
            <Plus size={14} /> Convidar Membro
          </button>
        </div>

        {/* Invite Modal */}
        {showInvite && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="invite-modal" onClick={e => e.stopPropagation()}>
              <div className="invite-modal-header">
                <div className="invite-modal-title">
                  <div className="invite-modal-icon"><Users size={18} /></div>
                  <span>Convidar Membro</span>
                </div>
                <button className="export-modal-close" onClick={closeModal}>✕</button>
              </div>

              {sent ? (
                <div className="invite-success">
                  <div className="invite-success-icon">✓</div>
                  <p>Convite enviado para <strong>{inviteEmail}</strong>!</p>
                </div>
              ) : (
                <>
                  <p className="export-modal-desc">Preencha os dados do usuário que deseja convidar para o grupo.</p>
                  <div className="invite-fields">
                    <div className="invite-field">
                      <label className="invite-label">Nome</label>
                      <input
                        className="invite-input"
                        type="text"
                        placeholder="Nome completo"
                        value={inviteName}
                        onChange={e => setInviteName(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="invite-field">
                      <label className="invite-label">E-mail</label>
                      <input
                        className="invite-input"
                        type="email"
                        placeholder="usuario@email.com"
                        value={inviteEmail}
                        onChange={e => setInviteEmail(e.target.value)}
                      />
                    </div>
                    <div className="invite-field">
                      <label className="invite-label">Permissão</label>
                      <div className="invite-role-options">
                        <label className={`invite-role-opt${inviteRole === 'viewer' ? ' selected' : ''}`}>
                          <input type="radio" name="role" value="viewer" checked={inviteRole === 'viewer'} onChange={() => setInviteRole('viewer')} />
                          <Eye size={16} style={{ flexShrink: 0 }} />
                          <div>
                            <div className="invite-role-name">Membro</div>
                            <ul className="invite-role-perms">
                              <li>Visualizar transações do grupo</li>
                              <li>Incluir novas transações</li>
                              <li>Excluir apenas suas próprias transações</li>
                            </ul>
                          </div>
                        </label>
                        <label className={`invite-role-opt${inviteRole === 'admin' ? ' selected' : ''}`}>
                          <input type="radio" name="role" value="admin" checked={inviteRole === 'admin'} onChange={() => setInviteRole('admin')} />
                          <Crown size={16} style={{ flexShrink: 0 }} />
                          <div>
                            <div className="invite-role-name">Administrador</div>
                            <ul className="invite-role-perms">
                              <li>Convidar novos membros</li>
                              <li>Criar e editar categorias</li>
                              <li>Incluir e excluir qualquer transação</li>
                            </ul>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="invite-actions">
                    <button className="invite-cancel" onClick={closeModal}>Cancelar</button>
                    <button
                      className="btn-primary small"
                      onClick={handleSend}
                      disabled={!inviteName.trim() || !inviteEmail.trim()}
                    >
                      Enviar convite
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="members-list">
          {members.map(m => (
            <div key={m.id} className="member-row">
              <div className="member-avatar" style={{ background: m.color }}>{m.initials}</div>
              <div className="member-row-info">
                <div className="member-name">{m.name}</div>
                <div className="member-email">{m.name.toLowerCase()}@email.com</div>
              </div>
              <div className={`member-role-badge ${m.role}`}>
                {m.role === 'admin' ? <><Crown size={11} /> Administrador</> : <><Eye size={11} /> Visualizador</>}
              </div>
            </div>
          ))}
        </div>
        <div className="invite-info">
          <strong>Permissões:</strong> Administradores podem convidar membros, criar/editar categorias e incluir ou excluir qualquer transação. Membros podem visualizar transações, incluir novas e excluir apenas as próprias.
        </div>
        <div className="invite-info" style={{ marginTop: 0 }}>
          Cada usuário pode pertencer a apenas um grupo.
        </div>
      </div>
    </div>
  );
}

/* ─── unused imports kept for CSS classes ─── */
void Upload;
void Users;
