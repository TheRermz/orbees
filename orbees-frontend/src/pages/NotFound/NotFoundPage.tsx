import { useNavigate } from "react-router-dom";
import {
  BackButton,
  Code,
  Container,
  Subtitle,
  Title,
} from "./NotFoundPage.styles";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Code>
        4<span>0</span>4
      </Code>
      <Title>Página não encontrada</Title>
      <Subtitle>
        A página que você está procurando não existe ou foi movida para outro
        endereço.
      </Subtitle>
      <BackButton onClick={() => navigate("/individual/dashboard")}>
        Voltar ao início
      </BackButton>
    </Container>
  );
};
