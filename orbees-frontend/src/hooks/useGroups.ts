import { useState, useEffect, useCallback } from "react";
import { groupService } from "../services/groupService";
import type {
  GroupReadDto,
  GroupMemberReadDto,
  GroupCreateDto,
  GroupUpdateDto,
} from "../interfaces/group";
import { getErrorMessage } from "../helpers/error";

export const useGroups = () => {
  const [groups, setGroups] = useState<GroupReadDto[]>([]);
  const [members, setMembers] = useState<GroupMemberReadDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await groupService.getMyGroups();
      setGroups(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao buscar grupos."));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMembers = useCallback(async (groupId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await groupService.getMembers(groupId);
      setMembers(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao buscar membros."));
    } finally {
      setLoading(false);
    }
  }, []);

  const create = async (dto: GroupCreateDto): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const data = await groupService.create(dto);
      setGroups((prev) => [...prev, data]);
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao criar grupo."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, dto: GroupUpdateDto): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const data = await groupService.update(id, dto);
      setGroups((prev) => prev.map((g) => (g.id === id ? data : g)));
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao atualizar grupo."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateMemberRole = async (
    groupId: string,
    memberId: string,
    groupRoleId: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await groupService.updateMemberRole(groupId, memberId, groupRoleId);
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao atualizar papel."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await groupService.delete(id);
      setGroups((prev) => prev.filter((g) => g.id !== id));
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao deletar grupo."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (
    groupId: string,
    userId: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const data = await groupService.addMember(groupId, userId);
      setMembers((prev) => [...prev, data]);
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao adicionar membro."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeMember = async (
    groupId: string,
    memberId: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await groupService.removeMember(groupId, memberId);
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao remover membro."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const leave = async (groupId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await groupService.leave(groupId);
      setGroups((prev) => prev.filter((g) => g.id !== groupId));
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao sair do grupo."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return {
    groups,
    members,
    loading,
    error,
    fetchGroups,
    fetchMembers,
    create,
    update,
    remove,
    addMember,
    removeMember,
    leave,
    updateMemberRole,
  };
};
