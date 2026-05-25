import type { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./Button.styles";

type Variant = "primary" | "secondary" | "google" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = ({
  variant = "primary",
  fullWidth = false,
  loading = false,
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton
      $variant={variant}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      type={type}
      {...rest}
    >
      {loading ? "Carregando..." : children}
    </StyledButton>
  );
};
