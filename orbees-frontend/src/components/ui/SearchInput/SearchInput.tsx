import { Search } from "lucide-react";
import { Wrapper, IconWrapper, StyledInput } from "./SearchInput.styles";
import type { SearchInputProps } from "./interface";

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Buscar...",
}: SearchInputProps) => (
  <Wrapper>
    <IconWrapper>
      <Search size={16} />
    </IconWrapper>
    <StyledInput
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </Wrapper>
);
