using Api.Dtos.User;

namespace Api.Services.Interfaces.Auth
{
    public interface IAuthService
    {
        Task<UserReadDto> RegisterAsync(UserCreateDto dto);
        Task<string> LoginAsync(string email, string password);
        Task ConfirmEmailAsync(string token);
        Task ForgotPasswordAsync(string email);
        Task ResetPasswordAsync(string token, string newPassword);
        Task<string> HandleGoogleCallbackAsync(string email, string name, string providerId);
    }
}
