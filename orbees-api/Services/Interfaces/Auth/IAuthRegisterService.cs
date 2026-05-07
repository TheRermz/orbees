using Api.Dtos.User;

namespace Api.Services.Interfaces.Auth
{
    public interface IAuthRegisterService
    {
        Task<UserReadDto> RegisterAsync(UserCreateDto dto);
    }
}
