export interface GroupReadDto {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  createdAt: string;
}

export interface GroupMemberReadDto {
  id: string;
  userId: string;
  username: string;
  fullname: string;
  role: string;
  joinedAt: string;
}

export interface GroupCreateDto {
  name: string;
  description?: string;
}

export interface GroupUpdateDto {
  name?: string;
  description?: string;
}
