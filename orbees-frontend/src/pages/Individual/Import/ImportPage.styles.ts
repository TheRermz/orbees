import styled from "styled-components";
import { theme } from "../../../styles/theme";

export {
  PageInnerContainer as Container,
  PageTitle,
  PageSubtitleSpaced as PageSubtitle,
} from "../../../styles/pageLayout";

export const Header = styled.div`
  padding: 24px 32px 0;
`;

export const StepperCard = styled.div`
  margin: 24px 32px 0;
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 0;
`;

export const StepItem = styled.div<{ $status: "done" | "active" | "pending" }>`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  color: ${({ $status }) =>
    $status === "done"
      ? "#22c55e"
      : $status === "active"
        ? theme.colors.primary
        : theme.colors.textMuted};
  font-size: ${theme.fontSize.sm};
  font-weight: ${({ $status }) =>
    $status !== "pending"
      ? theme.fontWeight.semibold
      : theme.fontWeight.normal};
`;

export const StepNumber = styled.div<{
  $status: "done" | "active" | "pending";
}>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.bold};
  flex-shrink: 0;
  background-color: ${({ $status }) =>
    $status === "done"
      ? "#22c55e"
      : $status === "active"
        ? theme.colors.primary
        : theme.colors.border};
  color: ${({ $status }) =>
    $status === "pending" ? theme.colors.textMuted : "#fff"};
`;

export const StepDivider = styled.div`
  flex: 1;
  height: 1px;
  background-color: ${theme.colors.border};
  margin: 0 8px;
`;

export const Content = styled.div`
  margin: 16px 32px 24px;
`;

export const DropZone = styled.div<{ $dragging: boolean }>`
  border: 2px dashed
    ${({ $dragging }) =>
    $dragging ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  background-color: ${({ $dragging }) =>
    $dragging ? `${theme.colors.primary}11` : theme.colors.background};
  padding: 64px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${theme.colors.primary};
    background-color: ${theme.colors.primary}11;
  }
`;

export const DropTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const DropSubtitle = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  margin: 0;
  text-align: center;
`;

export const FormatBadges = styled.div`
  display: flex;
  gap: 8px;
`;

export const FormatBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid ${theme.colors.border};
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textLight};
`;

export const PreviewCard = styled.div`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
`;

export const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid ${theme.colors.border};
`;

export const PreviewFileName = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textLight};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PreviewCount = styled.span`
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: #22c55e;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 4px 10px;
  border-radius: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px 20px;
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background-color: #fafafa;
  border-bottom: 1px solid ${theme.colors.border};
`;

export const Td = styled.td`
  padding: 14px 20px;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  border-bottom: 1px solid ${theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const Amount = styled.span<{ $positive: boolean }>`
  font-weight: ${theme.fontWeight.semibold};
  color: ${({ $positive }) => ($positive ? "#22c55e" : theme.colors.error)};
`;

export const CategoryTag = styled.span<{ $suggested: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${({ $suggested }) => ($suggested ? "#22c55e" : theme.colors.primary)};
`;

export const FooterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;

export const CategorizeRow = styled.div`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: 20px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CategorizeTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const TxInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const TxTitle = styled.span`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
`;

export const TxAmount = styled.span<{ $positive: boolean }>`
  font-size: ${theme.fontSize.xs};
  color: ${({ $positive }) => ($positive ? "#22c55e" : theme.colors.error)};
`;

export const TitleInput = styled.input`
  padding: 6px 10px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  background-color: transparent;
  outline: none;
  width: 100%;

  &:focus {
    border-color: ${theme.colors.primary};
    background-color: ${theme.colors.background};
  }
`;

export const CategorySelect = styled.select<{ $uncategorized: boolean }>`
  padding: 8px 12px;
  border: 2px solid
    ${({ $uncategorized }) =>
    $uncategorized ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  background-color: ${theme.colors.background};
  outline: none;
  min-width: 200px;

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

export const ShareRow = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: ${({ $active }) => ($active ? "#fffbeb" : "#fafafa")};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid
    ${({ $active }) => ($active ? "#fde68a" : theme.colors.border)};
`;

export const Toggle = styled.input`
  width: 40px;
  height: 22px;
  cursor: pointer;
  accent-color: ${theme.colors.primary};
`;

export const ShareLabel = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textLight};
  flex: 1;

  strong {
    color: ${theme.colors.text};
  }
`;

export const GroupCategorySelect = styled.select`
  padding: 6px 10px;
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

export const SuccessCard = styled.div`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
`;

export const SuccessTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const SuccessSubtitle = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  margin: 0;
`;

export const StatsRow = styled.div`
  display: flex;
  gap: 32px;
  margin: 8px 0;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const StatValue = styled.span<{ $color: string }>`
  font-size: 1.8rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${({ $color }) => $color};
`;

export const StatLabel = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textMuted};
`;

export const SharedInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  background-color: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: #92400e;
  width: 100%;
  max-width: 500px;
`;
