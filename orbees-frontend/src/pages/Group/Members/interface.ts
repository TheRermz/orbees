const AVATAR_COLORS = [
  "#F5A623",
  "#3b82f6",
  "#22c55e",
  "#a855f7",
  "#ef4444",
  "#14b8a6",
];

export const getInitial = (name: string) => name[0]?.toUpperCase() ?? "?";
export const getColor = (index: number) =>
  AVATAR_COLORS[index % AVATAR_COLORS.length];
