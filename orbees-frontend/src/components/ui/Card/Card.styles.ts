import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const StyledCard = styled.div<{ $centered?: boolean }>`
  background-color: ${theme.colors.backgroundCard};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);

  ${({ $centered }) =>
    $centered &&
    `
    align-items: center;
    text-align: center;
  `}
`;
