import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/useAuthContext";
import { Button, Input, ErrorMessage, Modal } from "../../components/ui";
import { CheckboxWrapper } from "../../components/ui/Modal/Modal.styles";
import {
  AuthCard,
  AuthCardFooter,
  AuthCardSubtitle,
  AuthLayout,
  AuthCardTitle,
} from "../../components/Layouts";

interface RegisterForm {
  fullname: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const TERMS_TEXT = `
1. Aceitando os Termos
Ao navegar e usar o site da Orbees, você concorda automaticamente com nossas regras e condições. Estamos sempre procurando melhorar, então esses termos podem mudar de vez em quando. Se fizermos alterações significativas, vamos postar as atualizações aqui no site. Continuar usando o site após essas mudanças significa que você aceita os novos termos.

2. Como Usar o Nosso Site
A maior parte do nosso site está aberta para você sem a necessidade de cadastro. No entanto, algumas seções especiais podem exigir que você crie uma conta. Pedimos que você seja honesto ao fornecer suas informações e que mantenha sua senha e login seguros.

3. Sua Privacidade
Na Orbees, a privacidade é um valor essencial. Ao interagir com nosso site, você aceita nossa Política de Privacidade, que detalha nossa abordagem responsável e conforme às leis para o manejo dos seus dados pessoais.

4. Direitos de Conteúdo
O conteúdo disponível no site da Orbees constitui propriedade intelectual protegida tanto pela legislação nacional quanto por tratados internacionais sobre direitos autorais e propriedade industrial.

5. Cookies e Mais
Utilizamos cookies para melhorar sua experiência, coletando informações anônimas durante sua visita, como suas preferências de idioma, duração da visita e páginas acessadas.

6. Explorando Links Externos
Nosso site pode incluir links para sites externos que achamos que podem ser do seu interesse. Note que não temos controle sobre esses sites externos.

7. Mudanças e Atualizações
A evolução é parte de como operamos, o que significa que estes Termos de Uso podem passar por atualizações para refletir melhor as mudanças em nossos serviços ou na legislação.

Dúvidas? Entre em contato: suporte@orbees.com.br
`;

export const RegisterPage = () => {
  const { register: registerUser, loading, error } = useAuthContext();
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [pendingData, setPendingData] = useState<RegisterForm | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = (data: RegisterForm) => {
    setPendingData(data);
    setShowTerms(true);
  };

  const handleConfirmRegister = async () => {
    if (!pendingData || !agreedToTerms) return;

    const success = await registerUser({
      fullname: pendingData.fullname,
      email: pendingData.email,
      username: pendingData.username,
      password: pendingData.password,
    });

    if (success) {
      setShowTerms(false);
      navigate("/login?registered=true");
    }
  };

  return (
    <>
      <AuthLayout>
        <AuthCard onSubmit={handleSubmit(onSubmit)}>
          <AuthCardTitle>Criar conta</AuthCardTitle>
          <AuthCardSubtitle>Comece gratuitamente!</AuthCardSubtitle>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            label="NOME COMPLETO"
            type="text"
            placeholder="Seu nome completo"
            error={errors.fullname?.message}
            {...register("fullname", {
              required: "Nome é obrigatório.",
              pattern: {
                value: /^[a-zA-ZÀ-ÿ\s]+$/,
                message:
                  "Nome não pode conter números ou caracteres especiais.",
              },
            })}
          />

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
            label="USUÁRIO"
            type="text"
            placeholder="seu.usuario"
            error={errors.username?.message}
            {...register("username", {
              required: "Usuário é obrigatório.",
              minLength: {
                value: 3,
                message: "Usuário deve ter no mínimo 3 caracteres.",
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
              required: "Confirmação de senha é obrigatória.",
              validate: (value) =>
                value === getValues("password") || "As senhas não coincidem.",
            })}
          />
          <Button type="submit" fullWidth loading={loading}>
            Cadastrar →
          </Button>
          <AuthCardFooter>
            Já tem conta? <Link to="/login">Entrar</Link>
          </AuthCardFooter>
        </AuthCard>
      </AuthLayout>
      {showTerms && (
        <Modal
          title="Termos de Uso e Serviço"
          onClose={() => setShowTerms(false)}
          actions={
            <Button
              fullWidth
              disabled={!agreedToTerms}
              loading={loading}
              onClick={handleConfirmRegister}
            >
              Cadastrar
            </Button>
          }
        >
          {TERMS_TEXT.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <CheckboxWrapper>
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            Li e concordo com os termos de uso
          </CheckboxWrapper>
        </Modal>
      )}
    </>
  );
};
