import type { ReactNode } from "react";
import { StyledSuccessMessage } from "./SuccessMessage.styles";

export const SuccessMessage = ({ children }: { children: ReactNode }) => (
  <StyledSuccessMessage>{children}</StyledSuccessMessage>
);
