import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  gap: 16px;
  text-align: center;
  padding: 32px;
`;

export const Code = styled.div`
  font-size: 6rem;
  font-weight: ${theme.fontWeight.bold};
  color: #1a1a1a;
  line-height: 1;
  letter-spacing: -4px;

  span {
    color: #f5a623;
  }
`;

export const Title = styled.h1`
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.textMuted};
  margin: 0;
  max-width: 360px;
  line-height: 1.6;
`;

export const BackButton = styled.button`
  margin-top: 8px;
  padding: 12px 28px;
  background-color: #f5a623;
  color: #1a1a1a;
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e09510;
  }
`;
