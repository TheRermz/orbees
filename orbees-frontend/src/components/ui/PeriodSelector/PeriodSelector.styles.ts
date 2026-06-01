import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  padding: 12px 32px;
  background-color: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
`;

export const PeriodLabel = styled.span`
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-right: 12px;
  flex-shrink: 0;
`;

export const MonthsScroll = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
  flex: 1;
  min-width: 0;
  padding-bottom: 2px;
  cursor: grab;
  scrollbar-width: none;
  margin-right: 0.75rem;

  &:active {
    cursor: grabbing;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MonthButton = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 20px;
  border: none;
  background-color: ${({ $active }) =>
    $active ? theme.colors.primary : "transparent"};
  color: ${({ $active }) =>
    $active ? theme.colors.backgroundDark : theme.colors.textLight};
  font-size: ${theme.fontSize.sm};
  font-weight: ${({ $active }) =>
    $active ? theme.fontWeight.bold : theme.fontWeight.normal};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background-color: ${({ $active }) =>
    $active ? theme.colors.primaryHover : theme.colors.border};
  }
`;

export const DateInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`;

export const DateLabel = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textMuted};
`;

export const DateInput = styled.input`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  padding: 5px 10px;
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.text};
  background-color: ${theme.colors.background};
  outline: none;

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

export const ApplyButton = styled.button`
  padding: 6px 14px;
  border-radius: ${theme.borderRadius.sm};
  border: 1px solid ${theme.colors.primary};
  background-color: transparent;
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.backgroundDark};
  }
`;
