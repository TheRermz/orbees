export const formatBRL = (value: number): string =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const formatBRLPlain = (value: number): string =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const parseNum = (val: string): number => {
  const n = parseFloat(val.replace(",", "."));
  return isNaN(n) || n < 0 ? 0 : n;
};
