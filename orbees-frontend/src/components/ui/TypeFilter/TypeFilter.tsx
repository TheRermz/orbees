import { TrendingUp, TrendingDown } from "lucide-react";
import type { TypeFilterProps } from "./interface";
import { FilterButton, Wrapper } from "./TypeFilter.styles";

export const TypeFilter = ({ value, onChange }: TypeFilterProps) => (
  <Wrapper>
    <FilterButton $active={value === "all"} onClick={() => onChange("all")}>
      Todos
    </FilterButton>
    <FilterButton
      $active={value === "income"}
      onClick={() => onChange("income")}
    >
      <TrendingUp size={14} />
      Receitas
    </FilterButton>
    <FilterButton
      $active={value === "expense"}
      onClick={() => onChange("expense")}
    >
      <TrendingDown size={14} />
      Despesas
    </FilterButton>
  </Wrapper>
);
