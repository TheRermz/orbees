// src/contexts/AuthProvider.tsx
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { authService } from "../services/authService";
import { userService } from "../services/userService";
import { tokenStorage } from "../helpers/storage";
import { getErrorMessage } from "../helpers/error";
import type { LoginDto, RegisterDto } from "../interfaces/auth";
import type { UserReadDto } from "../interfaces/user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserReadDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) {
      setLoading(false);
      return;
    }
    userService
      .getMe()
      .then(setUser)
      .catch(() => tokenStorage.remove())
      .finally(() => setLoading(false));
  }, []);

  const login = async (dto: LoginDto): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const { token } = await authService.login(dto);
      tokenStorage.set(token);
      const me = await userService.getMe();
      setUser(me);
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao fazer login."));
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

  const logout = () => {
    tokenStorage.remove();
    setUser(null);
    window.location.href = "/login";
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await authService.forgotPassword(email);
      return true;
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao enviar e-mail de recuperação."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
