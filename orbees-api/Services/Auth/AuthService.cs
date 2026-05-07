using Api.Dtos.User;
using Api.Services.Interfaces.Auth;

namespace Api.Services.Auth
{
    public class AuthService(
        IAuthRegisterService registerService,
        IAuthLoginService loginService,
        IAuthEmailConfirmService emailConfirmService,
        IAuthPasswordService passwordService,
        IAuthOAuthService oAuthService
        ) : IAuthService
    {
        public Task<UserReadDto> RegisterAsync(UserCreateDto dto) =>
          registerService.RegisterAsync(dto);

        public Task<string> LoginAsync(string email, string password) =>
          loginService.LoginAsync(email, password);

        public Task ConfirmEmailAsync(string token) =>
          emailConfirmService.ConfirmEmailAsync(token);

        public Task ForgotPasswordAsync(string email) =>
          passwordService.ForgotPasswordAsync(email);

        public Task ResetPasswordAsync(string token, string newPassword) =>
          passwordService.ResetPasswordAsync(token, newPassword);

        public Task<string> HandleGoogleCallbackAsync(string email, string name, string providerId) =>
          oAuthService.HandleGoogleCallbackAsync(email, name, providerId);
    }
}
