import * as LucideIcons from "lucide-react";
import {
  Card,
  TitleRow,
  IconBox,
  Title,
  Description,
  Source,
} from "./EducationWhyCard.styles";
import type { EducationWhyCardProps } from "../interface";

export const EducationWhyCard = ({ card }: EducationWhyCardProps) => {
  const Icon = (
    LucideIcons as unknown as Record<
      string,
      React.ComponentType<{ size?: number }>
    >
  )[card.icon];

  return (
    <Card>
      <TitleRow>
        <IconBox $color={card.accentColor}>
          {Icon && <Icon size={20} />}
        </IconBox>
        <Title>{card.title}</Title>
      </TitleRow>
      <Description>{card.description}</Description>
      {card.source && <Source>{card.source}</Source>}
    </Card>
  );
};
