import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/useAuthContext";
import type { LoginDto } from "../../interfaces/auth";
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
  FormGroup,
  Label,
  Input,
  SubmitButton,
  Divider,
  GoogleButton,
  GoogleIcon,
  FooterText,
  ErrorMessage,
  FieldError,
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
    if (success) navigate("/individual/dashboard");
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

          <FormGroup>
            <Label>E-MAIL</Label>
            <Input
              type="email"
              placeholder="seu@email.com"
              {...register("email", {
                required: "E-mail é obrigatório.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "E-mail inválido.",
                },
              })}
              $hasError={!!errors.email}
            />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </FormGroup>

          <FormGroup>
            <Label>SENHA</Label>
            <Input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Senha é obrigatória.",
              })}
              $hasError={!!errors.password}
            />
            {errors.password && (
              <FieldError>{errors.password.message}</FieldError>
            )}
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar →"}
          </SubmitButton>

          <Divider>ou</Divider>

          <GoogleButton type="button" onClick={handleGoogleLogin}>
            <GoogleIcon>G</GoogleIcon>
            Continuar com Google
          </GoogleButton>

          <FooterText>
            Não tem conta? <Link to="/register">Cadastre-se grátis</Link>
          </FooterText>
        </FormCard>
      </RightPanel>
    </Container>
  );
};
