import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 64px);
  background-color: #f5f5f5;
  padding: 32px;
`;

export const Card = styled.div`
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: 40px;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
`;

export const IconBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #f5a62315;
  border: 2px solid #f5a62340;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f5a623;
`;

export const Title = styled.h1`
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  margin: 0;
  line-height: 1.5;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldLabel = styled.label`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
`;

export const Optional = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textLight};
  font-weight: normal;
  margin-left: 4px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;

  & > * {
    flex: 1;
  }
`;
