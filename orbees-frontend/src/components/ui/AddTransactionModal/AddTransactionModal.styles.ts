import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 4px;
  }
`;

export const TransactionForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background-color: #fafafa;
  position: relative;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export { Label } from "../Input/Input.styles";

export const StyledInput = styled.input`
  padding: 8px 10px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  background-color: ${theme.colors.background};
  outline: none;
  width: 100%;

  &:focus {
    border-color: ${theme.colors.primary};
  }
  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

export const StyledSelect = styled.select`
  padding: 8px 10px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  background-color: ${theme.colors.background};
  outline: none;
  width: 100%;

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: ${theme.colors.error};
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }
`;

export const AddRowButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px dashed ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: none;
  color: ${theme.colors.textLight};
  font-size: ${theme.fontSize.sm};
  cursor: pointer;
  width: 100%;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

export const TypeToggle = styled.div`
  display: flex;
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
