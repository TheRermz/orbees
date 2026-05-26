import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authService } from "../../services/authService";
import { getErrorMessage } from "../../helpers/error";
import { Button, Card, PageContainer, Input } from "../../components/ui";
import orbeesLogo from "../../assets/orbees-logo-full.png";
import { Logo } from "../../components/Layouts/AuthLayout/AuthLayout.styles";
import { Description, StatusIcon, Title } from "./Auth.styles";

interface ResetPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"form" | "success" | "error">(
    token ? "form" : "error"
  );
  const [errorMsg, setErrorMsg] = useState(
    token ? "" : "Token inválido ou ausente."
  );
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ResetPasswordForm>();

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) return;
    try {
      setLoading(true);
      await authService.resetPassword(token, data.newPassword);
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(getErrorMessage(err, "Erro ao redefinir senha."));
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer background="dark" centered>
      <Card centered maxWidth="420px">
        <Logo src={orbeesLogo} alt="Orbees" />

        {status === "form" && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Title>Redefinir senha</Title>
            <Description>Digite sua nova senha abaixo.</Description>

            <Input
              label="NOVA SENHA"
              type="password"
              placeholder="••••••••"
              error={errors.newPassword?.message}
              {...register("newPassword", {
                required: "Senha é obrigatória.",
                minLength: {
                  value: 8,
                  message: "Senha deve ter no mínimo 8 caracteres.",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                  message:
                    "Senha deve ter ao menos 1 letra maiúscula e 1 caractere especial.",
                },
              })}
            />

            <Input
              label="CONFIRMAR SENHA"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Confirmação é obrigatória.",
                validate: (value) =>
                  value === getValues("newPassword") ||
                  "As senhas não coincidem.",
              })}
            />

            <Button type="submit" fullWidth loading={loading}>
              Redefinir senha
            </Button>
          </form>
        )}

        {status === "success" && (
          <>
            <StatusIcon $success>✓</StatusIcon>
            <Title>Senha redefinida!</Title>
            <Description>Sua senha foi alterada com sucesso.</Description>
            <Button fullWidth onClick={() => navigate("/login")}>
              Ir para o login
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <StatusIcon $success={false}>✕</StatusIcon>
            <Title>Erro ao redefinir</Title>
            <Description $error>{errorMsg}</Description>
            <Button
              fullWidth
              variant="secondary"
              onClick={() => navigate("/login")}
            >
              Voltar para o login
            </Button>
          </>
        )}
      </Card>
    </PageContainer>
  );
};
