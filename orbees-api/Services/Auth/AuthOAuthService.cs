using Api.Models;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces.Auth;

namespace Api.Services.Auth
{
    public class AuthOAuthService(
        IUserRepository userRepository,
        ITokenService tokenService
        ) : IAuthOAuthService
    {
        public async Task<string> HandleGoogleCallbackAsync(string email, string name, string providerId)
        {
            var user = await userRepository.GetByOAuthProviderIdAsync("google", providerId);

            if (user == null)
            {
                var existingUser = await userRepository.GetByEmailAsync(email);
                if (existingUser != null)
                    throw new InvalidOperationException("Esse email está associado a outra conta. Faça login com email e senha.");

                user = new User
                {
                    Email = email,
                    Fullname = name,
                    Username = email.Split("@")[0],
                    PasswordHash = null,
                    EmailConfirmed = true,
                    OAuthProvider = "google",
                    OAuthProviderId = providerId
                };

                await userRepository.AddAsync(user);
                await userRepository.SaveChangesAsync();
            }
            return tokenService.GenerateJwt(user);
        }
    }
}
