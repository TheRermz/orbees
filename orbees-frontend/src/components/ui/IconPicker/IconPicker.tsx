import { useState, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { Wrapper, SearchInput, Grid, IconButton } from "./IconPicker.styles";
import { ICON_LIST, type IconPickerProps } from "./interface";

export const IconPicker = ({ value, color, onChange }: IconPickerProps) => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      ICON_LIST.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <Wrapper>
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar ícone..."
      />
      <Grid>
        {filtered.map((name) => {
          const Icon = (
            LucideIcons as unknown as Record<
              string,
              React.ComponentType<{ size?: number }>
            >
          )[name];
          if (!Icon) return null;
          return (
            <IconButton
              key={name}
              $selected={value === name}
              $color={color}
              onClick={() => onChange(name)}
            >
              <Icon size={18} />
            </IconButton>
          );
        })}
      </Grid>
    </Wrapper>
  );
};
