import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const OptionCard = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: 14px ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border: 2px solid
    ${({ $selected }) =>
      $selected ? theme.colors.primary : theme.colors.border};
  background-color: ${({ $selected }) =>
    $selected ? `${theme.colors.primary}15` : theme.colors.backgroundCard};
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: all 0.15s;

  &:hover:not(:disabled) {
    border-color: ${theme.colors.primary};
  }
`;

export const OptionDot = styled.div<{ $selected: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid
    ${({ $selected }) =>
      $selected ? theme.colors.primary : theme.colors.border};
  background-color: ${({ $selected }) =>
    $selected ? theme.colors.primary : "transparent"};
  flex-shrink: 0;
  transition: all 0.15s;
`;

export const OptionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

export const OptionLabel = styled.span`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
`;

export const OptionDescription = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
`;

export const OptionExtension = styled.span`
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textMuted};
  background-color: ${theme.colors.border};
  padding: 2px 8px;
  border-radius: ${theme.borderRadius.sm};
  flex-shrink: 0;
`;
