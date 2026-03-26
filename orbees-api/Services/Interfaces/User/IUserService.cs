using Api.Dtos.User;

namespace Api.Services.Interfaces.User
{
    public interface IUserService
    {
        Task<UserReadDto> GetMeAsync(Guid userId);
        Task<UserReadDto> UpdateMeAsync(Guid userId, UserUpdateDto dto);
        Task UpdatePasswordAsync(Guid userId, string currentPassword, string newPassword);
        Task DeleteMeAsync(Guid userId);
    }
}
