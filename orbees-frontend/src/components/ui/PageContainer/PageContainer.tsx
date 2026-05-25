import type { ReactNode } from "react";
import { StyledPageContainer } from "./PageContainer.styles";

type Background = "dark" | "light" | "split";

interface PageContainerProps {
  children: ReactNode;
  background?: Background;
  centered?: boolean;
}

export const PageContainer = ({
  children,
  background = "light",
  centered,
}: PageContainerProps) => (
  <StyledPageContainer $background={background} $centered={centered}>
    {children}
  </StyledPageContainer>
);
