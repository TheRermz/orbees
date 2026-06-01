import { useNavigate } from "react-router-dom";
import {
  Container,
  CreateButton,
  IconBox,
  Subtitle,
} from "./NoGroupPage.styles";
import { Users } from "lucide-react";
import { Title } from "../NotFound/NotFoundPage.styles";

export const NoGroupPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <IconBox>
        <Users size={28} />
      </IconBox>
      <Title>Você não está em nenhum grupo</Title>
      <Subtitle>
        Crie um grupo para gerenciar finanças em conjunto com outras pessoas.
      </Subtitle>
      <CreateButton onClick={() => navigate("/group-create")}>
        Criar grupo
      </CreateButton>
    </Container>
  );
};
