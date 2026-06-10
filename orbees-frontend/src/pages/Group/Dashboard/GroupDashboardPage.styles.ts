import styled from "styled-components";
import { theme } from "../../../styles/theme";

export { PageInnerContainer as Container, PageTitle, PageSubtitleSpaced as PageSubtitle } from "../../../styles/pageLayout";

export const Header = styled.div`
  padding: 24px 32px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
`;

export const HeaderLeft = styled.div``;


export const MemberFilter = styled.select`
  padding: 8px 14px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  background-color: ${theme.colors.background};
  outline: none;

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 24px 32px 0;
`;

export const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 32px 0;
`;

export const ChartCard = styled.div`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: 20px 24px;
`;

export const ChartTitle = styled.h4`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
  margin: 0 0 16px;
`;

export const BottomRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin: 16px 32px 24px;
`;

export const InsightsCard = styled.div`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InsightsTitle = styled.h4`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
  margin: 0 0 8px;
`;

export const LastTransactionsCard = styled.div`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: 20px 24px;
`;

export const LastTransactionsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const LastTransactionsTitle = styled.h4`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
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

export const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid ${theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const TxDot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

export const TxInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const TxTitle = styled.span`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`;

export const TxMeta = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textMuted};
`;

export const TxAmount = styled.span<{ $positive: boolean }>`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${({ $positive }) => ($positive ? "#22c55e" : theme.colors.error)};
`;
