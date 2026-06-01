// Adicionar ao TopBar.styles.ts existente
import { theme } from "../../../styles/theme";
import styled from "styled-components";

export const NotificationWrapper = styled.div`
  position: relative;
`;

export const NotificationPanel = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 340px;
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 200;
  overflow: hidden;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid ${theme.colors.border};
`;

export const PanelTitle = styled.span`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
`;

export const MarkAllButton = styled.button`
  background: none;
  border: none;
  font-size: ${theme.fontSize.xs};
  color: #f5a623;
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
  &:disabled {
    color: ${theme.colors.textLight};
    cursor: default;
    text-decoration: none;
  }
`;

export const NotificationList = styled.div`
  max-height: 360px;
  overflow-y: auto;
`;

export const NotificationItem = styled.div<{ $read: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid ${theme.colors.border};
  background-color: ${({ $read }) => ($read ? "transparent" : "#fffbeb")};
  transition: background-color 0.15s;

  &:last-child {
    border-bottom: none;
  }
`;

export const NotificationIcon = styled.div<{
  $type: "download" | "warning" | "info";
}>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $type }) => {
    switch ($type) {
      case "download":
        return "#f0fdf4";
      case "warning":
        return "#fef2f2";
      case "info":
        return "#eff6ff";
    }
  }};
  color: ${({ $type }) => {
    switch ($type) {
      case "download":
        return "#22c55e";
      case "warning":
        return "#ef4444";
      case "info":
        return "#3b82f6";
    }
  }};
`;

export const NotificationBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NotificationMessage = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.text};
  line-height: 1.5;
`;

export const NotificationTime = styled.span`
  font-size: 0.65rem;
  color: ${theme.colors.textLight};
`;

export const DownloadLink = styled.a`
  font-size: ${theme.fontSize.xs};
  color: #22c55e;
  font-weight: ${theme.fontWeight.semibold};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const EmptyState = styled.div`
  padding: 32px 16px;
  text-align: center;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
`;
