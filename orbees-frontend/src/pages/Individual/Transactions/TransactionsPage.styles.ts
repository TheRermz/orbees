import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  overflow-y: auto;
  background-color: #f5f5f5;
`;

export const Header = styled.div`
  padding: 24px 32px 16px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
  flex-wrap: wrap;
  gap: 12px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PageTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const PageSubtitle = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  margin: 0;
`;

export const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const FiltersBar = styled.div`
  padding: 16px 32px;
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
  flex-wrap: wrap;
  min-width: 0;
`;

export const CategorySelect = styled.select`
  padding: 10px 14px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  background-color: ${theme.colors.background};
  outline: none;
  cursor: pointer;
  min-width: 180px;

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

export const ListCard = styled.div`
  margin: 0 32px 24px;
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: 0 16px;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px 0;
  color: ${theme.colors.textMuted};
  font-size: ${theme.fontSize.sm};
`;
