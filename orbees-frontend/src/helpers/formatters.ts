export const formatCurrency = (value: number): string =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString("pt-BR");

export const formatDateLong = (date: string): string =>
  new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export const formatPercent = (value: number, decimals = 0): string =>
  `${value.toFixed(decimals)}%`;

export const formatVariation = (value?: string): string => value ?? "-";
