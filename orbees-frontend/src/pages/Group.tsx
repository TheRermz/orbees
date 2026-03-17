import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Users, Upload, Crown, Eye, Plus, FileText, CheckCircle, Tag, Lock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { categories } from '../data/mockData';
import './Group.css';

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
  return (
    <div className="group-page">
      <GroupHeader />
      <div className="group-content">
        <div className="gtable-card">
          <table className="gtx-table">
            <thead>
              <tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Membro</th><th>Valor</th></tr>
            </thead>
            <tbody>
              {groupTransactions.map(tx => {
                const m = members.find(m => m.name === tx.member);
                return (
                  <tr key={tx.id}>
                    <td className="date-cell">{new Date(tx.date).toLocaleDateString('pt-BR')}</td>
                    <td>{tx.description}</td>
                    <td><span className="cat-chip">{tx.category}</span></td>
                    <td>
                      <div className="member-chip">
                        <span className="chip-dot" style={{ background: m?.color }}></span>
                        {tx.member}
                      </div>
                    </td>
                    <td className={tx.amount > 0 ? 'positive' : 'negative'}>{tx.amount > 0 ? '+' : '-'}{fmt(tx.amount)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── CATEGORIAS ─── */
export function GroupCategories() {
  const [subTab, setSubTab] = useState<'view' | 'create'>('view');
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
    <div className="group-page">
      <GroupHeader />
      <div className="group-content">
        <div className="group-cat-subtabs">
          <button className={`group-cat-subtab ${subTab === 'view' ? 'active' : ''}`} onClick={() => setSubTab('view')}>Visualizar</button>
          <button className={`group-cat-subtab ${subTab === 'create' ? 'active' : ''}`} onClick={() => setSubTab('create')}>Criar</button>
        </div>

        {subTab === 'view' && (
          <div className="group-categories-grid">
            {categories.map(cat => (
              <div key={cat.id} className="group-category-chip">
                <span className="gcat-circle" style={{ background: cat.color }}></span>
                <span className="gcat-name">{cat.name}</span>
              </div>
            ))}
          </div>
        )}

        {subTab === 'create' && (
          currentUserRole === 'viewer' ? (
            <div className="group-no-perm">
              <Lock size={20} />
              <span>Somente administradores podem criar categorias.</span>
            </div>
          ) : (
            <div className="group-create-form">
              <h3>Criar Nova Categoria</h3>
              {success && (
                <div className="group-success-msg"><CheckCircle size={16} /> Categoria criada com sucesso!</div>
              )}
              <div className="gform-field">
                <label>Nome</label>
                <input type="text" placeholder="Ex: Pets, Viagens..." value={newName} onChange={e => setNewName(e.target.value)} />
              </div>
              <div className="gform-field">
                <label>Cor</label>
                <input type="color" value={newColor} onChange={e => setNewColor(e.target.value)} />
              </div>
              <button className="btn-primary" onClick={handleCreate}><Tag size={14} /> Criar Categoria</button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

/* ─── IMPORTAR EXTRATO ─── */
export function GroupUpload() {
  const [uploadStep, setUploadStep] = useState<'select' | 'preview' | 'done'>('select');
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [cats, setCats] = useState<Record<number, string>>({});

  const previewData = [
    { date: '2026-03-01', desc: 'PIX RECEBIDO', amount: 1200, category: null as string | null },
    { date: '2026-03-02', desc: 'SUPERMERCADO GRUPO', amount: -480, category: 'Alimentação' as string | null },
    { date: '2026-03-03', desc: 'CONTA DE AGUA', amount: -90, category: 'Moradia' as string | null },
    { date: '2026-03-04', desc: 'PAGTO DESCONHECIDO', amount: -200, category: null as string | null },
  ];
  const needsCat = previewData.filter(r => !r.category);
  const uploadCategories = ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 'Lazer', 'Outros'];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) { setFileName(file.name); setUploadStep('preview'); }
  };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setFileName(file.name); setUploadStep('preview'); }
  };

  return (
    <div className="group-page">
      <GroupHeader />
      <div className="group-content">
        <div className="upload-notice"><Crown size={14} /><span>Somente administradores podem importar extratos para a conta do grupo.</span></div>

        {uploadStep === 'select' && (
          <div
            className={`drop-zone ${dragging ? 'dragging' : ''}`}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <FileText size={52} strokeWidth={1.2} />
            <h3>Arraste o extrato do grupo aqui</h3>
            <p>Suporta arquivos <strong>OFX</strong> e <strong>CSV</strong> da conta compartilhada</p>
            <label className="upload-btn">Selecionar Arquivo<input type="file" accept=".ofx,.csv" hidden onChange={handleFile} /></label>
          </div>
        )}

        {uploadStep === 'preview' && (
          <div className="preview-section">
            <div className="file-info-bar">
              <span>Arquivo: {fileName}</span>
              <span className="badge-green">{previewData.length} transações encontradas</span>
            </div>
            <div className="gtable-card">
              <table className="gtx-table">
                <thead><tr><th>Data</th><th>Descrição</th><th>Valor</th><th>Categoria</th></tr></thead>
                <tbody>
                  {previewData.map((r, i) => (
                    <tr key={i}>
                      <td className="date-cell">{new Date(r.date).toLocaleDateString('pt-BR')}</td>
                      <td>{r.desc}</td>
                      <td className={r.amount > 0 ? 'positive' : 'negative'}>{r.amount > 0 ? '+' : '-'}{fmt(r.amount)}</td>
                      <td>{r.category ? <span className="cat-auto"><CheckCircle size={11} /> {r.category}</span> : <span className="cat-pending"><Tag size={11} /> A categorizar</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {needsCat.length > 0 && (
              <div className="cat-list">
                {needsCat.map((r, i) => (
                  <div key={i} className="cat-item">
                    <div><div className="cat-desc">{r.desc}</div><div className="cat-amount">{fmt(r.amount)}</div></div>
                    <select className="cat-select" value={cats[i] || ''} onChange={e => setCats(p => ({ ...p, [i]: e.target.value }))}>
                      <option value="">Selecione a categoria...</option>
                      {uploadCategories.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            )}
            <div className="action-bar">
              <button className="btn-secondary" onClick={() => setUploadStep('select')}>Voltar</button>
              <button className="btn-primary" onClick={() => setUploadStep('done')}>Importar para o Grupo</button>
            </div>
          </div>
        )}

        {uploadStep === 'done' && (
          <div className="done-section">
            <CheckCircle size={56} strokeWidth={1.5} color="#27AE60" />
            <h2>Extrato importado com sucesso!</h2>
            <p>{previewData.length} transações adicionadas à conta do grupo.</p>
            <div className="action-bar center">
              <button className="btn-secondary" onClick={() => setUploadStep('select')}>Importar Outro</button>
              <button className="btn-primary" onClick={() => setUploadStep('select')}>Ver Dashboard</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── MEMBROS ─── */
export function GroupMembers() {
  return (
    <div className="group-page">
      <GroupHeader />
      <div className="group-content">
        <div className="members-header">
          <h3>Membros do Grupo</h3>
          <button className="btn-primary small"><Plus size={14} /> Convidar Membro</button>
        </div>
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
          <strong>Permissões:</strong> Administradores podem importar extratos e gerenciar categorias. Visualizadores podem ver o dashboard e as transações.
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
