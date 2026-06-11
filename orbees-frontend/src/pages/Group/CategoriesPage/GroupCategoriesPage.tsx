import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoriesPage } from "../../Individual/CategoriesPage/CategoriesPage";
import { useGroups } from "../../../hooks/useGroups";
import { useAuthState } from "../../../contexts/useAuthContext";

export const GroupCategoriesPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { user } = useAuthState();
  const { members, fetchMembers } = useGroups();

  useEffect(() => {
    if (groupId) fetchMembers(groupId);
  }, [groupId, fetchMembers]);

  const currentMember = members.find((m) => m.userId === user?.id);
  const isAdmin = currentMember?.role === "Administrador";

  return <CategoriesPage groupId={groupId} canEdit={isAdmin} />;
};
