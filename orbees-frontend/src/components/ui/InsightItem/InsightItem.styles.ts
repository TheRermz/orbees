import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Container = styled.div<{ $variant: "info" | "warning" | "muted" }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid
    ${({ $variant }) => {
    switch ($variant) {
      case "warning":
        return "#fde68a";
      case "info":
        return "#bfdbfe";
      case "muted":
        return theme.colors.border;
    }
  }};
  background-color: ${({ $variant }) => {
    switch ($variant) {
      case "warning":
        return "#fffbeb";
      case "info":
        return "#eff6ff";
      case "muted":
        return "#fafafa";
    }
  }};
  font-size: ${theme.fontSize.sm};
  color: ${({ $variant }) => {
    switch ($variant) {
      case "warning":
        return "#92400e";
      case "info":
        return "#1e40af";
      case "muted":
        return theme.colors.textMuted;
    }
  }};
`;

export const IconWrapper = styled.div`
  flex-shrink: 0;
`;
