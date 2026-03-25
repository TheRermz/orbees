using Api.Dtos;

namespace Api.Services.Interfaces
{
    public interface IAuthRegisterService
    {
        Task<UserReadDto> RegisterAsync(UserCreateDto dto);
    }
}
