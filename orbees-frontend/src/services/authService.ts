import { api } from "./api";
import type { LoginDto, RegisterDto, AuthResponse } from "../interfaces/auth";

export const authService = {
  login: async (dto: LoginDto): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/login", dto);
    return data;
  },

  register: async (dto: RegisterDto): Promise<void> => {
    await api.post("/auth/register", dto);
  },

  confirmEmail: async (token: string): Promise<void> => {
    await api.get("/auth/confirm-email", { params: { token } });
  },

  forgotPassword: async (email: string): Promise<void> => {
    await api.post("/auth/forgot-password", { email });
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await api.post("/auth/reset-password", { token, newPassword });
  },

  exchangeCode: async (code: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/exchange", { code });
    return data;
  },

  logout: (): void => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },
};
