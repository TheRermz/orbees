import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Card = styled.div<{ $accent: string }>`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: 24px;
  flex: 1;
  min-width: 220px;
  border-left: 4px solid ${({ $accent }) => $accent};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Value = styled.span`
  font-size: 2.25rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  line-height: 1;
`;

export const Description = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  line-height: 1.5;
  margin: 0;
  flex: 1;
`;

export const Source = styled.a`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textLight};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &::after {
    content: " ↗";
  }
`;
