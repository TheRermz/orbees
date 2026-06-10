import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Wrapper, Label, StyledInput, ErrorText, InputWrapper, ToggleButton } from "./Input.styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, showToggle, type, ...rest }, ref) => {
    const [visible, setVisible] = useState(false);

    const inputType = showToggle ? (visible ? "text" : "password") : type;

    return (
      <Wrapper>
        {label && <Label>{label}</Label>}
        <InputWrapper>
          <StyledInput
            ref={ref}
            $hasError={!!error}
            type={inputType}
            style={showToggle ? { paddingRight: 40 } : undefined}
            {...rest}
          />
          {showToggle && (
            <ToggleButton type="button" onClick={() => setVisible((v) => !v)}>
              {visible ? <EyeOff size={16} /> : <Eye size={16} />}
            </ToggleButton>
          )}
        </InputWrapper>
        {error && <ErrorText>{error}</ErrorText>}
      </Wrapper>
    );
  }
);

Input.displayName = "Input";
