import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Crown, Eye, UserPlus } from "lucide-react";
import { useGroups } from "../../../hooks/useGroups";
import { useAuthState } from "../../../contexts/useAuthContext";
import { Button, Modal, ErrorMessage, Input } from "../../../components/ui";
import type { GroupMemberReadDto } from "../../../interfaces/group";
import {
  Container,
  Header,
  HeaderLeft,
  PageTitle,
  PageSubtitle,
  GroupCard,
  AvatarStack,
  StackAvatar,
  GroupName,
  SectionCard,
  SectionHeader,
  SectionTitle,
  MemberRow,
  MemberAvatar,
  MemberInfo,
  MemberName,
  MemberEmail,
  RoleBadge,
  InfoCard,
  InfoText,
  ModalField,
  ModalLabel,
  ModalSelect,
  ModalMemberInfo,
  MemberAvatar as ModalAvatar,
  MemberName as ModalName,
  MemberEmail as ModalEmail,
  RemoveLink,
} from "./GroupMembers.styles";
import { getColor, getInitial } from "./interface";
import { getErrorMessage } from "../../../helpers/error";
import { groupService } from "../../../services/groupService";
import { userService } from "../../../services/userService";

export const GroupMembersPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { user } = useAuthState();
  const {
    groups,
    members,
    fetchGroups,
    fetchMembers,
    updateMemberRole,
    removeMember,
  } = useGroups();

  const [editing, setEditing] = useState<GroupMemberReadDto | null>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);

  const group = groups.find((g) => g.id === groupId);

  useEffect(() => {
    fetchGroups();
    if (groupId) fetchMembers(groupId);
    groupService.getRoles().then(setRoles);
  }, [fetchGroups, fetchMembers, groupId]);

  const openEdit = (member: GroupMemberReadDto) => {
    if (member.userId === user?.id) return;
    setEditing(member);
    setSelectedRole(member.role);
    setError(null);
  };

  const handleUpdateRole = async () => {
    if (!editing || !groupId) return;
    setRoleLoading(true);
    const roleId = roles.find((r) => r.name === selectedRole)?.id;
    if (!roleId) {
      setRoleLoading(false);
      return;
    }
    const success = await updateMemberRole(groupId, editing.id, roleId);
    setRoleLoading(false);
    if (success) setEditing(null);
    else setError("Erro ao atualizar papel.");
  };

  const handleRemove = async () => {
    if (!editing || !groupId) return;
    setRemoveLoading(true);
    const success = await removeMember(groupId, editing.id);
    setRemoveLoading(false);
    if (success) {
      setShowRemoveModal(false);
      setEditing(null);
    } else {
      setError("Erro ao remover membro.");
    }
  };

  const handleInvite = async () => {
    if (!inviteEmail.trim() || !groupId) return;
    setInviteLoading(true);
    setInviteError(null);
    try {
      const found = await userService.getByEmail(inviteEmail);
      await groupService.addMember(groupId, found.id);
      await fetchMembers(groupId);
      setShowInviteModal(false);
      setInviteEmail("");
    } catch (err: unknown) {
      setInviteError(
        getErrorMessage(
          err,
          "Usuário não encontrado ou já pertence a um grupo."
        )
      );
    } finally {
      setInviteLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <PageTitle>Controle em Grupo</PageTitle>
          <PageSubtitle>
            Conta compartilhada — {members.length} membro
            {members.length !== 1 ? "s" : ""}
          </PageSubtitle>
        </HeaderLeft>
        <GroupCard style={{ margin: 0 }}>
          <AvatarStack>
            {members.slice(0, 3).map((m, i) => (
              <StackAvatar key={m.id} $color={getColor(i)}>
                {getInitial(m.fullname)}
              </StackAvatar>
            ))}
          </AvatarStack>
          <GroupName>{group?.name ?? "Grupo"}</GroupName>
        </GroupCard>
      </Header>

      <SectionCard style={{ margin: "24px 32px 0" }}>
        <SectionHeader>
          <SectionTitle>Membros do Grupo</SectionTitle>
          <Button onClick={() => setShowInviteModal(true)}>
            <UserPlus size={16} /> Convidar Membro
          </Button>
        </SectionHeader>
        {members.map((member, i) => {
          const isMe = member.userId === user?.id;
          const isAdmin = member.role === "Administrador";
          return (
            <MemberRow
              key={member.id}
              $clickable={!isMe}
              onClick={() => openEdit(member)}
            >
              <MemberAvatar $color={getColor(i)}>
                {getInitial(member.fullname)}
              </MemberAvatar>
              <MemberInfo>
                <MemberName>
                  {member.fullname}
                  {isMe ? " (você)" : ""}
                </MemberName>
                <MemberEmail>{member.username}</MemberEmail>
              </MemberInfo>
              <RoleBadge $admin={isAdmin}>
                {isAdmin ? <Crown size={14} /> : <Eye size={14} />}
                {member.role}
              </RoleBadge>
            </MemberRow>
          );
        })}
      </SectionCard>

      <InfoCard>
        <InfoText>
          <strong>Permissões:</strong> Administradores podem convidar membros,
          criar/editar categorias e incluir ou excluir qualquer transação.
          Membros podem visualizar transações, incluir novas e excluir apenas as
          próprias.
        </InfoText>
        <InfoText>Cada usuário pode pertencer a apenas um grupo.</InfoText>
      </InfoCard>

      {editing && (
        <Modal
          title={`Gerenciar: ${editing.fullname}`}
          onClose={() => setEditing(null)}
          actions={
            <>
              <RemoveLink onClick={() => setShowRemoveModal(true)}>
                Remover do grupo
              </RemoveLink>
              <Button variant="secondary" onClick={() => setEditing(null)}>
                Cancelar
              </Button>
              <Button loading={roleLoading} onClick={handleUpdateRole}>
                Salvar
              </Button>
            </>
          }
        >
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <ModalMemberInfo>
            <ModalAvatar
              $color={getColor(members.findIndex((m) => m.id === editing.id))}
            >
              {getInitial(editing.fullname)}
            </ModalAvatar>
            <div>
              <ModalName>{editing.fullname}</ModalName>
              <ModalEmail>{editing.username}</ModalEmail>
            </div>
          </ModalMemberInfo>

          <ModalField>
            <ModalLabel>PAPEL</ModalLabel>
            <ModalSelect
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {roles.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
            </ModalSelect>
          </ModalField>
        </Modal>
      )}

      {showInviteModal && (
        <Modal
          title="Convidar Membro"
          onClose={() => {
            setShowInviteModal(false);
            setInviteEmail("");
            setInviteError(null);
          }}
          actions={
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowInviteModal(false);
                  setInviteEmail("");
                }}
              >
                Cancelar
              </Button>
              <Button loading={inviteLoading} onClick={handleInvite}>
                Convidar
              </Button>
            </>
          }
        >
          {inviteError && <ErrorMessage>{inviteError}</ErrorMessage>}
          <ModalField>
            <ModalLabel>E-MAIL DO USUÁRIO</ModalLabel>
            <Input
              type="email"
              placeholder="usuario@email.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
          </ModalField>
        </Modal>
      )}

      {showRemoveModal && editing && (
        <Modal
          title="Remover membro"
          description={`Tem certeza que deseja remover ${editing.fullname} do grupo?`}
          onClose={() => setShowRemoveModal(false)}
          actions={
            <>
              <Button
                variant="secondary"
                onClick={() => setShowRemoveModal(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                loading={removeLoading}
                onClick={handleRemove}
              >
                Remover
              </Button>
            </>
          }
        />
      )}
    </Container>
  );
};
