import styled from "styled-components";
import { theme } from "../../../styles/theme";

export { PageInnerContainer as Container, PageTitleLarge as PageTitle, PageSubtitle } from "../../../styles/pageLayout";

export const Header = styled.div`
  padding: 24px 32px 20px;
  background-color: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
`;


export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 24px 32px 40px;
`;

export const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const FilterPillButton = styled.button<{
  $color: string;
  $active: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1.5px solid
    ${({ $color, $active }) => ($active ? $color : theme.colors.border)};
  background-color: ${({ $color, $active }) =>
    $active ? `${$color}15` : theme.colors.background};
  color: ${({ $color, $active }) =>
    $active ? $color : theme.colors.textMuted};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: ${({ $color }) => $color};
    color: ${({ $color }) => $color};
    background-color: ${({ $color }) => `${$color}10`};
  }
`;

export const AccordionsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

export const AccordionWrapper = styled.div`
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
`;

export const AccordionHeader = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  background: none;
  border: none;
  border-bottom: ${({ $open }) => ($open ? `1px solid` : "none")};
  border-color: ${theme.colors.border};
  cursor: pointer;
  text-align: left;
`;

export const AccordionTitle = styled.h4`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const ChevronIcon = styled.span<{ $open: boolean }>`
  color: ${theme.colors.textMuted};
  transition: transform 0.2s;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0)")};
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const AccordionBody = styled.div`
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const BodyText = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  line-height: 1.65;
  margin: 0;
`;

export const BulletList = styled.ul`
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const BulletItem = styled.li`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  line-height: 1.55;
`;

export const TwoColGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const TipBox = styled.div`
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: ${theme.borderRadius.md};
  padding: 10px 14px;
  font-size: ${theme.fontSize.sm};
  color: #166534;
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

export const InlineSource = styled.sup`
  font-size: 0.6rem;
  color: ${theme.colors.textLight};
  margin-left: 3px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
`;

export const TableHead = styled.thead`
  background-color: #1a1a1a;
`;

export const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: #fff;
`;

export const TableBody = styled.tbody``;

export const Tr = styled.tr<{
  $type: "income" | "deduction" | "total" | "neutral";
}>`
  background-color: ${({ $type }) => {
    switch ($type) {
      case "income":
        return "#f0fdf4";
      case "deduction":
        return "#fef2f2";
      case "total":
        return "#F5A62322";
      default:
        return "#fff";
    }
  }};
  border-bottom: 1px solid ${theme.colors.border};
`;

export const Td = styled.td<{
  $type?: "income" | "deduction" | "total" | "neutral";
}>`
  padding: 12px 16px;
  font-size: ${theme.fontSize.sm};
  color: ${({ $type }) => {
    switch ($type) {
      case "income":
        return "#15803d";
      case "deduction":
        return "#dc2626";
      case "total":
        return "#92400e";
      default:
        return theme.colors.text;
    }
  }};
  font-weight: ${({ $type }) => ($type === "total" ? 700 : 400)};
`;

export const TdDesc = styled.td`
  padding: 12px 16px;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
`;

export const SourceBadge = styled.sup`
  font-size: 0.6rem;
  color: ${theme.colors.textLight};
  margin-left: 4px;
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const CltCard = styled.div`
  background-color: #fafafa;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardTitle = styled.h5`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const CardSource = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textLight};
  margin-top: auto;
`;

export const SubAccordionWrapper = styled.div`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
`;

export const SubAccordionHeader = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: none;
  border: none;
  border-bottom: ${({ $open }) => ($open ? `1px solid` : "none")};
  border-color: ${theme.colors.border};
  cursor: pointer;
  text-align: left;
`;

export const SubAccordionTitle = styled.h5`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const SubAccordionBody = styled.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const IrpfTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const IrpfRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid ${theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const IrpfRange = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
`;

export const IrpfRate = styled.span<{ $color: string }>`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${({ $color }) => $color};
`;

export const IrpfSource = styled.a`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textLight};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const ReferencesSection = styled.div`
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: 20px 24px;
`;

export const RefTitle = styled.h4`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0 0 12px;
`;

export const RefList = styled.ul`
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const RefItem = styled.li`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  line-height: 1.5;
`;

export const RefLink = styled.a`
  color: ${theme.colors.textLight};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  &::after {
    content: " ↗";
  }
`;
