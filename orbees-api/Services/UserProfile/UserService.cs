using Api.Dtos.User;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces.UserProfile;
using Api.Services.Interfaces.FileService;

namespace Api.Services.UserProfile
{
    public class UserService(IUserRepository userRepository, IFileService fileService) : IUserService
    {
        public async Task<UserReadDto> GetMeAsync(Guid userId)
        {
            var user = await userRepository.GetByIdAsync(userId)
              ?? throw new KeyNotFoundException("Usuário não encontrado");

            return new UserReadDto
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username,
                Fullname = user.Fullname
            };
        }

        public async Task<UserReadDto> UpdateMeAsync(Guid userId, UserUpdateDto dto)
        {
            var user = await userRepository.GetByIdAsync(userId)
              ?? throw new KeyNotFoundException("Usuário não encontrado");

            if (dto.Username != null && dto.Username != user.Username)
            {
                if (await userRepository.UsernameExistsAsync(dto.Username))
                    throw new InvalidOperationException("Username já está em uso.");
                user.Username = dto.Username;
            }

            if (dto.Fullname != null)
                user.Fullname = dto.Fullname;

            await userRepository.UpdateAsync(user);
            await userRepository.SaveChangesAsync();

            return new UserReadDto
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username,
                Fullname = user.Fullname
            };
        }

        public async Task<UserReadDto> UpdateProfilePictureAsync(Guid userId, IFormFile file)
        {
            var user = await userRepository.GetByIdAsync(userId)
              ?? throw new KeyNotFoundException("Usuário não encontrado");

            if (user.ProfilePicturePath != null)
                fileService.DeleteProfilePictureAsync(user.ProfilePicturePath);

            user.ProfilePicturePath = await fileService.SaveProfilePictureAsync(file, userId, user.Username);

            await userRepository.UpdateAsync(user);
            await userRepository.SaveChangesAsync();

            return new UserReadDto
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username,
                Fullname = user.Fullname,
                ProfilePicturePath = user.ProfilePicturePath
            };
        }

        public async Task UpdatePasswordAsync(Guid userId, string currentPassword, string newPassword)
        {
            var user = await userRepository.GetByIdAsync(userId)
              ?? throw new KeyNotFoundException("Usuário não encontrado");

            if (user.PasswordHash == null)
                throw new InvalidOperationException("Esta conta usa um login social (google). Defina uma senha primeiro.");

            if (!BCrypt.Net.BCrypt.Verify(currentPassword, user.PasswordHash))
                throw new UnauthorizedAccessException("Senha atual incorreta.");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);

            await userRepository.UpdateAsync(user);
            await userRepository.SaveChangesAsync();
        }

        public async Task DeleteMeAsync(Guid userId)
        {
            var user = await userRepository.GetByIdAsync(userId)
              ?? throw new KeyNotFoundException("Usuário não encontrado");

            await userRepository.DeleteAsync(user);
            await userRepository.SaveChangesAsync();
        }
    }
}
