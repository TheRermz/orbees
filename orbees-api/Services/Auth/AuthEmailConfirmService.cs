using Api.Repositories.Interfaces;
using Api.Services.Interfaces.Auth;

namespace Api.Services.Auth
{
    public class AuthEmailConfirmService(
        IUserRepository userRepository
        ) : IAuthEmailConfirmService
    {
        public async Task ConfirmEmailAsync(string token)
        {
            var user = await userRepository.GetByEmailConfirmationTokenAsync(token)
              ?? throw new InvalidOperationException("Token inválido ou expirado.");

            if (user.EmailConfirmationExpiresAt < DateTime.UtcNow)
                throw new InvalidOperationException("Token Inválido. Solicite um novo.");

            user.EmailConfirmed = true;
            user.EmailConfirmationToken = null;
            user.EmailConfirmationExpiresAt = null;
            user.UpdatedAt = DateTime.UtcNow;

            await userRepository.UpdateAsync(user);
            await userRepository.SaveChangesAsync();
        }
    }
}
