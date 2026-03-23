import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  ChevronDown, ChevronUp, AlertTriangle, BookOpen,
  Wallet, ShieldCheck, TrendingUp, BarChart2,
  CheckCircle, Clock, Lock,
} from 'lucide-react';
import './Education.css';

/* ─── DEFAULT LAYOUT ─── */
export default function Education() {
  return <div className="education-page"><Outlet /></div>;
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

function AccordionList({ items }: { items: { title: string; content: React.ReactNode }[] }) {
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

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="edu-section-header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

/** Inline source link — appears after a number/stat */
function Fonte({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="edu-fonte">
      {label}
    </a>
  );
}

/* ══════════════════════════════════════════════════════
   TAB 1 — INÍCIO
══════════════════════════════════════════════════════ */
export function EducationInicio() {
  return (
    <div className="education-page">
      <SectionHeader
        title="Educação Financeira"
        subtitle="Conhecimento é o melhor investimento que você pode fazer."
      />

      {/* Hero */}
      <div className="edu-hero">
        <div className="edu-hero-text">
          <h2>Domine suas finanças.<br />Construa sua liberdade.</h2>
          <p>
            A Orbees combina controle financeiro com educação prática. Aqui você aprende
            o que as escolas nunca ensinaram — do orçamento mensal aos investimentos de
            longo prazo — com base em pesquisas e legislação brasileira atualizada.
          </p>
        </div>
        <div className="edu-hero-badge">
          <BookOpen size={48} strokeWidth={1.2} />
          <span>Aprenda na prática</span>
        </div>
      </div>

      {/* Stats from references */}
      <div className="edu-stats-grid">
        <div className="edu-stat-card red">
          <div className="edu-stat-number">78,3%</div>
          <div className="edu-stat-label">das famílias brasileiras estão endividadas</div>
          <a
            href="https://cndl.org.br/noticia/pesquisa-de-endividamento-e-inadimplencia-do-consumidor-peic/"
            target="_blank" rel="noopener noreferrer"
            className="edu-stat-source-link"
          >CNDL / SPC Brasil, 2024 ↗</a>
        </div>
        <div className="edu-stat-card yellow">
          <div className="edu-stat-number">52%</div>
          <div className="edu-stat-label">dos brasileiros têm nível adequado de letramento financeiro</div>
          <a
            href="https://www.bcb.gov.br/estabilidadefinanceira/educacaofinanceira"
            target="_blank" rel="noopener noreferrer"
            className="edu-stat-source-link"
          >Banco Central do Brasil, 2023 ↗</a>
        </div>
        <div className="edu-stat-card blue">
          <div className="edu-stat-number">400%</div>
          <div className="edu-stat-label">ao ano: custo médio do rotativo do cartão de crédito</div>
          <a
            href="https://www.bcb.gov.br/estatisticas/txjuros"
            target="_blank" rel="noopener noreferrer"
            className="edu-stat-source-link"
          >BCB — Taxas de Operações de Crédito ↗</a>
        </div>
      </div>

      {/* Why it matters */}
      <div className="edu-why-card">
        <h3>Por que gestão financeira é essencial?</h3>
        <div className="edu-why-grid">
          <div className="edu-why-item">
            <ShieldCheck size={20} className="edu-why-icon green" />
            <div>
              <strong>Segurança</strong>
              <p>Uma reserva de emergência evita que imprevistos virem dívidas. Quem não se prepara, paga juros.</p>
            </div>
          </div>
          <div className="edu-why-item">
            <TrendingUp size={20} className="edu-why-icon yellow" />
            <div>
              <strong>Crescimento</strong>
              <p>Investir mesmo R$200/mês com juros compostos pode gerar mais de R$240.000 em 20 anos.</p>
            </div>
          </div>
          <div className="edu-why-item">
            <Wallet size={20} className="edu-why-icon blue" />
            <div>
              <strong>Liberdade</strong>
              <p>Quem controla o dinheiro decide onde trabalhar, quando parar e como viver.</p>
            </div>
          </div>
          <div className="edu-why-item">
            <AlertTriangle size={20} className="edu-why-icon red" />
            <div>
              <strong>Realidade brasileira</strong>
              <p>
                O brasileiro endividado destina em média 30% da renda para quitar dívidas.{' '}
                <Fonte href="https://cndl.org.br/noticia/pesquisa-de-endividamento-e-inadimplencia-do-consumidor-peic/" label="CNDL 2024" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning path */}
      <div className="edu-path-card">
        <h3>Sua trilha de aprendizado</h3>
        <p className="edu-path-subtitle">Siga as seções em ordem para construir uma base sólida</p>
        <div className="edu-path-steps">
          {[
            { num: '1', label: 'Fundamentos',  desc: 'O que é gestão financeira, os 4 pilares e a regra 50-30-20', color: '#27AE60' },
            { num: '2', label: 'Direitos e Tributos', desc: 'CLT, holerite, IRPF, crédito, LGPD e Open Finance', color: '#2980B9' },
            { num: '3', label: 'Calculadoras', desc: 'Simule juros, metas, férias, parcelamento e investimentos',  color: '#F5A623' },
          ].map((s, i, arr) => (
            <div key={i} className="edu-path-step">
              <div className="edu-step-num" style={{ background: s.color }}>{s.num}</div>
              <div className="edu-step-info">
                <div className="edu-step-label">{s.label}</div>
                <div className="edu-step-desc">{s.desc}</div>
              </div>
              {i < arr.length - 1 && <div className="edu-step-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TAB 2 — FUNDAMENTOS
══════════════════════════════════════════════════════ */
export function EducationFundamentos() {
  return (
    <div className="education-page">
      <SectionHeader
        title="Fundamentos"
        subtitle="Os conceitos essenciais que toda pessoa deveria aprender antes dos 25 anos"
      />

      {/* O que é */}
      <div className="edu-concept-box">
        <h3>O que é gestão financeira?</h3>
        <p>
          Gestão financeira é o processo de <strong>planejar, organizar, controlar e monitorar</strong> os
          recursos financeiros pessoais ou familiares. Não se trata de ganhar mais — mas de fazer mais com
          o que você já ganha. Segundo o BCB (2023), o letramento financeiro inclui quatro dimensões:
          conhecimento, comportamento, atitude e bem-estar financeiro.{' '}
          <Fonte href="https://www.bcb.gov.br/estabilidadefinanceira/educacaofinanceira" label="BCB, 2023" />
        </p>
      </div>

      {/* 4 Pilares */}
      <h3 className="edu-subtitle">Os 4 Pilares das Finanças Pessoais</h3>
      <div className="pilares-grid">
        {[
          { icon: <BarChart2 size={22} />, color: '#27AE60', title: 'Orçamento', desc: 'Saber para onde vai cada real. Sem controle de gastos, nenhuma estratégia funciona. Registre toda receita e despesa.' },
          { icon: <ShieldCheck size={22} />, color: '#2980B9', title: 'Reserva de Emergência', desc: 'Entre 3 e 6 meses de despesas em investimento líquido (ex: Tesouro Selic). Protege contra imprevistos sem gerar dívidas.' },
          { icon: <AlertTriangle size={22} />, color: '#E74C3C', title: 'Eliminar Dívidas', desc: 'Dívida com juros altos (cartão, cheque especial) destrói patrimônio. Prioridade máxima antes de investir.' },
          { icon: <TrendingUp size={22} />, color: '#8E44AD', title: 'Investimentos', desc: 'Após a base estabelecida, fazer o dinheiro trabalhar por você. Começa com renda fixa e cresce conforme o perfil.' },
        ].map((p, i) => (
          <div key={i} className="pilar-card" style={{ borderTop: `3px solid ${p.color}` }}>
            <div className="pilar-icon" style={{ color: p.color, background: p.color + '15' }}>{p.icon}</div>
            <h4>{p.title}</h4>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Regra 50-30-20 */}
      <div className="rule-card">
        <div className="rule-header">
          <h3>A Regra 50-30-20</h3>
          <p>
            Um ponto de partida simples para distribuir a renda líquida mensal.{' '}
            <Fonte href="https://www.bcb.gov.br/estabilidadefinanceira/educacaofinanceira" label="BCB — Educação Financeira" />
          </p>
        </div>
        <div className="rule-visual">
          <div className="rule-bar">
            <div className="rule-segment" style={{ width: '50%', background: '#27AE60' }}>
              <span className="rule-pct">50%</span>
            </div>
            <div className="rule-segment" style={{ width: '30%', background: '#F5A623' }}>
              <span className="rule-pct">30%</span>
            </div>
            <div className="rule-segment" style={{ width: '20%', background: '#8E44AD' }}>
              <span className="rule-pct">20%</span>
            </div>
          </div>
          <div className="rule-legend">
            <div className="rule-legend-item">
              <span style={{ background: '#27AE60' }}></span>
              <div><strong>50% — Necessidades</strong><p>Moradia, alimentação, transporte, saúde, contas essenciais</p></div>
            </div>
            <div className="rule-legend-item">
              <span style={{ background: '#F5A623' }}></span>
              <div><strong>30% — Estilo de vida</strong><p>Lazer, restaurantes, assinaturas, compras não essenciais</p></div>
            </div>
            <div className="rule-legend-item">
              <span style={{ background: '#8E44AD' }}></span>
              <div><strong>20% — Futuro</strong><p>Poupança, investimentos, quitação de dívidas extras</p></div>
            </div>
          </div>
        </div>
        <div className="rule-note">
          Adapte conforme sua realidade. Endividados devem direcionar mais que 20% para quitar dívidas.
          A regra é um guia, não uma lei.
        </div>
      </div>

      {/* Juros compostos */}
      <div className="edu-concept-box">
        <h3>Juros compostos: seu maior aliado e seu maior inimigo</h3>
        <div className="juros-comparison">
          <div className="juros-col green">
            <div className="juros-col-title">Como aliado (investindo)</div>
            <p>R$500/mês investidos a 1% a.m. por 10 anos = <strong>R$115.017</strong></p>
            <p>Você depositou R$60.000. Os juros renderam R$55.017 — quase o dobro.</p>
            <p style={{ fontSize: 11, color: '#16a34a', marginTop: 4 }}>
              Calculado com fórmula M = PMT × ((1+i)ⁿ − 1)/i.{' '}
              <Fonte href="https://www.tesourodireto.com.br/simulador" label="Tesouro Direto — Simulador" />
            </p>
          </div>
          <div className="juros-col red">
            <div className="juros-col-title">Como inimigo (endividado)</div>
            <p>R$1.000 no rotativo do cartão (<strong>até 400% a.a.</strong>) em 6 meses = <strong>R$2.313</strong></p>
            <p>Você pagou 131% a mais pelo mesmo valor. Juros sobre juros destroem patrimônio.</p>
            <p style={{ fontSize: 11, color: '#991b1b', marginTop: 4 }}>
              <Fonte href="https://www.bcb.gov.br/estatisticas/txjuros" label="BCB — Taxas de Juros de Mercado" />
            </p>
          </div>
        </div>
      </div>

      {/* Accordion */}
      <AccordionList items={[
        {
          title: 'Como montar seu fundo de emergência',
          content: (
            <div className="accordion-body">
              <p>O fundo de emergência é a base de qualquer planejamento financeiro. Sem ele, qualquer imprevisto vira dívida.</p>
              <ul>
                <li><strong>Meta mínima:</strong> 3 meses de despesas mensais para quem tem renda fixa CLT <Fonte href="https://www.bcb.gov.br/estabilidadefinanceira/educacaofinanceira" label="BCB" /></li>
                <li><strong>Meta ideal:</strong> 6 meses para CLT ou 12 meses para autônomos/profissionais liberais</li>
                <li><strong>Onde guardar:</strong> Tesouro Selic (liquidez D+1) ou CDB com liquidez diária de banco sólido</li>
                <li><strong>Como construir:</strong> Comece com R$500 como primeira meta. Depois aumente gradualmente</li>
                <li><strong>Não use para:</strong> Oportunidades de investimento, viagens, presentes. É reserva de emergência, não fundo de oportunidades</li>
              </ul>
            </div>
          ),
        },
        {
          title: 'Método para sair das dívidas: Bola de Neve vs Avalanche',
          content: (
            <div className="accordion-body">
              <div className="two-col">
                <div>
                  <strong>Bola de Neve (Snowball)</strong>
                  <p>Pague o mínimo em todas as dívidas e concentre o máximo na <em>menor dívida</em>. Ao quitá-la, use o valor liberado para a próxima.</p>
                  <p>Vantagem: motivação psicológica — você vê dívidas sendo eliminadas rapidamente.</p>
                </div>
                <div>
                  <strong>Avalanche</strong>
                  <p>Pague o mínimo em todas e concentre na dívida com <em>maior taxa de juros</em>.</p>
                  <p>Vantagem: matematicamente mais eficiente — você paga menos juros no total.</p>
                </div>
              </div>
              <div className="edu-tip">
                Evite rotativo do cartão (até <strong>400% a.a.</strong> <Fonte href="https://www.bcb.gov.br/estatisticas/txjuros" label="BCB" />) e cheque especial. Negocie com o credor ou use o Serasa Limpa Nome.
              </div>
            </div>
          ),
        },
        {
          title: 'O papel do orçamento mensal',
          content: (
            <div className="accordion-body">
              <p>O orçamento não é uma prisão — é um mapa. Ele mostra onde você está e para onde está indo.</p>
              <ul>
                <li>Liste todas as receitas (salário, freelance, aluguéis, etc.)</li>
                <li>Categorize todas as despesas (fixas: aluguel, condomínio; variáveis: alimentação, lazer)</li>
                <li>Calcule o saldo: se negativo, identifique onde cortar</li>
                <li>Defina metas de economia e acompanhe semanalmente</li>
              </ul>
              <p>A Orbees faz isso automaticamente ao importar seu extrato bancário.</p>
            </div>
          ),
        },
      ]} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TAB 3 — DIREITOS E TRIBUTOS
══════════════════════════════════════════════════════ */
export function EducationDireitos() {
  return (
    <div className="education-page">
      <SectionHeader
        title="Direitos e Tributos"
        subtitle="Legislação trabalhista, tributação, crédito e proteção de dados financeiros"
      />

      <div className="vida-topics-grid">
        <div className="vida-topic-badge green"><CheckCircle size={14} /> CLT &amp; Direitos</div>
        <div className="vida-topic-badge blue"><BarChart2 size={14} /> IRPF</div>
        <div className="vida-topic-badge yellow"><AlertTriangle size={14} /> Crédito &amp; Score</div>
        <div className="vida-topic-badge purple"><Clock size={14} /> Autônomos</div>
        <div className="vida-topic-badge gray"><Lock size={14} /> LGPD &amp; Open Finance</div>
      </div>

      <AccordionList items={[
        {
          title: 'Como ler seu Holerite (Contracheque)',
          content: (
            <div className="accordion-body">
              <p>
                O holerite discrimina sua remuneração e todos os descontos. Guarde-os — são documentos essenciais.{' '}
                <Fonte href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" label="CLT, Art. 464" />
              </p>
              <div className="holerite-table">
                <div className="holerite-row header"><span>Item</span><span>O que é</span></div>
                <div className="holerite-row green"><span>Salário base</span><span>Valor contratado em sua CTPS</span></div>
                <div className="holerite-row green"><span>Hora extra / Adicional</span><span>Trabalho além da jornada, periculosidade, insalubridade</span></div>
                <div className="holerite-row red">
                  <span>INSS</span>
                  <span>
                    7,5% a 14% progressivo sobre o salário bruto{' '}
                    <Fonte href="https://www.gov.br/previdencia/pt-br/assuntos/previdencia-social/contribuicoes/tabela-de-contribuicao-mensal" label="MPS — Tabela INSS" />
                  </span>
                </div>
                <div className="holerite-row red">
                  <span>IRRF</span>
                  <span>
                    Imposto de Renda retido na fonte (tabela progressiva até 27,5%){' '}
                    <Fonte href="https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas" label="Receita Federal" />
                  </span>
                </div>
                <div className="holerite-row red"><span>Vale-transporte</span><span>Desconto de até 6% do salário bruto</span></div>
                <div className="holerite-row highlight"><span>Salário líquido</span><span>O que cai na sua conta</span></div>
              </div>
            </div>
          ),
        },
        {
          title: 'Direitos trabalhistas CLT: Férias, 13°, FGTS',
          content: (
            <div className="accordion-body">
              <div className="direitos-grid">
                <div className="direito-item">
                  <strong>Férias</strong>
                  <p>
                    30 dias após 12 meses de trabalho (período aquisitivo). Recebe o salário + ⅓ constitucional obrigatório. Pode vender até 10 dias (abono pecuniário).{' '}
                    <Fonte href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" label="CLT, Art. 129–153" />
                  </p>
                </div>
                <div className="direito-item">
                  <strong>13° Salário</strong>
                  <p>
                    Pago em duas parcelas: até 30/11 (1ª) e até 20/12 (2ª). Proporcional ao tempo trabalhado no ano. Incide INSS e IRRF na 2ª parcela.{' '}
                    <Fonte href="https://www.planalto.gov.br/ccivil_03/leis/l4090.htm" label="Lei 4.090/1962" />
                  </p>
                </div>
                <div className="direito-item">
                  <strong>FGTS</strong>
                  <p>
                    <strong>8%</strong> do salário bruto depositado mensalmente pelo empregador. Pode sacar em demissão sem justa causa, compra de imóvel, aposentadoria e situações específicas.{' '}
                    <Fonte href="https://www.caixa.gov.br/beneficios-trabalhador/fgts/Pages/default.aspx" label="Caixa — FGTS" />
                  </p>
                </div>
                <div className="direito-item">
                  <strong>Rescisão sem justa causa</strong>
                  <p>
                    Aviso prévio (30 dias + 3 por ano trabalhado), saldo de salário, férias prop. + ⅓, 13° prop., FGTS + multa de <strong>40%</strong> sobre o saldo.{' '}
                    <Fonte href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" label="CLT, Art. 477–481" />
                  </p>
                </div>
              </div>
              <div className="edu-tip">Use a Calculadora de Férias CLT na aba Calculadoras para simular seus valores exatos.</div>
            </div>
          ),
        },
        {
          title: 'IRPF — Imposto de Renda Pessoa Física',
          content: (
            <div className="accordion-body">
              <AccordionList items={[
                {
                  title: 'Quem é obrigado a declarar?',
                  content: (
                    <p>
                      Deve declarar quem recebeu rendimentos tributáveis acima de <strong>R$30.639,90</strong> no ano;
                      rendimentos isentos acima de R$200.000; ganho de capital ou operações na Bolsa;
                      bens e direitos acima de R$800.000; ou passou à condição de residente no Brasil.{' '}
                      <Fonte href="https://www.gov.br/receitafederal/pt-br/assuntos/imposto-sobre-a-renda-da-pessoa-fisica" label="Receita Federal — IRPF 2024" />
                    </p>
                  ),
                },
                {
                  title: 'Simplificada vs Completa',
                  content: (
                    <p>
                      <strong>Simplificada:</strong> desconto padrão de 20% (limitado a <strong>R$16.754,34</strong>).{' '}
                      <strong>Completa:</strong> deduz despesas reais de saúde (sem limite), educação (até <strong>R$3.561,50</strong>/pessoa/ano),
                      dependentes (<strong>R$2.275,08</strong>/ano cada) e previdência PGBL (até <strong>12%</strong> da renda bruta anual).
                      O programa da Receita indica a mais vantajosa automaticamente.{' '}
                      <Fonte href="https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas" label="Receita Federal — Tabelas 2024" />
                    </p>
                  ),
                },
                {
                  title: 'Tabela progressiva 2024',
                  content: (
                    <div className="irpf-mini-tabela">
                      {[
                        { faixa: 'Até R$2.259,20/mês', aliquota: 'Isento', color: '#27AE60' },
                        { faixa: 'R$2.259,21 – R$2.826,65', aliquota: '7,5%', color: '#8BC34A' },
                        { faixa: 'R$2.826,66 – R$3.751,05', aliquota: '15%', color: '#FFC107' },
                        { faixa: 'R$3.751,06 – R$4.664,68', aliquota: '22,5%', color: '#FF9800' },
                        { faixa: 'Acima de R$4.664,68', aliquota: '27,5%', color: '#E74C3C' },
                      ].map((f, i) => (
                        <div key={i} className="irpf-mini-row">
                          <span>{f.faixa}</span>
                          <span style={{ color: f.color, fontWeight: 700 }}>{f.aliquota}</span>
                        </div>
                      ))}
                      <div style={{ padding: '8px 12px', fontSize: 11, color: 'var(--gray-500)' }}>
                        Fonte: <a href="https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas" target="_blank" rel="noopener noreferrer" className="edu-fonte-inline">Receita Federal — Tabela Progressiva Mensal 2024 ↗</a>
                      </div>
                      <div className="edu-tip" style={{ marginTop: 4 }}>Use o Simulador IRPF na aba Calculadoras para estimar seu imposto.</div>
                    </div>
                  ),
                },
                {
                  title: 'Prazos, restituição e multas',
                  content: (
                    <p>
                      Entrega entre <strong>março e maio</strong> pelo app Meu Imposto de Renda ou programa IRPF.
                      Restituição em lotes (junho–dezembro): quem entrega primeiro recebe antes.
                      Atraso: multa de <strong>1% ao mês</strong> sobre o imposto, mínimo <strong>R$165,74</strong>.
                      CPF irregular bloqueia passaporte, certidões e operações bancárias.{' '}
                      <Fonte href="https://www.gov.br/receitafederal/pt-br/assuntos/imposto-sobre-a-renda-da-pessoa-fisica" label="Receita Federal — IRPF" />
                    </p>
                  ),
                },
              ]} />
            </div>
          ),
        },
        {
          title: 'Carnê-Leão — Para Autônomos e Freelancers',
          content: (
            <div className="accordion-body">
              <p>
                O Carnê-Leão é o recolhimento <strong>mensal obrigatório</strong> do IR para quem recebe
                de pessoa física ou do exterior sem retenção na fonte.{' '}
                <Fonte href="https://www.gov.br/receitafederal/pt-br/assuntos/imposto-sobre-a-renda-da-pessoa-fisica/carne-leao" label="Receita Federal — Carnê-Leão" />
              </p>
              <ul>
                <li>Aplica-se a: freelancers, autônomos, profissionais liberais, aluguéis recebidos de pessoa física</li>
                <li>Prazo: até o último dia útil do mês seguinte ao recebimento</li>
                <li>Isento: valores até <strong>R$2.259,20/mês</strong> <Fonte href="https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas" label="Tabela 2024" /></li>
                <li>Como pagar: programa Carnê-Leão (Receita Federal) → gera DARF</li>
                <li>Não recolher: multa de <strong>0,33% ao dia</strong> + juros SELIC <Fonte href="https://www.gov.br/receitafederal/pt-br/assuntos/imposto-sobre-a-renda-da-pessoa-fisica/carne-leao" label="RFB" /></li>
              </ul>
              <div className="edu-tip">Guarde todos os recibos de serviço prestado. São necessários para a declaração anual.</div>
            </div>
          ),
        },
        {
          title: 'Crédito, Score e como evitar armadilhas',
          content: (
            <div className="accordion-body">
              <div className="two-col">
                <div>
                  <strong>Como funciona o Score</strong>
                  <p>
                    O score de crédito (<strong>0 a 1000</strong>) indica a probabilidade de pagar contas em dia.
                    Bureaus como Serasa e SPC calculam com base em: pagamentos em dia, tempo de relacionamento
                    com o mercado, quantidade de dívidas e consultas ao CPF.{' '}
                    <Fonte href="https://www.serasa.com.br/score/" label="Serasa Score" />
                  </p>
                  <ul>
                    <li>0–300: Muito baixo</li>
                    <li>301–500: Baixo</li>
                    <li>501–700: Bom</li>
                    <li>701–1000: Excelente</li>
                  </ul>
                </div>
                <div>
                  <strong>Armadilhas do crédito</strong>
                  <ul>
                    <li>
                      <strong>Rotativo do cartão:</strong> até <strong>400% a.a.</strong> <Fonte href="https://www.bcb.gov.br/estatisticas/txjuros" label="BCB" /> — nunca pague só o mínimo
                    </li>
                    <li><strong>Cheque especial:</strong> taxa similar ao rotativo. Use apenas em emergências extremas</li>
                    <li><strong>Parcelamento com juros:</strong> veja o custo total, não apenas a parcela</li>
                    <li><strong>Empréstimo para pagar dívida:</strong> só vale se a nova taxa for menor que a dívida atual</li>
                  </ul>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: 'LGPD e Open Finance — seus dados financeiros',
          content: (
            <div className="accordion-body">
              <div className="two-col">
                <div>
                  <strong>
                    LGPD{' '}
                    <Fonte href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" label="Lei 13.709/2018" />
                  </strong>
                  <p>A Lei Geral de Proteção de Dados garante controle sobre seus dados pessoais. No contexto financeiro:</p>
                  <ul>
                    <li>Bancos e fintechs precisam de consentimento explícito para usar seus dados</li>
                    <li>Você pode solicitar exclusão, correção e portabilidade dos seus dados</li>
                    <li>Violações geram multas de até <strong>2% do faturamento</strong> (máx. R$50 milhões por infração) <Fonte href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" label="Art. 52, LGPD" /></li>
                  </ul>
                </div>
                <div>
                  <strong>
                    Open Finance Brasil{' '}
                    <Fonte href="https://www.bcb.gov.br/estabilidadefinanceira/openfinance" label="BCB — Open Finance" />
                  </strong>
                  <p>Sistema regulado pelo BCB que permite compartilhar dados financeiros entre instituições de forma segura:</p>
                  <ul>
                    <li>Você autoriza quais dados compartilha e com quem</li>
                    <li>Permite comparar produtos (crédito, seguros) entre bancos</li>
                    <li>Facilita portabilidade de salário e de crédito</li>
                    <li>Sempre sob seu controle — você pode revogar a qualquer momento</li>
                  </ul>
                </div>
              </div>
            </div>
          ),
        },
      ]} />

      {/* Sources */}
      <div className="edu-sources">
        <h4>Referências desta seção</h4>
        <ul>
          <li>Banco Central do Brasil. <em>Educação Financeira.</em> <a href="https://www.bcb.gov.br/estabilidadefinanceira/educacaofinanceira" target="_blank" rel="noopener noreferrer">bcb.gov.br ↗</a></li>
          <li>Receita Federal do Brasil. <em>Imposto de Renda Pessoa Física — Tabelas 2024.</em> <a href="https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas" target="_blank" rel="noopener noreferrer">gov.br/receitafederal ↗</a></li>
          <li>Decreto-Lei n.º 5.452/1943 — Consolidação das Leis do Trabalho (CLT). <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="noopener noreferrer">planalto.gov.br ↗</a></li>
          <li>Lei n.º 13.709/2018 — Lei Geral de Proteção de Dados (LGPD). <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank" rel="noopener noreferrer">planalto.gov.br ↗</a></li>
          <li>Caixa Econômica Federal. <em>FGTS — Fundo de Garantia por Tempo de Serviço.</em> <a href="https://www.caixa.gov.br/beneficios-trabalhador/fgts/Pages/default.aspx" target="_blank" rel="noopener noreferrer">caixa.gov.br ↗</a></li>
          <li>Banco Central do Brasil. <em>Open Finance Brasil.</em> <a href="https://www.bcb.gov.br/estabilidadefinanceira/openfinance" target="_blank" rel="noopener noreferrer">bcb.gov.br ↗</a></li>
          <li>Serasa. <em>Serasa Score.</em> <a href="https://www.serasa.com.br/score/" target="_blank" rel="noopener noreferrer">serasa.com.br ↗</a></li>
          <li>BCB. <em>Taxas de Operações de Crédito.</em> <a href="https://www.bcb.gov.br/estatisticas/txjuros" target="_blank" rel="noopener noreferrer">bcb.gov.br ↗</a></li>
        </ul>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TAB 4 — CALCULADORAS
══════════════════════════════════════════════════════ */
const CALC_LIST = [
  { id: 'simples',       label: 'Juros Simples',              formula: 'M = C × (1 + i × t)' },
  { id: 'compostos',     label: 'Juros Compostos',            formula: 'M = C × (1 + i)ⁿ' },
  { id: 'ferias',        label: 'Férias CLT',                 formula: 'Férias + ⅓ + Abono' },
  { id: 'parcelamento',  label: 'Custo do Parcelamento',      formula: 'Total = PMT × n' },
  { id: 'metas',         label: 'Metas de Poupança',          formula: '(Meta − Atual) ÷ Meses' },
  { id: 'dividas',       label: 'Quitação de Dívidas',        formula: 'Bola de Neve / Avalanche' },
  { id: 'investimentos', label: 'Comparador de Investimentos', formula: 'M = C × (1 + i)ⁿ' },
  { id: 'irpf',          label: 'Simulador IRPF',             formula: 'Base − Deduções → IR' },
];

export function EducationCalculadoras() {
  const [active, setActive] = useState('simples');

  function renderCalc() {
    switch (active) {
      case 'simples':       return <SimpleInterest />;
      case 'compostos':     return <CompoundInterest />;
      case 'ferias':        return <FeriasCalc />;
      case 'parcelamento':  return <ParcelamentoCalc />;
      case 'metas':         return <MetaCalc />;
      case 'dividas':       return <DividasCalc />;
      case 'investimentos': return <ComparadorInvest />;
      case 'irpf':          return <IrpfSimuladorCalc />;
      default:              return null;
    }
  }

  return (
    <div className="education-page">
      <SectionHeader title="Calculadoras" subtitle="Simule cenários reais e tome decisões com números, não com achismos" />
      <div className="calc-layout">
        <nav className="calc-sidebar">
          {CALC_LIST.map(c => (
            <button
              key={c.id}
              className={`calc-nav-item${active === c.id ? ' active' : ''}`}
              onClick={() => setActive(c.id)}
            >
              <div className="calc-nav-label">{c.label}</div>
              <div className="calc-nav-formula">{c.formula}</div>
            </button>
          ))}
        </nav>
        <div className="calc-panel">
          {renderCalc()}
        </div>
      </div>
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
          <div className="result-item"><span>Aportes totais</span><span className="result-value">{fmt(PMT * n)}</span></div>
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
    <CalcCard title="Cálculo de Férias (CLT)" formula="Férias + ⅓ + Abono" description="Calcule seus direitos conforme a CLT, incluindo o terço constitucional obrigatório.">
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

function DividasCalc() {
  const [dividas, setDividas] = useState([{ nome: '', saldo: '', taxa: '', minimo: '' }]);
  const [extra, setExtra] = useState('');
  const [metodo, setMetodo] = useState<'snowball' | 'avalanche'>('avalanche');
  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const addDivida = () => setDividas([...dividas, { nome: '', saldo: '', taxa: '', minimo: '' }]);
  const updDivida = (i: number, field: string, val: string) => {
    const updated = [...dividas];
    (updated[i] as any)[field] = val;
    setDividas(updated);
  };

  const valid = dividas.filter(d => d.saldo && d.taxa && d.minimo);
  const totalDivida = valid.reduce((s, d) => s + Number(d.saldo), 0);
  const totalMinimo = valid.reduce((s, d) => s + Number(d.minimo), 0);
  const pagamentoTotal = totalMinimo + Number(extra);

  const ordered = [...valid].sort((a, b) =>
    metodo === 'snowball'
      ? Number(a.saldo) - Number(b.saldo)
      : Number(b.taxa) - Number(a.taxa)
  );

  return (
    <CalcCard
      title="Simulador de Quitação de Dívidas"
      formula={metodo === 'snowball' ? 'Bola de Neve' : 'Avalanche'}
      description="Compare os métodos Avalanche (menor custo total) e Bola de Neve (maior motivação) para sair das dívidas."
    >
      <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-600)' }}>MÉTODO:</span>
          <button
            className={`tx-type-pill${metodo === 'avalanche' ? ' active' : ''}`}
            onClick={() => setMetodo('avalanche')}
          >Avalanche (maior juros primeiro)</button>
          <button
            className={`tx-type-pill${metodo === 'snowball' ? ' active' : ''}`}
            onClick={() => setMetodo('snowball')}
          >Bola de Neve (menor saldo primeiro)</button>
        </div>

        {dividas.map((d, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 8, alignItems: 'end' }}>
            <div className="calc-field">
              <label>Nome da dívida</label>
              <input className="calc-input" value={d.nome} onChange={e => updDivida(i, 'nome', e.target.value)} placeholder="Ex: Cartão Nubank" />
            </div>
            <div className="calc-field">
              <label>Saldo (R$)</label>
              <input type="number" className="calc-input" value={d.saldo} onChange={e => updDivida(i, 'saldo', e.target.value)} placeholder="Ex: 3000" />
            </div>
            <div className="calc-field">
              <label>Taxa (% a.m.)</label>
              <input type="number" className="calc-input" value={d.taxa} onChange={e => updDivida(i, 'taxa', e.target.value)} placeholder="Ex: 15" />
            </div>
            <div className="calc-field">
              <label>Mín. mensal (R$)</label>
              <input type="number" className="calc-input" value={d.minimo} onChange={e => updDivida(i, 'minimo', e.target.value)} placeholder="Ex: 150" />
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={addDivida} style={{ fontSize: 12, padding: '6px 12px', border: '1px dashed var(--gray-300)', borderRadius: 6, background: 'none', cursor: 'pointer', color: 'var(--gray-600)' }}>
            + Adicionar dívida
          </button>
          <div className="calc-field" style={{ flex: 1, minWidth: 180 }}>
            <label>Valor extra por mês além dos mínimos (R$)</label>
            <input type="number" className="calc-input" value={extra} onChange={e => setExtra(e.target.value)} placeholder="Ex: 500" />
          </div>
        </div>
      </div>
      {valid.length > 0 && (
        <div className="calc-result">
          <div className="result-item"><span>Total de dívidas</span><span className="result-value red">{fmt(totalDivida)}</span></div>
          <div className="result-item"><span>Pagamento mínimo total</span><span className="result-value">{fmt(totalMinimo)}</span></div>
          <div className="result-item highlight"><span>Pagamento mensal total</span><span className="result-value yellow">{fmt(pagamentoTotal)}</span></div>
          <div style={{ padding: '10px 0 2px', fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            Ordem de prioridade — {metodo === 'avalanche' ? 'Avalanche' : 'Bola de Neve'}
          </div>
          {ordered.map((d, i) => (
            <div key={i} className="result-item" style={{ paddingLeft: 8 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 20, height: 20, background: i === 0 ? 'var(--yellow)' : 'var(--gray-200)', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{i + 1}</span>
                {d.nome || `Dívida ${i + 1}`}
              </span>
              <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>
                {fmt(Number(d.saldo))} · {d.taxa}% a.m.
                {i === 0 && <span style={{ marginLeft: 6, background: 'var(--yellow)', padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 700 }}>FOCO</span>}
              </span>
            </div>
          ))}
        </div>
      )}
    </CalcCard>
  );
}

function ComparadorInvest() {
  const [valor, setValor] = useState('');
  const [meses, setMeses] = useState('');
  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const V = Number(valor); const n = Number(meses);

  const investimentos = [
    { nome: 'Poupança', taxa: 0.5, cor: '#95A5A6', nota: 'Rendimento atual: ~0,5% a.m. (abaixo da inflação)' },
    { nome: 'Tesouro Selic', taxa: 0.88, cor: '#27AE60', nota: 'Liquidez diária. Referência: SELIC ~10,5% a.a.' },
    { nome: 'CDB 100% CDI', taxa: 0.88, cor: '#2980B9', nota: 'Semelhante ao Tesouro Selic. Depende do banco.' },
    { nome: 'LCI / LCA', taxa: 0.80, cor: '#8E44AD', nota: 'Isento de IR para PF. Taxa líquida equivalente.' },
    { nome: 'CDB 120% CDI', taxa: 1.05, cor: '#E67E22', nota: 'Prazo mais longo, carência. Retorno superior.' },
  ];

  return (
    <CalcCard title="Comparador de Investimentos" formula="M = C × (1 + i)ⁿ" description="Compare o rendimento estimado entre diferentes tipos de investimento de renda fixa.">
      <div className="calc-inputs">
        <CalcField label="Valor a Investir (R$)" value={valor} onChange={setValor} placeholder="Ex: 10000" />
        <CalcField label="Prazo (meses)" value={meses} onChange={setMeses} placeholder="Ex: 12" />
      </div>
      {V > 0 && n > 0 && (
        <div className="calc-result">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {investimentos.map((inv, i) => {
              const montante = V * Math.pow(1 + inv.taxa / 100, n);
              const rendimento = montante - V;
              return (
                <div key={i} className="invest-compare-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: inv.cor, flexShrink: 0 }}></span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{inv.nome}</div>
                      <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>{inv.nota}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: inv.cor }}>{fmt(montante)}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>+{fmt(rendimento)}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="result-item" style={{ marginTop: 4 }}>
            <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>
              * Taxas estimadas com base na SELIC vigente. Consulte as taxas reais.{' '}
              <a href="https://www.bcb.gov.br/estatisticas/txjuros" target="_blank" rel="noopener noreferrer" className="edu-fonte-inline">BCB — Taxas de Mercado ↗</a>
              {' '}IR não considerado na Poupança, LCI e LCA (isentos para PF).
            </span>
          </div>
        </div>
      )}
    </CalcCard>
  );
}

function IrpfSimuladorCalc() {
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
    <CalcCard
      title="Simulador IRPF"
      formula="Base de Cálculo − Deduções"
      description="Estime seu imposto anual e veja qual tipo de declaração é mais vantajosa. Valores baseados na tabela progressiva 2024."
    >
      <div className="calc-inputs">
        <CalcField label="Salário Bruto Mensal (R$)" value={renda} onChange={setRenda} placeholder="Ex: 5000" />
        <CalcField label="Despesas de Saúde no Ano (R$)" value={saude} onChange={setSaude} placeholder="Ex: 3600" />
        <CalcField label="Despesas de Educação no Ano (R$)" value={educacao} onChange={setEducacao} placeholder="Limite: R$3.561,50" />
        <CalcField label="Número de Dependentes" value={dependentes} onChange={setDependentes} placeholder="Ex: 1" />
        <CalcField label="Previdência Privada Mensal (R$)" value={previdencia} onChange={setPrevidencia} placeholder="Ex: 300" />
      </div>
      {irCompleta !== null && irSimplificada !== null && (
        <div className="calc-result">
          <div className={`result-item ${melhor === 'completa' ? 'highlight' : ''}`}>
            <span>Declaração Completa {melhor === 'completa' ? '✓ Recomendada' : ''}</span>
            <span className="result-value">{fmt(irCompleta)}</span>
          </div>
          <div className={`result-item ${melhor === 'simplificada' ? 'highlight' : ''}`}>
            <span>Declaração Simplificada {melhor === 'simplificada' ? '✓ Recomendada' : ''}</span>
            <span className="result-value">{fmt(irSimplificada)}</span>
          </div>
          <div className="result-item">
            <span>Alíquota efetiva (completa)</span>
            <span className="result-value yellow">{rendaAnual ? ((irCompleta / rendaAnual) * 100).toFixed(1) + '%' : '—'}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--gray-400)', paddingTop: 8 }}>
            Tabela progressiva mensal 2024.{' '}
            <a href="https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas" target="_blank" rel="noopener noreferrer" className="edu-fonte-inline">Receita Federal ↗</a>
          </div>
        </div>
      )}
    </CalcCard>
  );
}

/* ─── Backward compat ─── */
export function EducationVidaAdulta() { return <EducationDireitos />; }
export function EducationIrpf() { return <EducationDireitos />; }
export function EducationGuias() { return <EducationFundamentos />; }
export function EducationInvestimentos() { return <EducationCalculadoras />; }
