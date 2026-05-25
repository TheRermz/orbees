import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalBox = styled.div`
  background-color: ${theme.colors.backgroundCard};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

export const ModalTitle = styled.h3`
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  margin: 0;
`;

export const ModalDescription = styled.p`
  color: ${theme.colors.textLight};
  font-size: ${theme.fontSize.md};
  line-height: 1.6;
  margin: 0;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
`;

export const ModalContent = styled.div`
  max-height: 400px;
  overflow-y: auto;
  color: ${theme.colors.textLight};
  font-size: ${theme.fontSize.sm};
  line-height: 1.7;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.border};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 4px;
  }

  h4 {
    color: ${theme.colors.text};
    font-size: ${theme.fontSize.md};
    margin: ${theme.spacing.md} 0 ${theme.spacing.sm};

    &:first-child {
      margin-top: 0;
    }
  }

  p {
    margin-bottom: ${theme.spacing.sm};
  }
`;

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  color: ${theme.colors.textLight};
  font-size: ${theme.fontSize.sm};
  padding-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.border};

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: ${theme.colors.primary};
    cursor: pointer;
    flex-shrink: 0;
  }
`;
