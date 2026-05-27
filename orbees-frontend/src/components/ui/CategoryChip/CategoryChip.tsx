import * as LucideIcons from "lucide-react";
import { Chip, ChipIcon, GroupName, ChipWrapper } from "./CategoryChip.styles";
import type { CategoryChipProps } from "./interface";

export const CategoryChip = ({
  name,
  color = "#9ca3af",
  icon,
  groupName,
}: CategoryChipProps) => {
  const IconComponent = icon
    ? (
      LucideIcons as unknown as Record<
        string,
        React.ComponentType<{ size?: number }>
      >
    )[icon]
    : null;

  return (
    <ChipWrapper>
      <Chip $color={color}>
        <ChipIcon>
          {IconComponent ? <IconComponent size={12} /> : null}
        </ChipIcon>
        {name}
      </Chip>
      {groupName && <GroupName>{groupName}</GroupName>}
    </ChipWrapper>
  );
};
