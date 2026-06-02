export interface Calculator {
  id: string;
  name: string;
  formula: string;
  subtitle: string;
  badge: string;
}

export const CALCULATORS: Calculator[] = [
  {
    id: "juros-simples",
    name: "Juros Simples",
    formula: "M = C × (1 + i × t)",
    subtitle:
      "Os juros incidem apenas sobre o capital inicial. Usado em empréstimos curtos e caderneta de poupança.",
    badge: "M = C × (1 + i × t)",
  },
  {
    id: "juros-compostos",
    name: "Juros Compostos",
    formula: "M = C × (1 + i)ⁿ",
    subtitle:
      "Juros sobre juros — o mais poderoso aliado dos investimentos de longo prazo.",
    badge: "M = C × (1 + i)ⁿ",
  },
  {
    id: "ferias-clt",
    name: "Férias CLT",
    formula: "Férias + ⅓ + Abono",
    subtitle:
      "Calcule seus direitos conforme a CLT, incluindo o terço constitucional obrigatório.",
    badge: "Férias + ⅓ + Abono",
  },
  {
    id: "parcelamento",
    name: "Custo do Parcelamento",
    formula: "Total = PMT × n",
    subtitle:
      "Descubra o quanto você realmente paga ao parcelar uma compra com juros.",
    badge: "Total = PMT × n",
  },
  {
    id: "metas",
    name: "Metas de Poupança",
    formula: "(Meta − Atual) ÷ Meses",
    subtitle:
      "Planeje quanto poupar por mês para atingir seu objetivo no prazo desejado.",
    badge: "Mensal = (Meta − Atual) ÷ Meses",
  },
  {
    id: "quitacao",
    name: "Quitação de Dívidas",
    formula: "Bola de Neve / Avalanche",
    subtitle:
      "Compare os métodos Avalanche (menor custo total) e Bola de Neve (maior motivação) para sair das dívidas.",
    badge: "Avalanche",
  },
];
