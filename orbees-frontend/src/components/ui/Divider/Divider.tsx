import { StyledDivider } from "./Divider.styles";

interface DividerProps {
  text?: string;
}

export const Divider = ({ text = "ou" }: DividerProps) => (
  <StyledDivider>{text}</StyledDivider>
);
