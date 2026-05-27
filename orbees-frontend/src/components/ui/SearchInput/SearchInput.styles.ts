import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Wrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.textMuted};
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 16px 10px 38px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  background-color: ${theme.colors.background};
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
  &:focus {
    border-color: ${theme.colors.primary};
  }
`;
