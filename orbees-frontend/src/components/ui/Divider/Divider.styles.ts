import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const StyledDivider = styled.div`
  color: ${theme.colors.textMuted};
  font-size: ${theme.fontSize.sm};
  text-align: center;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background-color: ${theme.colors.border};
  }

  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
`;
