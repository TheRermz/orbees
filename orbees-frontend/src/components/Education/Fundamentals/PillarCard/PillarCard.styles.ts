import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div<{ $accent: string }>`
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-top: 3px solid ${({ $accent }) => $accent};
  border-radius: ${theme.borderRadius.lg};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const IconBox = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md};
  background-color: ${({ $color }) => $color}18;
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardTitle = styled.h4`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const CardDescription = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  line-height: 1.55;
  margin: 0;
`;
