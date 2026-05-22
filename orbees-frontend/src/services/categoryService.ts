import { api } from "./api";
import type {
  CategoryReadDto,
  CategoryCreateDto,
  CategoryUpdateDto,
} from "../interfaces/category";

export const categoryService = {
  getAll: async (groupId?: string): Promise<CategoryReadDto[]> => {
    const { data } = await api.get<CategoryReadDto[]>("/categories", {
      params: { groupId },
    });
    return data;
  },

  getById: async (id: string): Promise<CategoryReadDto> => {
    const { data } = await api.get<CategoryReadDto>(`/categories/${id}`);
    return data;
  },

  create: async (dto: CategoryCreateDto): Promise<CategoryReadDto> => {
    const { data } = await api.post<CategoryReadDto>("/categories", dto);
    return data;
  },

  update: async (
    id: string,
    dto: CategoryUpdateDto
  ): Promise<CategoryReadDto> => {
    const { data } = await api.put<CategoryReadDto>(`/categories/${id}`, dto);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};
