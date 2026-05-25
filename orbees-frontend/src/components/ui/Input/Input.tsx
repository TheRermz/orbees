import { forwardRef, type InputHTMLAttributes } from "react";
import { Wrapper, Label, StyledInput, ErrorText } from "./Input.styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <Wrapper>
        {label && <Label>{label}</Label>}
        <StyledInput ref={ref} $hasError={!!error} {...rest} />
        {error && <ErrorText>{error}</ErrorText>}
      </Wrapper>
    );
  }
);

Input.displayName = "Input";
