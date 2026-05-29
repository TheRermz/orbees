import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  overflow-y: auto;
  background-color: #f5f5f5;
`;

export const Header = styled.div`
  padding: 24px 32px 0;
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
  margin: 4px 0 0;
`;

export const Content = styled.div`
  display: flex;
  gap: 24px;
  margin: 24px 32px;
  align-items: flex-start;
`;

export const Sidebar = styled.div`
  width: 200px;
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: 8px;
  flex-shrink: 0;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 14px;
  border: none;
  border-radius: ${theme.borderRadius.md};
  background-color: ${({ $active }) =>
    $active ? theme.colors.text : "transparent"};
  color: ${({ $active }) => ($active ? "#fff" : theme.colors.textLight)};
  font-size: ${theme.fontSize.sm};
  font-weight: ${({ $active }) =>
    $active ? theme.fontWeight.semibold : theme.fontWeight.normal};
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;

  &:hover {
    background-color: ${({ $active }) =>
    $active ? theme.colors.text : "#f5f5f5"};
  }
`;

export const Panel = styled.div`
  flex: 1;
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: 24px;
`;

export const PanelTitle = styled.h3`
  font-size: 1rem;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AvatarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
`;

export const Avatar = styled.div<{ $color?: string }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color ?? theme.colors.primary};
  color: white;
  font-size: 1.5rem;
  font-weight: ${theme.fontWeight.bold};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AvatarInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AvatarLabel = styled.span`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
`;

export const AvatarHint = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textMuted};
`;

export const Field = styled.div`
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

export const StyledInput = styled.input`
  padding: 10px 14px;
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

export const PasswordInputWrapper = styled.div`
  position: relative;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.colors.textMuted};
  display: flex;
  align-items: center;
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid ${theme.colors.border};
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textLight};
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

export const GroupCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
`;

export const GroupAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.text};
  color: white;
  font-size: 1.1rem;
  font-weight: ${theme.fontWeight.bold};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const GroupInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const GroupName = styled.span`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
`;

export const GroupMeta = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textMuted};
`;

export const RoleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
`;

export const LeaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: none;
  color: ${theme.colors.textMuted};
  font-size: ${theme.fontSize.xs};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: ${theme.colors.error};
    color: ${theme.colors.error};
  }
`;

export const PermissionsCard = styled.div`
  padding: 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
`;

export const PermissionsTitle = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  margin: 0 0 12px;

  strong {
    color: ${theme.colors.text};
  }
`;

export const PermissionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textLight};
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const InfoBox = styled.div`
  padding: 14px 16px;
  background-color: #fafafa;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  line-height: 1.5;

  strong {
    color: ${theme.colors.text};
  }
`;

export const TipsCard = styled.div`
  padding: 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
`;

export const TipsTitle = styled.p`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
  margin: 0 0 10px;
`;

export const TipItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;
