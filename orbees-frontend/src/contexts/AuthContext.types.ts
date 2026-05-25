import type { LoginDto, RegisterDto } from "../interfaces/auth";
import type { UserReadDto } from "../interfaces/user";

export interface AuthResult {
  success: boolean;
  error?: string;
}

export interface AuthStateContextData {
  user: UserReadDto | null;
  isAuthenticated: boolean;
  initializing: boolean;
}

export interface AuthActionsContextData {
  login: (dto: LoginDto) => Promise<AuthResult>;
  register: (dto: RegisterDto) => Promise<AuthResult>;
  forgotPassword: (email: string) => Promise<AuthResult>;
  logout: () => void;
}
