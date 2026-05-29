export const CALLOUT = {
  title: "O que é gestão financeira?",
  body: [
    { text: "Gestão financeira é o processo de " },
    { text: "planejar, organizar, controlar e monitorar", bold: true },
    {
      text: " os recursos financeiros pessoais ou familiares. Não se trata de ganhar mais — mas de fazer mais com o que você já ganha. Segundo o BCB (2023), o letramento financeiro é medido em quatro dimensões: conhecimento, comportamento, atitude e bem-estar financeiro. O Brasil obteve média de ",
    },
    { text: "59,6/100", bold: true },
    { text: " no índice de letramento financeiro — e apenas " },
    { text: "14,3%", bold: true },
    {
      text: " da população consegue resolver corretamente um cálculo de juros simples.",
    },
  ] as TextSegment[],
  source: "BCB, 2023",
  sourceUrl: "https://www.bcb.gov.br",
};

export interface Pillar {
  icon: string;
  title: string;
  description: string;
  accentColor: string;
}

export const PILLARS: Pillar[] = [
  {
    icon: "BarChart2",
    title: "Orçamento",
    description:
      "Saber para onde vai cada real. Sem controle de gastos, nenhuma estratégia funciona. Registre toda receita e despesa.",
    accentColor: "#22c55e",
  },
  {
    icon: "ShieldCheck",
    title: "Reserva de Emergência",
    description:
      "Entre 3 e 6 meses de despesas em investimento líquido (ex: Tesouro Selic). Protege contra imprevistos sem gerar dívidas.",
    accentColor: "#3b82f6",
  },
  {
    icon: "AlertTriangle",
    title: "Eliminar Dívidas",
    description:
      "Dívida com juros altos (cartão, cheque especial) destrói patrimônio. Prioridade máxima antes de investir.",
    accentColor: "#ef4444",
  },
  {
    icon: "TrendingUp",
    title: "Investimentos",
    description:
      "Após a base estabelecida, fazer o dinheiro trabalhar por você. Começa com renda fixa e cresce conforme o perfil.",
    accentColor: "#a855f7",
  },
];

export const RULE_502030 = {
  title: "A Regra 50-30-20",
  subtitle:
    "Um ponto de partida simples para distribuir a renda líquida mensal.",
  source: "BCB — Educação Financeira",
  sourceUrl: "https://www.bcb.gov.br/meubolso/planejamento",
  segments: [
    {
      label: "50%",
      description: "Necessidades",
      detail: "Moradia, alimentação, transporte, saúde, contas essenciais",
      color: "#22c55e",
      value: 50,
    },
    {
      label: "30%",
      description: "Estilo de vida",
      detail: "Lazer, restaurantes, assinaturas, compras não essenciais",
      color: "#F5A623",
      value: 30,
    },
    {
      label: "20%",
      description: "Futuro",
      detail: "Poupança, investimentos, quitação de dívidas extras",
      color: "#a855f7",
      value: 20,
    },
  ],
  footnote:
    "Adapte conforme sua realidade. Endividados devem direcionar mais que 20% para quitar dívidas. A regra é um guia, não uma lei.",
};

export const COMPOUND_INTEREST = {
  title: "Juros compostos: seu maior aliado e seu maior inimigo",
  ally: {
    title: "Como aliado (investindo)",
    lines: [
      {
        text: "R$500/mês investidos a 1% a.m. por 10 anos = ",
        suffix: "R$115.017",
        suffixBold: true,
      },
      {
        text: "Você depositou R$60.000. Os juros renderam R$55.017 — quase o dobro.",
        italic: true,
      },
    ],
    footnote: "Calculado com fórmula M = PMT × ((1+i)ⁿ − 1)/i.",
    footnoteSource: "Tesouro Direto — Simulador",
    accentColor: "#22c55e",
  },
  enemy: {
    title: "Como inimigo (endividado)",
    lines: [
      {
        text: "R$1.000 no rotativo do cartão (",
        bold: "até 400% a.a.",
        suffix: ") em 6 meses = ",
        end: "R$2.313",
        endBold: true,
      },
      {
        text: "Você pagou 131% a mais pelo mesmo valor. Juros sobre juros destroem patrimônio.",
        italic: true,
      },
    ],
    footnoteSource: "BCB — Taxas de Juros de Mercado",
    accentColor: "#ef4444",
  },
};

export interface AccordionItem {
  id: string;
  title: string;
  content: AccordionContent;
}

export type AccordionContent =
  | { type: "emergency_fund" }
  | { type: "debt_methods" }
  | { type: "budget_role" };

export const ACCORDIONS: AccordionItem[] = [
  {
    id: "emergency",
    title: "Como montar seu fundo de emergência",
    content: { type: "emergency_fund" },
  },
  {
    id: "debt",
    title: "Método para sair das dívidas: Bola de Neve vs Avalanche",
    content: { type: "debt_methods" },
  },
  {
    id: "budget",
    title: "O papel do orçamento mensal",
    content: { type: "budget_role" },
  },
];

export interface TextSegment {
  text: string;
  bold?: boolean;
}
