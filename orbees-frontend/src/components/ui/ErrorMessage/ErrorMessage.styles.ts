import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const StyledErrorMessage = styled.div`
  background-color: ${theme.colors.errorBackground};
  border: 1px solid ${theme.colors.error};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.error};
  font-size: ${theme.fontSize.sm};
  padding: 10px ${theme.spacing.md};
`;
