import styled from "styled-components";
import { theme } from "../../styles/theme";

export const GoogleIcon = styled.span`
  background: linear-gradient(135deg, #4285f4, #34a853, #fbbc05, #ea4335);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSize.lg};
`;

export const ForgotPasswordLink = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.xs};
  cursor: pointer;
  text-align: right;
  padding: 0;
  align-self: flex-end;

  &:hover {
    text-decoration: underline;
  }
`;
