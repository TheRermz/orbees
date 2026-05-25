import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const AuthCard = styled.form`
  background-color: ${theme.colors.backgroundCard};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
`;

export const AuthCardTitle = styled.h2`
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  margin: 0;
`;

export const AuthCardSubtitle = styled.p`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.sm};
  margin: 0;
`;

export const AuthCardFooter = styled.p`
  color: ${theme.colors.textMuted};
  font-size: ${theme.fontSize.sm};
  text-align: center;
  margin: 0;

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    font-weight: ${theme.fontWeight.semibold};

    &:hover {
      text-decoration: underline;
    }
  }
`;
