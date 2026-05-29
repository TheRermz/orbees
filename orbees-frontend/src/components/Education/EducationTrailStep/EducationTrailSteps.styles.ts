import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const StepRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid ${theme.colors.border};
  cursor: pointer;
  transition: background-color 0.15s;
  border-radius: ${theme.borderRadius.md};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-child {
    padding-top: 0;
  }

  &:hover .trail-arrow {
    transform: translateX(4px);
  }
`;

export const NumberBadge = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  color: #fff;
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const StepInfo = styled.div`
  flex: 1;
`;

export const StepTitle = styled.h4`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
  margin: 0 0 2px;
`;

export const StepDescription = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  margin: 0;
`;

export const Arrow = styled.span`
  color: ${theme.colors.textLight};
  font-size: ${theme.fontSize.sm};
  transition: transform 0.2s;
  flex-shrink: 0;
`;
