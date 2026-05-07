using Api.Dtos.User;

namespace Api.Services.Interfaces.UserProfile
{
    public interface IUserService
    {
        Task<UserReadDto> GetMeAsync(Guid userId);
        Task<UserReadDto> UpdateMeAsync(Guid userId, UserUpdateDto dto);
        Task<UserReadDto> UpdateProfilePictureAsync(Guid userId, IFormFile file);
        Task<UserReadDto> DeleteProfilePictureAsync(Guid userId);
        Task UpdatePasswordAsync(Guid userId, string currentPassword, string newPassword);
        Task DeleteMeAsync(Guid userId);
    }
}
