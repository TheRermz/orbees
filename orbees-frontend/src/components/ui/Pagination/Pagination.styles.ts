import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px 0;
`;

export const PageButton = styled.button<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.background};
  color: ${({ $disabled }) =>
    $disabled ? theme.colors.textMuted : theme.colors.text};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: all 0.2s;

  &:hover:not([disabled]) {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

export const PageInfo = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textLight};
`;
