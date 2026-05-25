import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const StyledSuccessMessage = styled.div`
  background-color: #f0fdf4;
  border: 1px solid ${theme.colors.success};
  border-radius: ${theme.borderRadius.md};
  color: #166534;
  font-size: ${theme.fontSize.sm};
  padding: 10px ${theme.spacing.md};
`;
