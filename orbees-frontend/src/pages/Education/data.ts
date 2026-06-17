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
  sourceUrl?: string;
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
    sourceUrl:
      "https://static.poder360.com.br/2025/09/pesquisa-cnc-inadimplencia.pdf",
    accentColor: "#ef4444",
  },
  {
    value: "59,6",
    description:
      "pontuação média de letramento financeiro (escala 0–100). Apenas 14,3% sabem calcular juros simples",
    source: "Banco Central do Brasil, 2023",
    sourceUrl: "https://www.bcb.gov.br/detalhenoticia/747/noticia",
    accentColor: "#f59e0b",
  },
  {
    value: "58,3%",
    description:
      "A taxa média de juros do crédito livre às pessoas físicas atingiu 58,3% a.a. em junho.",
    source: "Banco Central do Brasil, 2025",
    sourceUrl:
      "https://www.bcb.gov.br/content/estatisticas/hist_estatisticasmonetariascredito/202507_Texto_de_estatisticas_monetarias_e_de_credito.pdf",
    accentColor: "#3b82f6",
  },
];

export const WHY_CARDS: WhyCard[] = [
  {
    icon: "ShieldCheck",
    title: "Segurança",
    description:
      "56% dos brasileiros não controlam o próprio orçamento. Sem planejamento, imprevistos viram dívidas.",
    source: "Banco Central do Brasil, 2017",
    sourceUrl:
      "https://www.bcb.gov.br/content/cidadaniafinanceira/documentos_cidadania/serie_cidadania/serie_cidadania_5_financeira_pesquisa.pdf",
    accentColor: "#22c55e",
  },
  {
    icon: "TrendingUp",
    title: "Crescimento",
    description:
      "Investir não depende de grandes quantias. Pequenos aportes mensais, feitos com constância, podem se transformar em dezenas ou até centenas de milhares de reais ao longo dos anos graças aos juros compostos.",
    accentColor: "#6366f1",
  },
  {
    icon: "CreditCard",
    title: "Liberdade",
    description:
      "Ter controle das finanças amplia as possibilidades de escolha e reduz a dependência de crédito para lidar com despesas do dia a dia. O planejamento financeiro é um dos pilares do bem-estar financeiro, segundo o Banco Central do Brasil.",
    source: "Banco Central do Brasil, 2025",
    sourceUrl:
      "https://www.bcb.gov.br/content/cidadaniafinanceira/documentos_cidadania/RCF/relatorio_de_cidadania_financeira_2025.pdf",
    accentColor: "#f59e0b",
  },
  {
    icon: "AlertTriangle",
    title: "Realidade brasileira",
    description:
      "30,4% das famílias brasileiras possuem contas ou dívidas em atraso, o maior nível da série histórica da pesquisa. O comprometimento médio da renda com dívidas é de 29,3%.",
    source: "PEIC ago/2025",
    sourceUrl:
      "https://portal-bucket.azureedge.net/wp-content/2025/09/Relatorio_Peic_ago25.pdf",
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
