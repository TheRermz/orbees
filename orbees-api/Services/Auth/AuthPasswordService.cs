using Api.Repositories.Interfaces;
using Api.Services.Interfaces.Auth;
using Api.Services.Interfaces.Email;

namespace Api.Services.Auth
{
    public class AuthPasswordService(
        IUserRepository userRepository,
        IEmailService emailService,
        ITokenService tokenService
        ) : IAuthPasswordService
    {
        public async Task ForgotPasswordAsync(string email)
        {
            var user = await userRepository.GetByEmailAsync(email);
            if (user == null) return;

            var resetToken = tokenService.GenerateSecureToken();
            user.PwdResetToken = resetToken;
            user.PwdResetExpiresAt = DateTime.UtcNow.AddHours(2);
            user.UpdatedAt = DateTime.UtcNow;

            await userRepository.UpdateAsync(user);
            await userRepository.SaveChangesAsync();
            await emailService.SendPasswordResetAsync(user.Email, user.Fullname, resetToken)
        }

        public async Task ResetPasswordAsync(string token, string newPassword)
        {
            var user = await userRepository.GetByPasswordResetTokenAsync(token)
              ?? throw new InvalidOperationException("Token inválido ou expirado.");

            if (user.PwdResetExpiresAt < DateTime.UtcNow)
                throw new InvalidOperationException("Token expirado. Solicite um novo.");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
            user.PwdResetToken = null;
            user.PwdResetExpiresAt = null;
            user.UpdatedAt = DateTime.UtcNow;

            await userRepository.UpdateAsync(user);
            await userRepository.SaveChangesAsync();
        }
    }
}
