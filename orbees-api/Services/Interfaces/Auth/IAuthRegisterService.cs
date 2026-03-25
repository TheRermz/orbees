using Api.Dtos;

namespace Api.Services.Interfaces.Auth
{
    public interface IAuthRegisterService
    {
        Task<UserReadDto> RegisterAsync(UserCreateDto dto);
    }
}
