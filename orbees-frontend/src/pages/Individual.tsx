import { useState } from 'react';
import {
  TrendingUp, TrendingDown, Wallet, CalendarClock,
  AlertTriangle, CheckCircle, Info, ArrowUpRight, ArrowDownRight,
  LayoutDashboard, List, Tag, FolderOpen,
  FileText, Table, ArrowLeft, ArrowRight,
  Search, Download,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { monthlyData, categoryExpenses, transactions, categories } from '../data/mockData';
import './Individual.css';

type IndTab = 'dashboard' | 'transactions' | 'categories' | 'upload';
type CatSubTab = 'view' | 'create';
type UploadStep = 'select' | 'preview' | 'categorize' | 'done';

const uploadCategories = ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 'Lazer', 'Salário', 'Outros'];

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
  const [activeTab, setActiveTab] = useState<IndTab>('dashboard');

  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'transactions', label: 'Transações', icon: List },
    { key: 'categories', label: 'Categorias', icon: Tag },
    { key: 'upload', label: 'Importar Extrato', icon: FolderOpen },
  ];

  return (
    <div className="individual-page">
      <div className="page-header">
        <h1>Controle Individual</h1>
        <p>Gestão completa das suas finanças pessoais</p>
      </div>

      <div className="individual-tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`individual-tab ${activeTab === t.key ? 'active' : ''}`}
            onClick={() => setActiveTab(t.key as IndTab)}
          >
            <t.icon size={15} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'dashboard' && <DashboardTab />}
      {activeTab === 'transactions' && <TransactionsTab />}
      {activeTab === 'categories' && <CategoriesTab />}
      {activeTab === 'upload' && <UploadTab />}
    </div>
  );
}

/* ─── DASHBOARD TAB ─── */
function DashboardTab() {
  const [catView, setCatView] = useState<'value' | 'qty'>('value');
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = Math.abs(transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0));
  const balance = totalIncome - totalExpense;

  const prevIncome = 5100;
  const prevExpense = 3900;
  const prevBalance = prevIncome - prevExpense;

  const incomeChange = ((totalIncome - prevIncome) / prevIncome) * 100;
  const expenseChange = ((totalExpense - prevExpense) / prevExpense) * 100;
  const balanceChange = ((balance - prevBalance) / prevBalance) * 100;
  const savingsRate = (balance / totalIncome) * 100;

  const healthScore = Math.min(100, Math.round(
    (savingsRate > 20 ? 40 : savingsRate * 2) +
    (totalExpense / totalIncome < 0.7 ? 30 : (1 - totalExpense / totalIncome) * 43) +
    30
  ));
  const scoreColor = healthScore >= 70 ? '#27AE60' : healthScore >= 40 ? '#F5A623' : '#E74C3C';
  const scoreLabel = healthScore >= 70 ? 'Ótima' : healthScore >= 40 ? 'Regular' : 'Atenção';

  const fmt = (v: number) => Math.abs(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const fmtPct = (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(1)}%`;

  const insights = [
    { type: 'warning', icon: AlertTriangle, text: 'Gastos com Alimentação 18% acima da sua média dos últimos 3 meses.' },
    { type: 'success', icon: CheckCircle, text: 'Sua taxa de poupança de 54% está acima da meta recomendada (20%).' },
    { type: 'info', icon: Info, text: '3 transações recorrentes identificadas este mês: Aluguel, Netflix e Academia.' },
  ];

  // Category data for qty view
  const catQty = categories.map(cat => {
    const count = transactions.filter(t => t.category === cat.name).length;
    return { name: cat.name, value: count, color: cat.color };
  }).filter(c => c.value > 0);

  const catData = catView === 'value' ? categoryExpenses : catQty;

  return (
    <div className="ind-dashboard">
      {/* Top KPIs + Health */}
      <div className="dashboard-top">
        <div className="cards-grid">
          <KpiCard
            label="Último Saldo Registrado"
            value={fmt(balance)}
            change={fmtPct(balanceChange)}
            positive={balanceChange >= 0}
            icon={<Wallet size={20} />}
            accent="#F5A623"
          />
          <KpiCard
            label="Receitas"
            value={fmt(totalIncome)}
            change={fmtPct(incomeChange)}
            positive={incomeChange >= 0}
            icon={<TrendingUp size={20} />}
            accent="#27AE60"
          />
          <KpiCard
            label="Despesas"
            value={fmt(totalExpense)}
            change={fmtPct(expenseChange)}
            positive={expenseChange <= 0}
            icon={<TrendingDown size={20} />}
            accent="#E74C3C"
          />
          <KpiCard
            label="Previsão de Fim de Mês"
            value={fmt(balance + 1200)}
            change="+R$ 1.200 em recorrências previstas"
            positive={true}
            icon={<CalendarClock size={20} />}
            accent="#2980B9"
          />
        </div>

        <div className="health-card">
          <div className="health-title">Saúde Financeira</div>
          <div className="health-score-ring">
            <svg viewBox="0 0 100 100" width="110" height="110">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="10" />
              <circle
                cx="50" cy="50" r="40" fill="none"
                stroke={scoreColor} strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 40 * healthScore / 100} ${2 * Math.PI * 40 * (1 - healthScore / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <text x="50" y="46" textAnchor="middle" fontSize="18" fontWeight="800" fill={scoreColor}>{healthScore}</text>
              <text x="50" y="60" textAnchor="middle" fontSize="9" fill="#999">/100</text>
            </svg>
          </div>
          <div className="health-label" style={{ color: scoreColor }}>{scoreLabel}</div>
          <div className="health-desc">Baseado em poupança, comprometimento de renda e recorrências</div>
        </div>
      </div>

      {/* Insights */}
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

      {/* Charts Row 1 */}
      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Receitas vs Despesas</h3>
            <span className="badge">Últimos 6 meses</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
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
                <button
                  className={`toggle-btn ${catView === 'value' ? 'active' : ''}`}
                  onClick={() => setCatView('value')}
                >Valor</button>
                <button
                  className={`toggle-btn ${catView === 'qty' ? 'active' : ''}`}
                  onClick={() => setCatView('qty')}
                >Qtd</button>
              </div>
              <div className="toggle-group">
                <button
                  className={`toggle-btn ${chartType === 'bar' ? 'active' : ''}`}
                  onClick={() => setChartType('bar')}
                >Barra</button>
                <button
                  className={`toggle-btn ${chartType === 'pie' ? 'active' : ''}`}
                  onClick={() => setChartType('pie')}
                >Pizza</button>
              </div>
            </div>
          </div>

          {chartType === 'bar' ? (
            <div className="category-bars">
              {catData.map(c => {
                const budget = budgets[c.name] || 300;
                const pct = catView === 'value'
                  ? Math.min(100, (c.value / budget) * 100)
                  : Math.min(100, (c.value / 5) * 100);
                const over = catView === 'value' && pct >= 90;
                return (
                  <div key={c.name} className="cat-bar-row">
                    <div className="cat-bar-label">
                      <span className="cat-dot" style={{ background: c.color }}></span>
                      <span>{c.name}</span>
                    </div>
                    <div className="cat-bar-track">
                      <div className="cat-bar-fill" style={{ width: `${pct}%`, background: over ? '#E74C3C' : c.color }}></div>
                    </div>
                    <div className="cat-bar-values">
                      <span className={over ? 'over' : ''}>
                        {catView === 'value'
                          ? fmt(c.value)
                          : `${c.value} transação${c.value !== 1 ? 'ões' : ''}`}
                      </span>
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
                  <Tooltip formatter={(v) => [catView === 'value' ? fmt(Number(v ?? 0)) : `${v} transações`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend">
                {catData.map(c => (
                  <div key={c.name} className="legend-item">
                    <span className="legend-dot" style={{ background: c.color }}></span>
                    <span className="legend-name">{c.name}</span>
                    <span className="legend-value">
                      {catView === 'value' ? fmt(c.value) : c.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="chart-card">
        <div className="chart-header">
          <h3>Transações Recentes</h3>
          <span className="see-all" style={{ cursor: 'pointer' }}>Ver todas</span>
        </div>
        <div className="tx-list">
          {transactions.slice(0, 5).map(tx => (
            <div key={tx.id} className="tx-item">
              <div className="tx-left">
                <div className="tx-category-dot" style={{ background: tx.amount > 0 ? '#27AE60' : '#E74C3C' }}></div>
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

function KpiCard({ label, value, change, positive, icon, accent }: {
  label: string; value: string; change: string; positive: boolean; icon: React.ReactNode; accent: string;
}) {
  return (
    <div className="kpi-card" style={{ borderTopColor: accent }}>
      <div className="kpi-top">
        <span className="kpi-label">{label}</span>
        <span className="kpi-icon" style={{ background: accent + '18', color: accent }}>{icon}</span>
      </div>
      <div className="kpi-value">{value}</div>
      <div className={`kpi-change ${positive ? 'positive' : 'negative'}`}>
        {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
        {change}
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

  const fmt = (v: number) => Math.abs(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const filtered = transactions.filter(t => {
    const matchSearch = t.description.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || t.type === filterType;
    const matchCat = filterCat === 'all' || t.category === filterCat;
    const txDate = new Date(t.date);
    const matchFrom = !dateFrom || txDate >= new Date(dateFrom);
    const matchTo = !dateTo || txDate <= new Date(dateTo);
    return matchSearch && matchType && matchCat && matchFrom && matchTo;
  });

  const exportCSV = () => {
    const header = 'Data,Descrição,Categoria,Tipo,Valor';
    const rows = filtered.map(t =>
      `${t.date},"${t.description}",${t.category},${t.type === 'income' ? 'Receita' : 'Despesa'},${t.amount}`
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transacoes.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="ind-transactions">
      <div className="page-header">
        <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Transações</h2>
        <p>Histórico completo de movimentações</p>
      </div>

      <div className="filters-bar">
        <div className="search-input-wrap">
          <Search size={14} />
          <input
            type="text"
            placeholder="Buscar transação..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="filter-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="all">Todos os tipos</option>
          <option value="income">Receitas</option>
          <option value="expense">Despesas</option>
        </select>
        <select className="filter-select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          <option value="all">Todas as categorias</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <div className="date-filters">
          <span>De</span>
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
          <span>Até</span>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        </div>
        <button className="export-btn" onClick={exportCSV}>
          <Download size={14} />
          Exportar CSV
        </button>
      </div>

      <div className="table-card">
        <table className="tx-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Tipo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(tx => {
              const cat = categories.find(c => c.name === tx.category);
              return (
                <tr key={tx.id}>
                  <td className="date-cell">{new Date(tx.date).toLocaleDateString('pt-BR')}</td>
                  <td className="desc-cell">{tx.description}</td>
                  <td>
                    <span className="cat-badge" style={{ background: (cat?.color ?? '#999') + '20', color: cat?.color }}>
                      {cat?.icon} {tx.category}
                    </span>
                  </td>
                  <td>
                    <span className={`type-badge ${tx.type}`}>
                      {tx.type === 'income' ? 'Receita' : 'Despesa'}
                    </span>
                  </td>
                  <td className={`amount-cell ${tx.amount > 0 ? 'positive' : 'negative'}`}>
                    {tx.amount > 0 ? '+' : '-'}{fmt(tx.amount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="empty-state">Nenhuma transação encontrada.</div>
        )}
      </div>
    </div>
  );
}

/* ─── CATEGORIES TAB ─── */
function CategoriesTab() {
  const [subTab, setSubTab] = useState<CatSubTab>('view');
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('#F5A623');
  const [success, setSuccess] = useState(false);

  const handleCreate = () => {
    if (!newName.trim()) return;
    setSuccess(true);
    setNewName('');
    setNewColor('#F5A623');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="ind-categories">
      <div className="sub-tabs-mini">
        <button
          className={`sub-tab-mini ${subTab === 'view' ? 'active' : ''}`}
          onClick={() => setSubTab('view')}
        >Visualizar</button>
        <button
          className={`sub-tab-mini ${subTab === 'create' ? 'active' : ''}`}
          onClick={() => setSubTab('create')}
        >Criar</button>
      </div>

      {subTab === 'view' && (
        <div className="categories-grid">
          {categories.map(cat => (
            <div key={cat.id} className="category-chip-item">
              <span className="category-chip-circle" style={{ background: cat.color }}></span>
              <span className="category-chip-icon">{cat.icon}</span>
              <span className="category-chip-name">{cat.name}</span>
            </div>
          ))}
        </div>
      )}

      {subTab === 'create' && (
        <div className="create-form">
          <h3>Criar Nova Categoria</h3>
          {success && (
            <div className="success-msg">
              <CheckCircle size={16} />
              Categoria criada com sucesso!
            </div>
          )}
          <div className="form-field">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Ex: Pets, Viagens..."
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Cor</label>
            <input
              type="color"
              value={newColor}
              onChange={e => setNewColor(e.target.value)}
            />
          </div>
          <button className="btn-primary" onClick={handleCreate}>
            <Tag size={14} />
            Criar Categoria
          </button>
        </div>
      )}
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
              <div key={i} className="cat-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                  <div className="cat-item-info">
                    <div className="cat-desc">{r.desc}</div>
                    <div className="cat-amount">{fmt(r.amount)}</div>
                  </div>
                  <select
                    className="cat-select"
                    value={showNewCat[i] ? '__new__' : (cats[i] || '')}
                    onChange={e => handleCatChange(i, e.target.value)}
                  >
                    <option value="">Selecione a categoria...</option>
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
      {step === 'done' && (
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
          <div className="action-bar center">
            <button className="btn-secondary" onClick={() => setStep('select')}>Importar Outro</button>
            <button className="btn-primary" onClick={() => setStep('select')}>
              Ver Dashboard <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
