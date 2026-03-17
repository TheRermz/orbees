import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Education.css';

function EducationHeader() {
  return (
    <div className="page-header">
      <h1>Educação Financeira</h1>
      <p>Ferramentas e conhecimento para decisões financeiras mais inteligentes</p>
    </div>
  );
}

export default function Education() {
  return (
    <div className="education-page">
      <Outlet />
    </div>
  );
}

export function EducationCalculadoras() {
  return (
    <div className="education-page">
      <EducationHeader />
      <CalcSection />
    </div>
  );
}

export function EducationIrpf() {
  return (
    <div className="education-page">
      <EducationHeader />
      <IrpfSection />
    </div>
  );
}

export function EducationGuias() {
  return (
    <div className="education-page">
      <EducationHeader />
      <GuiasSection />
    </div>
  );
}

/* ─── CALCULADORAS ─── */
function CalcSection() {
  return (
    <div className="calc-section">
      <SimpleInterest />
      <CompoundInterest />
      <FeriasCalc />
      <ParcelamentoCalc />
      <MetaCalc />
    </div>
  );
}

function SimpleInterest() {
  const [capital, setCapital] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const result = capital && rate && months ? Number(capital) * (1 + (Number(rate) / 100) * Number(months)) : null;
  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return (
    <CalcCard title="Juros Simples" formula="M = C × (1 + i × t)" description="Os juros incidem apenas sobre o capital inicial. Usado em empréstimos curtos e caderneta de poupança.">
      <div className="calc-inputs">
        <CalcField label="Capital Inicial (R$)" value={capital} onChange={setCapital} placeholder="Ex: 1000" />
        <CalcField label="Taxa de Juros (% a.m.)" value={rate} onChange={setRate} placeholder="Ex: 2.5" />
        <CalcField label="Período (meses)" value={months} onChange={setMonths} placeholder="Ex: 12" />
      </div>
      {result && (
        <div className="calc-result">
          <div className="result-item"><span>Juros</span><span className="result-value yellow">{fmt(result - Number(capital))}</span></div>
          <div className="result-item highlight"><span>Montante Final</span><span className="result-value">{fmt(result)}</span></div>
        </div>
      )}
    </CalcCard>
  );
}

function CompoundInterest() {
  const [capital, setCapital] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const [monthly, setMonthly] = useState('');
  const n = Number(months); const i = Number(rate) / 100; const C = Number(capital); const PMT = Number(monthly);
  const result = capital && rate && months ? C * Math.pow(1 + i, n) + (PMT ? PMT * (Math.pow(1 + i, n) - 1) / i : 0) : null;
  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return (
    <CalcCard title="Juros Compostos" formula="M = C × (1 + i)ⁿ" description="Juros sobre juros — o mais poderoso aliado dos investimentos de longo prazo.">
      <div className="calc-inputs">
        <CalcField label="Capital Inicial (R$)" value={capital} onChange={setCapital} placeholder="Ex: 5000" />
        <CalcField label="Taxa de Juros (% a.m.)" value={rate} onChange={setRate} placeholder="Ex: 1.0" />
        <CalcField label="Período (meses)" value={months} onChange={setMonths} placeholder="Ex: 24" />
        <CalcField label="Aporte Mensal (R$) — opcional" value={monthly} onChange={setMonthly} placeholder="Ex: 200" />
      </div>
      {result && (
        <div className="calc-result">
          <div className="result-item"><span>Capital inicial</span><span className="result-value">{fmt(C)}</span></div>
          <div className="result-item"><span>Juros acumulados</span><span className="result-value yellow">{fmt(result - C - PMT * n)}</span></div>
          <div className="result-item highlight"><span>Montante Final</span><span className="result-value">{fmt(result)}</span></div>
        </div>
      )}
    </CalcCard>
  );
}

function FeriasCalc() {
  const [salario, setSalario] = useState('');
  const [diasVendidos, setDiasVendidos] = useState('0');
  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const S = Number(salario); const diasVac = 30 - Number(diasVendidos);
  const valorDia = S / 30; const valorFerias = diasVac * valorDia;
  const umTerco = valorFerias / 3; const abono = Number(diasVendidos) * valorDia;
  const total = valorFerias + umTerco + abono;
  return (
    <CalcCard title="Cálculo de Férias (CLT)" formula="Férias + ⅓ + Abono Pecuniário" description="Calcule seus direitos conforme a CLT, incluindo o terço constitucional obrigatório.">
      <div className="calc-inputs">
        <CalcField label="Salário Bruto (R$)" value={salario} onChange={setSalario} placeholder="Ex: 3000" />
        <CalcField label="Dias vendidos (abono — max 10)" value={diasVendidos} onChange={setDiasVendidos} placeholder="0 a 10" />
      </div>
      {S > 0 && (
        <div className="calc-result">
          <div className="result-item"><span>Férias ({diasVac} dias)</span><span className="result-value">{fmt(valorFerias)}</span></div>
          <div className="result-item"><span>⅓ Constitucional</span><span className="result-value">{fmt(umTerco)}</span></div>
          {Number(diasVendidos) > 0 && <div className="result-item"><span>Abono pecuniário</span><span className="result-value">{fmt(abono)}</span></div>}
          <div className="result-item highlight"><span>Total a Receber</span><span className="result-value yellow">{fmt(total)}</span></div>
        </div>
      )}
    </CalcCard>
  );
}

function ParcelamentoCalc() {
  const [valor, setValor] = useState('');
  const [parcelas, setParcelas] = useState('');
  const [taxa, setTaxa] = useState('');
  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const PV = Number(valor); const n = Number(parcelas); const i = Number(taxa) / 100;
  const PMT = PV && n && i ? PV * i * Math.pow(1 + i, n) / (Math.pow(1 + i, n) - 1) : (PV && n ? PV / n : null);
  const total = PMT ? PMT * n : null;
  const juros = total ? total - PV : null;
  return (
    <CalcCard title="Custo Real do Parcelamento" formula="Total = PMT × n" description="Descubra o quanto você realmente paga ao parcelar uma compra com juros.">
      <div className="calc-inputs">
        <CalcField label="Valor do Produto (R$)" value={valor} onChange={setValor} placeholder="Ex: 1500" />
        <CalcField label="Número de Parcelas" value={parcelas} onChange={setParcelas} placeholder="Ex: 12" />
        <CalcField label="Taxa de Juros (% a.m.) — 0 se sem juros" value={taxa} onChange={setTaxa} placeholder="Ex: 2.99" />
      </div>
      {PMT && total && (
        <div className="calc-result">
          <div className="result-item"><span>Valor à vista</span><span className="result-value">{fmt(PV)}</span></div>
          <div className="result-item highlight"><span>Parcela mensal ({n}x)</span><span className="result-value yellow">{fmt(PMT)}</span></div>
          <div className="result-item"><span>Total a pagar</span><span className="result-value">{fmt(total)}</span></div>
          {juros !== null && juros > 0 && <div className="result-item"><span>Juros pagos</span><span className="result-value red">{fmt(juros)} ({((juros / PV) * 100).toFixed(1)}% a mais)</span></div>}
        </div>
      )}
    </CalcCard>
  );
}

function MetaCalc() {
  const [meta, setMeta] = useState('');
  const [meses, setMeses] = useState('');
  const [atual, setAtual] = useState('');
  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const falta = Math.max(0, Number(meta) - Number(atual));
  const mensal = meses && falta ? falta / Number(meses) : null;
  const pct = meta && atual ? Math.min(100, (Number(atual) / Number(meta)) * 100) : 0;
  return (
    <CalcCard title="Simulador de Metas" formula="Mensal = (Meta − Atual) ÷ Meses" description="Planeje quanto poupar por mês para atingir seu objetivo no prazo desejado.">
      <div className="calc-inputs">
        <CalcField label="Valor da Meta (R$)" value={meta} onChange={setMeta} placeholder="Ex: 10000" />
        <CalcField label="Valor já guardado (R$)" value={atual} onChange={setAtual} placeholder="Ex: 2000" />
        <CalcField label="Prazo (meses)" value={meses} onChange={setMeses} placeholder="Ex: 12" />
      </div>
      {mensal !== null && (
        <div className="calc-result">
          <div className="result-item"><span>Progresso atual</span>
            <div className="progress-inline">
              <div className="progress-bar-small"><div style={{ width: `${pct}%` }}></div></div>
              <span>{pct.toFixed(0)}%</span>
            </div>
          </div>
          <div className="result-item"><span>Falta guardar</span><span className="result-value">{fmt(falta)}</span></div>
          <div className="result-item highlight"><span>Poupar por mês</span><span className="result-value yellow">{fmt(mensal)}</span></div>
        </div>
      )}
    </CalcCard>
  );
}

/* ─── IRPF (tudo em uma tela) ─── */
function IrpfSection() {
  return (
    <div className="irpf-section">
      <IrpfOque />
      <div className="irpf-block-title">Tabela de Alíquotas 2024</div>
      <IrpfTabela />
      <div className="irpf-block-title">Simulador IRPF</div>
      <IrpfSimulador />
    </div>
  );
}

function IrpfOque() {
  const items = [
    { title: 'O que é o Imposto de Renda?', content: 'O Imposto de Renda Pessoa Física (IRPF) é um tributo federal cobrado sobre os rendimentos das pessoas físicas residentes no Brasil. É calculado de forma progressiva — quanto maior a renda, maior a alíquota aplicada. Os recursos arrecadados financiam serviços públicos como saúde, educação e infraestrutura.' },
    { title: 'Quem é obrigado a declarar?', content: 'Deve declarar quem: recebeu rendimentos tributáveis acima de R$30.639,90 no ano; recebeu rendimentos isentos, não tributáveis ou tributados na fonte acima de R$200.000; teve ganho de capital ou realizou operações na Bolsa; possui bens e direitos acima de R$800.000; ou passou à condição de residente no Brasil.' },
    { title: 'Declaração Simplificada vs Completa', content: 'Na Simplificada, você abre mão de todas as deduções detalhadas em troca de um desconto padrão de 20% sobre os rendimentos tributáveis (limitado a R$16.754,34). Na Completa, você lista todas as despesas dedutíveis reais (saúde, educação, dependentes, previdência). Escolha sempre a que gera menor imposto — o próprio programa da Receita Federal indica a opção mais vantajosa.' },
    { title: 'O que pode ser deduzido?', content: 'Despesas dedutíveis na declaração completa: plano de saúde e despesas médicas (sem limite); educação (limitado a R$3.561,50/ano por pessoa); dependentes (R$2.275,08/ano cada); contribuição ao INSS; previdência privada tipo PGBL (até 12% da renda bruta); pensão alimentícia judicial.' },
    { title: 'Prazos e restituição', content: 'A declaração deve ser entregue entre março e maio de cada ano pelo programa IRPF da Receita Federal ou pelo app Meu Imposto de Renda. A restituição é paga em lotes de junho a dezembro — quem entrega antes e tem prioridade legal (idosos, professores, portadores de doença grave) recebe nos primeiros lotes. Quem tem imposto a pagar pode parcelar em até 8 vezes, com vencimento da primeira cota em abril.' },
    { title: 'O que acontece se não declarar?', content: 'A omissão sujeita o contribuinte à multa de 1% ao mês sobre o imposto devido, mínimo de R$165,74 e máximo de 20% do imposto. Além disso, o CPF fica em situação irregular, impedindo emissão de passaporte, certidões negativas e operações financeiras.' },
  ];
  return <AccordionList items={items} />;
}

function IrpfTabela() {
  const faixas = [
    { faixa: 'Até R$ 2.259,20', aliquota: 'Isento', deducao: '—', color: '#27AE60' },
    { faixa: 'R$ 2.259,21 a R$ 2.826,65', aliquota: '7,5%', deducao: 'R$ 169,44', color: '#8BC34A' },
    { faixa: 'R$ 2.826,66 a R$ 3.751,05', aliquota: '15%', deducao: 'R$ 381,44', color: '#FFC107' },
    { faixa: 'R$ 3.751,06 a R$ 4.664,68', aliquota: '22,5%', deducao: 'R$ 662,77', color: '#FF9800' },
    { faixa: 'Acima de R$ 4.664,68', aliquota: '27,5%', deducao: 'R$ 896,00', color: '#E74C3C' },
  ];
  return (
    <div className="irpf-content">
      <div className="info-box">
        <strong>Como funciona o cálculo progressivo:</strong> O IR não incide com a mesma alíquota sobre toda a renda. Cada faixa é tributada separadamente. Por exemplo, quem ganha R$5.000/mês paga 0% sobre os primeiros R$2.259,20, 7,5% sobre o valor entre R$2.259,21 e R$2.826,65, e assim por diante — depois subtrai a dedução da faixa para chegar ao imposto final.
      </div>
      <div className="tabela-card">
        <div className="tabela-header">
          <span>Faixa de Rendimento Mensal</span>
          <span>Alíquota</span>
          <span>Parcela a Deduzir</span>
        </div>
        {faixas.map((f, i) => (
          <div key={i} className="tabela-row">
            <span>{f.faixa}</span>
            <span className="aliquota" style={{ color: f.color }}>{f.aliquota}</span>
            <span>{f.deducao}</span>
          </div>
        ))}
      </div>
      <div className="example-box">
        <strong>Exemplo prático — renda de R$ 5.000/mês:</strong>
        <div className="example-steps">
          <div>R$ 2.259,20 × 0% = <strong>R$ 0,00</strong></div>
          <div>(R$ 2.826,65 − R$ 2.259,20) × 7,5% = <strong>R$ 42,56</strong></div>
          <div>(R$ 3.751,05 − R$ 2.826,65) × 15% = <strong>R$ 138,66</strong></div>
          <div>(R$ 4.664,68 − R$ 3.751,05) × 22,5% = <strong>R$ 205,58</strong></div>
          <div>(R$ 5.000 − R$ 4.664,68) × 27,5% = <strong>R$ 92,22</strong></div>
          <div className="example-total">Imposto total: <strong>R$ 479,02</strong> (alíquota efetiva: 9,58%)</div>
        </div>
      </div>
    </div>
  );
}

function IrpfSimulador() {
  const [renda, setRenda] = useState('');
  const [saude, setSaude] = useState('');
  const [educacao, setEducacao] = useState('');
  const [dependentes, setDependentes] = useState('0');
  const [previdencia, setPrevidencia] = useState('');
  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const rendaAnual = Number(renda) * 12;
  const dedSaude = Number(saude);
  const dedEducacao = Math.min(Number(educacao), 3561.50);
  const dedDependentes = Number(dependentes) * 2275.08;
  const dedPrevidencia = Math.min(Number(previdencia) * 12, rendaAnual * 0.12);
  const totalDed = dedSaude + dedEducacao + dedDependentes + dedPrevidencia;
  const baseCompleta = Math.max(0, rendaAnual - totalDed);
  const baseSimplificada = Math.max(0, rendaAnual * 0.8);

  const calcIR = (base: number) => {
    const mensal = base / 12;
    if (mensal <= 2259.20) return 0;
    let ir = 0;
    if (mensal > 2259.20) ir += Math.min(mensal, 2826.65) * 0.075 - 169.44;
    if (mensal > 2826.65) ir += (Math.min(mensal, 3751.05) - 2826.65) * 0.15;
    if (mensal > 3751.05) ir += (Math.min(mensal, 4664.68) - 3751.05) * 0.225;
    if (mensal > 4664.68) ir += (mensal - 4664.68) * 0.275;
    return Math.max(0, ir) * 12;
  };

  const irCompleta = renda ? calcIR(baseCompleta) : null;
  const irSimplificada = renda ? calcIR(baseSimplificada) : null;
  const melhor = irCompleta !== null && irSimplificada !== null ? (irCompleta <= irSimplificada ? 'completa' : 'simplificada') : null;

  return (
    <div className="irpf-content">
      <div className="info-box">Estimativa baseada nos rendimentos anuais. Consulte sempre um contador para declarações complexas com múltiplas fontes de renda, ganho de capital ou atividade rural.</div>
      <CalcCard title="Simulador IRPF" formula="Base de Cálculo − Deduções" description="Estime seu imposto anual e veja qual tipo de declaração é mais vantajosa.">
        <div className="calc-inputs">
          <CalcField label="Salário Bruto Mensal (R$)" value={renda} onChange={setRenda} placeholder="Ex: 5000" />
          <CalcField label="Despesas de Saúde no Ano (R$)" value={saude} onChange={setSaude} placeholder="Ex: 3600" />
          <CalcField label="Despesas de Educação no Ano (R$)" value={educacao} onChange={setEducacao} placeholder="Limite: R$ 3.561,50" />
          <CalcField label="Número de Dependentes" value={dependentes} onChange={setDependentes} placeholder="Ex: 1" />
          <CalcField label="Previdência Privada Mensal (R$)" value={previdencia} onChange={setPrevidencia} placeholder="Ex: 300" />
        </div>
        {irCompleta !== null && irSimplificada !== null && (
          <div className="calc-result">
            <div className={`result-item ${melhor === 'completa' ? 'highlight' : ''}`}>
              <span>Declaração Completa {melhor === 'completa' ? '(Recomendada)' : ''}</span>
              <span className="result-value">{fmt(irCompleta)}</span>
            </div>
            <div className={`result-item ${melhor === 'simplificada' ? 'highlight' : ''}`}>
              <span>Declaração Simplificada {melhor === 'simplificada' ? '(Recomendada)' : ''}</span>
              <span className="result-value">{fmt(irSimplificada)}</span>
            </div>
            <div className="result-item"><span>Alíquota efetiva (completa)</span>
              <span className="result-value yellow">{rendaAnual ? ((irCompleta / rendaAnual) * 100).toFixed(1) + '%' : '—'}</span>
            </div>
          </div>
        )}
      </CalcCard>
    </div>
  );
}

/* ─── GUIAS ─── */
function GuiasSection() {
  const guias = [
    {
      title: 'Fundo de Emergência',
      audience: 'Iniciantes',
      color: '#27AE60',
      content: 'O fundo de emergência é uma reserva financeira destinada a cobrir imprevistos sem comprometer seu planejamento. O recomendado é ter entre 3 a 6 meses de despesas mensais guardados em uma aplicação de alta liquidez (como Tesouro Selic ou CDB com liquidez diária). Para quem tem renda variável ou é autônomo, o ideal é ter 6 a 12 meses. Comece com uma meta menor (R$1.000) para criar o hábito e vá aumentando gradualmente.',
    },
    {
      title: 'Como Sair das Dívidas',
      audience: 'Endividados',
      color: '#E74C3C',
      content: 'Dois métodos eficazes: (1) Bola de Neve — pague o mínimo em todas as dívidas e direcione o máximo para a menor dívida. Ao quitá-la, use o valor liberado para a próxima. Gera motivação psicológica. (2) Avalanche — pague o mínimo em todas e foque na dívida com maior taxa de juros. Matematicamente mais eficiente. Evite rotativo do cartão de crédito (juros médios de 400% ao ano) e cheque especial. Negocie diretamente com o credor ou utilize plataformas como o Serasa Limpa Nome.',
    },
    {
      title: 'Como Ler seu Holerite',
      audience: 'Jovens no mercado de trabalho',
      color: '#2980B9',
      content: 'O holerite (contracheque) discrimina sua remuneração e os descontos. Principais itens: Salário base (seu salário contratado); Adicionais (hora extra, periculosidade, insalubridade, comissões); Descontos obrigatórios: INSS (7,5% a 14% conforme tabela progressiva), IRRF (conforme tabela do IR), vale-transporte (até 6% do salário). O valor líquido é o que cai na sua conta. Guarde seus holerites — são documentos importantes para declaração de IR, financiamentos e comprovação de renda.',
    },
    {
      title: 'Entendendo o Carnê-Leão',
      audience: 'Autônomos e Freelancers',
      color: '#8E44AD',
      content: 'O Carnê-Leão é o recolhimento mensal obrigatório do IR para quem recebe de pessoa física ou do exterior sem retenção na fonte. Se você é freelancer, prestador de serviços autônomo ou profissional liberal, precisa calcular e pagar mensalmente via DARF até o último dia útil do mês seguinte ao recebimento. Use o programa Carnê-Leão disponível na Receita Federal. Valores até R$2.259,20/mês são isentos. O não recolhimento gera multa e juros.',
    },
    {
      title: 'Previdência Privada: PGBL vs VGBL',
      audience: 'Planejamento de longo prazo',
      color: '#F39C12',
      content: 'PGBL (Plano Gerador de Benefício Livre): permite deduzir até 12% da renda bruta anual na declaração completa do IR. Indicado para quem declara no modelo completo. O IR incide sobre o total resgatado (principal + rendimentos). VGBL (Vida Gerador de Benefício Livre): não deduz no IR, mas o imposto incide apenas sobre os rendimentos no resgate. Indicado para declaração simplificada ou para quem quer diversificar. Em ambos, prefira fundos com taxa de administração abaixo de 1% ao ano e sem taxa de carregamento.',
    },
  ];

  return (
    <div className="guias-section">
      <div className="guias-grid">
        {guias.map((g, i) => <GuiaCard key={i} {...g} />)}
      </div>
    </div>
  );
}

function GuiaCard({ title, audience, color, content }: { title: string; audience: string; color: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="guia-card">
      <button className="guia-header" onClick={() => setOpen(!open)}>
        <div className="guia-header-left">
          <span className="guia-dot" style={{ background: color }}></span>
          <div>
            <div className="guia-title">{title}</div>
            <div className="guia-audience">{audience}</div>
          </div>
        </div>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && (
        <>
          <div className="guia-content">{content}</div>
          <div className="guia-videos">
            <div className="guia-videos-title">Vídeos Recomendados</div>
            <div className="guia-videos-grid">
              <div className="video-placeholder">
                <span className="video-play-icon">&#9654;</span>
                <span className="video-label">Vídeo: {title}</span>
              </div>
              <div className="video-placeholder">
                <span className="video-play-icon">&#9654;</span>
                <span className="video-label">Vídeo: {title}</span>
              </div>
            </div>
            <p className="video-note">* Substitua VIDEO_ID_AQUI pelos IDs dos vídeos desejados</p>
          </div>
        </>
      )}
    </div>
  );
}

function AccordionList({ items }: { items: { title: string; content: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="accordion-list">
      {items.map((item, i) => (
        <div key={i} className="accordion-item">
          <button className="accordion-header" onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.title}</span>
            {open === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {open === i && <div className="accordion-content">{item.content}</div>}
        </div>
      ))}
    </div>
  );
}

/* ─── SHARED COMPONENTS ─── */
function CalcCard({ title, formula, description, children }: { title: string; formula: string; description: string; children: React.ReactNode }) {
  return (
    <div className="calc-card">
      <div className="calc-card-header">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="formula-badge">{formula}</div>
      </div>
      {children}
    </div>
  );
}

function CalcField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="calc-field">
      <label>{label}</label>
      <input type="number" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="calc-input" />
    </div>
  );
}
