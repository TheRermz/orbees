import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { SectionHeader as BaseSectionHeader } from "../../../styles/pageLayout";

export { PageInnerContainer as Container, PageTitle, PageSubtitle, SectionTitle } from "../../../styles/pageLayout";


export const Header = styled.div`
  padding: 24px 32px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;


export const GroupCard = styled.div`
  margin: 24px 32px 0;
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const AvatarStack = styled.div`
  display: flex;
`;

export const StackAvatar = styled.div<{ $color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  color: white;
  font-size: 0.85rem;
  font-weight: ${theme.fontWeight.bold};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  margin-left: -8px;

  &:first-child {
    margin-left: 0;
  }
`;

export const GroupName = styled.span`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
`;

export const SectionCard = styled.div`
  margin: 16px 32px 0;
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
`;

export const SectionHeader = styled(BaseSectionHeader)`
  padding: 16px 24px;
  border-bottom: 1px solid ${theme.colors.border};
`;

export const MemberRow = styled.div<{ $clickable: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid ${theme.colors.border};
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  transition: background-color 0.15s;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: ${({ $clickable }) =>
    $clickable ? "#fafafa" : "transparent"};
  }
`;

export const MemberAvatar = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  color: white;
  font-size: 1rem;
  font-weight: ${theme.fontWeight.bold};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const MemberInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const MemberName = styled.span`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
`;

export const MemberEmail = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textMuted};
`;

export const RoleBadge = styled.div<{ $admin: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${({ $admin }) =>
    $admin ? theme.colors.primary : theme.colors.textMuted};
`;

export const InfoCard = styled.div`
  margin: 16px 32px 24px;
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoText = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  margin: 0;

  strong {
    color: ${theme.colors.text};
  }
`;

export const ModalField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ModalLabel = styled.label`
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const ModalSelect = styled.select`
  padding: 10px 14px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  background-color: ${theme.colors.background};
  outline: none;

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

export const ModalMemberInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: #fafafa;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border};
`;

export const RemoveLink = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.error};
  font-size: ${theme.fontSize.sm};
  cursor: pointer;
  padding: 0;
  margin-right: auto;

  &:hover {
    text-decoration: underline;
  }
`;
