import { StyledErrorMessage } from "./ErrorMessage.styles";
import type { ReactNode } from "react";

interface ErrorMessageProps {
  children: ReactNode;
}

export const ErrorMessage = ({ children }: ErrorMessageProps) => (
  <StyledErrorMessage>{children}</StyledErrorMessage>
);
