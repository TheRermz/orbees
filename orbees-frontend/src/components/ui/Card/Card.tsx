import type { ReactNode } from "react";
import { StyledCard } from "./Card.styles";

interface CardProps {
  children: ReactNode;
  centered?: boolean;
  maxWidth?: string;
  className?: string;
}

export const Card = ({
  children,
  centered,
  maxWidth,
  className,
}: CardProps) => (
  <StyledCard $centered={centered} style={{ maxWidth }} className={className}>
    {children}
  </StyledCard>
);
