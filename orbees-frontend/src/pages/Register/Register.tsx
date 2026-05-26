import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, ErrorMessage, Modal } from "../../components/ui";
import { CheckboxWrapper } from "../../components/ui/Modal/Modal.styles";
import {
  AuthCard,
  AuthCardFooter,
  AuthCardSubtitle,
  AuthLayout,
  AuthCardTitle,
} from "../../components/Layouts";
import { useAuthActions } from "../../contexts/useAuthContext";
import {
  TERMS_TEXT,
  type RegisterForm,
} from "../Individual/Dashboard/interface";

export const RegisterPage = () => {
  const { register: registerUser } = useAuthActions();
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [pendingData, setPendingData] = useState<RegisterForm | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const { success, error } = await registerUser({
      fullname: pendingData.fullname,
      email: pendingData.email,
      username: pendingData.username,
      password: pendingData.password,
    });
    setLoading(false);
    if (success) {
      setShowTerms(false);
      navigate("/login?registered=true");
    } else {
      setShowTerms(false);
      setRegisterError(error ?? "Erro ao criar conta.");
    }
  };

  return (
    <>
      <AuthLayout>
        <AuthCard onSubmit={handleSubmit(onSubmit)}>
          <AuthCardTitle>Criar conta</AuthCardTitle>
          <AuthCardSubtitle>Comece gratuitamente!</AuthCardSubtitle>
          {registerError && <ErrorMessage>{registerError}</ErrorMessage>}
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
