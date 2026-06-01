import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 64px);
  gap: 16px;
  text-align: center;
  padding: 32px;
  background-color: #f5f5f5;
`;

export const IconBox = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #f5f5f5;
  border: 2px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.textLight};
`;

export const Title = styled.h2`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  margin: 0;
  max-width: 320px;
  line-height: 1.6;
`;

export const CreateButton = styled.button`
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
