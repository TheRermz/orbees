import { api } from "./api";
import type {
  GroupReadDto,
  GroupMemberReadDto,
  GroupCreateDto,
  GroupUpdateDto,
} from "../interfaces/group";

export const groupService = {
  getMyGroups: async (): Promise<GroupReadDto[]> => {
    const { data } = await api.get<GroupReadDto[]>("/groups");
    return data;
  },

  getById: async (id: string): Promise<GroupReadDto> => {
    const { data } = await api.get<GroupReadDto>(`/groups/${id}`);
    return data;
  },

  getMembers: async (groupId: string): Promise<GroupMemberReadDto[]> => {
    const { data } = await api.get<GroupMemberReadDto[]>(
      `/groups/${groupId}/members`
    );
    return data;
  },

  create: async (dto: GroupCreateDto): Promise<GroupReadDto> => {
    const { data } = await api.post<GroupReadDto>("/groups", dto);
    return data;
  },

  update: async (id: string, dto: GroupUpdateDto): Promise<GroupReadDto> => {
    const { data } = await api.put<GroupReadDto>(`/groups/${id}`, dto);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/groups/${id}`);
  },

  addMember: async (
    groupId: string,
    userId: string
  ): Promise<GroupMemberReadDto> => {
    const { data } = await api.post<GroupMemberReadDto>(
      `/groups/${groupId}/members`,
      { userId }
    );
    return data;
  },

  updateMemberRole: async (
    groupId: string,
    memberId: string,
    groupRoleId: string
  ): Promise<void> => {
    await api.put(`/groups/${groupId}/members/${memberId}/role`, {
      groupRoleId,
    });
  },

  removeMember: async (groupId: string, memberId: string): Promise<void> => {
    await api.delete(`/groups/${groupId}/members/${memberId}`);
  },

  leave: async (groupId: string): Promise<void> => {
    await api.delete(`/groups/${groupId}/leave`);
  },
};
