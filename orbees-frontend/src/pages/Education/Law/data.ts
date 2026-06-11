export const LAW_CALLOUT = {
  title: "Por que você precisa entender seus direitos financeiros?",
  body: [
    {
      text: "Conhecer a legislação que rege salário, tributos, contratos e operações de crédito ajuda a tomar decisões mais seguras e evitar custos desnecessários. Em 2025, a taxa média de juros do crédito livre para pessoas físicas permaneceu próxima de ",
    },
    { text: "58% ao ano", bold: true },
    {
      text: ", segundo o Banco Central do Brasil. Entender temas como direitos trabalhistas, imposto de renda e crédito é ",
    },
    { text: "fundamental ", bold: true },
    {
      text: "para proteger seu patrimônio e planejar melhor seu futuro financeiro.",
    },
  ],
  inlineSource: "BCB, 2025",
  suffix:
    "Entender CLT, IRPF e crédito protege seu patrimônio e evita armadilhas legais.",
  source: "Estatíticas Monetárias e de Crédito. - 2025",
  sourceUrl:
    "https://www.bcb.gov.br/content/estatisticas/hist_estatisticasmonetariascredito/202506_Texto_de_estatisticas_monetarias_e_de_credito.pdf",
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
    description: "Valor contratado em sua Carteira de Trabalho e Previdência",
    type: "income",
    source: "Art. 464 - DL5452",
  },
  {
    item: "Hora extra",
    description: "Adicional mínimo de 50%.",
    type: "income",
    source: "Art. 59 - DL5452",
  },
  {
    item: "Adicional",
    description:
      "Adicional noturno, insalubridade e periculosidade possuem previsão específica na CLT.",
    type: "income",
    source:
      "Art. 73 - DL5452 | Art. 192 - L6514 | Art. 193 Parágrafo 1 - L6514",
  },
  {
    item: "INSS",
    description:
      "Contribuição previdenciária calculada conforme tabela progressiva vigente do INSS.",
    type: "deduction",
    source: "Meu Imposto de Renda",
  },
  {
    item: "IRRF",
    description:
      "Imposto de Renda descontado diretamente na folha de pagamento conforme tabela vigente da Receita Federal.",
    type: "deduction",
    source: "Receita Federal",
  },
  {
    item: "Vale-transporte",
    description: "Desconto de até 6% do salário bruto",
    type: "deduction",
    source: "Lei 7418",
  },
  {
    item: "Salário líquido",
    description:
      "Valor recebido pelo trabalhador após todos os descontos legais e benefícios aplicáveis.",
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
    source: "Lei 5.107/1966 | Lei 8.036/1990",
  },
  {
    title: "Rescisão sem justa causa",
    description:
      "Quando o empregador encerra o contrato sem justa causa, o trabalhador tem direito ao saldo de salário, aviso prévio, férias vencidas e proporcionais acrescidas de 1/3 constitucional, 13º salário proporcional, saque do FGTS e multa de 40% sobre o saldo do FGTS. O aviso prévio é de no mínimo 30 dias, acrescido de 3 dias por ano completo trabalhado, limitado a 90 dias.",
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
    author: "BCB.",
    title: "Estatíticas monetárias e de crédito.",
    url: "https://www.bcb.gov.br/content/estatisticas/hist_estatisticasmonetariascredito/202506_Texto_de_estatisticas_monetarias_e_de_credito.pdf",
    display: "bcb.gov.br",
  },
  {
    author: "Receita Federal.",
    title: "Meu Imposto de Renda",
    url: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda",
    display: "gov.br",
  },
  {
    author: "Presidência da República.",
    title: "Constituição Federal - Art. 7º, XVII",
    url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
    display: "planalto.gov.br",
  },
  {
    author: "Consolidação das Leis de Trabalho (CLT).",
    title: "DECRETO-LEI Nº 5.452, DE 1º DE MAIO DE 1943.",
    url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm",
    display: "planalto.gov.br",
  },
  {
    author: "Presidência da República.",
    title: "LEI Nº 6.514, DE 22 DE DEZEMBRO DE 1977.",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l6514.htm#art193",
    display: "planalto.gov.br",
  },
  {
    author: "Presidência da República.",
    title: "LEI No 7.418, DE 16 DE DEZEMBRO DE 1985",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l7418.htm",
    display: "planalto.gov.br",
  },

  {
    author: "Presidência da República.",
    title: "LEI No 4.090, DE 13 DE JULHO DE 1962.",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l4090.htm",
    display: "planalto.gov.br",
  },
  {
    author: "Presidência da República.",
    title: "LEI No 5.107, DE 13 DE SETEMBRO DE 1966.",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l5107.htm",
    display: "planalto.gov.br",
  },
  {
    author: "Presidência da República.",
    title: "LEI Nº 8.036, DE 11 DE MAIO DE 1990.",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l8036consol.htm",
    display: "planalto.gov.br",
  },
  {
    author: "Presidência da República.",
    title: "LEI Nº 12.506, DE 11 DE OUTUBRO DE 2011.",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12506.htm",
    display: "planalto.gov.br",
  },
  {
    author: "Presidência da República.",
    title: "LEI Nº 12.414, DE 9 DE JUNHO DE 2011.",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12414.htm",
    display: "planalto.gov.br",
  },
  {
    author: "Presidência da República.",
    title: "LEI Nº 13.709, DE 14 DE AGOSTO DE 2018",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
    display: "planalto.gov.br",
  },
  {
    author: "Serasa.",
    title: "Serasa Score.",
    url: "https://www.serasa.com.br/score/",
    display: "Serasa.com.br",
  },
  {
    author: "BCB.",
    title: "O que é Open Finance.",
    url: "https://www.bcb.gov.br/estabilidadefinanceira/openfinance",
    display: "bcb.gov.br",
  },
];
