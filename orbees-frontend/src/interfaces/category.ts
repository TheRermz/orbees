export interface CategoryReadDto {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  isSystemCategory: boolean;
  groupId?: string;
  groupName?: string;
  isSystem: boolean;
}

export interface CategoryCreateDto {
  name: string;
  icon?: string;
  color?: string;
  groupId?: string;
}

export interface CategoryUpdateDto {
  name?: string;
  icon?: string;
  color?: string;
}
