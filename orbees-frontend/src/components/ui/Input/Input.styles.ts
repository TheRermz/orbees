import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  background-color: ${theme.colors.backgroundInput};
  border: 1px solid
    ${({ $hasError }) => ($hasError ? theme.colors.error : theme.colors.border)};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.md};
  padding: 12px ${theme.spacing.md};
  outline: none;
  transition: border-color 0.2s;
  width: 100%;

  &::placeholder {
    color: ${theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ $hasError }) =>
    $hasError ? theme.colors.error : theme.colors.primary};
  }
`;

export const ErrorText = styled.span`
  color: ${theme.colors.error};
  font-size: ${theme.fontSize.xs};
`;
