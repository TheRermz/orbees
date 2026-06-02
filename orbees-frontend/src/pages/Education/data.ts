export interface StatCard {
  value: string;
  description: string;
  source: string;
  sourceUrl: string;
  accentColor: string;
}

export interface WhyCard {
  icon: string;
  title: string;
  description: string;
  source?: string;
  accentColor: string;
}

export interface TrailStep {
  number: number;
  title: string;
  description: string;
  path: string;
  color: string;
}

export const STAT_CARDS: StatCard[] = [
  {
    value: "78,8%",
    description:
      "das famílias brasileiras estão endividadas — maior nível desde nov/2022",
    source: "CNDL / SPC Brasil — PEIC ago/2025",
    sourceUrl: "https://www.cndl.org.br",
    accentColor: "#ef4444",
  },
  {
    value: "59,6",
    description:
      "pontuação média de letramento financeiro (escala 0–100). Apenas 14,3% sabem calcular juros simples",
    source: "Banco Central do Brasil, 2023",
    sourceUrl: "https://www.bcb.gov.br",
    accentColor: "#f59e0b",
  },
  {
    value: "58,32%",
    description:
      "ao ano: taxa média de juros cobrada dos consumidores — maior desde maio/2023",
    source: "BCB — PEIC / Taxas de Crédito, 2025",
    sourceUrl: "https://www.bcb.gov.br",
    accentColor: "#3b82f6",
  },
];

export const WHY_CARDS: WhyCard[] = [
  {
    icon: "ShieldCheck",
    title: "Segurança",
    description:
      "47,7% dos brasileiros não controlam o próprio orçamento. Sem planejamento, imprevistos viram dívidas.",
    source: "CNDL, 2020",
    accentColor: "#22c55e",
  },
  {
    icon: "TrendingUp",
    title: "Crescimento",
    description:
      "Investir R$200/mês a 1% a.m. por 20 anos gera mais de R$198.000. Os juros compostos trabalham por você — ou contra.",
    accentColor: "#6366f1",
  },
  {
    icon: "CreditCard",
    title: "Liberdade",
    description:
      "Quem controla o dinheiro decide onde trabalhar, quando parar e como viver. 30,4% das famílias já têm dívidas em atraso.",
    source: "PEIC ago/2025",
    accentColor: "#f59e0b",
  },
  {
    icon: "AlertTriangle",
    title: "Realidade brasileira",
    description:
      "R$ 143 bilhões em crédito em atraso — recorde histórico. O comprometimento médio da renda com dívidas é de 29,3%.",
    source: "PEIC ago/2025",
    accentColor: "#ef4444",
  },
];

export const TRAIL_STEPS: TrailStep[] = [
  {
    number: 1,
    title: "Fundamentos",
    description: "Os 4 pilares, regra 50-30-20 e juros compostos",
    path: "/education/fundamentals",
    color: "#22c55e",
  },
  {
    number: 2,
    title: "Direitos e Tributos",
    description: "CLT, holerite, IRPF, crédito, LGPD e Open Finance",
    path: "/education/law",
    color: "#3b82f6",
  },
  {
    number: 3,
    title: "Calculadoras",
    description: "Simule juros, metas, férias e parcelamento",
    path: "/education/calculators",
    color: "#1a1a1a",
  },
];
