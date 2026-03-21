import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Users, Upload, Crown, Eye, Plus, Lock, Search, Download, TrendingUp, TrendingDown } from 'lucide-react';
import CategoriesPage from './CategoriesPage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import '../data/mockData';
import './Group.css';
import './Individual.css';

const currentUserRole: 'admin' | 'viewer' = 'admin';

const members = [
  { id: '1', name: 'Gabriella', initials: 'G', color: '#F5A623', role: 'admin', income: 4500, expense: 2200 },
  { id: '2', name: 'Murilo', initials: 'M', color: '#2980B9', role: 'viewer', income: 3800, expense: 1950 },
  { id: '3', name: 'Ana', initials: 'A', color: '#27AE60', role: 'viewer', income: 5200, expense: 3100 },
];

const groupTransactions = [
  { id: '1', date: '2026-03-10', description: 'Aluguel compartilhado', amount: -2400, category: 'Moradia', member: 'Gabriella' },
  { id: '2', date: '2026-03-09', description: 'Supermercado', amount: -600, category: 'Alimentação', member: 'Gabriella' },
  { id: '3', date: '2026-03-08', description: 'Internet', amount: -120, category: 'Moradia', member: 'Murilo' },
  { id: '4', date: '2026-03-07', description: 'Conta de luz', amount: -240, category: 'Moradia', member: 'Ana' },
  { id: '5', date: '2026-03-06', description: 'Streaming compartilhado', amount: -60, category: 'Lazer', member: 'Gabriella' },
];

const memberData = members.map(m => ({ name: m.name, receitas: m.income, despesas: m.expense }));
const pieData = members.map(m => ({ name: m.name, value: m.expense, color: m.color }));
const fmt = (v: number) => Math.abs(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const totalIncome = members.reduce((s, m) => s + m.income, 0);
const totalExpense = members.reduce((s, m) => s + m.expense, 0);

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
  return (
    <div className="group-page">
      <GroupHeader />
      <div className="group-content">
        <div className="group-summary">
          <div className="group-kpi"><span className="gkpi-label">Receita Total</span><span className="gkpi-value green">{fmt(totalIncome)}</span></div>
          <div className="group-kpi"><span className="gkpi-label">Despesa Total</span><span className="gkpi-value red">{fmt(totalExpense)}</span></div>
          <div className="group-kpi"><span className="gkpi-label">Saldo do Grupo</span><span className="gkpi-value">{fmt(totalIncome - totalExpense)}</span></div>
          <div className="group-kpi"><span className="gkpi-label">Membros Ativos</span><span className="gkpi-value">{members.length}</span></div>
        </div>

        <div className="members-grid">
          {members.map(m => (
            <div key={m.id} className="member-card">
              <div className="member-header">
                <div className="member-avatar" style={{ background: m.color }}>{m.initials}</div>
                <div>
                  <div className="member-name">{m.name}</div>
                  <div className={`member-role-badge ${m.role}`}>
                    {m.role === 'admin' ? <><Crown size={10} /> Admin</> : <><Eye size={10} /> Visualizador</>}
                  </div>
                </div>
              </div>
              <div className="member-stats">
                <div className="mstat"><span>Receitas</span><span className="green">{fmt(m.income)}</span></div>
                <div className="mstat"><span>Despesas</span><span className="red">{fmt(m.expense)}</span></div>
                <div className="mstat"><span>Saldo</span><span>{fmt(m.income - m.expense)}</span></div>
              </div>
              <div className="member-bar-wrap">
                <div className="member-bar" style={{ width: `${Math.min(100, (m.expense / m.income) * 100)}%`, background: m.color }}></div>
              </div>
              <div className="member-bar-label">{((m.expense / m.income) * 100).toFixed(0)}% comprometido</div>
            </div>
          ))}
        </div>

        <div className="group-charts-row">
          <div className="gchart-card">
            <h3>Comparativo por Membro</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={memberData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `R$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [fmt(Number(v ?? 0)), '']} />
                <Bar dataKey="receitas" fill="#27AE60" radius={[4, 4, 0, 0]} name="Receitas" />
                <Bar dataKey="despesas" fill="#E74C3C" radius={[4, 4, 0, 0]} name="Despesas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="gchart-card">
            <h3>Proporção de Gastos</h3>
            <div className="pie-wrap">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={75} dataKey="value" paddingAngle={2}>
                    {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [fmt(Number(v ?? 0)), '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-leg">
                {members.map(m => (
                  <div key={m.id} className="pleg-item">
                    <span className="pleg-dot" style={{ background: m.color }}></span>
                    <span className="pleg-name">{m.name}</span>
                    <span className="pleg-val">{fmt(m.expense)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
    const sep = format === 'csv' ? ',' : '\t';
    const mime = format === 'csv' ? 'text/csv;charset=utf-8;' : 'application/vnd.ms-excel;charset=utf-8;';
    const prefix = format === 'csv' ? '\uFEFF' : '';
    const content = [header, ...rows].map(r => format === 'csv' ? r.map(c => `"${c}"`).join(sep) : r.join(sep)).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([prefix + content], { type: mime }));
    a.download = `transacoes-grupo.${format}`;
    a.click();
    URL.revokeObjectURL(a.href);
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
