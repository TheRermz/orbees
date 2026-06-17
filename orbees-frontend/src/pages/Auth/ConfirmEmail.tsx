import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { getErrorMessage } from "../../helpers/error";
import { Button, Card, PageContainer } from "../../components/ui";
import orbeesLogo from "../../assets/orbees-logo-full.png";
import { Logo } from "../../components/Layouts/AuthLayout/AuthLayout.styles";
import { Description, StatusIcon, Title } from "./Auth.styles";

export const ConfirmEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMsg, setErrorMsg] = useState(
    token ? "" : "Token inválido ou ausente."
  );
  const hasConfirmed = useRef(false);

  useEffect(() => {
    if (!token || hasConfirmed.current) return;
    hasConfirmed.current = true;

    authService
      .confirmEmail(token)
      .then(() => setStatus("success"))
      .catch((err) => {
        setStatus("error");
        setErrorMsg(getErrorMessage(err, "Erro ao confirmar e-mail."));
      });
  }, [token]);

  return (
    <PageContainer background="dark" centered>
      <Card centered maxWidth="420px">
        <Logo src={orbeesLogo} alt="Orbees" />

        {status === "loading" && (
          <>
            <Title>Confirmando seu e-mail...</Title>
            <Description>Aguarde um momento.</Description>
          </>
        )}

        {status === "success" && (
          <>
            <StatusIcon $success>✓</StatusIcon>
            <Title>E-mail confirmado!</Title>
            <Description>
              Sua conta foi ativada. Faça login para começar.
            </Description>
            <Button fullWidth onClick={() => navigate("/login")}>
              Ir para o login
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <StatusIcon $success={false}>✕</StatusIcon>
            <Title>Erro na confirmação</Title>
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
