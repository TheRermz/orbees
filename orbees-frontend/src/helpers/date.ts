export const getFirstDayOfMonth = (year: number, month: number): string =>
  new Date(year, month - 1, 1).toISOString().split("T")[0];

export const getLastDayOfMonth = (year: number, month: number): string =>
  new Date(year, month, 0).toISOString().split("T")[0];

export const parseYearMonth = (
  yearMonth: string
): { year: number; month: number } => {
  const [year, month] = yearMonth.split("-").map(Number);
  return { year, month };
};

export const formatYearMonth = (yearMonth: string): string => {
  const { year, month } = parseYearMonth(yearMonth);
  return new Date(year, month - 1, 1).toLocaleDateString("pt-BR", {
    month: "short",
    year: "2-digit",
  });
};
