import { useState, useEffect } from "react";
import { userService } from "../services/userService";
import type {
  UserReadDto,
  UserUpdateDto,
  UpdatePasswordDto,
} from "../interfaces/user";
import { getErrorMessage } from "../helpers/error";

export const useUser = () => {
  const [user, setUser] = useState<UserReadDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMe = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getMe();
      setUser(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao buscar usuário."));
    } finally {
      setLoading(false);
    }
  };

  const updateMe = async (dto: UserUpdateDto): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.updateMe(dto);
      setUser(data);
      return null;
    } catch (err: unknown) {
      const msg = getErrorMessage(err, "Erro ao atualizar usuário.");
      setError(msg);
      return msg;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (dto: UpdatePasswordDto): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      await userService.updatePassword(dto);
      return null;
    } catch (err: unknown) {
      const msg = getErrorMessage(err, "Erro ao atualizar senha.");
      setError(msg);
      return msg;
    } finally {
      setLoading(false);
    }
  };

  const updateProfilePicture = async (file: File): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.updateProfilePicture(file);
      setUser(data);
      return null;
    } catch (err: unknown) {
      const msg = getErrorMessage(err, "Erro ao atualizar foto.");
      setError(msg);
      return msg;
    } finally {
      setLoading(false);
    }
  };

  const deleteProfilePicture = async (): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      await userService.deleteProfilePicture();
      setUser((prev) =>
        prev ? { ...prev, profilePicturePath: undefined } : null
      );
      return null;
    } catch (err: unknown) {
      const msg = getErrorMessage(err, "Erro ao remover foto.");
      setError(msg);
      return msg;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return {
    user,
    loading,
    error,
    fetchMe,
    updateMe,
    updatePassword,
    updateProfilePicture,
    deleteProfilePicture,
  };
};
