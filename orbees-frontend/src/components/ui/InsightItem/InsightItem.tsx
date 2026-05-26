import { icons } from "./icon";
import { Container, IconWrapper } from "./InsightItem.styles";
import type { InsightItemProps } from "./interface";

export const InsightItem = ({ text, variant = "info" }: InsightItemProps) => (
  <Container $variant={variant}>
    <IconWrapper>{icons[variant]}</IconWrapper>
    {text}
  </Container>
);
