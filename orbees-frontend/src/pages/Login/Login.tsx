import { useForm } from "react-hook-form";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/useAuthContext";
import type { LoginDto } from "../../interfaces/auth";
import {
  Button,
  Input,
  Divider,
  ErrorMessage,
  SuccessMessage,
} from "../../components/ui";
import {
  AuthCard,
  AuthCardFooter,
  AuthCardSubtitle,
  AuthCardTitle,
  AuthLayout,
} from "../../components/Layouts";
import { GoogleIcon } from "./Login.styles";

export const LoginPage = () => {
  const { login, loading, error } = useAuthContext();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const googleError = searchParams.get("error");
  const registered = searchParams.get("registered");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>();

  const onSubmit = async (dto: LoginDto) => {
    const success = await login(dto);
    if (success) navigate("/dashboard");
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
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
          {error && <ErrorMessage>{error}</ErrorMessage>}
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
    </>
  );
};
