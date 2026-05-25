import styled, { css } from "styled-components";
import { theme } from "../../../styles/theme";

type Background = "dark" | "light" | "split";

export const StyledPageContainer = styled.div<{
  $background?: Background;
  $centered?: boolean;
}>`
  display: flex;
  width: 100%;
  min-height: 100vh;

  ${({ $centered }) =>
    $centered &&
    css`
      align-items: center;
      justify-content: center;
    `}

  ${({ $background }) => {
    switch ($background) {
      case "dark":
        return css`
          background-color: ${theme.colors.backgroundDark};
        `;
      case "light":
        return css`
          background-color: ${theme.colors.background};
        `;
      case "split":
        return css`
          background-color: ${theme.colors.background};
        `;
      default:
        return css`
          background-color: ${theme.colors.background};
        `;
    }
  }}
`;
