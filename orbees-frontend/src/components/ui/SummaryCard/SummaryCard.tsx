import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Container,
  Header,
  Label,
  IconWrapper,
  Value,
  Variation,
  SubText,
} from "./SummaryCard.styles";
import type { SummaryCardProps } from "./interface";

export const SummaryCard = ({
  label,
  value,
  icon,
  iconColor,
  borderColor,
  variation,
  variationPositive,
  subText,
  valueColor,
}: SummaryCardProps) => (
  <Container $borderColor={borderColor}>
    <Header>
      <Label>{label}</Label>
      <IconWrapper $color={iconColor}>{icon}</IconWrapper>
    </Header>
    <Value $color={valueColor}>{value}</Value>
    {variation && (
      <Variation $positive={variationPositive ?? true}>
        {variationPositive ? (
          <TrendingUp size={12} />
        ) : (
          <TrendingDown size={12} />
        )}
        {variation} vs mês anterior
      </Variation>
    )}
    {subText && <SubText>{subText}</SubText>}
  </Container>
);
