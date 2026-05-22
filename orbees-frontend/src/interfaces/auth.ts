export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  fullname: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
