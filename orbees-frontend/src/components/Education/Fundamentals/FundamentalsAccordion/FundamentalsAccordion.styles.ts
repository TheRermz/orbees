import styled from "styled-components";
import { theme } from "../../../../styles/theme";

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
  cursor: pointer;
  text-align: left;
  border-bottom: ${({ $open }) => ($open ? `1px solid` : "none")};
  border-color: ${theme.colors.border};
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
  gap: 12px;
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
  gap: 16px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const ColTitle = styled.h5`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0 0 8px;
`;

export const TipBox = styled.div<{ $color: string }>`
  background-color: ${({ $color }) => $color}10;
  border: 1px solid ${({ $color }) => $color}30;
  border-radius: ${theme.borderRadius.md};
  padding: 10px 14px;
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textMuted};
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

export const InlineSource = styled.sup`
  font-size: 0.6rem;
  color: ${theme.colors.textLight};
  margin-left: 3px;
`;
