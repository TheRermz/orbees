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

  const create = async (dto: GroupCreateDto): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      const data = await groupService.create(dto);
      setGroups((prev) => [...prev, data]);
      return null;
    } catch (err: unknown) {
      const msg = getErrorMessage(err, "Erro ao criar grupo.");
      setError(msg);
      return msg;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, dto: GroupUpdateDto): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      const data = await groupService.update(id, dto);
      setGroups((prev) => prev.map((g) => (g.id === id ? data : g)));
      return null;
    } catch (err: unknown) {
      const msg = getErrorMessage(err, "Erro ao atualizar grupo.");
      setError(msg);
      return msg;
    } finally {
      setLoading(false);
    }
  };

  const updateMemberRole = async (
    groupId: string,
    memberId: string,
    groupRoleId: string
  ): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      await groupService.updateMemberRole(groupId, memberId, groupRoleId);
      return null;
    } catch (err: unknown) {
      const msg = getErrorMessage(err, "Erro ao atualizar papel.");
      setError(msg);
      return msg;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      await groupService.delete(id);
      setGroups((prev) => prev.filter((g) => g.id !== id));
      return null;
    } catch (err: unknown) {
      const msg = getErrorMessage(err, "Erro ao deletar grupo.");
      setError(msg);
      return msg;
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (
    groupId: string,
    userId: string
  ): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      const data = await groupService.addMember(groupId, userId);
      setMembers((prev) => [...prev, data]);
      return null;
    } catch (err: unknown) {
      const msg = getErrorMessage(err, "Erro ao adicionar membro.");
      setError(msg);
      return msg;
    } finally {
      setLoading(false);
    }
  };

  const removeMember = async (
    groupId: string,
    memberId: string
  ): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      await groupService.removeMember(groupId, memberId);
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
      return null;
    } catch (err: unknown) {
      const msg = getErrorMessage(err, "Erro ao remover membro.");
      setError(msg);
      return msg;
    } finally {
      setLoading(false);
    }
  };

  const leave = async (groupId: string): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      await groupService.leave(groupId);
      setGroups((prev) => prev.filter((g) => g.id !== groupId));
      return null;
    } catch (err: unknown) {
      const msg = getErrorMessage(err, "Erro ao sair do grupo.");
      setError(msg);
      return msg;
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
