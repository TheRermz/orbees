import { useNavigate } from "react-router-dom";
import { useToast } from "../../../contexts/useToast";
import { useGroups } from "../../../hooks/useGroups";
import { useGroupActions } from "../../../contexts/useGroupContext";
import { useState } from "react";
import {
  Actions,
  Card,
  CardHeader,
  Container,
  FieldGroup,
  FieldLabel,
  Form,
  IconBox,
  Optional,
  Subtitle,
  Title,
} from "./GroupCreatePage.styles";
import { Users } from "lucide-react";
import { Button, Input } from "../../../components/ui";

export const GroupCreatePage = () => {
  const navigate = useNavigate();
  const { create, loading } = useGroups();
  const { showToast } = useToast();
  const { refreshGroup } = useGroupActions();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      showToast("error", "O nome do grupo é obrigatório.");
      return;
    }

    const errorMsg = await create({
      name: name.trim(),
      description: description.trim() || undefined,
    });

    if (!errorMsg) {
      await refreshGroup();
      showToast("success", "Grupo criado com sucesso!");
      navigate("/individual/dashboard");
    } else {
      showToast("error", errorMsg);
    }
  };

  return (
    <Container>
      <Card>
        <CardHeader>
          <IconBox>
            <Users size={24} />
          </IconBox>
          <Title>Criar grupo</Title>
          <Subtitle>
            Gerencie finanças em conjunto com outras pessoas. Você será o
            administrador do grupo.
          </Subtitle>
        </CardHeader>

        <Form>
          <FieldGroup>
            <FieldLabel>Nome do grupo</FieldLabel>
            <Input
              placeholder="Ex: Família Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>
              Descrição <Optional>(opcional)</Optional>
            </FieldLabel>
            <Input
              placeholder="Ex: Controle financeiro da família"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </FieldGroup>
        </Form>

        <Actions>
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Criando..." : "Criar grupo"}
          </Button>
        </Actions>
      </Card>
    </Container>
  );
};
