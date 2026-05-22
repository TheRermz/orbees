export interface UserReadDto {
  id: string;
  email: string;
  fullname: string;
  username: string;
  emailConfirmed: boolean;
  profilePicturePath?: string;
  createdAt: string;
}

export interface UserUpdateDto {
  fullname?: string;
  username?: string;
}

export interface UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
}
