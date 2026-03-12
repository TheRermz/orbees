import { useState } from 'react';
import {
  FolderOpen,
  FileText,
  Table,
  CheckCircle,
  Tag,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import './Upload.css';

type UploadStep = 'select' | 'preview' | 'categorize' | 'done';

const previewData = [
  { date: '2026-03-01', desc: 'PIX RECEBIDO MARIA SILVA', amount: 500.00, category: null },
  { date: '2026-03-02', desc: 'COMPRA SUPERMERCADO BH', amount: -210.50, category: 'Alimentação' },
  { date: '2026-03-03', desc: 'DEB AUT ENERGIA CEMIG', amount: -145.00, category: 'Moradia' },
  { date: '2026-03-04', desc: 'TED ENVIADO', amount: -300.00, category: null },
  { date: '2026-03-05', desc: 'CREDITO SALARIO', amount: 4500.00, category: 'Salário' },
];

const categories = ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 'Lazer', 'Salário', 'Outros'];

export default function Upload() {
  const [step, setStep] = useState<UploadStep>('select');
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [cats, setCats] = useState<Record<number, string>>({});

  const fmt = (v: number) => Math.abs(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

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

  return (
    <div className="upload-page">
      <div className="page-header">
        <h1>Importar Extrato</h1>
        <p>Faça upload do seu extrato bancário nos formatos OFX ou CSV</p>
      </div>

      {/* Steps indicator */}
      <div className="steps-bar">
        {['Selecionar Arquivo', 'Pré-visualizar', 'Categorizar', 'Concluído'].map((s, i) => {
          const stepKey = ['select', 'preview', 'categorize', 'done'][i] as UploadStep;
          const steps = ['select', 'preview', 'categorize', 'done'];
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
          <div className="drop-icon"><FolderOpen size={56} /></div>
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
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Categoria</th>
                </tr>
              </thead>
              <tbody>
                {previewData.map((r, i) => (
                  <tr key={i}>
                    <td>{new Date(r.date).toLocaleDateString('pt-BR')}</td>
                    <td>{r.desc}</td>
                    <td className={r.amount > 0 ? 'positive amount-cell' : 'negative amount-cell'}>
                      {r.amount > 0 ? '+' : '-'}{fmt(r.amount)}
                    </td>
                    <td>
                      {r.category
                        ? <span className="cat-auto"><CheckCircle size={12} /> {r.category}</span>
                        : <span className="cat-pending"><Tag size={12} /> A categorizar</span>}
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
            <span>💡</span>
            <p>Estas transações são novas. Ao categorizá-las agora, o sistema aprenderá a reconhecê-las automaticamente nas próximas importações.</p>
          </div>
          <div className="cat-list">
            {needsCat.map((r, i) => (
              <div key={i} className="cat-item">
                <div className="cat-item-info">
                  <div className="cat-desc">{r.desc}</div>
                  <div className="cat-amount">{fmt(r.amount)}</div>
                </div>
                <select
                  className="cat-select"
                  value={cats[i] || ''}
                  onChange={e => setCats(prev => ({ ...prev, [i]: e.target.value }))}
                >
                  <option value="">Selecione a categoria...</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
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
          <div className="done-icon"><CheckCircle size={64} /></div>
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
            <a href="/dashboard" className="btn-primary">Ver Dashboard <ArrowRight size={16} /></a>
          </div>
        </div>
      )}
    </div>
  );
}
