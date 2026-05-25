import { useForm } from "react-hook-form";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuthActions } from "../../contexts/useAuthContext";
import type { LoginDto } from "../../interfaces/auth";
import {
  Button,
  Input,
  Divider,
  ErrorMessage,
  SuccessMessage,
  Modal,
} from "../../components/ui";
import {
  AuthCard,
  AuthCardFooter,
  AuthCardSubtitle,
  AuthCardTitle,
  AuthLayout,
} from "../../components/Layouts";
import { ForgotPasswordLink, GoogleIcon } from "./Login.styles";
import { useState } from "react";

export const LoginPage = () => {
  const { login, forgotPassword } = useAuthActions();

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const [searchParams] = useSearchParams();
  const googleError = searchParams.get("error");
  const registered = searchParams.get("registered");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>();

  const onSubmit = async (dto: LoginDto) => {
    setLoading(true);
    setLoginError(null);
    const { success, error } = await login(dto);
    setLoading(false);
    if (success) navigate("/dashboard");
    else setLoginError(error ?? "E-mail ou senha inválidos.");
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setForgotError("E-mail é obrigatório.");
      return;
    }
    const { success, error } = await forgotPassword(forgotEmail);
    if (success) {
      setForgotSuccess(true);
    } else {
      setForgotError(error ?? "Erro ao enviar e-mail.");
    }
  };

  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false);
    setForgotEmail("");
    setForgotError(null);
    setForgotSuccess(false);
  };

  return (
    <>
      <AuthLayout>
        <AuthCard onSubmit={handleSubmit(onSubmit)}>
          <AuthCardTitle>Entrar na conta</AuthCardTitle>
          <AuthCardSubtitle>Bem-vindo de volta!</AuthCardSubtitle>
          {registered && (
            <SuccessMessage>
              Confirme seu email para acessar o Orbees.
            </SuccessMessage>
          )}
          {googleError && (
            <ErrorMessage>
              Falha na autenticação com Google. Tente novamente.
            </ErrorMessage>
          )}
          {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
          <Input
            label="E-MAIL"
            type="email"
            placeholder="seu@email.com"
            error={errors.email?.message}
            {...register("email", {
              required: "E-mail é obrigatório.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "E-mail inválido.",
              },
            })}
          />

          <Input
            label="SENHA"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password", {
              required: "Senha é obrigatória.",
            })}
          />

          <ForgotPasswordLink
            type="button"
            onClick={() => setShowForgotPassword(true)}
          >
            Esqueceu sua senha?
          </ForgotPasswordLink>

          <Button type="submit" fullWidth loading={loading}>
            Entrar →
          </Button>
          <Divider />
          <Button
            type="button"
            variant="google"
            fullWidth
            onClick={handleGoogleLogin}
          >
            <GoogleIcon>G</GoogleIcon>
            Continuar com Google
          </Button>
          <AuthCardFooter>
            Não tem conta? <Link to="/register">Cadastre-se grátis</Link>
          </AuthCardFooter>
        </AuthCard>
      </AuthLayout>
      {showForgotPassword && (
        <Modal
          title="Recuperar senha"
          onClose={handleCloseForgotPassword}
          actions={
            !forgotSuccess ? (
              <Button fullWidth onClick={handleForgotPassword}>
                Enviar
              </Button>
            ) : (
              <Button
                fullWidth
                onClick={handleCloseForgotPassword}
                loading={loading}
              >
                Fechar
              </Button>
            )
          }
        >
          {forgotSuccess ? (
            <SuccessMessage>
              Enviamos um link de recuperação para {forgotEmail}. Verifique sua
              caixa de entrada.
            </SuccessMessage>
          ) : (
            <>
              {forgotError && <ErrorMessage>{forgotError}</ErrorMessage>}
              <Input
                label="E-MAIL"
                type="email"
                placeholder="seu@email.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </>
          )}
        </Modal>
      )}
    </>
  );
};
