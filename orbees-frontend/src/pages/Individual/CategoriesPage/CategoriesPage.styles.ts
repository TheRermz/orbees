import styled from "styled-components";
import { theme } from "../../../styles/theme";

export { PageInnerContainer as Container, SectionTitle } from "../../../styles/pageLayout";

export const Section = styled.div`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: 24px;
  margin: 24px 32px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;


export const ChipsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const EditableChip = styled.button<{
  $color: string;
  $active: boolean;
  $disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  background-color: ${({ $color, $active }) =>
    $active ? `${$color}44` : `${$color}22`};
  border: 2px solid
    ${({ $color, $active }) => ($active ? $color : `${$color}44`)};
  color: ${({ $color }) => $color};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ $color, $disabled }) =>
    $disabled ? `${$color}22` : `${$color}44`};
    border-color: ${({ $color, $disabled }) =>
    $disabled ? `${$color}44` : $color};
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 200px;
  gap: 24px;
  align-items: start;
`;

export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export { Label } from "../../../components/ui/Input/Input.styles";

export const NameInput = styled.input`
  padding: 10px 14px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  outline: none;
  width: 100%;

  &:focus {
    border-color: ${theme.colors.primary};
  }
  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

export const Preview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const PreviewCircle = styled.div<{ $color: string }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color}33;
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PreviewLabel = styled.span`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
`;

export const PreviewChip = styled.div<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  background-color: ${({ $color }) => $color}22;
  border: 1px solid ${({ $color }) => $color}44;
  color: ${({ $color }) => $color};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

export const FormActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.error};
  font-size: ${theme.fontSize.sm};
  cursor: pointer;
  padding: 0;
  margin-right: auto;

  &:hover {
    text-decoration: underline;
  }
`;
