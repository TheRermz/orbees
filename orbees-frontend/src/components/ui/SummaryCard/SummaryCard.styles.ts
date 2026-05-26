import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Container = styled.div<{ $borderColor: string }>`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  border-top: 3px solid ${({ $borderColor }) => $borderColor};
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.span`
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const IconWrapper = styled.div<{ $color: string }>`
  color: ${({ $color }) => $color};
`;

export const Value = styled.div<{ $color?: string }>`
  font-size: 1.6rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${({ $color }) => $color ?? theme.colors.text};
`;

export const Variation = styled.div<{ $positive: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${theme.fontSize.xs};
  color: ${({ $positive }) => ($positive ? "#22c55e" : theme.colors.error)};
`;

export const SubText = styled.div`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textMuted};
`;
