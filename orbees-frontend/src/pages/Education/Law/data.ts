export const LAW_CALLOUT = {
  title: "Por que você precisa entender seus direitos financeiros?",
  body: [
    {
      text: "Conhecer a legislação que rege seu salário, impostos e crédito é a diferença entre pagar o justo e pagar a mais. A taxa média de juros cobrada dos consumidores brasileiros atingiu ",
    },
    { text: "58,32% a.a.", bold: true },
    { text: " em 2025 — e o cartão de crédito responde por " },
    { text: "63,6%", bold: true },
    { text: " das dívidas das famílias." },
  ],
  inlineSource: "PEIC, 2025",
  suffix:
    "Entender CLT, IRPF e crédito protege seu patrimônio e evita armadilhas legais.",
  source: "PEIC, 2025",
  sourceUrl: "https://www.cndl.org.br",
};

export interface FilterPill {
  id: string;
  label: string;
  icon: string;
  color: string;
  accordionIds: string[];
}

export const FILTER_PILLS: FilterPill[] = [
  {
    id: "clt",
    label: "CLT & Direitos",
    icon: "CheckCircle",
    color: "#22c55e",
    accordionIds: ["holerite", "clt"],
  },
  {
    id: "credit",
    label: "Crédito & Score",
    icon: "AlertTriangle",
    color: "#f59e0b",
    accordionIds: ["credit"],
  },
  {
    id: "lgpd",
    label: "LGPD & Open Finance",
    icon: "Lock",
    color: "#6b7280",
    accordionIds: ["lgpd"],
  },
];

export interface LawAccordion {
  id: string;
  title: string;
}

export const LAW_ACCORDIONS: LawAccordion[] = [
  { id: "holerite", title: "Como ler seu Holerite (Contracheque)" },
  { id: "clt", title: "Direitos trabalhistas CLT: Férias, 13º, FGTS" },
  { id: "credit", title: "Crédito, Score e como evitar armadilhas" },
  { id: "lgpd", title: "LGPD e Open Finance — seus dados financeiros" },
];

export interface HoleriteRow {
  item: string;
  description: string;
  type: "income" | "deduction" | "total" | "neutral";
  source?: string;
}

export const HOLERITE_ROWS: HoleriteRow[] = [
  {
    item: "Salário base",
    description: "Valor contratado em sua CTPS",
    type: "income",
  },
  {
    item: "Hora extra / Adicional",
    description: "Trabalho além da jornada, periculosidade, insalubridade",
    type: "income",
  },
  {
    item: "INSS",
    description: "7,5% a 14% progressivo sobre o salário bruto",
    type: "deduction",
    source: "MPS — Tabela INSS",
  },
  {
    item: "IRRF",
    description:
      "Imposto de Renda retido na fonte (tabela progressiva até 27,5%)",
    type: "deduction",
    source: "Receita Federal",
  },
  {
    item: "Vale-transporte",
    description: "Desconto de até 6% do salário bruto",
    type: "deduction",
  },
  {
    item: "Salário líquido",
    description: "O que cai na sua conta",
    type: "total",
  },
];

export interface CltCard {
  title: string;
  description: string;
  source: string;
  bold?: string;
}

export const CLT_CARDS: CltCard[] = [
  {
    title: "Férias",
    description:
      "30 dias após 12 meses de trabalho (período aquisitivo). Recebe o salário + ⅓ constitucional obrigatório. Pode vender até 10 dias (abono pecuniário).",
    source: "CLT, Art. 129–153",
  },
  {
    title: "13º Salário",
    description:
      "Pago em duas parcelas: até 30/11 (1ª) e até 20/12 (2ª). Proporcional ao tempo trabalhado no ano. Incide INSS e IRRF na 2ª parcela.",
    source: "Lei 4.090/1962",
  },
  {
    title: "FGTS",
    description:
      "8% do salário bruto depositado mensalmente pelo empregador. Pode sacar em demissão sem justa causa, compra de imóvel, aposentadoria e situações específicas.",
    source: "Caixa — FGTS",
  },
  {
    title: "Rescisão sem justa causa",
    description:
      "Aviso prévio (30 dias + 3 por ano trabalhado), saldo de salário, férias prop. + ⅓, 13º prop., FGTS + multa de 40% sobre o saldo.",
    source: "CLT, Art. 477–481",
    bold: "40%",
  },
];

export interface Reference {
  author: string;
  title: string;
  url: string;
  display: string;
}

export const LAW_REFERENCES: Reference[] = [
  {
    author: "Banco Central do Brasil.",
    title: "Educação Financeira.",
    url: "https://www.bcb.gov.br/meubolso",
    display: "bcb.gov.br",
  },
  {
    author: "Receita Federal do Brasil.",
    title: "Imposto de Renda Pessoa Física — Tabelas 2024.",
    url: "https://www.gov.br/receitafederal",
    display: "gov.br/receitafederal",
  },
  {
    author: "Decreto-Lei n.º 5.452/1943 —",
    title: "Consolidação das Leis do Trabalho (CLT).",
    url: "https://www.planalto.gov.br",
    display: "planalto.gov.br",
  },
  {
    author: "Lei n.º 13.709/2018 —",
    title: "Lei Geral de Proteção de Dados (LGPD).",
    url: "https://www.planalto.gov.br",
    display: "planalto.gov.br",
  },
  {
    author: "Caixa Econômica Federal.",
    title: "FGTS — Fundo de Garantia por Tempo de Serviço.",
    url: "https://www.caixa.gov.br",
    display: "caixa.gov.br",
  },
  {
    author: "Banco Central do Brasil.",
    title: "Open Finance Brasil.",
    url: "https://openfinancebrasil.org.br",
    display: "bcb.gov.br",
  },
  {
    author: "Serasa.",
    title: "Serasa Score.",
    url: "https://www.serasa.com.br/score",
    display: "serasa.com.br",
  },
  {
    author: "BCB.",
    title: "Taxas de Operações de Crédito.",
    url: "https://www.bcb.gov.br/estatisticas/txjuros",
    display: "bcb.gov.br",
  },
];
