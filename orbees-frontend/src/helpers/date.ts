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
    year: year < 2001 ? "numeric" : "2-digit",
  });
};

export const addStartOfDay = (date: string): string => {
  return `${date}T00:00:00`;
};

export const addEndOfDay = (date: string): string => {
  return `${date}T23:59:59`;
};
