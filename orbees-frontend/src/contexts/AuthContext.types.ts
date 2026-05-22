import type { LoginDto, RegisterDto } from "../interfaces/auth";
import type { UserReadDto } from "../interfaces/user";

export interface AuthContextData {
  user: UserReadDto | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (dto: LoginDto) => Promise<boolean>;
  register: (dto: RegisterDto) => Promise<boolean>;
  logout: () => void;
}
