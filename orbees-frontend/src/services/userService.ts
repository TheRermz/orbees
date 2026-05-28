import { api } from "./api";
import type {
  UserReadDto,
  UserUpdateDto,
  UpdatePasswordDto,
} from "../interfaces/user";

export const userService = {
  getMe: async (): Promise<UserReadDto> => {
    const { data } = await api.get<UserReadDto>("/user/me");
    return data;
  },

  updateMe: async (dto: UserUpdateDto): Promise<UserReadDto> => {
    const { data } = await api.put<UserReadDto>("/user/me", dto);
    return data;
  },

  updatePassword: async (dto: UpdatePasswordDto): Promise<void> => {
    await api.put("/user/me/password", dto);
  },

  getByEmail: async (email: string) => {
    const { data } = await api.get("/user/by-email", { params: { email } });
    return data as { id: string; fullname: string; email: string };
  },

  updateProfilePicture: async (file: File): Promise<UserReadDto> => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.put<UserReadDto>("/user/me/picture", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  deleteProfilePicture: async (): Promise<void> => {
    await api.delete("/user/me/picture");
  },

  deleteMe: async (): Promise<void> => {
    await api.delete("/user/me");
  },
};
