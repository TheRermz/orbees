import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Container = styled.div`
  height: 64px;
  background-color: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 32px;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const NotificationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  color: ${theme.colors.textLight};
  display: flex;
  align-items: center;
  padding: 4px;

  &:hover {
    color: ${theme.colors.text};
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  background-color: ${theme.colors.error};
  border-radius: 50%;
  font-size: 0.65rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.backgroundDark};
  font-size: 0.9rem;
  font-weight: ${theme.fontWeight.bold};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserName = styled.span`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
`;

export const UserRole = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textMuted};
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;
