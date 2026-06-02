import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  overflow-y: auto;
  height: calc(100vh - 64px);
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionTitle = styled.h3`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const SectionLink = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const InsightList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 24px 32px 0;
`;

export const ChartCard = styled.div`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ChartTitle = styled.h4`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CategoryItem = styled.div`
  display: grid;
  grid-template-columns: 10px 100px 1fr auto;
  align-items: center;
  gap: 10px;
`;

export const CategoryDot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $color }) => getCategoryColor($color)};
`;

export const CategoryName = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CategoryBar = styled.div`
  height: 8px;
  background-color: ${theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
`;

export const CategoryBarFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background-color: ${({ $color }) => getCategoryColor($color)};
  border-radius: 4px;
  transition: width 0.4s ease;
`;

export const CategoryValue = styled.span<{ $isTop: boolean }>`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${({ $isTop }) => ($isTop ? theme.colors.error : theme.colors.text)};
  text-align: right;
  white-space: nowrap;
`;

export const ChartToggleGroup = styled.div`
  display: flex;
  gap: 4px;
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
  padding: 4px 10px;
  border-radius: ${theme.borderRadius.sm};
  border: 1px solid
    ${({ $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ $active }) =>
    $active ? theme.colors.primary : "transparent"};
  color: ${({ $active }) =>
    $active ? theme.colors.backgroundDark : theme.colors.textLight};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s;
`;

export const TransactionList = styled.div`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: 8px 16px;
`;

export const getCategoryColor = (color?: string): string => color ?? "#9ca3af";

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${theme.colors.textMuted};
  font-size: ${theme.fontSize.md};
`;
