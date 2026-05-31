import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  overflow: hidden;
  background-color: #f5f5f5;
`;

export const Header = styled.div`
  padding: 24px 32px 20px;
  background-color: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
  flex-shrink: 0;
`;

export const PageTitle = styled.h1`
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0 0 4px;
`;

export const PageSubtitle = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  margin: 0;
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const Sidebar = styled.div`
  width: 200px;
  flex-shrink: 0;
  background-color: ${theme.colors.background};
  border-right: 1px solid ${theme.colors.border};
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
`;

export const SidebarItem = styled.button<{ $active: boolean }>`
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border-radius: ${theme.borderRadius.md};
  border: none;
  background-color: ${({ $active }) => ($active ? "#F5A623" : "transparent")};
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#F5A623" : "#f5f5f5")};
  }
`;

export const SidebarItemName = styled.div<{ $active: boolean }>`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${({ $active }) => ($active ? "#1a1a1a" : theme.colors.text)};
  margin-bottom: 2px;
`;

export const SidebarItemFormula = styled.div<{ $active: boolean }>`
  font-size: ${theme.fontSize.xs};
  color: ${({ $active }) => ($active ? "#1a1a1a" : theme.colors.textMuted)};
`;

export const Panel = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

export const PanelTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PanelTitle = styled.h2`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const PanelSubtitle = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  margin: 0;
  max-width: 560px;
  line-height: 1.5;
`;

export const FormulaBadge = styled.div`
  background-color: #1a1a1a;
  color: #fff;
  padding: 6px 14px;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const InputsCard = styled.div`
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputsRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  & > * {
    flex: 1;
    min-width: 160px;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldLabel = styled.label`
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const FieldInput = styled.input`
  padding: 9px 12px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  background-color: ${theme.colors.background};
  width: 100%;

  &:focus {
    outline: none;
    border-color: #f5a623;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }
`;

export const ResultCard = styled.div`
  background-color: #1a1a1a;
  border-radius: ${theme.borderRadius.lg};
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ResultTitle = styled.p`
  font-size: ${theme.fontSize.sm};
  color: #9ca3af;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const ResultValue = styled.div`
  font-size: 2rem;
  font-weight: ${theme.fontWeight.bold};
  color: #f5a623;
  margin: 0;
`;

export const ResultBreakdown = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  border-top: 1px solid #2d2d2d;
  padding-top: 12px;
`;

export const ResultBreakdownItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ResultBreakdownLabel = styled.span`
  font-size: ${theme.fontSize.xs};
  color: #6b7280;
`;

export const ResultBreakdownValue = styled.span`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: #e5e7eb;
`;

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ToggleLabel = styled.span`
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 20px;
  border: none;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? "#1a1a1a" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : theme.colors.textMuted)};
  transition: all 0.15s;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#1a1a1a" : "#f5f5f5")};
  }
`;

export const DebtRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  flex-wrap: wrap;

  & > *:first-child {
    flex: 2;
    min-width: 160px;
  }
  & > *:not(:first-child):not(:last-child) {
    flex: 1;
    min-width: 100px;
  }
`;

export const RemoveButton = styled.button`
  padding: 9px 10px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 1rem;
  flex-shrink: 0;
  align-self: flex-end;
  margin-bottom: 0;

  &:hover {
    background-color: #fef2f2;
  }
`;

export const AddDebtButton = styled.button`
  padding: 8px 0;
  background: none;
  border: none;
  color: #f5a623;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;

export const ExtraRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;
  flex-wrap: wrap;

  & > * {
    flex: 1;
    min-width: 200px;
  }
`;
