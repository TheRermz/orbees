import { api } from "./api";
import type {
  UserReadDto,
  UserUpdateDto,
  UpdatePasswordDto,
} from "../interfaces/user";

export const userService = {
  getMe: async (): Promise<UserReadDto> => {
    const { data } = await api.get<UserReadDto>("/users/me");
    return data;
  },

  updateMe: async (dto: UserUpdateDto): Promise<UserReadDto> => {
    const { data } = await api.put<UserReadDto>("/users/me", dto);
    return data;
  },

  updatePassword: async (dto: UpdatePasswordDto): Promise<void> => {
    await api.put("/users/me/password", dto);
  },

  updateProfilePicture: async (file: File): Promise<UserReadDto> => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.put<UserReadDto>("/users/me/picture", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  deleteProfilePicture: async (): Promise<void> => {
    await api.delete("/users/me/picture");
  },

  deleteMe: async (): Promise<void> => {
    await api.delete("/users/me");
  },
};
