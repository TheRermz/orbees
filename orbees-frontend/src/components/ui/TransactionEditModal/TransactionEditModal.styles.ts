import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export { Label } from "../Input/Input.styles";

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  background-color: ${theme.colors.background};
  outline: none;
  cursor: pointer;
  appearance: none;

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

export const CategoryOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CategoryDot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

export const FooterLink = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.xs};
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const TypeToggle = styled.div`
  display: flex;
  margin-left: 0.75rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
`;

export const TypeButton = styled.button<{
  $active: boolean;
  $type: "income" | "expense";
}>`
  flex: 1;
  padding: 8px;
  border: none;
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${({ $active, $type }) =>
    $active
      ? $type === "income"
        ? "#22c55e"
        : theme.colors.error
      : "transparent"};
  color: ${({ $active }) => ($active ? "#fff" : theme.colors.textMuted)};
`;
