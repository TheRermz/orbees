import { useEffect } from "react";
import { Users, Crown, LogOut, Check } from "lucide-react";
import { useAuthState } from "../../../contexts/useAuthContext";
import { useGroups } from "../../../hooks/useGroups";
import {
  PanelTitle,
  Section,
  InfoBox,
  GroupCard,
  GroupAvatar,
  GroupInfo,
  GroupName,
  GroupMeta,
  RoleBadge,
  LeaveButton,
  PermissionsCard,
  PermissionsTitle,
  PermissionItem,
} from "../SettingsPage.styles";
import { ADMIN_PERMISSIONS, MEMBER_PERMISSIONS } from "../constants";
import { useToast } from "../../../contexts/useToast";
import { Button } from "../../../components/ui";
import { useNavigate } from "react-router-dom";

export const GroupsTab = () => {
  const { user } = useAuthState();
  const { groups, members, fetchGroups, fetchMembers, leave, loading, error } =
    useGroups();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const group = groups[0];
  const myMember = members.find((m) => m.userId === user?.id);
  const isAdmin = myMember?.role === "Administrador";

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  useEffect(() => {
    if (group?.id) fetchMembers(group.id);
  }, [group?.id, fetchMembers]);

  const handleLeave = async () => {
    if (!group) return;
    const success = await leave(group.id);
    if (success) {
      showToast("success", "Você saiu do grupo.");
      fetchGroups();
    } else {
      showToast("error", error ?? "Erro ao sair do grupo.");
    }
  };

  return (
    <>
      <PanelTitle>
        <Users size={18} /> Grupo atual
      </PanelTitle>
      <Section>
        <InfoBox>
          Cada usuário pode participar de <strong>apenas um grupo</strong> por
          vez. Para entrar em outro grupo, você precisa sair do atual primeiro.
        </InfoBox>

        {group ? (
          <>
            <GroupCard>
              <GroupAvatar>{group.name[0].toUpperCase()}</GroupAvatar>
              <GroupInfo>
                <GroupName>{group.name}</GroupName>
                <GroupMeta>
                  {group.memberCount} membro{group.memberCount !== 1 ? "s" : ""}{" "}
                  · Desde{" "}
                  {new Date(group.createdAt).toLocaleDateString("pt-BR", {
                    month: "long",
                    year: "numeric",
                  })}
                </GroupMeta>
              </GroupInfo>
              {isAdmin && (
                <RoleBadge>
                  <Crown size={12} /> Administrador
                </RoleBadge>
              )}
              <LeaveButton onClick={handleLeave} disabled={loading}>
                <LogOut size={14} /> Sair do grupo
              </LeaveButton>
            </GroupCard>

            <PermissionsCard>
              <PermissionsTitle>
                Suas permissões como{" "}
                <strong>{myMember?.role ?? "Membro"}</strong>
              </PermissionsTitle>
              {(isAdmin ? ADMIN_PERMISSIONS : MEMBER_PERMISSIONS).map((p) => (
                <PermissionItem key={p}>
                  <Check size={14} color="#22c55e" /> {p}
                </PermissionItem>
              ))}
            </PermissionsCard>
          </>
        ) : (
          <>
            <InfoBox>Você não pertence a nenhum grupo no momento.</InfoBox>
            <Button variant="primary" onClick={() => navigate("/group-create")}>
              Criar um grupo
            </Button>
          </>
        )}
      </Section>
    </>
  );
};
