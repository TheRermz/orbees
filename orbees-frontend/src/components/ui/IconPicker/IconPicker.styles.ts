import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  outline: none;
  width: 100%;

  &:focus {
    border-color: ${theme.colors.primary};
  }
  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 40px);
  gap: 4px;
  max-height: 220px;
  overflow-y: auto;
  padding: 4px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 4px;
  }
`;

export const IconButton = styled.button<{ $selected: boolean; $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md};
  border: 2px solid
    ${({ $selected, $color }) => ($selected ? $color : "transparent")};
  background-color: ${({ $selected, $color }) =>
    $selected ? `${$color}22` : "transparent"};
  color: ${({ $selected, $color }) =>
    $selected ? $color : theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background-color: ${({ $color }) => `${$color}22`};
    color: ${({ $color }) => $color};
  }
`;
