import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/useAuthContext";
import type { LoginDto } from "../../interfaces/auth";
import { Button, Input, Divider, ErrorMessage } from "../../components/ui";
import {
  Container,
  LeftPanel,
  RightPanel,
  Logo,
  Slogan,
  SloganHighlight,
  SloganDescription,
  BenefitList,
  BenefitItem,
  FormCard,
  FormTitle,
  FormSubtitle,
  FooterText,
  GoogleIcon,
} from "./Login.styles";
import orbeesLogo from "../../assets/orbees-logo-full.png";

export const LoginPage = () => {
  const { login, loading, error } = useAuthContext();
  const navigate = useNavigate();

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
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <Container>
      <LeftPanel>
        <Logo src={orbeesLogo} alt="Orbees" />
        <Slogan>
          Controle suas finanças <SloganHighlight>sem esforço</SloganHighlight>
        </Slogan>
        <SloganDescription>
          Importe seu extrato bancário e tenha uma visão completa da sua vida
          financeira em segundos.
        </SloganDescription>
        <BenefitList>
          <BenefitItem>Importação automática de OFX e CSV</BenefitItem>
          <BenefitItem>Categorização inteligente de transações</BenefitItem>
          <BenefitItem>Controle financeiro individual e em grupo</BenefitItem>
          <BenefitItem>Educação financeira</BenefitItem>
        </BenefitList>
      </LeftPanel>

      <RightPanel>
        <FormCard onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>Entrar na conta</FormTitle>
          <FormSubtitle>Bem-vindo de volta!</FormSubtitle>

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

          <FooterText>
            Não tem conta? <Link to="/register">Cadastre-se grátis</Link>
          </FooterText>
        </FormCard>
      </RightPanel>
    </Container>
  );
};
