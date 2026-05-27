import styled, { createGlobalStyle } from "styled-components";
import { theme } from "../../../styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Swatches = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Swatch = styled.button<{ $color: string; $selected: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  border: 3px solid
    ${({ $selected }) => ($selected ? theme.colors.text : "transparent")};
  cursor: pointer;
  transition: transform 0.15s;
  outline: none;

  &:hover {
    transform: scale(1.15);
  }
`;

export const HexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.background};
`;

export const HexSymbol = styled.span`
  color: ${theme.colors.textMuted};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
`;

export const HexInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  background: transparent;
  text-transform: uppercase;
`;

export const ColorPreview = styled.div<{ $color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

export const ColorPickerGlobalStyle = createGlobalStyle`
  .react-colorful {
    width: 100% !important;
    height: 180px !important;
    border-radius: 8px !important;
  }

  .react-colorful__saturation {
    border-radius: 8px 8px 0 0 !important;
  }

  .react-colorful__hue {
    height: 16px !important;
    border-radius: 0 0 8px 8px !important;
  }

  .react-colorful__pointer {
    width: 20px !important;
    height: 20px !important;
  }
`;
