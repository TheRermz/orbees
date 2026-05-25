import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StatusIcon = styled.div<{ $success: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${({ $success }) => ($success ? "#f0fdf4" : "#fef2f2")};
  color: ${({ $success }) =>
    $success ? theme.colors.success : theme.colors.error};
  font-size: 1.5rem;
  font-weight: ${theme.fontWeight.bold};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  margin: 0;
`;

export const Description = styled.p<{ $error?: boolean }>`
  color: ${({ $error }) =>
    $error ? theme.colors.error : theme.colors.textLight};
  font-size: ${theme.fontSize.md};
  line-height: 1.6;
  margin: 0;
`;
