import * as LucideIcons from "lucide-react";
import {
  Grid,
  Card,
  IconBox,
  CardTitle,
  CardDescription,
} from "./PillarCard.styles";
import type { PillarCardProps, PillarGridProps } from "./interface";

export const PillarCard = ({ pillar }: PillarCardProps) => {
  const Icon = (
    LucideIcons as unknown as Record<
      string,
      React.ComponentType<{ size?: number }>
    >
  )[pillar.icon];

  return (
    <Card $accent={pillar.accentColor}>
      <IconBox $color={pillar.accentColor}>
        {Icon && <Icon size={20} />}
      </IconBox>
      <CardTitle>{pillar.title}</CardTitle>
      <CardDescription>{pillar.description}</CardDescription>
    </Card>
  );
};

export const PillarGrid = ({ pillars }: PillarGridProps) => (
  <Grid>
    {pillars.map((p) => (
      <PillarCard key={p.title} pillar={p} />
    ))}
  </Grid>
);
