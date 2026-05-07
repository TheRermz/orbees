using Api.Repositories.Interfaces;
using Api.Services.Interfaces.Auth;

namespace Api.Services.Auth
{
    public class AuthLoginService(
        IUserRepository userRepository,
        ITokenService tokenService
        ) : IAuthLoginService
    {
        public async Task<string> LoginAsync(string email, string password)
        {
            var user = await userRepository.GetByEmailAsync(email)
              ?? throw new UnauthorizedAccessException("Credenciais Inválidas.");

            if (!user.EmailConfirmed)
                throw new UnauthorizedAccessException("Email não confirmado. Verifique sua caixa de entrada.");

            if (user.PasswordHash == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                throw new UnauthorizedAccessException("Credenciais Inválidas");

            return tokenService.GenerateJwt(user);
        }
    }
}
