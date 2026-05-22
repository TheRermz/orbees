import { useState, useEffect, useCallback } from "react";
import { categoryService } from "../services/categoryService";
import type {
  CategoryReadDto,
  CategoryCreateDto,
  CategoryUpdateDto,
} from "../interfaces/category";
import { getErrorMessage } from "../helpers/error";

export const useCategories = (groupId?: string) => {
  const [categories, setCategories] = useState<CategoryReadDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAll(groupId);
      setCategories(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao buscar categorias."));
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  const create = async (dto: CategoryCreateDto): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.create(dto);
      setCategories((prev) => [...prev, data]);
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao criar categoria."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const update = async (
    id: string,
    dto: CategoryUpdateDto
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.update(id, dto);
      setCategories((prev) => prev.map((c) => (c.id === id ? data : c)));
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao atualizar categoria."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await categoryService.delete(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao deletar categoria."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    create,
    update,
    remove,
  };
};
