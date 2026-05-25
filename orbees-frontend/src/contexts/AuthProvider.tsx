import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { AuthStateContext, AuthActionsContext } from "./AuthContext";
import { authService } from "../services/authService";
import { userService } from "../services/userService";
import { tokenStorage } from "../helpers/storage";
import { getErrorMessage } from "../helpers/error";
import type { LoginDto, RegisterDto } from "../interfaces/auth";
import type { UserReadDto } from "../interfaces/user";
import type { AuthResult } from "./AuthContext.types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserReadDto | null>(null);
  const [initializing, setInitializing] = useState(() => !!tokenStorage.get());

  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) return;

    userService
      .getMe()
      .then(setUser)
      .catch(() => tokenStorage.remove())
      .finally(() => setInitializing(false));
  }, []);

  const login = useCallback(async (dto: LoginDto): Promise<AuthResult> => {
    try {
      const { token } = await authService.login(dto);
      tokenStorage.set(token);
      const me = await userService.getMe();
      setUser(me);
      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        error: getErrorMessage(err, "E-mail ou senha inválidos."),
      };
    }
  }, []);

  const register = useCallback(
    async (dto: RegisterDto): Promise<AuthResult> => {
      try {
        await authService.register(dto);
        return { success: true };
      } catch (err: unknown) {
        return {
          success: false,
          error: getErrorMessage(err, "Erro ao criar conta."),
        };
      }
    },
    []
  );

  const forgotPassword = useCallback(
    async (email: string): Promise<AuthResult> => {
      try {
        await authService.forgotPassword(email);
        return { success: true };
      } catch (err: unknown) {
        return {
          success: false,
          error: getErrorMessage(err, "Erro ao enviar e-mail de recuperação."),
        };
      }
    },
    []
  );

  const logout = useCallback(() => {
    tokenStorage.remove();
    setUser(null);
    window.location.href = "/login";
  }, []);

  return (
    <AuthActionsContext.Provider
      value={{ login, register, forgotPassword, logout }}
    >
      <AuthStateContext.Provider
        value={{ user, isAuthenticated: !!user, initializing }}
      >
        {children}
      </AuthStateContext.Provider>
    </AuthActionsContext.Provider>
  );
};
