import styled, { css } from "styled-components";
import { theme } from "../../../styles/theme";

type Variant = "primary" | "secondary" | "google" | "danger";

export const StyledButton = styled.button<{
  $variant?: Variant;
  $fullWidth?: boolean;
}>`
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
  padding: 14px ${theme.spacing.xl};
  transition:
    background-color 0.2s,
    border-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  ${({ $variant = "primary" }) => {
    switch ($variant) {
      case "primary":
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.backgroundDark};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryHover};
          }
        `;
      case "secondary":
        return css`
          background-color: transparent;
          border: 1px solid ${theme.colors.border};
          color: ${theme.colors.text};
          &:hover:not(:disabled) {
            border-color: ${theme.colors.primary};
          }
        `;
      case "google":
        return css`
          background-color: ${theme.colors.backgroundCard};
          border: 1px solid ${theme.colors.border};
          color: ${theme.colors.text};
          font-weight: ${theme.fontWeight.normal};
          &:hover:not(:disabled) {
            border-color: ${theme.colors.primary};
          }
        `;
      case "danger":
        return css`
          background-color: ${theme.colors.error};
          color: ${theme.colors.textWhite};
          &:hover:not(:disabled) {
            opacity: 0.9;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
