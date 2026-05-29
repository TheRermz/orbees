import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Card = styled.div`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const IconBox = styled.div<{ $color: string }>`
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const Title = styled.h4`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const Description = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  line-height: 1.55;
  margin: 0;
`;

export const Source = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textLight};
`;
