import { useState } from "react";
import { authService } from "../services/authService";
import { tokenStorage } from "../helpers/storage";
import type { LoginDto, RegisterDto } from "../interfaces/auth";
import { getErrorMessage } from "../helpers/error";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (dto: LoginDto): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const { token } = await authService.login(dto);
      tokenStorage.set(token);
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao fazer o login"));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (dto: RegisterDto): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await authService.register(dto);
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao criar conta."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => authService.logout();

  const isAuthenticated = (): boolean => !!tokenStorage.get();

  return { login, register, logout, isAuthenticated, loading, error };
};
