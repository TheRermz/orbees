import { TrendingUp, TrendingDown, Wallet, PiggyBank, AlertTriangle, CheckCircle, Info, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { monthlyData, categoryExpenses, transactions } from '../data/mockData';
import './Dashboard.css';

const budgets: Record<string, number> = {
  Alimentação: 400, Moradia: 1400, Transporte: 250, Saúde: 200, Lazer: 150, Educação: 120, Outros: 200,
};

export default function Dashboard() {
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = Math.abs(transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0));
  const balance = totalIncome - totalExpense;
  const savingsRate = (balance / totalIncome) * 100;

  // Simulated previous month values
  const prevIncome = 5100;
  const prevExpense = 3900;
  const prevBalance = prevIncome - prevExpense;

  const incomeChange = ((totalIncome - prevIncome) / prevIncome) * 100;
  const expenseChange = ((totalExpense - prevExpense) / prevExpense) * 100;
  const balanceChange = ((balance - prevBalance) / prevBalance) * 100;

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
    { type: 'success', icon: CheckCircle, text: 'Parabéns! Sua taxa de poupança de 54% está acima da meta recomendada (20%).' },
    { type: 'info', icon: Info, text: '3 transações recorrentes identificadas este mês: Aluguel, Netflix e Academia.' },
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Visão geral das suas finanças em março 2026</p>
        </div>
      </div>

      {/* Top row: KPIs + Health Score */}
      <div className="dashboard-top">
        <div className="cards-grid">
          <KpiCard
            label="Saldo Atual"
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
            label="Taxa de Poupança"
            value={`${savingsRate.toFixed(1)}%`}
            change="Meta: 20%"
            positive={savingsRate >= 20}
            icon={<PiggyBank size={20} />}
            accent="#2980B9"
          />
        </div>

        {/* Health Score */}
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

      {/* Charts Row */}
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
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [fmt(Number(v ?? 0)), '']} />
              <Bar dataKey="receitas" fill="#27AE60" radius={[4,4,0,0]} name="Receitas" />
              <Bar dataKey="despesas" fill="#E74C3C" radius={[4,4,0,0]} name="Despesas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Gastos por Categoria</h3>
            <span className="badge">Março 2026</span>
          </div>
          <div className="category-bars">
            {categoryExpenses.map(c => {
              const budget = budgets[c.name] || 300;
              const pct = Math.min(100, (c.value / budget) * 100);
              const over = pct >= 90;
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
                    <span className={over ? 'over' : ''}>{fmt(c.value)}</span>
                    <span className="budget-label">/ {fmt(budget)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom row: Donut + Transactions */}
      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Distribuição de Gastos</h3>
          </div>
          <div className="pie-wrapper">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={categoryExpenses} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                  {categoryExpenses.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [fmt(Number(v ?? 0)), '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {categoryExpenses.map(c => (
                <div key={c.name} className="legend-item">
                  <span className="legend-dot" style={{ background: c.color }}></span>
                  <span className="legend-name">{c.name}</span>
                  <span className="legend-value">{fmt(c.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Transações Recentes</h3>
            <a href="/transactions" className="see-all">Ver todas</a>
          </div>
          <div className="tx-list">
            {transactions.slice(0, 7).map(tx => (
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
        {change} vs mês anterior
      </div>
    </div>
  );
}
