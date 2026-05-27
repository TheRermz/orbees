import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Wrapper = styled.div`
  display: flex;
  background-color: ${theme.colors.border};
  border-radius: 20px;
  padding: 3px;
  gap: 2px;
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  border: none;
  background-color: ${({ $active }) =>
    $active ? theme.colors.backgroundDark : "transparent"};
  color: ${({ $active }) =>
    $active ? theme.colors.textWhite : theme.colors.textLight};
  font-size: ${theme.fontSize.sm};
  font-weight: ${({ $active }) =>
    $active ? theme.fontWeight.semibold : theme.fontWeight.normal};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
`;
