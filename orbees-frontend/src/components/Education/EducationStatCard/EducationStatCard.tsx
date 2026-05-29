import type { EducationStatCardProps } from "../interface";
import { Card, Value, Description, Source } from "./EducationStatCard.styles";

export const EducationStatCard = ({ stat }: EducationStatCardProps) => {
  return (
    <Card $accent={stat.accentColor}>
      <Value>{stat.value}</Value>
      <Description>{stat.description}</Description>
      <Source href={stat.sourceUrl} target="_blank" rel="noopener noreferrer">
        {stat.source}
      </Source>
    </Card>
  );
};
